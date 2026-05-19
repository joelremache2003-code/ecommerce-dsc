require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const { initDB, saveOrder, getConversationsNeedingReminder } = require('./db');
const { generateResponse } = require('./bot');
const { notifyOwner } = require('./telegram');
const { getProducts, findProductInText } = require('./sheets');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const PHOTO_KEYWORDS = ['foto', 'imagen', 'muéstrame', 'muestrame', 'cómo se ve', 'como se ve', 'ver el producto', 'picture', 'show'];
const wantsPhoto = msg => PHOTO_KEYWORDS.some(k => msg.toLowerCase().includes(k));

// Health check para Railway
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'DSC WhatsApp Bot', timestamp: new Date().toISOString() });
});

// Webhook que recibe mensajes de Twilio
app.post('/webhook/whatsapp', async (req, res) => {
  res.status(200).send('<Response></Response>');

  const incomingMsg = req.body.Body?.trim();
  const from = req.body.From;

  if (!incomingMsg || !from) return;

  try {
    const reply = await generateResponse(from, incomingMsg);

    await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: from,
      body: reply
    });

    // Enviar foto proactivamente si el bot está hablando de un producto con imagen disponible
    try {
      const products = await getProducts();
      if (products) {
        // Buscar producto en la respuesta del bot (proactivo) o en el mensaje del usuario (explícito)
        const searchText = reply + ' ' + incomingMsg;
        const product = findProductInText(searchText, products);
        if (product && product.foto_url) {
          await twilioClient.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: from,
            mediaUrl: [product.foto_url],
          });
        }
        if (product && product.canva_url) {
          await twilioClient.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: from,
            body: `📸 Ver todas las fotos: ${product.canva_url}`,
          });
        }
      }
    } catch (photoErr) {
      console.warn('⚠️ No se pudo enviar foto:', photoErr.message);
    }
  } catch (err) {
    console.error('❌ Error procesando mensaje:', JSON.stringify({
      message: err.message,
      status: err.status,
      code: err.code,
      detail: err.response?.data || err.error || null,
    }, null, 2));

    try {
      await twilioClient.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: from,
        body: 'Hola, en este momento tenemos un inconveniente técnico. Por favor escríbenos en unos minutos 🚴 — Equipo DSC'
      });
    } catch (fallbackErr) {
      console.error('❌ Error fallback Twilio:', fallbackErr.message);
    }
  }
});

// Endpoint para recibir pedidos desde la web
app.post('/api/order', async (req, res) => {
  const { items, total, customerName, customerCity, phone, address, notes } = req.body;
  if (!items || !total) return res.status(400).json({ error: 'Datos incompletos' });

  try {
    const orderId = await saveOrder(phone || '', customerName || '', customerCity || '', items, total);
    notifyOwner({ items, total, customerName, customerCity, phone, address, notes }).catch(() => {});
    res.json({ success: true, orderId });
  } catch (err) {
    console.error('❌ Error guardando pedido:', err.message);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Endpoint para consultar órdenes (uso interno)
app.get('/orders', async (req, res) => {
  const secret = req.headers['x-admin-secret'];
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 50');
  res.json(result.rows);
});

const PORT = process.env.PORT || 3000;

// Recordatorios automáticos: revisa conversaciones inactivas cada 15 min
const remindedRecently = new Map();
const REMIND_COOLDOWN = 12 * 60 * 60 * 1000;

function startReminderJob() {
  setInterval(async () => {
    try {
      const stale = await getConversationsNeedingReminder();
      for (const { phone } of stale) {
        const lastRemind = remindedRecently.get(phone) || 0;
        if (Date.now() - lastRemind < REMIND_COOLDOWN) continue;
        remindedRecently.set(phone, Date.now());
        await twilioClient.messages.create({
          from: process.env.TWILIO_WHATSAPP_NUMBER,
          to: phone,
          body: '¡Hola! Siguiendo con nuestra conversación — ¿tienes alguna duda sobre el producto o el pedido? Estoy aquí para ayudarte 🚴 — DSC'
        });
        console.log(`📨 Recordatorio enviado a ${phone}`);
      }
    } catch (err) {
      console.warn('⚠️ Error en job de recordatorios:', err.message);
    }
  }, 15 * 60 * 1000);
}

initDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`DSC Bot corriendo en puerto ${PORT}`);
    console.log(`Webhook: POST /webhook/whatsapp`);
  });
  startReminderJob();
});
