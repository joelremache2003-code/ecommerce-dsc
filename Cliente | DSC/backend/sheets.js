const CACHE_TTL = 5 * 60 * 1000;
let cache = null;
let cacheTime = 0;

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(csv) {
  const lines = csv.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/\s+/g, '_'));
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i] || ''; });
    obj.price = parseFloat(obj.price) || 0;
    obj.stock = parseInt(obj.stock) || 0;
    return obj;
  }).filter(p => p.id && p.name);
}

async function getProducts() {
  const url = process.env.GOOGLE_SHEET_CSV_URL;
  if (!url) return null; // no sheet configured, caller will use static fallback

  if (cache && Date.now() - cacheTime < CACHE_TTL) return cache;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const csv = await res.text();
    const products = parseCSV(csv);
    if (products.length > 0) {
      cache = products;
      cacheTime = Date.now();
    }
    return cache;
  } catch (err) {
    console.warn('⚠️ Google Sheets fetch error:', err.message);
    return cache; // return stale cache if available
  }
}

function buildContextFromProducts(products) {
  if (!products || products.length === 0) return null;

  const available = products.filter(p => p.stock > 0);
  const outOfStock = products.filter(p => p.stock === 0).map(p => p.name);

  const CATEGORY_LABELS = {
    'llantas': 'Llantas de ruta, gravel y MTB',
    'nutrición': 'Nutrición deportiva de alto rendimiento',
    'nutricion': 'Nutrición deportiva de alto rendimiento',
    'electrónica': 'GPS, sensores, luces y accesorios tech',
    'electronica': 'GPS, sensores, luces y accesorios tech',
    'rodillo': 'Rodillos inteligentes para entrenamiento indoor',
    'sensor': 'Sensores de rendimiento',
    'accesorio': 'Accesorios y complementos',
    'mantenimiento': 'Repuestos, tubos y mantenimiento',
    'tubos': 'Repuestos, tubos y mantenimiento',
  };

  const byCategory = available.reduce((acc, p) => {
    const catKey = (p.category || 'otros').toLowerCase();
    const label = CATEGORY_LABELS[catKey] || p.category || 'Otros';
    if (!acc[label]) acc[label] = [];
    acc[label].push(p);
    return acc;
  }, {});

  let context = '=== CATÁLOGO DISPONIBLE DSC ===\n\n';
  for (const [cat, prods] of Object.entries(byCategory)) {
    context += `--- ${cat.toUpperCase()} ---\n`;
    for (const p of prods) {
      context += `• [${p.id}] ${p.name} — $${p.price} USD (Stock: ${p.stock})\n`;
      if (p.description) context += `  ${p.description}\n`;
    }
    context += '\n';
  }
  if (outOfStock.length > 0) {
    context += `--- AGOTADOS (NO OFRECER) ---\n`;
    outOfStock.forEach(n => { context += `• ${n}\n`; });
  }
  return context;
}

function findProductInText(text, products) {
  if (!products) return null;
  const lower = text.toLowerCase();
  return products.find(p =>
    (p.id && lower.includes(p.id.toLowerCase())) ||
    lower.includes(p.name.toLowerCase()) ||
    (p.brand && lower.includes(p.brand.toLowerCase()) && lower.includes((p.category || '').toLowerCase()))
  ) || null;
}

module.exports = { getProducts, buildContextFromProducts, findProductInText };
