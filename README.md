# STANNUM Game - Frontend

**Plataforma educativa gamificada** construida con Next.js 16, React 19 y TypeScript. Interfaz de usuario moderna con gamificacion completa: XP, niveles, logros, daily streaks, rankings y comunidad.

Este es un **repositorio privado**.

## Que es STANNUM Game?

STANNUM Game es una plataforma educativa gamificada que combina contenido de alta calidad con mecanicas de juego para maximizar el engagement y la retencion del aprendizaje. Los estudiantes completan lecciones (videos), realizan instrucciones practicas calificadas por IA, ganan XP, suben de nivel, desbloquean logros y compiten en rankings.

## Quick Start

### Prerequisitos

- Node.js 18+
- Backend API corriendo (ver `stannum-game-backend-v2`)

### Instalacion

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Iniciar en desarrollo (usa Turbopack)
npm run dev

# Build para produccion
npm run build
npm start
```

La app estara disponible en `http://localhost:3000`.

## Stack Tecnologico

### Core

- **Framework:** Next.js 16.1.6 (App Router)
- **React:** 19.2.4
- **TypeScript:** 5.9.3
- **Styling:** Tailwind CSS 3.4.1

### State Management

- **Zustand 5.0.11** - State management global
  - `userStore` - Usuario, autenticacion, achievements
  - `programStore` - Catalogo de programas desde API
  - `sidebarStore` - Estado del sidebar movil
  - `modalQueueStore` - Cola de prioridad para modales y tutoriales
  - `feedbackCooldownStore` - Cooldowns de prompts de feedback (lecciones, instrucciones, NPS, onboarding) para evitar pedir feedback repetido
  - `trainerChatStore` - Hilos del chat con STAN (mensajes por hilo, streaming, feedback) persistidos en sessionStorage
  - `trainerFloatStore` - Estado del chat flotante de STAN (abierto/cerrado + contexto programId/lessonId)

### Autenticacion

- **js-cookie** - Manejo de JWT tokens
- **@react-oauth/google** - Google OAuth login
- **@google-recaptcha/react** - reCAPTCHA v3

### UI/UX

- **Framer Motion 12** - Animaciones fluidas con LazyMotion (`MotionProvider` global, componentes `m.*`)
- **Lucide React** - Iconografia
- **react-icons** - Iconos adicionales
- **driver.js** - Onboarding y tutorials interactivos
- **canvas-confetti** - Efectos de celebracion (achievements, level up)
- **react-toastify** - Notificaciones toast
- **class-variance-authority** - Variantes de componentes
- **tailwind-merge** - Merge de clases Tailwind
- **clsx** - Concatenacion condicional de clases

### Formularios

- **React Hook Form 7.71** - Manejo de formularios
- **Zod 3.25** - Validacion de schemas
- **@hookform/resolvers** - Integracion Zod + RHF
- **input-otp** - Input de codigos OTP

### Multimedia

- **@mux/mux-player-react** - Reproductor de video Mux
- **@mux/blurup** - Placeholder blur de videos
- **react-easy-crop** - Crop de imagenes de perfil

### HTTP Client

- **Axios 1.13.5** - Requests HTTP al backend

### Utils

- **react-country-region-selector** - Selector de pais/region
- **sharp** - Optimizacion de imagenes

## Estructura del Proyecto

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout (GoogleOAuth, MotionProvider, Toastify, GlobalErrorListener)
│   ├── login/                    # Login page
│   ├── register/                 # Registro y Google OAuth
│   ├── password-recovery/        # Recuperacion de contrasena
│   ├── activate/[token]/         # Magic link activation (auto-enroll onboarding del lead)
│   ├── api/feedback/error/       # Route handler que ingesta errores client-side al backend
│   ├── privacidad/               # Politica de privacidad
│   ├── terminos/                 # Terminos y condiciones
│   └── dashboard/                # App principal (protegida)
│       ├── page.tsx              # Home dashboard
│       ├── layout.tsx            # Dashboard layout (sidebar, navbar, tutorial)
│       ├── library/              # Biblioteca de programas
│       │   ├── page.tsx          # Lista de programas
│       │   └── [program_id]/     # Detalles de programa
│       │       ├── page.tsx      # Overview del programa (path map)
│       │       ├── layout.tsx    # Layout del programa
│       │       ├── [section]/    # Secciones del programa
│       │       │   └── [program_module]/ # Modulos con lecciones
│       │       ├── lessons/      # Paginas de lecciones
│       │       │   ├── layout.tsx # Layout del segmento: monta el chat flotante de STAN (persiste entre lecciones)
│       │       │   └── [lessonId]/
│       │       └── instructions/ # Paginas de instrucciones
│       │           └── [instructionId]/
│       ├── community/            # Comunidad (prompts/assistants)
│       │   ├── prompts/
│       │   └── assistants/
│       ├── store/                # Tienda: portadas (Tins), programas (product keys)
│       │   └── [programId]/      # Detalle de programa en tienda
│       ├── billing/              # Pagos unificados (compras + suscripciones en tabs)
│       ├── checkout/             # Compra unica (Mercado Pago)
│       │   ├── [programId]/      # Checkout de compra
│       │   └── result/           # Resultado de compra
│       ├── purchases/            # Redirect → /billing
│       ├── subscriptions/        # Redirect → /billing?tab=subscriptions
│       ├── subscription/         # Suscripcion (Mercado Pago)
│       │   ├── checkout/[programId]/ # Checkout de suscripcion
│       │   └── result/           # Resultado de suscripcion
│       ├── profile/[username]/   # Perfil de usuario
│       └── search/               # Busqueda de usuarios
│
├── components/                   # Componentes React
│   ├── index.ts                  # Barrel exports
│   ├── ui/                       # Componentes base reutilizables
│   │   ├── Modal.tsx             # Modal generico con backdrop
│   │   ├── AnimatedCounter.tsx   # Contador animado para XP/Tins
│   │   ├── MotionProvider.tsx    # LazyMotion provider global
│   │   ├── MotionWrapperLayout.tsx # Wrapper de animacion fade-in
│   │   ├── Tooltip.tsx           # Tooltip reutilizable
│   │   ├── Skeleton.tsx          # Skeleton de carga generico
│   │   ├── skeletons/            # Skeletons especializados por seccion
│   │   ├── LoadingScreen.tsx     # Pantalla de loading global
│   │   ├── SubmitButtonLoading.tsx # Estado loading en botones de submit
│   │   ├── GoBackButton.tsx      # Botón "volver" reutilizable
│   │   ├── FormErrorMessage.tsx  # Mensaje de error en formularios
│   │   ├── ReCaptchaField.tsx    # Campo reCAPTCHA
│   │   ├── input-otp.tsx         # Input de OTP
│   │   ├── InitialsAvatar.tsx    # Avatar fallback con iniciales (sidebar, ranking, comunidad, perfil)
│   │   ├── WhatsNewModal.tsx     # Modal de "novedades" / patch notes (versionado)
│   │   ├── FreshnessBadge.tsx    # Badge de "Nuevo" / "Reciente"
│   │   ├── STANNUMIcon.tsx       # Icono STANNUM (svg inline)
│   │   └── STANNUMLogo.tsx       # Logo STANNUM (svg inline)
│   ├── auth/                     # Componentes de autenticacion
│   │   ├── login/                # Login form, background
│   │   ├── register/             # Registro multi-step
│   │   ├── google/               # Google OAuth flow
│   │   ├── password-recovery/    # Recuperacion de contrasena
│   │   ├── CompleteProfileForm.tsx
│   │   ├── UserInitializer.tsx   # Inicializacion del usuario
│   │   ├── DashboardGuard.tsx    # Guard de autenticacion del dashboard
│   │   └── ConnectionError.tsx   # Pantalla de error de conexion
│   ├── dashboard/                # Componentes del dashboard
│   │   ├── home/                 # Home: continuar, ranking, racha, metas
│   │   ├── billing/              # BillingLayout: tabs compras + suscripciones
│   │   ├── checkout/             # CheckoutForm, CouponInput, GiftOptions, PurchaseResult
│   │   ├── purchases/            # PurchaseList, PurchaseCard, ProductKeyDisplay
│   │   ├── subscriptions/        # SubscriptionsLayout, SubscriptionCard
│   │   ├── program/              # Programa: cover, modulos, lecciones, instrucciones, DemoUpgradeBanner
│   │   │   ├── lessons/          # LessonVideoPlayer, LessonDetails, TrainerChatFloat (chat de STAN), etc.
│   │   │   ├── instructions/     # InstructionCard, InstructionDetails
│   │   │   ├── modules/          # ModuleContent, BlockedModule, PathMap
│   │   │   │   └── path-map/     # PathMap visual de modulos
│   │   │   └── ranking/          # Ranking por equipo del programa
│   │   ├── community/            # Prompts y assistants
│   │   │   ├── prompts/          # Grid, cards, CRUD, favoritos
│   │   │   └── assistants/       # Grid, cards, CRUD, favoritos
│   │   ├── sidebar/              # Sidebar desktop y mobile
│   │   ├── section-navbar/       # Navegacion por secciones
│   │   ├── profile/              # Perfil: info, foto, nivel, achievements
│   │   ├── achievements/         # Cards de logros
│   │   ├── goals/                # Metas diarias
│   │   ├── store/                # Tienda: portadas (Tins), programas (product keys)
│   │   ├── library/              # Biblioteca con secciones
│   │   ├── tutorial/             # Tutorials de onboarding (modales de bienvenida)
│   │   └── SearchResultsList.tsx # Resultados de busqueda
│   ├── feedback/                 # Sistema de feedback (NPS, lecciones, instrucciones, errores)
│   │   ├── FeedbackModal.tsx           # Modal genérico para enviar feedback
│   │   ├── NpsFeedbackPrompt.tsx       # Prompt de NPS (rating 0-10)
│   │   ├── LessonFeedbackPrompt.tsx    # Reaction up/down post-lección
│   │   ├── InstructionFeedbackPrompt.tsx # Reaction up/down post-instrucción calificada
│   │   ├── OnboardingFeedbackPrompt.tsx # Feedback post-onboarding del initial tutorial
│   │   └── ErrorFeedbackReporter.tsx   # Captura errores client-side y los envía a /api/feedback/error
│   ├── shared/                   # Componentes compartidos
│   │   └── GlobalErrorListener.tsx # Listener de unhandled promise rejections (alimenta ErrorFeedbackReporter)
│   ├── toast/                    # Toasts custom (achievement, level up, etc.)
│   ├── svg/                      # SVGs inline reutilizables
│   ├── styles/                   # Estilos globales auxiliares
│   ├── InstallPromptModal.tsx    # Modal "Instalar app" (PWA)
│   ├── VideoIntro.tsx            # Video intro landing
│   └── ButtonShowPassword.tsx    # Toggle mostrar contrasena
│
├── services/                     # API calls al backend
│   ├── auth.ts                   # Login, register, Google OAuth, password recovery, magic link, complete-activation
│   ├── user.ts                   # getUserByToken, editUser, searchUsers, tutorials
│   ├── lesson.ts                 # completeLesson, saveLastWatchedLesson, getPlaybackId
│   ├── instruction.ts            # startInstruction, presignFiles, submitInstruction, retryGrading
│   ├── prompt.ts                 # CRUD prompts, like, favorite, copy, stats
│   ├── assistant.ts              # CRUD assistants, like, favorite, click, stats
│   ├── ranking.ts                # Ranking individual, por equipo, por programa
│   ├── productKey.ts             # getProductKey, activateProductKey
│   ├── profilePhoto.ts           # Upload y delete foto de perfil (S3 presigned)
│   ├── chest.ts                  # openChest (abrir cofre, obtener recompensas)
│   ├── store.ts                  # getStoreCovers, purchaseCover, equipCover, purchaseStreakShield, recoverStreak
│   ├── payment.ts                # createPreference, verifyPayment, getMyOrders, applyCoupon, resendGiftEmail, downloadOrderReceipt
│   ├── subscription.ts           # createSubscription, cancelSubscription, getSubscriptionStatus, getPaymentHistory, downloadSubscriptionReceipt
│   ├── program.ts                # Cliente API para programas (game frontend, /api/programs/public)
│   ├── programServer.ts          # Mismo, pero para Server Components (RSC con cookies)
│   ├── trainer.ts                # Entrenador IA STAN: askTrainer, askTrainerStream (SSE), sendTrainerFeedback
│   └── feedback.ts               # submitFeedback, submitErrorFeedback (NPS / lesson / instruction / onboarding / error)
│
├── providers/                    # React providers
│   └── ProgramsProvider.tsx      # Inicializa programStore cuando el usuario esta autenticado
│
├── stores/                       # Zustand stores
│   ├── userStore.ts              # Usuario, autenticacion, achievements
│   ├── programStore.ts           # Catalogo de programas (fetch desde API, cache)
│   ├── sidebarStore.ts           # Estado del sidebar
│   ├── modalQueueStore.ts        # Cola de prioridad para modales/tutoriales
│   ├── feedbackCooldownStore.ts  # Cooldowns por tipo (NPS, lesson, instruction, onboarding) para evitar spamear prompts
│   ├── trainerChatStore.ts       # Hilos del chat de STAN (mensajes por hilo, streaming, feedback; persist sessionStorage)
│   └── trainerFloatStore.ts      # Estado del chat flotante de STAN (abierto/cerrado + contexto program/lesson)
│
├── interfaces/                   # TypeScript interfaces
│   ├── user/                     # User, FullUserDetails, Level, Achievement
│   ├── program/                  # Program, Lesson, Instruction, Module
│   ├── prompt/                   # Prompt, PromptsResponse
│   ├── assistant/                # Assistant, AssistantsResponse
│   ├── ContinueEntry.ts         # Entrada de "Continuar viendo"
│   └── index.ts                  # Barrel exports
│
├── helpers/                      # Funciones utilitarias
│   ├── errorHandler.ts           # Manejo centralizado de errores → toast
│   ├── achievementHandler.ts     # Confetti + toast de achievements
│   ├── redirect.ts               # getRedirectUrl, buildRedirectParam (post-login redirect)
│   └── tutorialIcons.tsx         # Iconos para tutorial steps
│
├── hooks/                        # Custom React hooks
│   ├── useModuleProgress.ts      # Calculo de progreso de modulo
│   ├── useSearchHandler.ts       # Logica de busqueda con debounce
│   └── useRequestFeedback.ts     # Pide turno al modalQueueStore + chequea feedbackCooldownStore antes de mostrar un prompt
│
├── config/                       # Configuraciones
│   ├── achievements.ts           # 31 achievements con metadata y getProgress()
│   ├── ranks.ts                  # Tiers: Hierro → Bronce → Plata → Oro → Diamante → STANNUM
│   ├── chests.ts                 # Cofres por modulo (posicion, rareza)
│   ├── covers.ts                 # Portadas de perfil (nombre, rareza, imagen)
│   ├── programMetadata.ts        # Metadata por programa (tipo, precio, learningPoints)
│   ├── programAssets.ts          # Assets estaticos por programa (logo, background)
│   └── programs/                 # Programas educativos (TIA, TMD, TIA_SUMMER, TIA_POOL, TRENNO_IA, DEMO_TRENNO)
│       └── index.ts              # Configuracion de modulos, lecciones, instrucciones
│
├── utilities/                    # Helpers adicionales
│   ├── access.ts                 # hasAccess, hasAnyAccess, isSubscription, isActiveSubscription
│   ├── continue.ts               # Logica de "Continuar viendo"
│   └── programMapper.ts          # Mapeo API → interfaz Program (merge metadata + assets)
│
├── assets/                       # Imagenes estaticas
│   ├── tins_coin.svg             # Icono de moneda Tins
│   └── ...                       # Backgrounds, iconos, etc.
│
├── lib/                          # Configuraciones core
│   ├── api.ts                    # Axios instance con interceptors (refresh token)
│   └── tokenStorage.ts           # Manejo de cookie logged_in (isLoggedIn, clearLoginFlag)
│
└── proxy.ts                      # Next.js 16 middleware (proteccion de rutas)
```

## Variables de Entorno

```env
# API Backend - URL base
NEXT_PUBLIC_API_URL=http://localhost:4000/api  # Default backend port (PORT env del back)

# API Endpoints (rutas individuales)
NEXT_PUBLIC_API_AUTH_URL=/auth
NEXT_PUBLIC_API_USER_URL=/user
NEXT_PUBLIC_API_LESSON_URL=/lesson
NEXT_PUBLIC_API_INSTRUCTION_URL=/instruction
NEXT_PUBLIC_API_PROMPT_URL=/prompt
NEXT_PUBLIC_API_ASSISTANT_URL=/assistant
NEXT_PUBLIC_API_RANKING_URL=/ranking
NEXT_PUBLIC_API_PRODUCT_KEY_URL=/product-key
NEXT_PUBLIC_API_PHOTO_URL=/profile-photo
NEXT_PUBLIC_API_CHEST_URL=/chest
NEXT_PUBLIC_API_STORE_URL=/store
NEXT_PUBLIC_API_PAYMENT_URL=/payment
NEXT_PUBLIC_API_SUBSCRIPTION_URL=/subscription

# Entrenador IA STAN (chatbot RAG sobre las lecciones)
# Opcional: si no se setea, trainer.ts usa el default "/trainer" sobre NEXT_PUBLIC_API_URL
NEXT_PUBLIC_API_TRAINER_URL=/trainer

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_client_id.apps.googleusercontent.com

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key

# Mux Video
NEXT_PUBLIC_MUX_IDS={"tutorial":"playback_id_1","TIAM01L01":"playback_id_2",...}
NEXT_PUBLIC_MUX_TOKEN_DATA=token_data_para_signed_urls

# App / observabilidad
NEXT_PUBLIC_APP_VERSION=1.0.0        # Se adjunta a NPS, feedback de errores y captura de 5xx en api.ts
NEXT_PUBLIC_APP_ORIGIN=https://...   # Origin permitido por el route handler /api/feedback/error
NEXT_PUBLIC_MAINTENANCE_MODE=false   # 'true' fuerza pantalla de mantenimiento (root layout)

# Environment
NEXT_PUBLIC_ENV=development
```

> **Notas:**
> - Las variables `NEXT_PUBLIC_AWS_S3_*` ya no se usan en el frontend. El upload a S3 se hace via presigned URLs del backend.
> - `NEXT_PUBLIC_MP_PUBLIC_KEY` quedó como legacy: sigue definida en `.env.local` pero **ya no se referencia en el código** (los pagos de Mercado Pago se resuelven via preferencias creadas por el backend, sin SDK de MP cargado en el cliente). Se puede eliminar.
> - `NEXT_PUBLIC_APP_VERSION`, `NEXT_PUBLIC_APP_ORIGIN` y `NEXT_PUBLIC_API_TRAINER_URL` se consumen en el código pero no estaban en `.env.local`; cada uno tiene fallback (`'unknown'`, `''` y `'/trainer'` respectivamente).

## Paginas Principales

### Paginas Publicas

| Ruta | Descripcion |
|------|-------------|
| `/` | Landing page con video intro |
| `/login` | Login con email/password o Google |
| `/register` | Registro de cuenta nueva (multi-step) |
| `/register/google` | Completar perfil post Google OAuth |
| `/password-recovery` | Recuperacion de contrasena con OTP |
| `/activate/[token]` | Magic link de auto-enroll: consume `GET /api/auth/magic-link/:token` y, si es stub user, presenta el formulario de `complete-activation` |
| `/api/feedback/error` | Route handler de Next que ingesta errores client-side y los reenvía al backend (`/api/feedback/error` con API key) |
| `/privacidad` | Politica de privacidad |
| `/terminos` | Terminos y condiciones |

### Dashboard (Autenticado)

| Ruta | Descripcion |
|------|-------------|
| `/dashboard` | Home: continuar viendo, ranking, racha, metas |
| `/dashboard/library` | Biblioteca de programas |
| `/dashboard/library/[program_id]` | Path map del programa (modulos visuales) |
| `/dashboard/library/[program_id]/[section]/[module]` | Contenido del modulo |
| `/dashboard/library/[program_id]/lessons/[lessonId]` | Reproducir leccion (video Mux). Acepta `?t=<seg>` para arrancar en un minuto (citas de STAN). El chat flotante de STAN vive en el layout del segmento `lessons` y persiste entre lecciones |
| `/dashboard/library/[program_id]/instructions/[instructionId]` | Realizar instruccion practica |
| `/dashboard/community/prompts` | Explorar prompts compartidos |
| `/dashboard/community/assistants` | Explorar GPTs/assistants |
| `/dashboard/store` | Tienda: portadas de perfil (Tins) + activar codigos de producto |
| `/dashboard/store/[programId]` | Detalle de programa en tienda |
| `/dashboard/billing` | Pagos unificados: compras + suscripciones (tabs) |
| `/dashboard/checkout/[programId]` | Checkout de compra unica (Mercado Pago) |
| `/dashboard/checkout/result` | Resultado de compra |
| `/dashboard/purchases` | Redirect → `/dashboard/billing` |
| `/dashboard/subscriptions` | Redirect → `/dashboard/billing?tab=subscriptions` |
| `/dashboard/subscription/checkout/[programId]` | Checkout de suscripcion (Mercado Pago) |
| `/dashboard/subscription/result` | Resultado de suscripcion |
| `/dashboard/library/[program_id]/ranking` | Ranking del programa |
| `/dashboard/library/[program_id]/resources` | Recursos del programa |
| `/dashboard/profile/[username]` | Perfil publico de usuario |
| `/dashboard/search` | Busqueda de usuarios |

## Autenticacion

### Sistema de JWT

El sistema usa access token (JWT, 15 min) + refresh token (opaco, 7 días) con rotación automática.

- **Access token:** cookie httpOnly `access_token` seteada por el backend, se renueva automáticamente via interceptor de Axios cuando un request devuelve 401.
- **Refresh token:** cookie httpOnly `refresh_token` (80 hex chars), se rota en cada refresh.
- **Activation token:** cookie temporal con `scope: "activation"` que setea el endpoint `/auth/magic-link/:token` para que el stub user pueda completar el onboarding via `/auth/complete-activation`.
- El frontend usa una cookie no-httpOnly de "logged_in" (helper `tokenStorage.ts`) solo como flag local para condicionar UI sin tener que leer el JWT.

### Flujo de Autenticacion

```
Usuario ingresa a la app
  |
proxy.ts (middleware Next.js 16)
  ├─ Sin token + ruta /dashboard → redirect /login?redirect={ruta_original}
  └─ Con token + ruta /login → redirect /dashboard
  |
UserInitializer (client component)
  └─ useUserStore.initUser()
      ├─ POST /api/auth/auth-user (verifica token)
      ├─ Retorna achievementsUnlocked + profileStatus
      └─ GET /api/user (datos completos)
  |
set({ user, isAuthenticated: true })
```

### Middleware de Proteccion

La proteccion de rutas esta implementada en `src/proxy.ts` (Next.js 16 lo reconoce como middleware):

El middleware vive en `src/proxy.ts` (Next.js 16 lo reconoce con ese nombre y la función exportada `proxy`, no `middleware`). Protege `/dashboard` empujando a `/login` cuando no hay sesión, redirige usuarios logueados fuera de `/login` y `/register`, y deja pasar libremente las rutas públicas (incluida `/activate/[token]`, que tiene su propio flujo de validación contra el backend).

## State Management - Zustand

### userStore

**Archivo:** `src/stores/userStore.ts`

```typescript
interface UserStore {
  user: FullUserDetails | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: AppError | null;

  initUser: () => Promise<ProfileStatus | null>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}
```

**Uso:**

```typescript
const { user, isAuthenticated, refreshUser } = useUserStore();

// Despues de completar leccion
await completeLessonService(...);
await refreshUser();  // Actualiza XP, level, achievements
```

**Deteccion de Achievements:**

```typescript
// En refreshUser():
if (user.achievements.length > previousLength) {
  const newAchievements = getNewAchievements();
  achievementHandler(newAchievements);  // Confetti + toast
}
```

### sidebarStore

**Archivo:** `src/stores/sidebarStore.ts`

Maneja estado del sidebar movil:

```typescript
interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}
```

### programStore

**Archivo:** `src/stores/programStore.ts`

Catalogo de programas cargado desde la API. Se inicializa via `ProgramsProvider` cuando el usuario esta autenticado.

```typescript
interface ProgramStore {
  programs: Program[];
  loading: boolean;
  error: boolean;
  fetchPrograms: () => void;
  refreshPrograms: () => void;
}
```

### modalQueueStore

**Archivo:** `src/stores/modalQueueStore.ts`

Cola de prioridad para coordinar modales y tutoriales. Solo el modal con menor numero de prioridad tiene permiso para mostrarse. Cuando termina, se libera y el siguiente toma su turno.

```typescript
interface ModalQueueStore {
  queue: ModalEntry[];
  request: (id: string, priority: number) => void;
  release: (id: string) => void;
}
```

## Lecciones (Videos)

### Reproductor de Video

**Componente:** `src/components/dashboard/program/lessons/LessonVideoPlayer.tsx`

**Stack:**
- **Mux Player** para streaming de video
- **Blurup** para placeholders blur
- **Auto-save** de progreso cada 5 segundos

### Completar Leccion

Al completar una leccion, el backend retorna:
- XP ganado (base + streak bonus)
- Achievements desbloqueados
- Nuevo nivel (si aplica)
- Tins ganados

El frontend muestra confetti + toast para achievements y actualiza el store via `refreshUser()`.

## Entrenador IA "STAN" (Chat)

Chatbot RAG que responde dudas del alumno sobre las lecciones del programa. Es un **chat flotante** (FAB "Preguntale a STAN" abajo a la derecha) que vive **solo dentro del segmento `/dashboard/library/[program_id]/lessons`** y **persiste entre lecciones**: está montado en `src/app/dashboard/library/[program_id]/lessons/layout.tsx`, así que al navegar de una lección a otra solo cambia el page segment, el panel no se desmonta y el hilo se mantiene. Al salir de `/lessons` el float desaparece.

**Componente:** `src/components/dashboard/program/lessons/TrainerChatFloat.tsx`
**Servicio:** `src/services/trainer.ts`
**Stores:** `src/stores/trainerChatStore.ts` (hilos/mensajes) + `src/stores/trainerFloatStore.ts` (abierto/cerrado + contexto)

### Funcionalidades

- **Hilo por programa:** la clave del hilo en el store es el `programId` (no el `lessonId`), por eso la conversación es continua aunque cambies de lección. El `lessonId` actual sí se envía al backend como **contexto** de la pregunta.
- **Streaming SSE token a token:** `askTrainerStream` hace un `POST` con `fetch` a `/trainer/ask/stream` y parsea eventos SSE (`data:` con `type: delta | done | error`). Cada `delta` se concatena en la burbuja del asistente en tiempo real; `done` trae las citas y el `interactionId`. (También existe `askTrainer` no-streaming sobre `/trainer/ask` vía Axios.)
- **Citas clickeables:** cada respuesta puede incluir citas (`lessonId`, `title`, `startSec`). Al hacer click:
  - Si la cita es de la lección actual → dispara el `CustomEvent` `trainer:seek` y `LessonVideoPlayer` salta el player a ese segundo (sin recargar).
  - Si es de otra lección (siempre anterior, ya desbloqueada) → navega a `…/lessons/<lessonId>?t=<seg>` y el player arranca en ese minuto. El chat persiste porque es un overlay fijo del layout.
- **Feedback 👍 / 👎:** por mensaje (`sendTrainerFeedback` → `/trainer/feedback` con el `interactionId`). Toggle optimista con rollback si falla la request.
- **Persistencia en `sessionStorage`** (`stan-chat-threads`): el hilo sobrevive a un reload pero **se borra al cerrar la pestaña**. Escritura **debounceada** (~600 ms) para no hacer un `setItem` por cada token del stream; flush forzado en `visibilitychange`/`pagehide`. Se persiste como máximo el hilo recortado (60 mensajes); `loadingByLesson` no se persiste (al rehidratar se resetea para no quedar "Pensando" colgado, y se descarta un assistant final vacío de un stream cortado). El estado abierto/cerrado del panel se guarda en `stan-chat-open` (también sessionStorage).
- **Markdown básico tolerante a parciales:** renderer propio (sin `innerHTML`) que arma nodos React para `**negrita**`, `*itálica*`/`_em_`, `` `código` ``, links, listas y fences ```` ``` ````. La sintaxis sin cerrar (típica durante el streaming) se muestra como texto plano hasta que llega el cierre.
- **Controles:** botón **Detener** (aborta el stream vía `AbortController` sin mostrar error) y **Nueva conversación** (con confirmación; corta el stream en curso y vacía el hilo). Sugerencias iniciales y saludo de bienvenida hardcodeado por hora/día (sin llamada a la API).
- **Accesibilidad / UX mobile:** `role="dialog"` + `aria-label`, lista de mensajes con `role="log"`/`aria-live="polite"`, foco al input al abrir (solo desktop) y retorno del foco al FAB al cerrar, **Escape** cierra, **lock de scroll** del `body` en mobile mientras está abierto, y **drag-to-dismiss** (arrastrar el handle hacia abajo cierra). En mobile es un bottom sheet; en desktop, un panel fijo a la derecha.

### Variable de entorno

`NEXT_PUBLIC_API_TRAINER_URL` (default `/trainer`, montado sobre `NEXT_PUBLIC_API_URL`).

## Instrucciones (Tareas Practicas)

### Estados de Instruccion

| Estado | Descripcion |
|--------|-------------|
| **PENDING** | No iniciada |
| **IN_PROCESS** | Iniciada pero no enviada |
| **SUBMITTED** | Enviada, esperando calificacion AI |
| **GRADED** | Calificada por AI (muestra score + observaciones) |
| **ERROR** | Error en AI grading (permite reintentar) |

### Flujo

1. **Iniciar** instruccion (`startInstruction`)
2. **Subir archivo** a S3 via presigned URL (si el deliverable es archivo)
3. **Enviar** instruccion (`submitInstruction`) con s3Key o submittedText
4. **Polling** cada 3 segundos mientras status = SUBMITTED
5. **Resultado**: Score 0-100, observaciones de AI, XP + Tins ganados

## Sistema de Gamificacion

### XP y Niveles
- **30 niveles** con curva exponencial
- XP por leccion: base + streak bonus (hasta 7 dias)
- XP por instruccion: variable segun score (10-25 XP)
- XP por modulo completado: 30 XP
- XP por programa completado: 100 XP

### Tins (Moneda Virtual)
- Moneda interna de la plataforma (icono amber-400)
- Se ganan al completar lecciones (5), instrucciones (10-25), modulos (30), programas (100), cofres y achievements
- Se gastan en la Tienda para comprar portadas de perfil, escudos de racha y recuperacion de racha

### Cofres (Chests)
- Nodos de recompensa dentro del PathMap de cada modulo
- Aparecen despues de ciertas lecciones/instrucciones (`afterItemId` en config)
- Se desbloquean al completar la actividad previa
- Al abrir: revelan XP, Tins y opcionalmente una portada de perfil (animacion stagger con framer-motion)
- 3 estados: bloqueado, disponible (glow animado), reclamado (verde como completado)
- Config frontend: `src/config/chests.ts` (visual, posicion, rareza)
- Config backend: `src/config/chestsConfig.js` (recompensas)

### Tienda de Portadas
- 12 portadas de perfil comprables con Tins (common a legendary, 0-1500 Tins)
- Scroll horizontal en mobile (snap), grilla responsive en desktop
- Modal de detalle con preview, rareza y precio
- Config: `src/config/covers.ts`

### Tienda - Streak Shield y Recuperacion
- **Streak Shield:** Comprable con Tins, protege la racha si se pierde un dia
- **Recuperacion de Streak:** Permite restaurar una racha perdida pagando con Tins

### Daily Streaks
- Racha de dias consecutivos con actividad
- Bonus de XP creciente (capped a 7 dias)
- Se muestra en Home y perfil

### Achievements
- **31 logros** definidos en `src/config/achievements.ts`
- Cada uno tiene `getProgress(user)` para calcular % de progreso
- Al desbloquear: confetti (`canvas-confetti`) + toast con info
- Recompensas en XP y Tins

### Ranks (Tiers por nivel)
- Hierro (1-4) → Bronce (5-9) → Plata (10-14) → Oro (15-19) → Diamante (20-24) → STANNUM (25-30)
- Definidos en `src/config/ranks.ts`
- Se muestra frame decorativo en perfil

## Comunidad

### Prompts
- CRUD completo: crear, editar, eliminar, toggle visibilidad
- Like, favorite, copy con contadores
- Filtros: categoria, dificultad, plataforma, busqueda
- SortBy: popular, newest, mostCopied, mostLiked, mostViewed, verified
- Verificados por STANNUM (badge especial)

### Assistants (GPTs)
- CRUD completo similar a Prompts
- Link externo a GPTs en ChatGPT, Claude, Gemini, etc.
- Click tracking, likes, favorites

## API Services

### Axios Instance

**Archivo:** `src/lib/api.ts`

- baseURL: `NEXT_PUBLIC_API_URL`
- withCredentials: true (cookies automaticos)
- timeout: 15000ms
- Interceptor de refresh token automatico (renueva access token en 401)
- Reintentos exponenciales ante 5xx / cold-start (ver "Resiliencia de red")
- Redirect a /login en caso de fallo total (`forceLogout`)

### Resiliencia de Red y Auth

Toda la lógica de robustez de red vive en el interceptor de respuesta de `src/lib/api.ts`, complementada por el manejo de errores del `userStore`:

- **Refresh-on-401 con dedup:** un 401 (en un endpoint que no está en la lista de skip y con el flag local `logged_in` presente) dispara un único `POST /auth/refresh-token`. La promesa de refresh se guarda en `refreshPromise`, así varios requests que fallan en paralelo **comparten el mismo refresh** en vez de disparar uno cada uno; cuando resuelve, todos reintentan su request original (marcado con `_retry` para no reintentar en loop). Si el refresh falla → `forceLogout`.
- **Lista de skip de refresh:** endpoints de credenciales/recovery (`/auth/register`, `/auth/google`, `/auth/refresh-token`, `/auth/logout`, password-recovery/reset, `/auth/complete-activation`, `/auth/magic-link`) y el **login** (`POST` exacto a `${AUTH_URL}/`) nunca disparan refresh: un 401 ahí son credenciales inválidas, no un token expirado.
- **Reintentos exponenciales (cold-start / 5xx):** backoff de `1s * 2^(n-1)`, hasta `MAX_RETRIES = 2`. Aplica a:
  - **GET** sin respuesta o con status ≥ 500.
  - **POST de credenciales** (login + Google) ante gateway/cold-start (502/503/504 o sin respuesta) — son idempotentes porque re-emitir tokens es seguro; cubre el caso de Railway despertando un contenedor. Nunca se reintentan ante 4xx ni 500 "reales".
  - `ERR_CANCELED` (requests abortadas) nunca se reintentan.
- **`forceLogout`:** idempotente (guard `isLoggingOut`). Hace `POST /auth/logout` best-effort, limpia el flag `logged_in`, muestra un toast de "Sesión expirada" y redirige a `/login?redirect=…` preservando la ruta actual.
- **Captura de 5xx → backend:** errores con status ≥ 500 (excepto los del propio `/feedback`) se reportan a `/api/feedback/error` con metadata sanitizada, throttleados a 1 cada 5 min (`captureServerError`).
- **Init del user tolerante a red:** `userStore.initUser()` distingue errores de red (`isNetworkError`: sin respuesta o 502/503/504) de errores reales. Ante red caída marca `connectionError = true`, muestra un toast "Sin conexión" (una sola vez) y **resetea `_initStarted`** para permitir reintento (`retryInit`), en vez de tirar al usuario a `/login`. La guarda `_initStarted` evita doble init en el arranque.

### Fixes recientes del flujo de login

- Reintentar el `POST` de login/Google ante cold-start o errores de gateway (502/503/504/sin respuesta), evitando el "login intermitente" cuando el backend está despertando.
- Evitar el **refresh espurio**: el login (`POST ${AUTH_URL}/`) y los endpoints de credenciales quedaron explícitamente fuera del refresh-on-401, para que un 401 de credenciales inválidas no se interprete como token expirado.
- Bloqueo de cuentas no activadas y hardening del flujo de recovery (manejo de `AUTH_ACCOUNT_DISABLED`, etc.).

### Services Disponibles

| Service | Endpoints Principales |
|---------|----------------------|
| `auth.ts` | login, register, Google OAuth, authUserByToken, logout, password recovery, updateUsername |
| `user.ts` | getUserByToken, editUser, searchUsers, getTutorialStatus, completeTutorial |
| `lesson.ts` | completeLesson, saveLastWatchedLesson |
| `instruction.ts` | startInstruction, submitInstruction (con upload S3), retryGrading |
| `prompt.ts` | getPrompts, getPromptById, createPrompt, updatePrompt, deletePrompt, toggleVisibility, copy, like, unlike, favorite, getMyPrompts, getFavorites, getUserPrompts, getStats, getTopPrompts |
| `assistant.ts` | getAssistants, getAssistantById, createAssistant, deleteAssistant, toggleVisibility, click, like, unlike, favorite, getMyAssistants, getFavorites, getUserAssistants, getStats, getTopAssistants, editAssistant |
| `ranking.ts` | getIndividualRanking, getTeamRanking, getProgramIndividualRanking |
| `productKey.ts` | getProductKey, activateProductKey |
| `profilePhoto.ts` | uploadProfilePhoto (S3 presigned), deleteProfilePhoto |
| `chest.ts` | openChest |
| `store.ts` | getStoreCovers, purchaseCover, equipCover, purchaseStreakShield, recoverStreak |
| `payment.ts` | createPreference, verifyPayment, getMyOrders, applyCoupon, resendGiftEmail |
| `subscription.ts` | createSubscription, cancelSubscription, getSubscriptionStatus, getPaymentHistory |
| `trainer.ts` | askTrainer, askTrainerStream (SSE), sendTrainerFeedback (Entrenador IA STAN) |

## Pagos y Suscripciones (Mercado Pago)

### Compra Unica
- Checkout con Mercado Pago en **modo redirect** (sin SDK JS en el cliente): el backend crea la preferencia y devuelve un `initPoint`; el front hace `window.location.href = initPoint`. No se usa `NEXT_PUBLIC_MP_PUBLIC_KEY` (ver nota en Variables de Entorno)
- Flujo: seleccionar programa → aplicar cupon (opcional) → crear preferencia → redirect a MP → verificar → activar programa
- Historial de compras en `/dashboard/billing`
- Soporte para reenvio de email de regalo

### Suscripciones
- Suscripciones mensuales via Mercado Pago (redirect mode)
- Flujo: seleccionar plan → crear suscripcion → redirect a MP → callback con resultado
- Gestion de suscripciones activas en `/dashboard/billing?tab=subscriptions`
- Cancelacion de suscripcion desde el frontend
- Historial de pagos de suscripcion

## Onboarding

Tutoriales interactivos usando **driver.js** con estado persistido en backend (`/user/tutorial/:name/complete`):

- **Home** (`initial_tutorial`): 6 modales de bienvenida (intro, video, programas, ranking, comunidad, comenzar) + 8 pasos driver.js (bienvenida, sidebar, misiones, Tins, racha diaria, ranking, activar producto, a jugar)
- **Path Map** (`path_map_tutorial`): 5-8 pasos driver.js (modulo, mapa, nodo completado, nodo activo, nodo bloqueado, cofre, cambiar vista, a entrenar). Se construyen dinamicamente segun los nodos existentes en el DOM.
- **Programa** (`program_library_tutorial`): 4-5 pasos driver.js (programa, modulos, recursos, ranking, a entrenar). Tabs opcionales segun habilitacion.
- **Perfil** (`profile_tutorial`): 6-7 pasos driver.js (perfil, nivel/XP, info, editar, bio, logros, seguir creciendo). Solo para el owner del perfil. Responsive (adapta posicion en mobile/desktop).

Cada tutorial se verifica via cookie (`tutorial_{name}`) y API antes de mostrarse. Al completarse se persiste en ambos.

## Magic Link / Auto-Enroll

Flujo de onboarding zero-friction para leads capturados externamente (Make → backend `POST /api/product-key/auto-enroll`):

1. El backend crea un user stub y manda un email con `${FRONTEND_URL}/activate/<rawToken>`.
2. La página `src/app/activate/[token]/page.tsx` consume `GET /api/auth/magic-link/:token`:
   - Si `scope === "full"` (user ya completo) → redirect a `/dashboard`.
   - Si `scope === "activation"` (stub user) → muestra el formulario de onboarding y al submit llama `POST /api/auth/complete-activation` con el activation JWT que el backend dejó en cookie.
3. Tras `complete-activation` el backend setea cookies normales (`access_token` + `refresh_token`) y la app entra al dashboard.

Errores comunes manejados en la página: `MAGIC_LINK_INVALID`, `MAGIC_LINK_EXPIRED`, `AUTH_ACCOUNT_DISABLED`.

> Ver el lado backend en [`docs/systems/authentication.md`](https://github.com/stannumgame/stannum-game-backend-v2/blob/main/docs/systems/authentication.md) y [`teams-productkeys.md`](https://github.com/stannumgame/stannum-game-backend-v2/blob/main/docs/systems/teams-productkeys.md) del repo de backend.

## Sistema de Feedback

Captura feedback del usuario en distintos puntos del flujo y lo manda al backend (`/api/feedback`):

- **NPS** (`NpsFeedbackPrompt`): rating 0-10 + mensaje opcional. Cooldown largo entre prompts (sincronizado con `feedbackState.lastNpsAt` del user).
- **Lección** (`LessonFeedbackPrompt`): reaction up/down opcional al completar una lección.
- **Instrucción** (`InstructionFeedbackPrompt`): reaction up/down después de recibir el AI grading.
- **Onboarding** (`OnboardingFeedbackPrompt`): se dispara al cerrar el initial tutorial. Cooldown sincronizado con `feedbackState.lastOnboardingFeedbackAt`.
- **Errores client-side** (`ErrorFeedbackReporter` + `GlobalErrorListener`): captura unhandled rejections y errores no controlados, y los envía vía `/api/feedback/error` (route handler de Next que reenvía al backend con API key).

**Coordinación de prompts:**
- `feedbackCooldownStore` lleva los cooldowns locales por tipo (evita repetir prompts dentro de la misma sesión, además del cooldown server-side).
- `useRequestFeedback` pide turno al `modalQueueStore` antes de pintar cualquier prompt, así no compite con tutoriales ni con `WhatsNewModal`.
- Todos los prompts usan `FeedbackModal` como base y llaman a `feedback.ts` (`submitFeedback` para tipos del usuario, `submitErrorFeedback` para errores).

## Avatares e Identidad Visual

- **`InitialsAvatar`** (`src/components/ui/InitialsAvatar.tsx`): fallback usado cuando `profilePhotoUrl` no existe. Toma las iniciales del nombre/username, calcula un color determinístico y se renderiza en sidebar, ranking, comunidad, perfil y cualquier otro lugar donde se mostraba un placeholder gris.
- **`STANNUMIcon` / `STANNUMLogo`**: SVGs inline reutilizables del branding.

## Patch Notes / WhatsNewModal

`src/components/ui/WhatsNewModal.tsx` muestra un changelog versionado al usuario en su primer login después de un deploy. La detección se hace contra una versión guardada en cookie/localStorage; si no matchea, se encola en `modalQueueStore` con prioridad media (no compite con tutoriales obligatorios). Incluye un `FreshnessBadge` para resaltar features marcadas como nuevas.

## Manejo de Errores

**Archivos clave:**
- `src/helpers/errorHandler.ts` — intercepta errores de Axios y los convierte a `AppError`
- `src/components/shared/GlobalErrorListener.tsx` — captura `window.onerror` y `unhandledrejection`
- `src/components/feedback/ErrorFeedbackReporter.tsx` — bridge entre los errores capturados y `/api/feedback/error`

- Muestra `toast.error()` con mensaje descriptivo
- En desarrollo (`NEXT_PUBLIC_ENV=development`): logs en consola
- Errores no manejados se reportan al backend (con metadata sanitizada) para tracking/triage

## Animaciones

### MotionProvider

**Archivo:** `src/components/ui/MotionProvider.tsx`

Provider global de Framer Motion con `LazyMotion` para tree-shaking:

```typescript
<LazyMotion features={domAnimation}>
  {children}
</LazyMotion>
```

Todos los componentes animados usan `m.*` (no `motion.*`) para reducir bundle size.

### MotionWrapperLayout

Wrapper reutilizable para paginas con fade-in + slide-up al montar.

## Sugerencias de documentacion

> Este README es hoy la única documentación del frontend. A medida que crecen sistemas como el Entrenador IA STAN o la resiliencia de red, valdría la pena adoptar el patrón del backend (`stannum-game-backend-v2/docs/systems/*.md`) y mover los sistemas grandes a una carpeta `docs/` dedicada (ej. `docs/systems/trainer-chat.md`, `docs/systems/auth-resilience.md`), dejando el README como índice. **Aún no se creó** dicha carpeta — queda como sugerencia.

---

**STANNUM 2026 - Repositorio Privado**
