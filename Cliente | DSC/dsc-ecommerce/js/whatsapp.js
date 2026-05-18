// WhatsApp message generator for DSC

function buildProductMessage(product, qty = 1) {
  const total = (product.price * qty).toFixed(2);
  return encodeURIComponent(
`¡Hola! Me interesa comprar en *Deutsche Cycling Spot*:

🛒 *${product.name}*
💰 Precio: $${product.price.toFixed(2)} c/u
📦 Cantidad: ${qty}
💵 Total: $${total}

¿Está disponible? ¿Cómo procedo con el pago?`
  );
}

function buildCartMessage(customerName, customerCity) {
  const items = getCartItems();
  if (!items.length) return '';
  let lines = items.map(i => `• ${i.name} x${i.qty} — $${i.subtotal.toFixed(2)}`).join('\n');
  const total = getCartTotal().toFixed(2);
  return encodeURIComponent(
`¡Hola! Quiero realizar el siguiente pedido en *Deutsche Cycling Spot*:

${lines}

💵 *TOTAL: $${total}*

👤 Nombre: ${customerName || '(por confirmar)'}
📍 Ciudad: ${customerCity || '(por confirmar)'}

¿Pueden confirmarme disponibilidad y datos para la transferencia? ¡Gracias!`
  );
}

function openWhatsAppProduct(productId, qty = 1) {
  const p = getProductById(productId);
  if (!p) return;
  const msg = buildProductMessage(p, qty);
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, '_blank');
}

function openWhatsAppCart(customerName = '', customerCity = '') {
  const msg = buildCartMessage(customerName, customerCity);
  if (!msg) { showToast('Tu carrito está vacío'); return; }
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, '_blank');
}

function openWhatsAppGeneral() {
  const msg = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre los productos de Deutsche Cycling Spot.');
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, '_blank');
}
