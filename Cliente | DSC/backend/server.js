require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const { initDB } = require('./db');
const { generateResponse } = require('./bot');

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
    console.error('Error procesando mensaje:', err.message);

    // Mensaje de fallback si falla Claude
    try {
      await twilioClient.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: from,
        body: 'Hola, en este momento tenemos un inconveniente técnico. Por favor escríbenos en unos minutos 🚴 — Equipo DSC'
      });
    } catch (_) {}
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
