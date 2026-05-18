// Catálogo completo de productos para inyectar en el system prompt del bot
const PRODUCTS_CATALOG = [
  { id:"P001", brand:"MAGENE", category:"Electrónica", name:"MAGENE Banda Frecuencia Cardiaca H603 Azul", price:40, stock:3, description:"Monitor cardíaco profesional ANT+/Bluetooth. Resistente IP67. Compatible con Garmin, Wahoo y Magene. Batería CR2032." },
  { id:"P002", brand:"MAGENE", category:"Electrónica", name:"MAGENE Ciclocomputador C706", price:300, stock:1, description:"GPS premium touchscreen color 4.0\". Mapas con navegación giro a giro, Strava/TrainingPeaks. IPX7." },
  { id:"P003", brand:"MAGENE", category:"Electrónica", name:"MAGENE Ciclocomputador C606v2", price:195, stock:1, description:"GPS touchscreen 2.8\". Navegación giro a giro, 20h de batería. Excelente relación precio-rendimiento." },
  { id:"P004", brand:"MAGENE", category:"Electrónica", name:"MAGENE Ciclocomputador C506", price:100, stock:2, description:"GPS básico pantalla e-paper, 30h de batería. ANT+/BLE. Ligero para entrenamiento diario." },
  { id:"P005", brand:"MAGENE", category:"Electrónica", name:"MAGENE Ciclocomputador C506SE", price:100, stock:2, description:"Edición Especial del C506. Mismo rendimiento, diseño premium exclusivo." },
  { id:"P006", brand:"MAGENE", category:"Accesorio", name:"MAGENE Soporte de Manillar", price:15, stock:1, description:"Soporte aerodinámico de aluminio para C506/C606/C706. Instalación sin herramientas." },
  { id:"P007", brand:"MAGENE", category:"Accesorio", name:"MAGENE Case C506SE/C506", price:15, stock:1, description:"Funda silicona alta resistencia para C506 y C506SE. Protege contra golpes y lluvia." },
  { id:"P008", brand:"MAGENE", category:"Accesorio", name:"MAGENE Case C606", price:15, stock:1, description:"Funda protectora silicona premium anti-impacto para C606." },
  { id:"P009", brand:"MAGENE", category:"Electrónica", name:"MAGENE Luz Radar L508", price:125, stock:1, description:"Luz trasera con radar hasta 140m. Alerta al ciclocomputador vía ANT+. 50 lúmenes. Esencial para seguridad vial." },
  { id:"P010", brand:"MAGENE", category:"Sensor", name:"MAGENE Sensor Cadencia/Velocidad S314", price:30, stock:1, description:"Sensor dual cadencia + velocidad. ANT+/BLE. Batería recargable USB. Sin herramientas." },
  { id:"P011", brand:"MAGENE", category:"Rodillo", name:"MAGENE Rodillo Inteligente T200", price:770, stock:1, description:"Rodillo transmisión directa 2000W. Modo ERG. Compatible Zwift/TrainerRoad/Rouvy. Ultra silencioso." },
  { id:"P012", brand:"NEVERSECOND", category:"Nutrición", name:"NeverSecond C30+ Gel Cola/Cafeína 60ml", price:4.40, stock:27, description:"30g CHO + 75mg cafeína. Sabor Cola. Doble fuente de carbohidratos para alta intensidad." },
  { id:"P013", brand:"NEVERSECOND", category:"Nutrición", name:"NeverSecond C30+ Gel Espresso/Cafeína 60ml", price:4.40, stock:26, description:"30g CHO + 75mg cafeína. Sabor Espresso. Sin agua adicional." },
  { id:"P014", brand:"NEVERSECOND", category:"Nutrición", name:"NeverSecond C30 Gel Berry 60ml", price:4.40, stock:24, description:"30g CHO sin cafeína. Sabor Frutos Rojos. Para toda la carrera." },
  { id:"P015", brand:"NEVERSECOND", category:"Nutrición", name:"NeverSecond C30 Gel Citrus 60ml", price:4.40, stock:24, description:"30g CHO sin cafeína. Sabor Cítrico. Máxima absorción gástrica en fondos largos." },
  { id:"P016", brand:"NEVERSECOND", category:"Nutrición", name:"NeverSecond C30 Gel Fruit Punch 60ml", price:4.40, stock:12, description:"30g CHO sin cafeína. Sabor Tropical. Ideal en condiciones de calor." },
  { id:"P017", brand:"NEVERSECOND", category:"Nutrición", name:"NeverSecond C30 Gel Passion Fruit 60ml", price:4.40, stock:24, description:"30g CHO sin cafeína. Sabor Maracuyá. Para rodajes largos y fondos." },
  { id:"P018", brand:"NEVERSECOND", category:"Nutrición", name:"NeverSecond C90 High-Carb Mix Citrus 94g", price:5.90, stock:0, description:"90g CHO por porción. Sabor Cítrico. Para +90 min de esfuerzo. AGOTADO." },
  { id:"P019", brand:"PRECISION FUEL", category:"Nutrición", name:"PRECISION FUEL Gel 30", price:3.99, stock:5, description:"30g CHO ratio 2:1 glucosa:fructosa. Formulado por científicos deportivos. Sin cafeína." },
  { id:"P020", brand:"PRECISION FUEL", category:"Nutrición", name:"PRECISION FUEL Gel 30 Cafeína", price:4.90, stock:8, description:"30g CHO + 100mg cafeína. Mayor concentración de cafeína por gel del mercado." },
  { id:"P021", brand:"PIRELLI", category:"Llantas", name:"PIRELLI P4 Sport 700x28", price:39, stock:2, description:"Llanta entrenamiento ruta. DualCompound, protección PlanetProtect anticorte." },
  { id:"P022", brand:"PIRELLI", category:"Llantas", name:"PIRELLI Cinturato Road 700x26", price:79.94, stock:2, description:"Gravel/ruta 4 estaciones. Compound SmartEVO, TechBELT anticorte. Excelente en mojado." },
  { id:"P023", brand:"PIRELLI", category:"Llantas", name:"PIRELLI P Zero Race 4S 700x28", price:115, stock:2, description:"Competición 4 estaciones SpeedCore. Preferida de equipos WorldTour. Ultra ligera." },
  { id:"P024", brand:"PIRELLI", category:"Llantas", name:"PIRELLI P Zero Race SmartEvo 700x26", price:79, stock:2, description:"Carrera 700x26 SmartEVO Racing + TechBELT. Alta velocidad para rodadores potentes." },
  { id:"P025", brand:"PIRELLI", category:"Llantas", name:"PIRELLI P Zero Race SmartEvo 700x28", price:79, stock:2, description:"Carrera 700x28 SmartEVO. Equilibrio velocidad-comodidad para gran fondo." },
  { id:"P026", brand:"PIRELLI", category:"Llantas", name:"PIRELLI P Zero Race TLR RS 700x28", price:119, stock:2, description:"Tubeless Ready competición. Sin cámara de aire. Mayor tracción, menos pinchazos." },
  { id:"P027", brand:"PIRELLI", category:"Llantas", name:"PIRELLI Scorpion Sport XC M 29x2.4", price:69, stock:2, description:"MTB XC/Trail compound ProWall. 29\"x2.4\". Alta velocidad en terreno variado." },
  { id:"P028", brand:"HAMMER", category:"Nutrición", name:"Hammer Gel Apple Cinnamon", price:2.60, stock:0, description:"26g CHO. Sabor Manzana-Canela. Con BCAA. Sin artificiales. AGOTADO." },
  { id:"P029", brand:"HAMMER", category:"Nutrición", name:"Hammer Gel Banana", price:2.60, stock:0, description:"26g CHO. Sabor Banana. Con BCAA. Sin HFCS. AGOTADO." },
  { id:"P030", brand:"HAMMER", category:"Nutrición", name:"Hammer Gel Tropical", price:2.60, stock:2, description:"26g CHO. Sabor Tropical. Con BCAA. Fácil digestión." },
  { id:"P031", brand:"HAMMER", category:"Nutrición", name:"Hammer Endurolytes Fizz Cola", price:9, stock:8, description:"Tabletas efervescentes de electrolitos completos (Na, K, Mg, Ca, Cl) + cafeína. Para calor y rodajes largos." },
  { id:"P032", brand:"HAMMER", category:"Nutrición", name:"Hammer Endurolytes Fizz Lemon Lime", price:9, stock:1, description:"Tabletas efervescentes electrolitos. Sabor Limón. Sin cafeína. Para climas cálidos." },
  { id:"P033", brand:"SKRATCH", category:"Nutrición", name:"SKRATCH Energy Chews Sour Cherry", price:3.90, stock:1, description:"Gomitas energéticas 23g CHO. Sabor Sour Cherry. Con electrolitos. Alternativa al gel." },
  { id:"P034", brand:"THUMBS UP", category:"Mantenimiento", name:"THUMBS UP Parches M (48 units)", price:5, stock:2, description:"Pack 48 parches talla M. Vulcanizado en frío. Alta adherencia. Universal." },
  { id:"P035", brand:"THUMBS UP", category:"Mantenimiento", name:"THUMBS UP Parches L", price:5, stock:1, description:"Parches talla L para pinchazos grandes. Vulcanizado en frío. Alta adherencia." },
  { id:"P036", brand:"VITTORIA", category:"Tubos", name:"VITTORIA Tubo 700 x 20/28c 80mm", price:10, stock:2, description:"Cámara butilo premium italiano. Válvula Presta 80mm. Para 700c de 20-28mm." },
  { id:"P037", brand:"CHAOYANG", category:"Tubos", name:"CHAOYANG Tubo 700 x 25/32c 60mm", price:6, stock:12, description:"Cámara butilo estándar. Válvula Presta 60mm. Para entrenamiento y uso diario." },
  { id:"P038", brand:"XCADEY", category:"Electrónica", name:"XCADEY Mini Inflador Eléctrico Capsule P40", price:65, stock:1, description:"Inflador portátil hasta 40PSI. Recargable USB-C. Display digital. Ideal ruta y gravel." },
  { id:"P039", brand:"XCADEY", category:"Electrónica", name:"XCADEY Mini Inflador Eléctrico Capsule P60", price:75, stock:1, description:"Inflador portátil hasta 60PSI. Recargable USB-C. Para MTB y ruta." },
  { id:"P040", brand:"XCADEY", category:"Electrónica", name:"XCADEY Mini Inflador Eléctrico Capsule P80", price:89, stock:1, description:"Inflador top de gama hasta 80PSI. Cualquier tipo de bicicleta. La solución definitiva anti-pinchazos." }
];

function buildProductsContext() {
  const available = PRODUCTS_CATALOG.filter(p => p.stock > 0);
  const outOfStock = PRODUCTS_CATALOG.filter(p => p.stock === 0).map(p => p.name);

  const byCategory = available.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  let context = "=== CATÁLOGO DISPONIBLE DSC ===\n\n";

  for (const [cat, products] of Object.entries(byCategory)) {
    context += `--- ${cat.toUpperCase()} ---\n`;
    for (const p of products) {
      context += `• ${p.name} — $${p.price} USD (Stock: ${p.stock} ud${p.stock > 1 ? 's' : ''})\n`;
      context += `  ${p.description}\n`;
    }
    context += "\n";
  }

  if (outOfStock.length > 0) {
    context += `--- AGOTADOS (NO OFRECER) ---\n`;
    outOfStock.forEach(n => { context += `• ${n}\n`; });
  }

  return context;
}

module.exports = { PRODUCTS_CATALOG, buildProductsContext };
