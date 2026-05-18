const { Pool } = require('pg');

let pool = null;
let dbReady = false;

// In-memory fallback
const memConversations = new Map();
const memOrders = [];
let memOrderId = 1;

async function initDB() {
  const url = process.env.DATABASE_URL;

  if (!url || url.includes('user:password@host')) {
    console.log('⚠️  Sin DATABASE_URL real — modo memoria (desarrollo local)');
    return;
  }

  try {
    pool = new Pool({
      connectionString: url,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 8000,
      idleTimeoutMillis: 30000,
    });

    await pool.query('SELECT 1');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(30) NOT NULL,
        role VARCHAR(10) NOT NULL CHECK (role IN ('user', 'assistant')),
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_conversations_phone ON conversations(phone);

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(30) NOT NULL,
        customer_name VARCHAR(100),
        customer_city VARCHAR(100),
        items JSONB NOT NULL DEFAULT '[]',
        total NUMERIC(10,2),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    dbReady = true;
    console.log('✅ PostgreSQL conectado');
  } catch (err) {
    console.warn('⚠️  PostgreSQL no disponible — usando modo memoria:', err.message);
    pool = null;
    dbReady = false;
  }
}

async function getHistory(phone, limit = 10) {
  if (!dbReady) {
    const h = memConversations.get(phone) || [];
    return h.slice(-limit);
  }
  const res = await pool.query(
    `SELECT role, content FROM conversations
     WHERE phone = $1 ORDER BY created_at DESC LIMIT $2`,
    [phone, limit]
  );
  return res.rows.reverse();
}

async function saveMessage(phone, role, content) {
  if (!dbReady) {
    if (!memConversations.has(phone)) memConversations.set(phone, []);
    memConversations.get(phone).push({ role, content });
    return;
  }
  await pool.query(
    `INSERT INTO conversations (phone, role, content) VALUES ($1, $2, $3)`,
    [phone, role, content]
  );
}

async function saveOrder(phone, customerName, customerCity, items, total) {
  if (!dbReady) {
    const id = memOrderId++;
    memOrders.push({ id, phone, customer_name: customerName, customer_city: customerCity,
      items, total, status: 'pending', created_at: new Date() });
    return id;
  }
  const res = await pool.query(
    `INSERT INTO orders (phone, customer_name, customer_city, items, total)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [phone, customerName, customerCity, JSON.stringify(items), total]
  );
  return res.rows[0].id;
}

module.exports = { initDB, getHistory, saveMessage, saveOrder };
