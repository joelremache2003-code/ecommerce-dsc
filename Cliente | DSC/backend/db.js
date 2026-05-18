const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('railway') ? { rejectUnauthorized: false } : false
});

async function initDB() {
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
}

async function getHistory(phone, limit = 10) {
  const res = await pool.query(
    `SELECT role, content FROM conversations
     WHERE phone = $1
     ORDER BY created_at DESC
     LIMIT $2`,
    [phone, limit]
  );
  return res.rows.reverse();
}

async function saveMessage(phone, role, content) {
  await pool.query(
    `INSERT INTO conversations (phone, role, content) VALUES ($1, $2, $3)`,
    [phone, role, content]
  );
}

async function saveOrder(phone, customerName, customerCity, items, total) {
  const res = await pool.query(
    `INSERT INTO orders (phone, customer_name, customer_city, items, total)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [phone, customerName, customerCity, JSON.stringify(items), total]
  );
  return res.rows[0].id;
}

module.exports = { initDB, getHistory, saveMessage, saveOrder };
