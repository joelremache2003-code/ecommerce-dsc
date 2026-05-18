async function notifyOwner(order) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const itemLines = (order.items || [])
    .map(i => `  • ${i.name} x${i.qty} — $${(i.subtotal || i.price * i.qty).toFixed(2)}`)
    .join('\n');

  const msg = `🛒 *Nuevo pedido DSC*\n\n` +
    `👤 ${order.customerName} — ${order.customerCity}\n` +
    `📱 ${order.phone || 'No proporcionado'}\n\n` +
    `📦 *Productos:*\n${itemLines}\n\n` +
    `💵 *Total: $${Number(order.total).toFixed(2)}*\n` +
    (order.address ? `📍 Dirección: ${order.address}\n` : '') +
    (order.notes ? `📝 Nota: ${order.notes}` : '');

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' }),
    });
  } catch (err) {
    console.warn('⚠️ Telegram notify error:', err.message);
  }
}

module.exports = { notifyOwner };
