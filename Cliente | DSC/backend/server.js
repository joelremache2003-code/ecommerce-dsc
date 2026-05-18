require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const { initDB, saveOrder } = require('./db');
const { generateResponse } = require('./bot');
const { notifyOwner } = require('./telegram');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Health check para Railway
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'DSC WhatsApp Bot', timestamp: new Date().toISOString() });
});

// Webhook que recibe mensajes de Twilio
app.post('/webhook/whatsapp', async (req, res) => {
  // Responder a Twilio inmediatamente con 200 (evita reintentos)
  res.status(200).send('<Response></Response>');

  const incomingMsg = req.body.Body?.trim();
  const from = req.body.From; // formato: "whatsapp:+593XXXXXXXXX"

  if (!incomingMsg || !from) return;

  try {
    const reply = await generateResponse(from, incomingMsg);

    await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: from,
      body: reply
    });
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

initDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`DSC Bot corriendo en puerto ${PORT}`);
    console.log(`Webhook: POST /webhook/whatsapp`);
  });
});
