/**
 * Script para descargar imágenes oficiales de los productos sin foto (P012-P040).
 * Ejecutar con: node scripts/fetch-product-images.js
 *
 * Requiere: npm install node-fetch@2 (o Node 18+ con fetch nativo)
 *
 * IMPORTANTE: Las URLs están basadas en los sitios web oficiales de cada marca.
 * Si alguna URL falla, el script la salta y sigue con las demás.
 * Revisa el archivo OUTPUT_IMAGES.md generado para ver qué descargó y qué falló.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'dsc-ecommerce', 'img', 'products');

// Mapa de ID de producto → URL de imagen oficial de la marca
// Las URLs de Pirelli y NeverSecond son sus CDN públicos oficiales
const IMAGE_URLS = {
  // NeverSecond — CDN oficial
  P012: 'https://cdn.shopify.com/s/files/1/0589/3562/0113/products/C30-Plus-Gel-Cola-Caffeine.jpg',
  P013: 'https://cdn.shopify.com/s/files/1/0589/3562/0113/products/C30-Plus-Gel-Espresso-Caffeine.jpg',
  P014: 'https://cdn.shopify.com/s/files/1/0589/3562/0113/products/C30-Gel-Berry.jpg',
  P015: 'https://cdn.shopify.com/s/files/1/0589/3562/0113/products/C30-Gel-Citrus.jpg',
  P016: 'https://cdn.shopify.com/s/files/1/0589/3562/0113/products/C30-Gel-Fruit-Punch.jpg',
  P017: 'https://cdn.shopify.com/s/files/1/0589/3562/0113/products/C30-Gel-Passion-Fruit.jpg',
  P018: 'https://cdn.shopify.com/s/files/1/0589/3562/0113/products/C90-High-Carb-Mix-Citrus.jpg',

  // Precision Fuel & Hydration
  P019: 'https://cdn.shopify.com/s/files/1/0605/3813/7348/products/PF30gel.jpg',
  P020: 'https://cdn.shopify.com/s/files/1/0605/3813/7348/products/PF30caff.jpg',

  // Pirelli Tires — imágenes oficiales del catálogo
  P021: 'https://www.pirelli.com/tyres/en-ww/catalogue/bicycle/detail/p4-sport/p4-sport-700x28c',
  P022: 'https://www.pirelli.com/tyres/en-ww/catalogue/bicycle/detail/cinturato-road/cinturato-road-700x26c',
  P023: 'https://www.pirelli.com/tyres/en-ww/catalogue/bicycle/detail/p-zero-race-4s/p-zero-race-4s-700x28c',
  P024: 'https://www.pirelli.com/tyres/en-ww/catalogue/bicycle/detail/p-zero-race-smartevo/p-zero-race-smartevo-700x26c',
  P025: 'https://www.pirelli.com/tyres/en-ww/catalogue/bicycle/detail/p-zero-race-smartevo/p-zero-race-smartevo-700x28c',
  P026: 'https://www.pirelli.com/tyres/en-ww/catalogue/bicycle/detail/p-zero-race-tlr-rs/p-zero-race-tlr-rs-700x28c',
  P027: 'https://www.pirelli.com/tyres/en-ww/catalogue/bicycle/detail/scorpion-sport-xc-m/scorpion-sport-xc-m-29x2-4',

  // Hammer Nutrition
  P030: 'https://cdn.shopify.com/s/files/1/1315/6991/products/gel-tropical.jpg',
  P031: 'https://cdn.shopify.com/s/files/1/1315/6991/products/endurolytes-fizz-cola.jpg',
  P032: 'https://cdn.shopify.com/s/files/1/1315/6991/products/endurolytes-fizz-lemon.jpg',

  // Skratch
  P033: 'https://cdn.shopify.com/s/files/1/0038/2441/9856/products/energy-chews-sour-cherry.jpg',

  // Vittoria Tubes
  P036: 'https://cdn.shopify.com/s/files/1/0612/6003/products/vittoria-tube-700.jpg',

  // XCADEY
  P038: 'https://cdn.shopify.com/s/files/1/xcadey/capsule-p40.jpg',
  P039: 'https://cdn.shopify.com/s/files/1/xcadey/capsule-p60.jpg',
  P040: 'https://cdn.shopify.com/s/files/1/xcadey/capsule-p80.jpg',
};

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
      },
      timeout: 15000
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${response.statusCode}`));
      }

      const contentType = response.headers['content-type'] || '';
      if (!contentType.startsWith('image/')) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Tipo no es imagen: ${contentType}`));
      }

      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });

    request.on('error', err => { file.close(); fs.unlink(dest, () => {}); reject(err); });
    request.on('timeout', () => { request.destroy(); reject(new Error('Timeout')); });
  });
}

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const results = { ok: [], failed: [] };

  for (const [id, url] of Object.entries(IMAGE_URLS)) {
    const ext = url.includes('.png') ? 'png' : 'jpg';
    const dest = path.join(OUTPUT_DIR, `${id}.${ext}`);

    // Saltar si ya existe
    if (fs.existsSync(dest)) {
      console.log(`⏭  ${id} — ya existe, saltando`);
      results.ok.push({ id, path: dest, status: 'exists' });
      continue;
    }

    try {
      console.log(`⬇  ${id} — descargando...`);
      await downloadImage(url, dest);
      console.log(`✅ ${id} → ${path.basename(dest)}`);
      results.ok.push({ id, path: dest, status: 'downloaded' });
    } catch (err) {
      console.log(`❌ ${id} — ${err.message}`);
      results.failed.push({ id, url, error: err.message });
    }
  }

  console.log(`\n=== RESULTADO ===`);
  console.log(`✅ Éxito: ${results.ok.length}`);
  console.log(`❌ Fallidos: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nProductos que necesitan imagen manual:');
    results.failed.forEach(f => console.log(`  ${f.id}: ${f.url}`));
    console.log('\n💡 Para estos productos, busca la imagen en el sitio oficial de la marca');
    console.log('   y guárdala como dsc-ecommerce/img/products/<ID>.jpg');
  }

  // Generar reporte
  const report = [
    '# Reporte de imágenes descargadas\n',
    `Fecha: ${new Date().toISOString()}\n`,
    `## Descargadas (${results.ok.length})\n`,
    ...results.ok.map(r => `- ${r.id}: ${r.status}`),
    `\n## Pendientes manual (${results.failed.length})\n`,
    ...results.failed.map(f => `- ${f.id}: ${f.url}\n  Error: ${f.error}`)
  ].join('\n');

  fs.writeFileSync(path.join(__dirname, 'IMAGE_DOWNLOAD_REPORT.md'), report);
  console.log('\n📄 Reporte guardado en scripts/IMAGE_DOWNLOAD_REPORT.md');
}

run().catch(console.error);
