// ============================
// STORE — Cart Logic
// ============================

const CART_KEY = 'dsc_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, qty = 1) {
  const product = getProductById(productId);
  if (!product || product.stock === 0) return;
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx > -1) {
    cart[idx].qty = Math.min(cart[idx].qty + qty, product.stock);
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  showToast(`✓ ${product.name.split(' ').slice(0,4).join(' ')}... añadido al carrito`);
  animateCartBtn();
}

function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.id !== productId));
}

function updateQty(productId, qty) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx === -1) return;
  if (qty <= 0) { removeFromCart(productId); return; }
  cart[idx].qty = qty;
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartUI();
}

function getCartCount() {
  return getCart().reduce((t, i) => t + i.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((t, i) => {
    const p = getProductById(i.id);
    return t + (p ? p.price * i.qty : 0);
  }, 0);
}

function getCartItems() {
  return getCart().map(i => {
    const p = getProductById(i.id);
    return p ? { ...p, qty: i.qty, subtotal: p.price * i.qty } : null;
  }).filter(Boolean);
}

function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function animateCartBtn() {
  document.querySelectorAll('.cart-count').forEach(el => {
    el.classList.remove('cart-count-animate');
    void el.offsetWidth;
    el.classList.add('cart-count-animate');
  });
}

// ============================
// Toast Notification
// ============================
let toastTimer;
function showToast(msg, type = 'accent') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast toast-accent';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================
// Scroll Reveal
// ============================
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================
// Navbar scroll
// ============================
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile burger
  const burger = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(7,7,15,0.98)';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid var(--border)';
      navLinks.style.backdropFilter = 'blur(20px)';
    });
  }
}

// ============================
// Render helpers
// ============================
function renderProductCard(product, animate = false) {
  const { id, brand, name, price, stock, img, category } = product;
  const bc = getBrandColor(brand);
  const icon = CATEGORY_ICONS[category] || '🚴';
  const outOfStock = stock === 0;
  const imgHtml = img
    ? `<img src="${img}" alt="${name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  const placeholderStyle = `background:linear-gradient(135deg,${bc.from},${bc.to})`;
  const placeholderDisplay = img ? 'none' : 'flex';

  return `
<article class="product-card${outOfStock ? ' out-of-stock' : ''}${animate ? ' reveal' : ''}" data-id="${id}">
  <a href="producto.html?id=${id}" class="product-card-img">
    ${imgHtml}
    <div class="product-card-placeholder" style="${placeholderStyle};display:${placeholderDisplay};flex-direction:column;align-items:center;justify-content:center;height:100%;gap:.5rem">
      <span style="font-size:2.5rem;opacity:.5">${icon}</span>
      <span style="font-family:var(--font-display);font-size:.7rem;font-weight:700;letter-spacing:.12em;opacity:.3;text-transform:uppercase">${brand}</span>
    </div>
  </a>
  <div class="product-card-body">
    <div class="product-brand">${brand}</div>
    <a href="producto.html?id=${id}" class="product-name">${name}</a>
    <div class="product-footer">
      <span class="product-price">${formatPrice(price)}</span>
      <div style="display:flex;align-items:center;gap:.4rem">
        ${outOfStock
          ? '<span class="badge badge-red" style="font-size:.65rem">Agotado</span>'
          : `<button class="add-to-cart-btn" onclick="addToCart('${id}');event.stopPropagation()" title="Agregar al carrito" aria-label="Agregar al carrito">+</button>`
        }
      </div>
    </div>
  </div>
</article>`;
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  initNavbar();
  initReveal();
});
