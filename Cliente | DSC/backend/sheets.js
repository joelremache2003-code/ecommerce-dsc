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
  const allLines = csv.split('\n');

  // Find the actual header row (the one that starts with "id")
  const headerLineIdx = allLines.findIndex(l => /^id[\s,]/i.test(l.trim()));
  if (headerLineIdx === -1) return [];

  const dataLines = allLines.slice(headerLineIdx).filter(l => l.trim());
  if (dataLines.length < 2) return [];

  const headers = parseCSVLine(dataLines[0]).map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));

  return dataLines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => {
      if (h) obj[h] = (values[i] || '').trim();
    });
    obj.price = parseFloat((obj.price || '').replace(/[$,\s]/g, '')) || 0;
    obj.stock = parseInt(obj.stock) || 0;
    return obj;
  }).filter(p => p.id && p.name);
}

async function getProducts() {
  const url = process.env.GOOGLE_SHEET_CSV_URL;
  if (!url) return null;

  if (cache && Date.now() - cacheTime < CACHE_TTL) return cache;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const csv = await res.text();
    const products = parseCSV(csv);
    if (products.length > 0) {
      cache = products;
      cacheTime = Date.now();
      console.log(`✅ Google Sheets: ${products.length} productos cargados`);
    }
    return cache;
  } catch (err) {
    console.warn('⚠️ Google Sheets fetch error:', err.message);
    return cache;
  }
}

function buildContextFromProducts(products) {
  if (!products || products.length === 0) return null;

  const available = products.filter(p => p.stock > 0);
  const outOfStock = products.filter(p => p.stock === 0).map(p => p.name);

  const CATEGORY_LABELS = {
    'ciclocomputadores': 'Ciclocomputadores GPS',
    'electrónica': 'GPS, sensores, luces y accesorios tech',
    'electronica': 'GPS, sensores, luces y accesorios tech',
    'luces': 'Luces y seguridad vial',
    'sensor': 'Sensores de rendimiento',
    'llantas': 'Llantas de ruta, gravel y MTB',
    'nutrición': 'Nutrición deportiva de alto rendimiento',
    'nutricion': 'Nutrición deportiva de alto rendimiento',
    'rodillo': 'Rodillos inteligentes para entrenamiento indoor',
    'accesorio': 'Accesorios y complementos',
    'mantenimiento': 'Repuestos, tubos y mantenimiento',
    'tubos': 'Repuestos y tubos',
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

  // Exact product ID match
  const byId = products.find(p => p.id && lower.includes(p.id.toLowerCase()));
  if (byId) return byId;

  // Keyword scoring: find product with most name-words matching the text
  let bestScore = 0;
  let bestProduct = null;
  for (const p of products) {
    const words = p.name.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const score = words.filter(w => lower.includes(w)).length;
    if (score > bestScore) {
      bestScore = score;
      bestProduct = p;
    }
  }
  return bestScore > 0 ? bestProduct : null;
}

module.exports = { getProducts, buildContextFromProducts, findProductInText };
