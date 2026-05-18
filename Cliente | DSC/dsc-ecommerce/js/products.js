
// ============================================================
// DEUTSCHE CYCLING SPOT — CATÁLOGO DE PRODUCTOS
// Actualizar WHATSAPP_NUMBER y BANK_INFO antes de publicar
// ============================================================

const CONFIG = {
  storeName: "Deutsche Cycling Spot",
  storeShortName: "DSC",
  currency: "USD",
  whatsappNumber: "+593999999999", // ← CAMBIAR por tu número WhatsApp Business
  bankInfo: {
    bank: "Banco del Pacífico",         // ← CAMBIAR
    accountHolder: "Deutsche Cycling Spot S.A.S.", // ← CAMBIAR
    accountNumber: "XXXX-XXXX-XXXX",   // ← CAMBIAR
    accountType: "Corriente",           // ← CAMBIAR
    identification: "RUC: XXXXXXXXXXX01" // ← CAMBIAR
  }
};

const BRAND_COLORS = {
  'MAGENE':         { from: '#0055A5', to: '#001A3D' },
  'NEVERSECOND':    { from: '#C0392B', to: '#2C0A0A' },
  'PRECISION FUEL': { from: '#27AE60', to: '#0A2A15' },
  'PIRELLI':        { from: '#B8001F', to: '#200005' },
  'HAMMER':         { from: '#E67E22', to: '#2C1500' },
  'SKRATCH':        { from: '#8E44AD', to: '#1A0A25' },
  'THUMBS UP':      { from: '#2980B9', to: '#0A1F30' },
  'VITTORIA':       { from: '#C0392B', to: '#200005' },
  'CHAOYANG':       { from: '#16A085', to: '#051A16' },
  'XCADEY':         { from: '#2C3E50', to: '#0A0F14' }
};

const CATEGORY_ICONS = {
  'Electrónica':  '⚡',
  'Nutrición':    '⚗️',
  'Llantas':      '⭕',
  'Accesorio':    '🔩',
  'Sensor':       '📡',
  'Rodillo':      '🚴',
  'Mantenimiento':'🔧',
  'Tubos':        '💨'
};

const PRODUCTS = [
  {
    id: "P001", brand: "MAGENE", category: "Electrónica",
    name: "MAGENE Banda Frecuencia Cardiaca H603 Azul",
    code: "6971606841288", price: 40, stock: 3,
    img: "img/products/P001.png",
    description: "Monitor cardíaco profesional con tecnología dual ANT+/Bluetooth. Resistente al agua IP67. Compatible con Garmin, Wahoo y Magene. Batería CR2032 de larga duración.",
    features: ["ANT+ & Bluetooth dual", "Resistencia IP67 al agua", "Compatible Garmin, Wahoo, Magene", "Batería CR2032", "Ideal para zonas de frecuencia cardíaca"]
  },
  {
    id: "P002", brand: "MAGENE", category: "Electrónica",
    name: "MAGENE Ciclocomputador C706",
    code: "697160684318", price: 300, stock: 1,
    img: "img/products/P002.png",
    description: "GPS premium touchscreen color 4.0'. Compatible con sensores ANT+/BLE. Mapas con navegación giro a giro, integración directa con Strava y TrainingPeaks. Resistente al agua IPX7.",
    features: ["Pantalla touchscreen color 4.0\"", "GPS + mapas navegación", "ANT+ & BLE", "Integración Strava/TrainingPeaks", "Resistente IPX7"]
  },
  {
    id: "P003", brand: "MAGENE", category: "Electrónica",
    name: "MAGENE Ciclocomputador C606v2",
    code: "697160684326", price: 195, stock: 1,
    img: "img/products/P003.png",
    description: "GPS touchscreen 2.8'. Navegación giro a giro, sensores ANT+/BLE, batería de hasta 20 horas. Excelente relación precio-rendimiento para ciclistas intermedios.",
    features: ["Pantalla touchscreen 2.8\"", "Navegación giro a giro", "ANT+ & BLE", "Batería 20 horas", "Ideal ciclistas intermedios"]
  },
  {
    id: "P004", brand: "MAGENE", category: "Electrónica",
    name: "MAGENE Ciclocomputador C506",
    code: "6971606841", price: 100, stock: 2,
    img: "img/products/P004.png",
    description: "GPS básico con pantalla e-paper de ultra bajo consumo. ANT+/BLE. Batería de hasta 30 horas. Ligero y funcional para entrenamientos diarios.",
    features: ["Pantalla e-paper ultraligera", "GPS integrado", "ANT+ & BLE", "Batería 30 horas", "Perfecto para entrenamiento diario"]
  },
  {
    id: "P005", brand: "MAGENE", category: "Electrónica",
    name: "MAGENE Ciclocomputador C506SE",
    code: "6971606842094", price: 100, stock: 2,
    img: "img/products/P005.png",
    description: "Versión Special Edition del C506. Mismas especificaciones técnicas con diseño premium exclusivo. ANT+/BLE, pantalla e-paper, 30h de batería.",
    features: ["Edición Especial diseño premium", "GPS integrado", "ANT+ & BLE", "Batería 30 horas", "E-paper de bajo consumo"]
  },
  {
    id: "P006", brand: "MAGENE", category: "Accesorio",
    name: "MAGENE Soporte de Manillar",
    code: "6971606841714", price: 15, stock: 1,
    img: "img/products/P006.png",
    description: "Soporte aerodinámico de aluminio para ciclocomputadores Magene. Compatible con modelos C506, C606 y C706. Instalación rápida sin herramientas.",
    features: ["Aluminio aeronáutico", "Compatible C506/C606/C706", "Instalación sin herramientas", "Perfil aerodinámico"]
  },
  {
    id: "P007", brand: "MAGENE", category: "Accesorio",
    name: "MAGENE Case C506SE/C506",
    code: "magcasec506", price: 15, stock: 1,
    img: "img/products/P007.png",
    description: "Funda protectora de silicona de alta resistencia para ciclocomputadores C506 y C506SE. Protege contra golpes, lluvia y polvo.",
    features: ["Silicona alta resistencia", "Protección anti-golpes", "Resistente a lluvia", "Compatible C506 y C506SE"]
  },
  {
    id: "P008", brand: "MAGENE", category: "Accesorio",
    name: "MAGENE Case C606",
    code: "magcasec606", price: 15, stock: 1,
    img: "img/products/P008.png",
    description: "Funda protectora de silicona premium anti-impacto para ciclocomputadores C606. Diseñada para proteger el equipo en rodadas exigentes.",
    features: ["Silicona premium anti-impacto", "Diseño específico C606", "Fácil de poner y quitar", "Protección total"]
  },
  {
    id: "P009", brand: "MAGENE", category: "Electrónica",
    name: "MAGENE Luz Radar L508",
    code: "6971606841103", price: 125, stock: 1,
    img: "img/products/P009.png",
    description: "Luz trasera con radar integrado. Detecta vehículos hasta 140 metros. Alerta automática al ciclocomputador vía ANT+. 50 lúmenes. Esencial para la seguridad en ruta.",
    features: ["Radar hasta 140m", "Alerta al ciclocomputador ANT+", "50 lúmenes de brillo", "Recargable USB", "Esencial para seguridad vial"]
  },
  {
    id: "P010", brand: "MAGENE", category: "Sensor",
    name: "MAGENE Sensor Cadencia/Velocidad S314",
    code: "6971606840984", price: 30, stock: 1,
    img: "img/products/P010.png",
    description: "Sensor dual de cadencia y velocidad. ANT+/BLE. Batería recargable USB, sin pila de botón. Instalación sin herramientas en cualquier bicicleta.",
    features: ["Dual: cadencia + velocidad", "ANT+ & BLE", "Batería recargable USB", "Sin herramientas", "Universal para cualquier bici"]
  },
  {
    id: "P011", brand: "MAGENE", category: "Rodillo",
    name: "MAGENE Rodillo Inteligente T200",
    code: "6971606841042", price: 770, stock: 1,
    img: "img/products/P011.png",
    description: "Rodillo de transmisión directa hasta 2000W de resistencia. Modo ERG automático. Compatible con Zwift, TrainerRoad y Rouvy. Silencioso. El setup definitivo para indoor training.",
    features: ["Transmisión directa al cuadro", "Hasta 2000W resistencia", "Modo ERG automático", "Compatible Zwift/TrainerRoad/Rouvy", "Ultra silencioso"]
  },
  {
    id: "P012", brand: "NEVERSECOND", category: "Nutrición",
    name: "NeverSecond C30+ Gel Cola/Cafeína 60ml",
    code: "850024671423", price: 4.40, stock: 27,
    img: null,
    description: "Gel energético con 30g de carbohidratos + 75mg de cafeína. Doble fuente de carbohidratos (glucosa:fructosa 1:0.8). Ideal para esfuerzos de alta intensidad o finales de carrera.",
    features: ["30g CHO + 75mg cafeína", "Doble fuente de carbohidratos", "Sabor Cola", "Sin colorantes artificiales", "Alta intensidad y sprint final"]
  },
  {
    id: "P013", brand: "NEVERSECOND", category: "Nutrición",
    name: "NeverSecond C30+ Gel Espresso/Cafeína 60ml",
    code: "850024671065", price: 4.40, stock: 26,
    img: null,
    description: "Gel energético 30g CHO + 75mg de cafeína sabor espresso. Sin colorantes artificiales. Fácil de tomar sin necesidad de agua adicional.",
    features: ["30g CHO + 75mg cafeína", "Sabor Espresso", "Sin colorantes artificiales", "Sin agua adicional", "Máximo rendimiento"]
  },
  {
    id: "P014", brand: "NEVERSECOND", category: "Nutrición",
    name: "NeverSecond C30 Gel Berry 60ml",
    code: "850024671409", price: 4.40, stock: 24,
    img: null,
    description: "Gel energético 30g CHO sin cafeína, sabor frutos rojos. Para uso durante toda la carrera sin riesgo de sobreestimulación. Fórmula limpia y efectiva.",
    features: ["30g CHO sin cafeína", "Sabor Frutos Rojos", "Uso durante toda la carrera", "Sin sobreestimulación", "Fórmula limpia"]
  },
  {
    id: "P015", brand: "NEVERSECOND", category: "Nutrición",
    name: "NeverSecond C30 Gel Citrus 60ml",
    code: "850024671041", price: 4.40, stock: 24,
    img: null,
    description: "Gel energético 30g CHO sabor cítrico. Formulado para máxima absorción gástrica en esfuerzos prolongados. Sin cafeína.",
    features: ["30g CHO sin cafeína", "Sabor Cítrico", "Máxima absorción gástrica", "Para fondos largos", "Fácil digestión"]
  },
  {
    id: "P016", brand: "NEVERSECOND", category: "Nutrición",
    name: "NeverSecond C30 Gel Fruit Punch 60ml",
    code: "850024671485", price: 4.40, stock: 12,
    img: null,
    description: "Gel 30g CHO sabor tropical. Sin cafeína. Textura isotónica, no requiere agua adicional. Ideal para condiciones de calor.",
    features: ["30g CHO sin cafeína", "Sabor Tropical", "Textura isotónica", "Sin agua adicional", "Ideal en calor"]
  },
  {
    id: "P017", brand: "NEVERSECOND", category: "Nutrición",
    name: "NeverSecond C30 Gel Passion Fruit 60ml",
    code: "850024671461", price: 4.40, stock: 24,
    img: null,
    description: "Gel 30g CHO sabor maracuyá. Sin cafeína. Ideal para rodajes largos y fondos. Textura suave y fácil absorción.",
    features: ["30g CHO sin cafeína", "Sabor Maracuyá", "Para rodajes largos", "Fácil absorción", "Textura suave"]
  },
  {
    id: "P018", brand: "NEVERSECOND", category: "Nutrición",
    name: "NeverSecond C90 High-Carb Mix Citrus 94g",
    code: "850024671119", price: 5.90, stock: 0,
    img: null,
    description: "Bebida de alta carga de carbohidratos (90g CHO). Para entrenamientos de más de 90 minutos o indoor training intenso. Máxima energía sostenida.",
    features: ["90g CHO por porción", "Sabor Cítrico", "Para +90 min de esfuerzo", "Indoor training intenso", "Máxima energía sostenida"]
  },
  {
    id: "P019", brand: "PRECISION FUEL", category: "Nutrición",
    name: "PRECISION FUEL Gel 30",
    code: "5060905440443", price: 3.99, stock: 5,
    img: null,
    description: "Gel 30g de carbohidratos en ratio 2:1 glucosa:fructosa. Formulado por científicos de rendimiento deportivo. Baja osmolaridad para rápida absorción intestinal.",
    features: ["30g CHO (2:1 glucosa:fructosa)", "Formulado por científicos", "Baja osmolaridad", "Rápida absorción", "Sin cafeína"]
  },
  {
    id: "P020", brand: "PRECISION FUEL", category: "Nutrición",
    name: "PRECISION FUEL Gel 30 Cafeína",
    code: "5060905440009", price: 4.90, stock: 8,
    img: null,
    description: "Gel 30g CHO + 100mg de cafeína. La mayor concentración de cafeína por gel del mercado. Para los momentos decisivos de la carrera.",
    features: ["30g CHO + 100mg cafeína", "Mayor cafeína por gel del mercado", "Para momentos clave", "Absorción rápida", "Máximo rendimiento"]
  },
  {
    id: "P021", brand: "PIRELLI", category: "Llantas",
    name: "PIRELLI P4 Sport 700x28",
    code: "8019227455236", price: 39, stock: 2,
    img: null,
    description: "Llanta de entrenamiento para ruta. Compound DualCompound para mayor duración. Protección anticorte PlanetProtect. Rodadura confortable para salidas diarias.",
    features: ["DualCompound", "Protección PlanetProtect anticorte", "700x28c", "Ideal entrenamiento diario", "Durabilidad máxima"]
  },
  {
    id: "P022", brand: "PIRELLI", category: "Llantas",
    name: "PIRELLI Cinturato Road 700x26",
    code: "8019227435689", price: 79.94, stock: 2,
    img: null,
    description: "Llanta gravel/ruta 4 estaciones con compound SmartEVO. Excelente agarre en mojado. Capa anticorte TechBELT. Ideal para cualquier clima.",
    features: ["Compound SmartEVO", "Excelente en mojado", "TechBELT anticorte", "700x26c", "4 estaciones"]
  },
  {
    id: "P023", brand: "PIRELLI", category: "Llantas",
    name: "PIRELLI P Zero Race 4S 700x28",
    code: "8019227420333", price: 115, stock: 2,
    img: null,
    description: "Llanta de competición 4 estaciones con compound SpeedCore. La preferida de equipos WorldTour para clásicas con clima variable. Ultra ligera.",
    features: ["Compound SpeedCore", "Equipos WorldTour", "700x28c", "Ultra ligera", "4 estaciones competición"]
  },
  {
    id: "P024", brand: "PIRELLI", category: "Llantas",
    name: "PIRELLI P Zero Race SmartEvo 700x26",
    code: "8019227414974", price: 79, stock: 2,
    img: null,
    description: "Llanta de carrera 700x26 con compound SmartEVO Racing y capa TechBELT. Alta velocidad de rodado y baja resistencia. Para rodadores potentes.",
    features: ["Compound SmartEVO Racing", "TechBELT anticorte", "700x26c", "Alta velocidad de rodado", "Para rodadores potentes"]
  },
  {
    id: "P025", brand: "PIRELLI", category: "Llantas",
    name: "PIRELLI P Zero Race SmartEvo 700x28",
    code: "8019227398458", price: 79, stock: 2,
    img: null,
    description: "Llanta de carrera 700x28 con tecnología SmartEVO. El equilibrio perfecto entre velocidad y comodidad para gran fondo.",
    features: ["Compound SmartEVO Racing", "TechBELT anticorte", "700x28c", "Velocidad + comodidad", "Ideal gran fondo"]
  },
  {
    id: "P026", brand: "PIRELLI", category: "Llantas",
    name: "PIRELLI P Zero Race TLR RS 700x28",
    code: "8019227466119", price: 119, stock: 2,
    img: null,
    description: "Llanta tubeless ready de competición. Sin cámara de aire. Menor presión = más tracción y menos pinchazos. La evolución del P Zero para el máximo rendimiento.",
    features: ["Tubeless Ready", "Sin cámara de aire", "Mayor tracción", "Menos pinchazos", "700x28c competición"]
  },
  {
    id: "P027", brand: "PIRELLI", category: "Llantas",
    name: "PIRELLI Scorpion Sport XC M 29x2.4",
    code: "8019227419771", price: 69, stock: 2,
    img: null,
    description: "Llanta MTB XC/Trail con compound ProWall. Carcasa resistente para alta velocidad en terreno variado. 29' x 2.4' para traileras amplias.",
    features: ["Compound ProWall", "MTB XC/Trail", "29\" x 2.4\"", "Alta velocidad", "Terreno variado"]
  },
  {
    id: "P028", brand: "HAMMER", category: "Nutrición",
    name: "Hammer Gel Apple Cinnamon",
    code: "602059958013", price: 2.60, stock: 0,
    img: null,
    description: "Gel energético 26g CHO. Sin colores ni saborizantes artificiales. Fácil digestión. Con aminoácidos de cadena ramificada (BCAA). Ideal para ciclistas con estómago sensible.",
    features: ["26g CHO", "Sabor Manzana-Canela", "BCAA incluidos", "Sin artificiales", "Fácil digestión"]
  },
  {
    id: "P029", brand: "HAMMER", category: "Nutrición",
    name: "Hammer Gel Banana",
    code: "602059954015", price: 2.60, stock: 0,
    img: null,
    description: "Gel 26g CHO sabor plátano. Sin HFCS (jarabe de maíz de alta fructosa). Con aminoácidos de cadena ramificada para reducir la fatiga muscular.",
    features: ["26g CHO", "Sabor Banana", "Sin HFCS", "BCAA para fatiga", "Natural"]
  },
  {
    id: "P030", brand: "HAMMER", category: "Nutrición",
    name: "Hammer Gel Tropical",
    code: "602059959010", price: 2.60, stock: 2,
    img: null,
    description: "Gel 26g CHO sabor tropical. Textura suave y fácil de tomar. Aminoácidos BCAA incluidos para menor fatiga muscular.",
    features: ["26g CHO", "Sabor Tropical", "BCAA incluidos", "Textura suave", "Fácil digestión"]
  },
  {
    id: "P031", brand: "HAMMER", category: "Nutrición",
    name: "Hammer Endurolytes Fizz Cola",
    code: "602059020512", price: 9, stock: 8,
    img: null,
    description: "Tabletas efervescentes de electrolitos completos (Na, K, Mg, Ca, Cl) + cafeína. Repone sales perdidas en rodajes largos con calor.",
    features: ["Electrolitos completos: Na, K, Mg, Ca, Cl", "Cola + cafeína", "Efervescente", "Para calor y rodajes largos", "Hidratación óptima"]
  },
  {
    id: "P032", brand: "HAMMER", category: "Nutrición",
    name: "Hammer Endurolytes Fizz Lemon Lime",
    code: "602059132994", price: 9, stock: 1,
    img: null,
    description: "Tabletas efervescentes de electrolitos sabor Lemon Lime. Fórmula completa de sales para hidratación óptima en climas cálidos.",
    features: ["Electrolitos completos", "Sabor Limón", "Efervescente", "Para climas cálidos", "Sin cafeína"]
  },
  {
    id: "P033", brand: "SKRATCH", category: "Nutrición",
    name: "SKRATCH Energy Chews Sour Cherry",
    code: "858690007744", price: 3.90, stock: 1,
    img: null,
    description: "Gomitas energéticas 23g CHO sabor Sour Cherry. Para quienes prefieren masticar en lugar de geles. Con electrolitos incluidos.",
    features: ["23g CHO", "Sabor Sour Cherry", "Gomitas masticables", "Electrolitos incluidos", "Alternativa al gel"]
  },
  {
    id: "P034", brand: "THUMBS UP", category: "Mantenimiento",
    name: "THUMBS UP Parches M",
    code: "YP3208(M48)", price: 5, stock: 2,
    img: null,
    description: "Parches de reparación talla M. Pack de 48 unidades. Vulcanizados en frío de alta adherencia. Compatible con todos los tipos de cámara.",
    features: ["Pack 48 unidades", "Talla M", "Vulcanizado en frío", "Alta adherencia", "Universal"]
  },
  {
    id: "P035", brand: "THUMBS UP", category: "Mantenimiento",
    name: "THUMBS UP Parches L",
    code: "", price: 5, stock: 1,
    img: null,
    description: "Parches de reparación talla L. Para pinchazos grandes o cortes. Vulcanizados en frío de alta adherencia.",
    features: ["Talla L", "Para pinchazos grandes", "Vulcanizado en frío", "Alta adherencia", "Universal"]
  },
  {
    id: "P036", brand: "VITTORIA", category: "Tubos",
    name: "VITTORIA Tubo 700 x 20/28c 80mm",
    code: "8022530009515", price: 10, stock: 2,
    img: null,
    description: "Cámara de aire italiana premium. Válvula Presta 80mm de longitud. Butilo de alta calidad. Compatible con llantas 700c de 20 a 28mm. Excelente retención de presión.",
    features: ["Butilo premium italiano", "Válvula Presta 80mm", "700c (20-28mm)", "Excelente retención de presión", "Calidad italiana"]
  },
  {
    id: "P037", brand: "CHAOYANG", category: "Tubos",
    name: "CHAOYANG Tubo 700 x 25/32c 60mm",
    code: "", price: 6, stock: 12,
    img: null,
    description: "Cámara de aire confiable y económica. Válvula Presta 60mm. Butilo estándar. Para entrenamiento y uso diario. Compatible 700x25-32c.",
    features: ["Butilo estándar", "Válvula Presta 60mm", "700c (25-32mm)", "Económica y confiable", "Para entrenamiento"]
  },
  {
    id: "P038", brand: "XCADEY", category: "Electrónica",
    name: "XCADEY Mini Inflador Eléctrico Capsule P40",
    code: "647581046241", price: 65, stock: 1,
    img: null,
    description: "Inflador eléctrico portátil hasta 40PSI. Recargable USB-C. Display digital de presión. Cabezal autosellante. Ideal para ruta y gravel.",
    features: ["Hasta 40 PSI", "Recargable USB-C", "Display digital", "Cabezal autosellante", "Compacto y portátil"]
  },
  {
    id: "P039", brand: "XCADEY", category: "Electrónica",
    name: "XCADEY Mini Inflador Eléctrico Capsule P60",
    code: "647581046258", price: 75, stock: 1,
    img: null,
    description: "Inflador eléctrico portátil hasta 60PSI. Recargable USB-C. Pantalla LED. Perfecto para MTB y ruta con mayor presión máxima.",
    features: ["Hasta 60 PSI", "Recargable USB-C", "Pantalla LED", "Para MTB y ruta", "Mayor presión que P40"]
  },
  {
    id: "P040", brand: "XCADEY", category: "Electrónica",
    name: "XCADEY Mini Inflador Eléctrico Capsule P80",
    code: "647581046265", price: 89, stock: 1,
    img: null,
    description: "Inflador eléctrico top de gama hasta 80PSI. Para cualquier tipo de bicicleta. Recargable, compacto y potente. La solución definitiva anti-pinchazos en ruta.",
    features: ["Hasta 80 PSI", "Recargable USB-C", "Para cualquier bicicleta", "Top de gama", "La solución definitiva"]
  }
];

// Helper functions
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

function getProductsByCategory(category) {
  if (!category || category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

function getCategories() {
  const cats = [...new Set(PRODUCTS.map(p => p.category))];
  return cats;
}

function getFeaturedProducts(n = 6) {
  return PRODUCTS.filter(p => p.stock > 0).slice(0, n);
}

function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}

function getBrandColor(brand) {
  return BRAND_COLORS[brand] || { from: '#333', to: '#111' };
}
