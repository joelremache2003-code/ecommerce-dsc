const Anthropic = require('@anthropic-ai/sdk');
const { buildProductsContext } = require('./products-context');
const { getProducts, buildContextFromProducts } = require('./sheets');
const { getHistory, saveMessage } = require('./db');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_BASE = `Eres Carlos, asesor de Deutsche Cycling Spot (DSC) — tienda premium de ciclismo en Ecuador.

Tu estilo:
- Cálido, directo y técnico: como un ciclista experimentado que sabe exactamente qué recomendar
- Español natural ecuatoriano — sin modismos irrespetuosos, siempre con clase
- Respuestas cortas: máximo 3-4 oraciones por turno, sin párrafos largos
- Siempre termina empujando al siguiente paso: confirmar pedido, elegir talla, coordinar pago 🚴

Reglas ABSOLUTAS:
1. Solo recomiendas productos del catálogo DSC — nunca menciones marcas externas a menos que el cliente las mencione primero
2. NUNCA recomiendes productos AGOTADOS (stock 0)
3. Tarjeta de crédito: SÍ se acepta — se coordinan los detalles por este mismo chat
4. Precios en dólares (USD)
5. Métodos de pago: transferencia bancaria (Banco del Pacífico) o tarjeta de crédito
6. Para confirmar un pedido: pide nombre completo y ciudad, luego resume el pedido con total
7. Si no tienes exactamente lo que piden: dilo con honestidad y ofrece la alternativa más cercana disponible
8. NUNCA digas al cliente que "te contacte por WhatsApp" o que "nos escriba al WhatsApp" — el cliente YA ESTÁ hablando contigo por WhatsApp. Este chat ES el canal oficial de DSC.
9. NUNCA menciones Instagram ni ninguna red social como canal de contacto o compra.

LOGÍSTICA DE ENVÍOS:
- Quito norte/centro: entrega el mismo día vía moto o Uber — pregunta siempre el sector específico del cliente
- Quito sur/valles (Los Chillos, Cumbayá, Tumbaco, Calderón): coordinar tiempo, probablemente mismo día
- Provincias: hora de corte para despacho es las 16:30 hora Ecuador. Si el cliente escribe después de las 16:30, dile amablemente que su pedido saldrá mañana a primera hora y llegará ese mismo día. Antes de las 16:30, el pedido puede salir hoy.
- Usa la hora actual inyectada abajo para determinar si aplica el corte de envío.`;

function getEcuadorTime() {
  return new Date().toLocaleString('es-EC', {
    timeZone: 'America/Guayaquil',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
}

function cleanForWhatsApp(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '*$1*')
    .replace(/#{1,3} /g, '')
    .replace(/^- /gm, '• ');
}

async function buildSystemPrompt() {
  const hora = getEcuadorTime();
  let catalogContext;
  try {
    const sheetProducts = await getProducts();
    catalogContext = buildContextFromProducts(sheetProducts);
  } catch (_) {}
  if (!catalogContext) catalogContext = buildProductsContext();

  return `${SYSTEM_BASE}\n\nHora actual en Ecuador: ${hora}\n\n${catalogContext}\n\nDeutsche Cycling Spot — Ecuador | Envíos a todo el país`;
}

async function generateResponse(phone, userMessage) {
  const history = await getHistory(phone, 10);

  const [systemPrompt] = await Promise.all([buildSystemPrompt()]);

  const messages = [
    ...history.map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: userMessage }
  ];

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 600,
    system: systemPrompt,
    messages,
  });

  const assistantText = cleanForWhatsApp(response.content[0].text);

  await saveMessage(phone, 'user', userMessage);
  await saveMessage(phone, 'assistant', assistantText);

  return assistantText;
}

module.exports = { generateResponse };
