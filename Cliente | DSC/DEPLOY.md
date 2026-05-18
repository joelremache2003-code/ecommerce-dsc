# Guía de Deploy — Deutsche Cycling Spot

## Arquitectura final

```
Frontend (Vercel)          Backend (Railway)
dsc-ecommerce/             backend/
├── index.html             ├── server.js      ← webhook Twilio
├── catalogo.html          ├── bot.js         ← Claude API
├── producto.html          ├── db.js          ← PostgreSQL
├── checkout.html          ├── products-context.js
├── privacidad.html        └── package.json
├── css/ js/ img/
└── vercel.json
```

---

## PARTE 1 — Backend en Railway

### Requisitos previos
- Cuenta en [railway.app](https://railway.app) (plan Hobby ~$5/mes)
- Cuenta en [twilio.com](https://twilio.com)
- API key de Anthropic (Claude)

### Paso 1 — Crear proyecto en Railway

1. Ir a railway.app → **New Project**
2. **Deploy from GitHub repo** → conectar el repo del proyecto
3. Seleccionar la carpeta `backend/` como root directory:
   - En Railway: Settings → Root Directory → `backend`

### Paso 2 — Agregar PostgreSQL

1. En el proyecto Railway → **Add Service → Database → PostgreSQL**
2. Railway crea automáticamente la variable `DATABASE_URL`

### Paso 3 — Variables de entorno en Railway

En el proyecto Railway → Variables → agregar:

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
DSC_WHATSAPP_NUMBER=whatsapp:+593XXXXXXXXX   ← tu número real
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
ADMIN_SECRET=una_clave_secreta_para_ver_ordenes
```
> `DATABASE_URL` ya la agrega Railway automáticamente.

### Paso 4 — Deploy backend

Railway hace auto-deploy al hacer push al repo. Una vez desplegado:
- Verificar en logs que aparezca: `DSC Bot corriendo en puerto XXXX`
- Copiar la URL pública: `https://dsc-XXXXX.railway.app`

### Paso 5 — Verificar health check

```bash
curl https://dsc-XXXXX.railway.app/
# Respuesta esperada: {"status":"ok","service":"DSC WhatsApp Bot",...}
```

---

## PARTE 2 — Twilio WhatsApp

### Opción A: Sandbox de pruebas (gratis, para testing)

1. Twilio Console → Messaging → Try it out → Send a WhatsApp message
2. El sandbox usa el número `+1 415 523 8886`
3. Cada cliente debe enviar el código de activación primero (ej. `join silver-crane`)
4. Webhook URL: `https://dsc-XXXXX.railway.app/webhook/whatsapp`
   - Ir a: Twilio Console → Messaging → Settings → WhatsApp Sandbox Settings
   - En "When a message comes in": pegar la URL del webhook

### Opción B: Número de producción (recomendado)

1. Twilio Console → Phone Numbers → Buy a number (con capacidad WhatsApp)
2. Solicitar aprobación de WhatsApp Business (proceso de 1-3 días hábiles)
3. Una vez aprobado, configurar webhook igual que en Opción A
4. Actualizar `TWILIO_WHATSAPP_NUMBER` con el número comprado

### Actualizar número en el frontend

En `dsc-ecommerce/js/products.js`, línea 11:
```js
whatsappNumber: "+593XXXXXXXXX",  // ← poner el número real de DSC
```

---

## PARTE 3 — Frontend en Vercel

### Paso 1 — Conectar repositorio

1. Ir a [vercel.com](https://vercel.com) → New Project
2. Importar el repo → configurar:
   - **Root Directory**: `dsc-ecommerce`
   - Framework: **Other** (sitio estático)
   - Build command: *(vacío)*
   - Output directory: *(vacío / .)*

### Paso 2 — Deploy

```bash
# O desde terminal con Vercel CLI:
cd "dsc-ecommerce"
npx vercel --prod
```

### Paso 3 — Dominio personalizado (opcional)

En Vercel → Settings → Domains → agregar `deutschecyclingspot.com` o similar.

---

## PARTE 4 — Imágenes de productos sin foto

### Opción A: Script automático
```bash
cd scripts
node fetch-product-images.js
# Descarga imágenes de los CDNs oficiales de cada marca
# Las guarda en dsc-ecommerce/img/products/
```

### Opción B: Manual (para las que fallan)
Para cada producto sin imagen (P012-P040), buscar la foto oficial en:
- NeverSecond: neversecond.com/products
- Pirelli: pirelli.com/tires/bicycle
- Hammer: hammernutrition.com
- XCADEY: xcadey.com

Guardar como `dsc-ecommerce/img/products/<ID>.jpg` (ej. `P012.jpg`)

Luego actualizar `js/products.js`:
```js
{ id: "P012", ..., img: "img/products/P012.jpg", ... }
```

---

## PARTE 5 — Checklist final antes de publicar

### Frontend
- [ ] Actualizar `whatsappNumber` en `js/products.js` con el número real
- [ ] Actualizar `bankInfo` en `js/products.js` con datos reales del banco
- [ ] Agregar imágenes de productos faltantes (P012-P040)
- [ ] Probar carrito: agregar, modificar cantidad, ir a checkout
- [ ] Probar botón WhatsApp desde producto → verifica que abre el número correcto
- [ ] Probar en mobile (Safari iOS + Chrome Android)

### Backend
- [ ] Health check: `GET /` → 200 OK
- [ ] Enviar mensaje de prueba al WhatsApp → bot responde en <5 segundos
- [ ] Probar: "¿tienen llantas Pirelli?" → bot recomienda las disponibles
- [ ] Probar: "quiero pagar con tarjeta" → bot confirma que sí se puede
- [ ] Probar: producto agotado → bot NO lo recomienda (P018, P028, P029)
- [ ] Verificar que las órdenes se guardan en Railway DB

### Seguridad
- [ ] Archivo `.env` NO subido al repositorio (verificar `.gitignore`)
- [ ] Variables de entorno configuradas en Railway y Vercel
- [ ] Datos bancarios reales en `products.js` (no en variable de entorno pública)

---

## PARTE 6 — Higgsfield (contenido visual hero)

Para el hero y secciones lifestyle, usar [Higgsfield.ai](https://higgsfield.ai) para generar:
1. Video/animación de ciclista en ruta de montaña (para hero background)
2. Clip de grupo de ciclistas en pelotón (para sección lifestyle)

Una vez generados:
- Guardar como `dsc-ecommerce/img/hero-video.mp4`
- En `index.html`, reemplazar el `<img class="hero-img">` por:

```html
<video class="hero-img" autoplay muted loop playsinline>
  <source src="img/hero-video.mp4" type="video/mp4">
</video>
```

---

## URLs finales esperadas

| Servicio | URL |
|---------|-----|
| Frontend | `https://dsc-store.vercel.app` (o dominio propio) |
| Backend health | `https://dsc-XXXXX.railway.app/` |
| Webhook Twilio | `https://dsc-XXXXX.railway.app/webhook/whatsapp` |
| Ver órdenes | `GET /orders` con header `x-admin-secret: tu_clave` |
