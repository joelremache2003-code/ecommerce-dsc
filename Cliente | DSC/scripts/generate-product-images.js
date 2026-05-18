const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../dsc-ecommerce/img/products');

const products = [
  { id:'P012', brand:'NEVERSECOND', short:'C30+ Cola', detail:'30g CHO · 75mg Cafeína', from:'#B71C1C', to:'#1A0000', icon:'⚗' },
  { id:'P013', brand:'NEVERSECOND', short:'C30+ Espresso', detail:'30g CHO · 75mg Cafeína', from:'#4E342E', to:'#1A0A00', icon:'⚗' },
  { id:'P014', brand:'NEVERSECOND', short:'C30 Berry', detail:'30g CHO · Sin cafeína', from:'#880E4F', to:'#1A0010', icon:'⚗' },
  { id:'P015', brand:'NEVERSECOND', short:'C30 Citrus', detail:'30g CHO · Sin cafeína', from:'#E65100', to:'#1A0D00', icon:'⚗' },
  { id:'P016', brand:'NEVERSECOND', short:'C30 Fruit Punch', detail:'30g CHO · Tropical', from:'#AD1457', to:'#1A0015', icon:'⚗' },
  { id:'P017', brand:'NEVERSECOND', short:'C30 Passion Fruit', detail:'30g CHO · Maracuyá', from:'#6A1B9A', to:'#0D001A', icon:'⚗' },
  { id:'P018', brand:'NEVERSECOND', short:'C90 High-Carb', detail:'90g CHO · Citrus', from:'#1B5E20', to:'#001A05', icon:'⚗' },
  { id:'P019', brand:'PRECISION FUEL', short:'Gel 30', detail:'30g CHO · 2:1 ratio', from:'#1B5E20', to:'#001A05', icon:'⚗' },
  { id:'P020', brand:'PRECISION FUEL', short:'Gel 30 Cafeína', detail:'30g CHO · 100mg cafeína', from:'#004D40', to:'#001A12', icon:'⚗' },
  { id:'P021', brand:'PIRELLI', short:'P4 Sport 700x28', detail:'Entrenamiento · DualCompound', from:'#B71C1C', to:'#0D0000', icon:'⭕' },
  { id:'P022', brand:'PIRELLI', short:'Cinturato Road 700x26', detail:'4 Estaciones · SmartEVO', from:'#880E4F', to:'#120008', icon:'⭕' },
  { id:'P023', brand:'PIRELLI', short:'P Zero Race 4S 700x28', detail:'Competición · SpeedCore', from:'#B71C1C', to:'#0D0000', icon:'⭕' },
  { id:'P024', brand:'PIRELLI', short:'P Zero Race SmartEvo 26', detail:'Racing · TechBELT', from:'#7B1FA2', to:'#0D001A', icon:'⭕' },
  { id:'P025', brand:'PIRELLI', short:'P Zero Race SmartEvo 28', detail:'Gran fondo · SmartEVO', from:'#1565C0', to:'#00001A', icon:'⭕' },
  { id:'P026', brand:'PIRELLI', short:'P Zero Race TLR RS', detail:'Tubeless Ready · 700x28', from:'#0D47A1', to:'#000010', icon:'⭕' },
  { id:'P027', brand:'PIRELLI', short:'Scorpion Sport XC M', detail:'MTB · 29x2.4 ProWall', from:'#1B5E20', to:'#001A05', icon:'⭕' },
  { id:'P028', brand:'HAMMER', short:'Gel Apple Cinnamon', detail:'26g CHO · BCAA', from:'#BF360C', to:'#1A0500', icon:'⚗' },
  { id:'P029', brand:'HAMMER', short:'Gel Banana', detail:'26g CHO · BCAA', from:'#F57F17', to:'#1A0D00', icon:'⚗' },
  { id:'P030', brand:'HAMMER', short:'Gel Tropical', detail:'26g CHO · BCAA', from:'#E65100', to:'#1A0800', icon:'⚗' },
  { id:'P031', brand:'HAMMER', short:'Endurolytes Fizz Cola', detail:'Electrolitos · Cafeína', from:'#4A148C', to:'#0D0015', icon:'⚗' },
  { id:'P032', brand:'HAMMER', short:'Endurolytes Fizz Lemon', detail:'Electrolitos · Limón', from:'#827717', to:'#141400', icon:'⚗' },
  { id:'P033', brand:'SKRATCH', short:'Energy Chews Cherry', detail:'23g CHO · Gomitas', from:'#6A1B9A', to:'#0D001A', icon:'⚗' },
  { id:'P034', brand:'THUMBS UP', short:'Parches M', detail:'Pack 48 · Talla M', from:'#0277BD', to:'#001A2A', icon:'🔧' },
  { id:'P035', brand:'THUMBS UP', short:'Parches L', detail:'Talla L · Anti-pinchazos', from:'#01579B', to:'#001520', icon:'🔧' },
  { id:'P036', brand:'VITTORIA', short:'Tubo 700x20/28c 80mm', detail:'Butilo Premium · Presta 80mm', from:'#212121', to:'#050505', icon:'💨' },
  { id:'P037', brand:'CHAOYANG', short:'Tubo 700x25/32c 60mm', detail:'Válvula Presta 60mm', from:'#006064', to:'#001A1B', icon:'💨' },
  { id:'P038', brand:'XCADEY', short:'Capsule P40', detail:'Inflador · hasta 40 PSI', from:'#263238', to:'#050A0C', icon:'⚡' },
  { id:'P039', brand:'XCADEY', short:'Capsule P60', detail:'Inflador · hasta 60 PSI', from:'#1C313A', to:'#040809', icon:'⚡' },
  { id:'P040', brand:'XCADEY', short:'Capsule P80', detail:'Inflador · hasta 80 PSI', from:'#102027', to:'#020507', icon:'⚡' },
];

function makeSVG(p) {
  const brandWords = p.brand.split(' ');
  const brandLine1 = brandWords.slice(0, 2).join(' ');
  const brandLine2 = brandWords.slice(2).join(' ');

  const shortTrunc = p.short.length > 22 ? p.short.slice(0, 22) + '…' : p.short;
  const detailTrunc = p.detail.length > 28 ? p.detail.slice(0, 28) + '…' : p.detail;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="bg${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.from}"/>
      <stop offset="100%" stop-color="${p.to}"/>
    </linearGradient>
    <radialGradient id="shine${p.id}" cx="25%" cy="20%" r="55%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.12)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="400" height="400" fill="url(#bg${p.id})"/>
  <rect width="400" height="400" fill="url(#shine${p.id})"/>

  <!-- Geometric texture -->
  <circle cx="340" cy="60" r="120" fill="rgba(255,255,255,0.04)"/>
  <circle cx="60" cy="340" r="100" fill="rgba(255,255,255,0.03)"/>
  <line x1="0" y1="400" x2="400" y2="0" stroke="rgba(255,255,255,0.04)" stroke-width="60"/>

  <!-- Top label bar -->
  <rect y="0" width="400" height="3" fill="rgba(200,255,0,0.6)"/>

  <!-- Icon -->
  <text x="200" y="150" text-anchor="middle" font-size="64" opacity="0.25">${p.icon}</text>

  <!-- Brand name -->
  <text x="200" y="${brandLine2 ? '205' : '215'}" text-anchor="middle"
    font-family="Arial Black, Arial, sans-serif"
    font-weight="900" font-size="${brandLine1.length > 10 ? '22' : '26'}"
    fill="white" letter-spacing="3" opacity="0.95">${brandLine1}</text>
  ${brandLine2 ? `<text x="200" y="232" text-anchor="middle"
    font-family="Arial Black, Arial, sans-serif"
    font-weight="900" font-size="${brandLine2.length > 10 ? '22' : '26'}"
    fill="white" letter-spacing="3" opacity="0.95">${brandLine2}</text>` : ''}

  <!-- Divider -->
  <line x1="140" y1="${brandLine2 ? '247' : '237'}" x2="260" y2="${brandLine2 ? '247' : '237'}"
    stroke="rgba(255,255,255,0.2)" stroke-width="1"/>

  <!-- Product short name -->
  <text x="200" y="${brandLine2 ? '275' : '268'}" text-anchor="middle"
    font-family="Arial, sans-serif" font-weight="600"
    font-size="15" fill="rgba(255,255,255,0.75)">${shortTrunc}</text>

  <!-- Detail -->
  <text x="200" y="${brandLine2 ? '299' : '293'}" text-anchor="middle"
    font-family="Arial, sans-serif" font-size="12"
    fill="rgba(255,255,255,0.45)">${detailTrunc}</text>

  <!-- Bottom bar -->
  <rect y="360" width="400" height="40" fill="rgba(0,0,0,0.3)"/>
  <text x="200" y="386" text-anchor="middle"
    font-family="Arial, sans-serif" font-weight="700"
    font-size="10" fill="rgba(255,255,255,0.45)" letter-spacing="2.5">DEUTSCHE CYCLING SPOT</text>
</svg>`;
}

let generated = 0;
for (const p of products) {
  const svgContent = makeSVG(p);
  const filePath = path.join(OUT_DIR, `${p.id}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf8');
  generated++;
  process.stdout.write(`✓ ${p.id}  `);
}
console.log(`\n\n✅ ${generated} imágenes generadas en img/products/`);
