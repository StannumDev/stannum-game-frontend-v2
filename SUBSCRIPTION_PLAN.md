# Plan de Suscripciones — STANNUM Game
## v4 — Con 3 reviews + documentación oficial MP

---

## Contexto del Negocio

Se lanza un nuevo programa llamado **Trenno IA** con modelo de suscripción mensual.

### Mecánica clave: Price Grandfathering
- El programa lanza con los primeros 2 módulos a un precio base (ej: $30.000/mes)
- Con el tiempo se agregan más módulos y el precio para NUEVOS suscriptores sube
- Los suscriptores existentes conservan el precio al que se suscribieron ("precio congelado")
- Si un suscriptor cancela y quiere volver, paga el precio ACTUAL (el más alto)
- Incentiva quedarse suscripto y recompensa a los early adopters

### Reglas de negocio
- Solo suscripción mensual (sin planes trimestrales/anuales — inflación argentina)
- Cada programa es O compra única O suscripción (nunca ambos)
- Programas existentes (TIA, TMD, TIA Summer) no cambian — compra única
- Solo usuarios mayores de 18 años
- Sin free trial — programa demo gratuito con contenido limitado
- Sin cupones para suscripciones en el MVP
- Sin gift subscriptions en el MVP
- Botón de Arrepentimiento diferido para post-MVP

---

## 1. Arquitectura de Precios con MP

### Insight de la documentación oficial de MP

Al crear una suscripción con plan asociado, el `auto_recurring.transaction_amount` se puede
setear **POR SUSCRIPCIÓN**, no solo a nivel plan. Esto significa:

- UN solo `preapproval_plan` por programa (template organizacional)
- Cada suscripción individual tiene su propio `transaction_amount`
- El precio del usuario se congela al momento de suscribirse

### Implementación del grandfathering

```
Plan MP: trenno_ia (un solo plan, nunca se modifica el precio del plan)

Suscriptor A (marzo, precio vigente $30.000):
  → POST /preapproval { preapproval_plan_id, transaction_amount: 30000 }

Suscriptor B (junio, precio vigente $45.000):
  → POST /preapproval { preapproval_plan_id, transaction_amount: 45000 }

Ambos usan el MISMO plan, pero cada uno tiene su precio individual.
```

### Flujo de aumento de precio
1. Admin actualiza config: `currentMonthlyPriceARS: 45000`
2. Deploy
3. Suscriptores existentes: sin cambios (su `transaction_amount` ya está fijo en MP)
4. Nuevos suscriptores: se crean con `transaction_amount: 45000`
5. **No se necesita crear un nuevo plan en MP**

### Checkout: card_token_id obligatorio

La documentación de MP dice:
> "Una Suscripción con plan asociado siempre deberá ser creada con su `card_token_id`
> y en status `Authorized`."

Esto significa que **NO hay redirect a MP**. El checkout se hace en nuestro sitio:
1. Frontend recolecta datos de tarjeta usando **MP JS SDK** (tokenización)
2. Frontend envía `card_token_id` al backend
3. Backend crea la suscripción directamente en MP con status `authorized`
4. La suscripción se activa inmediatamente (sin redirect, sin init_point)

---

## 2. Modelo de Datos

### Backend: Program Config (`programPricing.js`)

```javascript
trenno_ia: {
  type: 'subscription',
  purchasable: true,
  name: 'Trenno IA',
  currentMonthlyPriceARS: 30000,
  mpPlanId: 'preapproval_plan_id_here', // UN solo plan, nunca cambia
  keysQuantity: 0,
}
```

### Backend: Centralizar `validPrograms`

Extraer la lista de programas válidos a una constante centralizada (actualmente hardcodeada
en 6+ archivos: lessonController, rankingController, instructionController, orderModel, userModel indexes):

```javascript
// src/config/programs.js
const VALID_PROGRAMS = ['tmd', 'tia', 'tia_summer', 'trenno_ia'];
const SUBSCRIPTION_PROGRAMS = ['trenno_ia'];
const PURCHASE_PROGRAMS = ['tmd', 'tia', 'tia_summer'];
```

### Backend: User Program Schema (`userModel.js`)

Extender el `programSchema` existente con:

```javascript
// Campos nuevos
subscription: {
  status: {
    type: String,
    enum: ['pending', 'active', 'paused', 'cancelled', 'expired', null],
    default: null
  },
  mpSubscriptionId: { type: String, default: null },
  priceARS: { type: Number, default: null },
  currentPeriodEnd: { type: Date, default: null },
  subscribedAt: { type: Date, default: null },       // fecha de PRIMERA suscripción (nunca cambia)
  cancelledAt: { type: Date, default: null },
  lastPaymentAt: { type: Date, default: null },
  lastWebhookAt: { type: Date, default: null },
  pendingExpiresAt: { type: Date, default: null },   // para recovery de checkout crasheado
  previousSubscriptionIds: [String],                  // IDs de suscripciones anteriores (para webhooks tardíos)
},

// Campo denormalizado para queries de Mongo (rankings, etc.)
hasAccessFlag: { type: Boolean, default: false },

// acquiredAt: se setea en la primera suscripción (o compra), nunca se cambia
```

**`hasAccessFlag`**: campo denormalizado que se actualiza cada vez que cambia el estado
de la suscripción o de `isPurchased`. Permite hacer queries de Mongo sin replicar la
lógica de `hasAccess()` en cada query.

### Nueva colección: `SubscriptionPayment`

```javascript
{
  userId: ObjectId,
  programId: String,
  mpPaymentId: String,
  mpSubscriptionId: String,
  amount: Number,
  currency: 'ARS',
  status: 'approved' | 'rejected' | 'pending' | 'refunded',
  retryAttempt: Number,
  createdAt: Date,
  updatedAt: Date,
}
```

### Nueva colección: `SubscriptionAuditLog`

Para historial y auditoría legal de cada cambio de estado:

```javascript
{
  userId: ObjectId,
  programId: String,
  mpSubscriptionId: String,
  previousStatus: String,
  newStatus: String,
  priceARS: Number,
  trigger: 'user' | 'webhook' | 'reconciliation' | 'system' | 'public_cancel',
  metadata: Object,      // datos extra según el trigger
  createdAt: Date,
}
```

### Nueva colección: `CancelToken`

Para el Botón de Baja público:

```javascript
{
  token: String,          // token opaco (crypto.randomBytes, no JWT)
  userId: ObjectId,
  programId: String,
  used: { type: Boolean, default: false },
  createdAt: Date,
  expiresAt: Date,        // 24hs
}
```

### Frontend: Interfaces

```typescript
export interface Program {
  // ... campos existentes ...
  type: 'purchase' | 'subscription';
  currentMonthlyPriceARS?: number;
}

export interface UserSubscription {
  status: 'pending' | 'active' | 'paused' | 'cancelled' | 'expired' | null;
  priceARS: number | null;
  currentPeriodEnd: string | null;
  subscribedAt: string | null;
  cancelledAt: string | null;
}

export interface UserProgram {
  // ... campos existentes ...
  subscription?: UserSubscription;
  hasAccessFlag?: boolean;
}
```

---

## 3. Funciones de Acceso (Core)

### `hasAccess(userProgram)` — ¿Puede acceder al contenido Y ganar rewards?

```javascript
function hasAccess(userProgram) {
  // Compra única = acceso permanente
  if (userProgram.isPurchased) return true;

  const sub = userProgram.subscription;
  if (!sub) return false;

  // Suscripción activa = acceso
  if (sub.status === 'active') return true;

  // Suscripción pausada/cancelada/expired pero período pagado no venció = acceso
  if (['paused', 'cancelled', 'expired'].includes(sub.status)) {
    if (sub.currentPeriodEnd && sub.currentPeriodEnd > new Date()) return true;
  }

  return false;
}
```

**Nota:** NO hay grace period de 72hs separado. Si tiene acceso, puede ganar rewards.
Simplifica la UX (el usuario no ve videos sin poder ganar XP). Se eliminó `canEarnRewards()`
como función separada.

### `hasProgram(userProgram)` — ¿Participa en este programa? (para rankings)

```javascript
function hasProgram(userProgram) {
  return hasAccess(userProgram);
  // Si expiró, sale del ranking de programa pero se queda en el global
}
```

### Actualizar `hasAccessFlag` (denormalizado para Mongo queries)

```javascript
async function updateHasAccessFlag(user, programId) {
  const newFlag = hasAccess(user.programs[programId]);
  if (user.programs[programId].hasAccessFlag !== newFlag) {
    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { [`programs.${programId}.hasAccessFlag`]: newFlag } }
    );
  }
}
```

Se llama después de cada cambio de estado: webhook, reconciliación, cancelación, creación.

---

## 4. Refactor de `isPurchased` — Mapa completo

### Backend (20+ lugares)

| Archivo | Líneas | Uso actual | Reemplazar con |
|---------|--------|-----------|----------------|
| `lessonController.js` | 22, 98 | Gating de lecciones | `hasAccess()` |
| `instructionController.js` | 49, 96, 143, 203 | Gating de instrucciones | `hasAccess()` |
| `chestController.js` | 22 | Gating de cofres | `hasAccess()` |
| `rankingController.js` | 10-14, 41-43 | Ranking global `$or` query | Usar `hasAccessFlag` en query Mongo |
| `rankingController.js` | 123 | Ranking por programa | Usar `hasAccessFlag` en query Mongo |
| `achievementsConfig.js` | 10, 239, 291 | Condiciones de achievements | `hasAccess()` |
| `userController.js` | 62-63 | Datos del usuario | `hasAccess()` |
| `streakService.js` | applyShieldIfNeeded | Streak diario | Congelar si `!hasAnyAccess()` |
| Todos los `validPrograms` hardcodeados | 6+ archivos | Lista de programas | Importar de `config/programs.js` |

### Backend: Ranking queries refactorizadas

```javascript
// ANTES:
const users = await User.find({
  $or: [
    { "programs.tmd.isPurchased": true },
    { "programs.tia.isPurchased": true },
    { "programs.tia_summer.isPurchased": true }
  ]
});

// DESPUÉS:
const VALID_PROGRAMS = require('../config/programs').VALID_PROGRAMS;
const orConditions = VALID_PROGRAMS.map(p => ({
  [`programs.${p}.hasAccessFlag`]: true
}));
const users = await User.find({ $or: orConditions });
```

### Backend: Indexes nuevos

```javascript
// Agregar index para trenno_ia
userSchema.index({
  'programs.trenno_ia.hasAccessFlag': 1,
  'programs.trenno_ia.subscription.status': 1,
  status: 1,
  'level.experienceTotal': -1
});
```

### Frontend (9+ archivos)

| Componente | Cambio |
|-----------|--------|
| `CheckoutForm.tsx` | Verificar `hasAccess` + ocultar gift para type=subscription |
| `ProgramPurchasePanel.tsx` | Mostrar estado de suscripción, ocultar gift |
| `StoreCard.tsx` | Badge diferente para suscripción activa vs compra |
| `LibrarySectionsLayout.tsx` | Usar `hasAccessFlag` o `hasAccess` helper |
| `LibraryCard.tsx` | Badge suscripción, mostrar fecha de expiración |
| `ProgramDetail.tsx` | Texto y CTA diferente para suscripción |
| `GiftOptions.tsx` | Ocultar completamente para programs type=subscription |

### MongoDB Migration Script

```javascript
// scripts/migration-add-trenno-ia.js
// Ejecutar al deployar
db.users.updateMany(
  { 'programs.trenno_ia': { $exists: false } },
  {
    $set: {
      'programs.trenno_ia': {
        isPurchased: false,
        totalXp: 0,
        instructions: [],
        lessonsCompleted: [],
        chestsOpened: [],
        coinsRewardedModules: [],
        coinsRewardedProgram: false,
        subscription: {
          status: null,
          mpSubscriptionId: null,
          priceARS: null,
          currentPeriodEnd: null,
          subscribedAt: null,
          cancelledAt: null,
          lastPaymentAt: null,
          lastWebhookAt: null,
          pendingExpiresAt: null,
          previousSubscriptionIds: [],
        },
        hasAccessFlag: false,
      }
    }
  }
);
```

---

## 5. Integración Mercado Pago

### Setup inicial (una vez)

Crear plan en MP usando script admin:

```javascript
// scripts/createMpPlan.js <programId> <priceARS>
// Ejemplo: node scripts/createMpPlan.js trenno_ia 30000
//
// POST /preapproval_plan {
//   reason: "Trenno IA — Suscripción mensual",
//   auto_recurring: {
//     frequency: 1,
//     frequency_type: "months",
//     transaction_amount: 30000,  // precio base del plan
//     currency_id: "ARS"
//   },
//   back_url: "https://stannumgame.com/dashboard/subscriptions"
// }
//
// Output: Plan ID para guardar en programPricing.js
```

### Endpoints nuevos

```
POST   /subscription/create               → Crear suscripción (requiere card_token_id)
POST   /subscription/cancel               → Cancelar suscripción del usuario logueado
POST   /subscription/webhook              → Recibir webhooks de MP
GET    /subscription/status/:programId    → Estado de suscripción del usuario
GET    /subscription/payments/:programId  → Historial de pagos
POST   /subscription/public-cancel-request → Solicitar link de cancelación por email
POST   /subscription/public-cancel-confirm → Confirmar cancelación con token
```

### Flujo de creación de suscripción

```
1. Frontend: usuario completa formulario de tarjeta (MP JS SDK)
2. MP JS SDK: tokeniza tarjeta → devuelve card_token_id
3. Frontend: POST /subscription/create { programId, cardTokenId }
4. Backend:
   a. Verificar programa es type: 'subscription' y purchasable: true
   b. Verificar no tiene suscripción activa para este programa
   c. Verificar no tiene isPurchased: true para este programa
   d. Si tiene un pending no expirado: retornar error "ya hay una suscripción en proceso"
   e. Si tiene un pending expirado: limpiar el pending
   f. Crear preapproval en MP:
      POST /preapproval {
        preapproval_plan_id: config.mpPlanId,
        payer_email: user.email,
        card_token_id: cardTokenId,                      // ← REQUERIDO con plan
        external_reference: `${userId}_${programId}`,
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: config.currentMonthlyPriceARS,  // ← PRECIO CONGELADO
          currency_id: "ARS"
        },
        back_url: backUrl,
        status: "authorized"                             // ← REQUERIDO con plan
      }
   g. Guardar en el usuario:
      subscription.mpSubscriptionId = preapproval.id
      subscription.priceARS = config.currentMonthlyPriceARS
      subscription.status = 'active'       // activa inmediatamente (no pending)
      subscription.subscribedAt = now      // solo si es primera vez
      subscription.lastWebhookAt = now
      acquiredAt = now                     // solo si no existía
      hasAccessFlag = true
   h. Crear entrada en SubscriptionAuditLog
   i. Retornar éxito al frontend
5. Frontend: mostrar "¡Suscripción activada!" sin necesidad de polling
6. MP: ~1hr después, realiza el primer cobro
7. Webhook subscription_authorized_payment → registrar pago, actualizar currentPeriodEnd
```

**Nota:** Como el status es `authorized` desde el principio, NO hay gap de "pending".
El usuario tiene acceso inmediato después de crear la suscripción. El primer cobro
ocurre ~1hr después automáticamente por MP.

### Webhooks

3 topics, procesamiento async:

**`subscription_preapproval`** (cambios de estado):
```
Recibir → Responder 200 → Procesar async:
1. Verificar HMAC x-signature
2. Buscar usuario por mpSubscriptionId (actual o en previousSubscriptionIds)
3. Si no se encuentra: loguear warning, ignorar (webhook de suscripción vieja ya limpiada)
4. GET /preapproval/{id} para obtener estado actual en MP
5. Determinar transición válida según máquina de estados
6. Actualizar DB con findOneAndUpdate condicional
7. Actualizar hasAccessFlag
8. Crear entrada en SubscriptionAuditLog
9. Enviar emails según transición
```

**`subscription_authorized_payment`** (cobros recurrentes):
```
Recibir → Responder 200 → Procesar async:
1. Verificar HMAC
2. GET /authorized_payments/{id}
3. Si status == 'processed':
   - Crear SubscriptionPayment
   - Actualizar currentPeriodEnd += 1 mes
   - Actualizar lastPaymentAt, lastWebhookAt
4. Si status == 'recycling':
   - Crear SubscriptionPayment con status 'rejected'
   - Enviar email de cobro rechazado (escalar según retryAttempt)
5. Si status == 'rejected' (definitivo):
   - Actualizar subscription.status = 'paused'
   - Actualizar hasAccessFlag
   - Enviar email "tu pago no pudo procesarse"
   - Crear SubscriptionAuditLog
```

**`subscription_preapproval_plan`**: loguear, no acción.

### Máquina de estados

```
null → active       (creación directa con card_token_id + status authorized)
active → paused     (MP no puede cobrar, o usuario pausa desde app MP)
active → cancelled  (usuario cancela desde nuestra plataforma o app MP)
paused → active     (pago se resuelve, o usuario reactiva desde MP)
paused → cancelled  (3 rechazos consecutivos en MP, o usuario cancela)
cancelled → expired (currentPeriodEnd pasa, reconciliación o cron lo marca)
expired → active    (re-suscripción: nuevo mpSubscriptionId, precio actual)
```

**Nunca se borra**: `cancelled` pasa a `expired` (no a `null`). Toda la data
(subscribedAt, cancelledAt, priceARS) se conserva para auditoría.

**Re-suscripción** (desde `expired`):
1. Mover `mpSubscriptionId` actual a `previousSubscriptionIds`
2. Crear nueva suscripción en MP con precio actual
3. Actualizar `mpSubscriptionId`, `priceARS`, `status: 'active'`
4. `subscribedAt` NO se cambia (es la fecha original)

---

## 6. Frontend

### Checkout de suscripción (MP JS SDK para tokenización)

```
Página: /dashboard/subscription/checkout/[programId]

┌──────────────────────────────────────────────────┐
│  Trenno IA — Suscripción mensual                 │
│                                                  │
│  ┌────────────────────────────┐                  │
│  │  Resumen                   │                  │
│  │  Programa: Trenno IA       │                  │
│  │  Plan: Mensual             │                  │
│  │  Precio: $30.000 ARS/mes  │                  │
│  │  Primer cobro: Hoy         │                  │
│  │  Renovación: Automática    │                  │
│  └────────────────────────────┘                  │
│                                                  │
│  Datos de la tarjeta                             │
│  ┌────────────────────────────┐                  │
│  │ Número de tarjeta          │ ← MP JS SDK     │
│  │ Nombre del titular         │   SecureFields   │
│  │ Vencimiento    CVV         │                  │
│  └────────────────────────────┘                  │
│                                                  │
│  ☑ Acepto los Términos y Condiciones             │
│                                                  │
│  Al confirmar, autorizás un cobro recurrente     │
│  de $30.000/mes. Podés cancelar en cualquier     │
│  momento desde Mis Suscripciones.                │
│                                                  │
│  [Suscribirme — $30.000/mes]                     │
│                                                  │
│  🔒 Pago seguro — tus datos de tarjeta son       │
│  procesados por Mercado Pago                     │
└──────────────────────────────────────────────────┘
```

**Flujo:**
1. MP JS SDK renderiza SecureFields (inputs de tarjeta seguros)
2. Usuario completa datos y clickea "Suscribirme"
3. MP JS SDK tokeniza → `card_token_id`
4. POST /subscription/create con `card_token_id`
5. Respuesta inmediata: éxito o error
6. Si éxito → página de confirmación (sin polling)
7. Si error → mostrar mensaje y permitir reintentar

### Resultado de suscripción

```
Página: /dashboard/subscription/result?programId=trenno_ia

✅ ¡Suscripción activada!
"Tu suscripción a Trenno IA está activa."
"Tu precio: $30.000/mes (congelado)"
[Comenzar entrenamiento]

Si hubo error:
❌ No pudimos procesar tu suscripción
"[Mensaje de error de MP]"
[Reintentar] [Volver a la tienda]
```

### Tienda — Programa de suscripción

```
Tarjeta no suscripto:          Tarjeta suscripto:
┌──────────────────────┐      ┌──────────────────────┐
│  [Background]        │      │  Badge: Suscripción  │
│  [Logo]              │      │         activa        │
│  Trenno IA           │      │  [Logo]              │
│  $30.000/mes         │      │  Tu precio: $30.000  │
│  [Suscribirme]       │      │  [Ir al programa]    │
└──────────────────────┘      └──────────────────────┘
```

**Detalle del programa (ProgramDetail):**
- Precio: "$30.000/mes"
- Features: "N módulos disponibles", "Contenido nuevo cada mes", "Precio congelado"
- Texto legal: "Suscripción mensual. Se renueva automáticamente. Cancelá cuando quieras."
- NO mostrar opción de regalo
- NO mostrar cupón

### Mis Suscripciones (nueva sección)

**Sidebar:** "Suscripciones" entre "Tienda" y "Mi perfil"
Visible si cualquier programa tiene `subscription.status !== null`.

```
Página: /dashboard/subscriptions

┌─────────────────────────────────────────────────┐
│  Mis Suscripciones                              │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │  🟢 Trenno IA          Estado: Activa     │  │
│  │  Tu precio: $30.000/mes (congelado)       │  │
│  │  Suscripto desde: 15 Mar 2026            │  │
│  │  Próximo cobro: 15 Abr 2026              │  │
│  │                                           │  │
│  │  [Cancelar suscripción]                   │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  Historial de pagos                             │
│  ┌───────────────────────────────────────────┐  │
│  │ 15 Mar 2026  $30.000  Aprobado ✅        │  │
│  │ (paginado)                                │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘

Estado "Requiere acción" (amarillo):
  ⚠️ Hay un problema con tu pago
  "Mercado Pago está reintentando el cobro."
  "Revisá tu medio de pago en Mercado Pago."

Estado "Cancelada" (en período pagado):
  Acceso hasta 15 Abr 2026
  "Después perderás acceso al contenido."
  "Re-suscripción: $45.000/mes (precio actual)"
  [Re-suscribirme al precio actual]

Estado "Expirada":
  "Tu suscripción expiró. Tu progreso está guardado."
  "Precio actual: $45.000/mes"
  [Re-suscribirme]
```

### Flujo de cancelación (3 clics)

```
Clic 1: Botón "Cancelar suscripción"

Clic 2: Modal:
  ┌──────────────────────────────────────┐
  │  ¿Cancelar suscripción?             │
  │                                      │
  │  Tu acceso a Trenno IA continuará   │
  │  hasta el 15 Abr 2026.             │
  │                                      │
  │  ⚠ Si te re-suscribís más tarde,    │
  │  el precio puede ser mayor al que   │
  │  pagás actualmente ($30.000/mes).   │
  │                                      │
  │  [Cancelar suscripción]  [Volver]   │
  └──────────────────────────────────────┘

Clic 3: Confirmado
  → PUT /preapproval/{id} status: cancelled
  → Toast: "Suscripción cancelada"
  → Email en <24hs
  → UI: "Cancelada — Acceso hasta [fecha]"
  → SubscriptionAuditLog entry
```

### Estados visuales (3 estados para el usuario)

| Estado interno | Visible | Color | Acceso |
|---|---|---|---|
| active | "Suscripción activa" | Verde | Sí |
| paused | "Requiere acción" + CTA | Amarillo | Sí (en período) |
| cancelled (en período) | "Acceso hasta [fecha]" | Amarillo | Sí |
| expired | "Expirada" + CTA re-suscribir | Gris | No |

### Biblioteca (Library)

```
Compra única:         "Acceso de por vida" (verde)
Suscripción activa:   "Suscripción activa" (verde)
Cancelada en período: "Acceso hasta [fecha]" (amarillo)
Expirada:             NO aparece en biblioteca (sí en Mis Suscripciones)
```

### "Modo expirado" (ver progreso, no interactuar)

Cuando el usuario entra al programa expirado desde Mis Suscripciones:
- VE: lecciones completadas, notas de instrucciones, XP acumulado
- NO puede: reproducir videos, iniciar/entregar instrucciones, abrir cofres
- Elementos interactivos griseados con overlay: "Re-suscribite para continuar"

---

## 7. Progreso del Usuario al Expirar

| Dato | Comportamiento |
|---|---|
| lessonsCompleted | Se CONSERVA |
| instructions (entregas, notas) | Se CONSERVAN |
| totalXp | Se CONSERVA |
| chestsOpened | Se CONSERVAN |
| Tins ganados | Se CONSERVAN (son del usuario) |
| Covers comprados con Tins | Se CONSERVAN |
| lastWatchedLesson | Se CONSERVA (resume si re-suscribe) |
| Acceso a contenido | Se BLOQUEA |
| Ranking del programa | SALE del ranking del programa |
| Ranking global | Se MANTIENE |
| Streak diario | Se CONGELA (no avanza ni se rompe) |

---

## 8. Seguridad de Contenido — Mux Playback IDs

### Problema
Los Mux playback IDs están en `src/config/programs/index.ts` (bundle estático).
Un usuario expirado con cache puede reproducir videos.

### Solución
Mover playback IDs al backend:

```
GET /lesson/playback/:programId/:lessonId
→ Verificar hasAccess(user.programs[programId])
→ Si acceso: { playbackId: 'xxx' }
→ Si no: 403
```

Frontend solicita playbackId al montar el video player.

---

## 9. Streak — Congelamiento

```javascript
// En streakService.js, antes de evaluar streak:
const hasAnyAccess = VALID_PROGRAMS.some(programId => {
  return user.programs[programId] && hasAccess(user.programs[programId]);
});

if (!hasAnyAccess) {
  // No evaluar streak, no consumir shields, no romper streak
  return;
}
```

---

## 10. Emails

### Servicio de email: NO usar Gmail SMTP directamente

Gmail tiene límite de 500 emails/día. Con 500+ suscriptores, los emails de
pre-renovación solos pueden saturar el límite (todos se suscriben cerca del
mismo día = todos renuevan el mismo día).

**Solución:** Implementar una cola de emails con rate limiting:
- Opción A: Servicio externo (SendGrid/Resend/AWS SES) — recomendado para escala
- Opción B: Cola interna con tope de 10 emails/minuto si se queda con Gmail

### Emails necesarios (6)

1. **Suscripción activada** — trigger: status → active
2. **Cobro exitoso mensual** — trigger: payment processed
3. **Cobro rechazado** — trigger: recycling (escalar mensajes según intento)
4. **Aviso pre-renovación** — cron: 3 días antes de currentPeriodEnd (requerido por ley)
5. **Confirmación de cancelación** — trigger: cancelación (<24hs, requerido por ley)
6. **Suscripción expirada** — trigger: status → expired

Todos los emails de cobro/renovación incluyen link de cancelación (para Botón de Baja).

### Cron de pre-renovación

Ejecutar diariamente. Buscar suscripciones con `currentPeriodEnd` entre +2 y +4 días.
**Distribuir envíos**: no mandar todos juntos, espaciar con cola.

---

## 11. Botón de Baja Público

### Página: `/cancelar-suscripcion` (sin login)

```
Paso 1: Entrar a la página
  "Cancelar suscripción"
  "Ingresá el email asociado a tu cuenta"
  [input email]
  [Enviar link de cancelación]

Paso 2: Sistema envía email con link(s)
  - Si el usuario tiene 1 suscripción activa: 1 link
  - Si tiene múltiples: lista de suscripciones con un link cada una
  "Te enviamos un link de cancelación a [email]"

Paso 3: Usuario clickea link → página de confirmación
  "¿Confirmar cancelación de Trenno IA?"
  "Tu acceso continuará hasta [fecha]"
  [Confirmar cancelación] ← 3er clic

→ Backend: verificar CancelToken (no usado, no expirado)
→ Cancelar suscripción en MP
→ Actualizar DB
→ Marcar token como usado
→ Email confirmación <24hs
→ SubscriptionAuditLog entry con trigger: 'public_cancel'
```

### Implementación del token

Usar token opaco (no JWT) almacenado en colección `CancelToken`:
- `crypto.randomBytes(32).toString('hex')`
- Single-use: marcar `used: true` después de confirmar
- Expiración: 24hs
- URL: `/cancelar-suscripcion/confirmar?token=xxx`

---

## 12. Reconciliación

### Modo "hot" — cada 6 horas
- Query: suscripciones con `currentPeriodEnd` dentro de 48hs O status `paused`
- Para cada una: `GET /preapproval/{mpSubscriptionId}`
- Comparar estado MP vs local → actualizar si difiere
- Actualizar hasAccessFlag
- Rate limit: 10 req/s máx

### Modo "cold" — 1 vez al día (4am)
- Query: TODAS las suscripciones con status no null y status !== 'expired'
- Detectar stuck (activo local pero cancelado en MP)
- Rate limit: 5 req/s
- También buscar en previousSubscriptionIds

### Cron de expiración
- Cada hora: buscar suscripciones con status `cancelled` y `currentPeriodEnd < now`
- Marcar como `expired`
- Actualizar hasAccessFlag = false
- Enviar email de expiración

### Alertas
- Sin webhooks en 24hs → alerta
- Cold mode corrige > 5 suscripciones → alerta
- Cobro fallido sin notificación al usuario → alerta

---

## 13. Monitoreo

### Endpoint de salud (admin)
```
GET /api/health/subscriptions
{
  activeSubscriptions: 150,
  pausedSubscriptions: 3,
  cancelledInPeriod: 8,
  expired: 42,
  expiringIn24h: 12,
  lastWebhookReceivedAt: '2026-04-15T10:30:00Z',
  reconciledLastRun: { fixed: 0, checked: 150 },
}
```

### Admin endpoints
```
POST /admin/subscription/:userId/:programId/cancel    → Cancelar manualmente
POST /admin/subscription/:userId/:programId/reactivate → Reactivar
GET  /admin/subscription/:userId/:programId/history    → Ver historial completo
```

---

## 14. Programa Demo Gratuito

### Concepto
Programa separado `demo_trenno` con contenido limitado de Trenno IA:
- 2-3 lecciones del Módulo 1 (mismos IDs prefijados con DEMO_ para mapeo)
- 1 instrucción
- Funciona como programa completo pero recortado

### Lesson ID Mapping
```
Demo:     DEMO_TRENNOIAM01L01  →  Full: TRENNOIAM01L01
Demo:     DEMO_TRENNOIAM01L02  →  Full: TRENNOIAM01L02
Demo:     DEMO_TRENNOIAI01     →  Full: TRENNOIAI01
```

### Reglas de gamificación
- XP: se gana normalmente en el demo
- Tins: se ganan normalmente
- Achievements: solo "primera lección completada"
- Rankings: EXCLUIDO del ranking (programa y global)
- Streak: CUENTA para el streak

### Transición demo → suscripción

Cuando el usuario se suscribe a Trenno IA:

```javascript
async function transferDemoProgress(user) {
  const demo = user.programs.demo_trenno;
  const full = user.programs.trenno_ia;

  // Mapear lecciones completadas
  const LESSON_MAP = { 'DEMO_TRENNOIAM01L01': 'TRENNOIAM01L01', ... };
  for (const lesson of demo.lessonsCompleted) {
    const mappedId = LESSON_MAP[lesson.lessonId];
    if (mappedId && !full.lessonsCompleted.find(l => l.lessonId === mappedId)) {
      full.lessonsCompleted.push({ lessonId: mappedId, viewedAt: lesson.viewedAt });
    }
  }

  // Transferir XP al programa (NO re-sumar a experienceTotal global)
  full.totalXp += demo.totalXp;

  // Transferir instrucciones (conservar URLs de S3 tal cual)
  // Los files en S3 siguen siendo accesibles con sus URLs originales
  for (const instruction of demo.instructions) {
    full.instructions.push(instruction);
  }

  // Marcar demo como completado
  demo.isPurchased = false; // revocar acceso al demo
  demo.hasAccessFlag = false;
}
```

### CTA al terminar el demo
```
"¡Completaste el demo de Trenno IA!"
"Suscribite para acceder a todos los módulos."
"$30.000/mes — [Suscribirme ahora]"
```

---

## 15. Escalabilidad

### Agregar nuevo programa con suscripción
1. Crear contenido (lecciones, instrucciones, etc.)
2. Agregar en `config/programs.js` (VALID_PROGRAMS, SUBSCRIPTION_PROGRAMS)
3. Agregar campo en `userModel.js` → `programs.nuevo_programa: programSchema`
4. Agregar config en `programPricing.js` con `type: 'subscription'`
5. Ejecutar migration script para documentos existentes
6. Crear `preapproval_plan` en MP via script admin
7. Agregar config en frontend `programs/index.ts`
8. Deploy

### Subir el precio
1. Actualizar `currentMonthlyPriceARS` en `programPricing.js`
2. Deploy
3. Suscriptores existentes: sin cambios (su amount está fijo en MP)
4. Nuevos suscriptores: se crean con el nuevo amount

### Agregar contenido al programa
1. Agregar lecciones/instrucciones/módulos al config
2. Deploy — suscriptores activos ven contenido nuevo automáticamente

---

## 16. Legal — Pre-lanzamiento

### Términos y Condiciones (página estática)
- Descripción del servicio
- Modelo de suscripción (cobro mensual automático)
- Política de price grandfathering
- Cómo cancelar (link directo a Mis Suscripciones + mención del Botón de Baja)
- Qué pasa con el progreso al cancelar
- Política de reembolsos (acceso hasta fin de período, sin reembolso proporcional)
- Solo mayores de 18 años

### Política de Privacidad (página estática)
- Datos recopilados
- Uso de datos
- Mercado Pago como procesador de pagos
- Derechos del usuario (AAIP)

### Textos en la UI
- Pre-checkout: "$X/mes. Se renueva automáticamente. Cancelá cuando quieras."
- Checkbox: "Acepto los Términos y Condiciones"
- Emails: link de cancelación en cada uno
- Mis Suscripciones: botón cancelar siempre visible

---

## 17. Fases de Implementación

### Fase 1: Foundation (2 semanas)
- Centralizar `validPrograms` en `config/programs.js`
- Crear funciones `hasAccess()`, `hasProgram()` en el backend
- Agregar `hasAccessFlag` al schema, setear `hasAccessFlag = isPurchased` para todos los usuarios existentes
- Refactorizar TODOS los usos de `isPurchased` en backend (20+ lugares)
- Refactorizar TODOS los usos en frontend (9+ archivos)
- Refactorizar ranking queries para usar `hasAccessFlag`
- Implementar congelamiento de streak
- Migration script para agregar `trenno_ia` a todos los usuarios existentes
- Tests unitarios para funciones de acceso

### Fase 2: Backend MP Integration (2 semanas)
- Script admin `createMpPlan.js`
- Integración MP JS SDK info (docs de tokenización)
- Endpoints: crear, cancelar, verificar, historial
- 3 webhook handlers con verificación HMAC + procesamiento async
- Máquina de estados con transiciones válidas
- Modelos: SubscriptionPayment, SubscriptionAuditLog, CancelToken
- Extensión del programSchema con campos de suscripción
- Admin endpoints (cancel, reactivate, history)
- Tests de la máquina de estados

### Fase 3: Frontend Subscription Flow (2 semanas)
- Integración MP JS SDK (SecureFields para tokenización de tarjeta)
- Configuración de Trenno IA como programa tipo suscripción
- Store: display de programa con precio mensual
- Checkout de suscripción con formulario de tarjeta embebido
- Página de resultado
- Sección "Mis Suscripciones" en sidebar + página
- Flujo de cancelación (3 clics)
- Badges en biblioteca
- "Modo expirado"
- Ocultar gift/cupón para programas de suscripción

### Fase 4: Content Security (1 semana)
- Mover Mux playback IDs al backend
- Endpoint autenticado `/lesson/playback/:programId/:lessonId`
- Actualizar video player en frontend

### Fase 5: Legal + Botón de Baja (1 semana)
- Página de Términos y Condiciones
- Página de Política de Privacidad
- Página pública `/cancelar-suscripcion`
- Implementación de CancelToken
- SubscriptionAuditLog integrado

### Fase 6: Emails (1 semana)
- Cola de emails con rate limiting (o migrar a SendGrid/Resend)
- 6 templates
- Cron de pre-renovación (distribuido)

### Fase 7: Reconciliation + Monitoring (1 semana)
- Cron hot (6hs) + cold (diario) + expiración (horario)
- Rate limiting para API de MP
- Endpoint de salud
- Alertas

### Fase 8: Programa Demo (1 semana)
- Config backend + frontend del programa demo_trenno
- Contenido limitado
- Lesson ID mapping
- Lógica de transferencia de progreso
- Excluir de rankings
- CTA de conversión

### Total estimado: ~12 semanas

---

## 18. Testing

### Unit tests
- `hasAccess()` con todas las combinaciones
- `hasProgram()` con todas las combinaciones
- Máquina de estados (transiciones válidas e inválidas)
- Precio congelado (config cambia, usuario conserva su precio)
- `updateHasAccessFlag()` consistencia

### Integration tests
- Crear suscripción → acceso inmediato → webhook de pago → currentPeriodEnd
- Cancelar → acceso durante período → expirar → sin acceso
- Cobro fallido → paused → email → resolución
- Re-suscripción → nuevo precio → previousSubscriptionIds
- Transferencia demo → programa completo (XP, lecciones, instrucciones)
- Reconciliación: simular desync

### MP Sandbox
- Crear plan (una vez)
- Tokenizar tarjeta con MP JS SDK
- Crear suscripción con card_token_id + status authorized
- Cancelar y verificar webhook
- NOTA: cobros recurrentes no son confiables en sandbox
  → Testing en producción con montos mínimos para primeros usuarios

---
