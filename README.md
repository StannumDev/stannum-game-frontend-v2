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
  - `sidebarStore` - Estado del sidebar movil

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
│   ├── layout.tsx                # Root layout (GoogleOAuth, MotionProvider, Toastify)
│   ├── login/                    # Login page
│   ├── register/                 # Registro y Google OAuth
│   ├── password-recovery/        # Recuperacion de contrasena
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
│       │       │   └── [lessonId]/
│       │       └── instructions/ # Paginas de instrucciones
│       │           └── [instructionId]/
│       ├── community/            # Comunidad (prompts/assistants)
│       │   ├── prompts/
│       │   └── assistants/
│       ├── store/                # Tienda de programas (activar product keys)
│       ├── profile/[username]/   # Perfil de usuario
│       └── search/               # Busqueda de usuarios
│
├── components/                   # Componentes React
│   ├── index.ts                  # Barrel exports
│   ├── ui/                       # Componentes base reutilizables
│   │   ├── button.tsx            # Button con variantes CVA
│   │   ├── input.tsx             # Input con validacion visual
│   │   ├── card.tsx              # Card container
│   │   ├── Modal.tsx             # Modal generico con backdrop
│   │   ├── AnimatedCounter.tsx   # Contador animado para XP/Tins
│   │   ├── MotionProvider.tsx    # LazyMotion provider global
│   │   ├── MotionWrapperLayout.tsx # Wrapper de animacion fade-in
│   │   ├── Tooltip.tsx           # Tooltip reutilizable
│   │   ├── WhatsNewModal.tsx     # Modal de novedades
│   │   ├── FormErrorMessage.tsx  # Mensaje de error en formularios
│   │   └── ReCaptchaField.tsx    # Campo reCAPTCHA
│   ├── auth/                     # Componentes de autenticacion
│   │   ├── login/                # Login form, background
│   │   ├── register/             # Registro multi-step
│   │   ├── google/               # Google OAuth flow
│   │   ├── password-recovery/    # Recuperacion de contrasena
│   │   ├── CompleteProfileForm.tsx
│   │   └── UserInitializer.tsx   # Inicializacion del usuario
│   ├── dashboard/                # Componentes del dashboard
│   │   ├── home/                 # Home: continuar, ranking, racha, metas
│   │   ├── program/              # Programa: cover, modulos, lecciones, instrucciones
│   │   │   ├── lessons/          # LessonVideoPlayer, LessonDetails, etc.
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
│   │   ├── store/                # Tienda: cards, tutorial
│   │   ├── library/              # Biblioteca con secciones
│   │   ├── tutorial/             # Tutorial de onboarding (6 steps)
│   │   └── SearchResultsList.tsx # Resultados de busqueda
│   ├── VideoIntro.tsx            # Video intro landing
│   └── ButtonShowPassword.tsx    # Toggle mostrar contrasena
│
├── services/                     # API calls al backend
│   ├── auth.ts                   # Login, register, Google OAuth, password recovery
│   ├── user.ts                   # getUserByToken, editUser, searchUsers, tutorials
│   ├── lesson.ts                 # completeLesson, saveLastWatchedLesson
│   ├── instruction.ts            # startInstruction, submitInstruction, retryGrading
│   ├── prompt.ts                 # CRUD prompts, like, favorite, copy, stats
│   ├── assistant.ts              # CRUD assistants, like, favorite, click, stats
│   ├── ranking.ts                # Ranking individual, por equipo, por programa
│   ├── productKey.ts             # getProductKey, activateProductKey
│   └── profilePhoto.ts          # Upload y delete foto de perfil (S3 presigned)
│
├── stores/                       # Zustand stores
│   ├── userStore.ts              # Usuario, autenticacion, achievements
│   └── sidebarStore.ts           # Estado del sidebar
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
│   └── tutorialIcons.tsx         # Iconos para tutorial steps
│
├── hooks/                        # Custom React hooks
│   ├── useModuleProgress.ts      # Calculo de progreso de modulo
│   └── useSearchHandler.ts       # Logica de busqueda con debounce
│
├── config/                       # Configuraciones
│   ├── achievements.ts           # 34 achievements con metadata y getProgress()
│   ├── ranks.ts                  # Tiers: Hierro → Bronce → Plata → Oro → Diamante → STANNUM
│   └── programs/                 # Programas educativos (TIA, TMD, TIA_SUMMER)
│       └── index.ts              # Configuracion de modulos, lecciones, instrucciones
│
├── utilities/                    # Helpers adicionales
│   └── continue.ts               # Logica de "Continuar viendo"
│
├── assets/                       # Imagenes estaticas
│   ├── tins_coin.svg             # Icono de moneda Tins
│   └── ...                       # Backgrounds, iconos, etc.
│
├── lib/                          # Configuraciones core
│   └── api.ts                    # Axios instance con interceptors (refresh token)
│
└── proxy.ts                      # Next.js 16 middleware (proteccion de rutas)
```

## Variables de Entorno

```env
# API Backend - URL base
NEXT_PUBLIC_API_URL=http://localhost:8000/api

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

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_client_id.apps.googleusercontent.com

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key

# Mux Video
NEXT_PUBLIC_MUX_IDS={"tutorial":"playback_id_1","TIAM01L01":"playback_id_2",...}
NEXT_PUBLIC_MUX_TOKEN_DATA=token_data_para_signed_urls

# Environment
NEXT_PUBLIC_ENV=development
```

> **Nota:** Las variables `NEXT_PUBLIC_AWS_S3_*` ya no se usan en el frontend. El upload a S3 se hace via presigned URLs del backend.

## Paginas Principales

### Paginas Publicas

| Ruta | Descripcion |
|------|-------------|
| `/` | Landing page con video intro |
| `/login` | Login con email/password o Google |
| `/register` | Registro de cuenta nueva (multi-step) |
| `/register/google` | Completar perfil post Google OAuth |
| `/password-recovery` | Recuperacion de contrasena con OTP |

### Dashboard (Autenticado)

| Ruta | Descripcion |
|------|-------------|
| `/dashboard` | Home: continuar viendo, ranking, racha, metas |
| `/dashboard/library` | Biblioteca de programas |
| `/dashboard/library/[program_id]` | Path map del programa (modulos visuales) |
| `/dashboard/library/[program_id]/[section]/[module]` | Contenido del modulo |
| `/dashboard/library/[program_id]/lessons/[lessonId]` | Reproducir leccion (video Mux) |
| `/dashboard/library/[program_id]/instructions/[instructionId]` | Realizar instruccion practica |
| `/dashboard/community/prompts` | Explorar prompts compartidos |
| `/dashboard/community/assistants` | Explorar GPTs/assistants |
| `/dashboard/store` | Tienda para activar codigos de producto |
| `/dashboard/profile/[username]` | Perfil publico de usuario |
| `/dashboard/search` | Busqueda de usuarios |

## Autenticacion

### Sistema de JWT

El sistema usa access token (JWT, 15 min) + refresh token (opaco, 7 dias) con rotacion automatica.

- **Access token:** Almacenado en cookie `token`, se renueva automaticamente via interceptor de Axios
- **Refresh token:** Almacenado en cookie `refreshToken`, se rota en cada refresh

### Flujo de Autenticacion

```
Usuario ingresa a la app
  |
proxy.ts (middleware Next.js 16)
  ├─ Sin token + ruta /dashboard → redirect /login
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

```typescript
// src/proxy.ts
export async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isGuestOnlyRoute = pathname === '/login' || pathname === '/register' || pathname === '/';
  const isDashboardRoute = pathname.startsWith('/dashboard');

  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (isGuestOnlyRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login', '/register', '/password-recovery'],
};
```

> **Nota:** En Next.js 16 el archivo de middleware se llama `proxy.ts` y la funcion exportada se llama `proxy` (no `middleware`).

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
- Se ganan al completar lecciones (5), instrucciones (10-25), modulos (30), programas (100)

### Daily Streaks
- Racha de dias consecutivos con actividad
- Bonus de XP creciente (capped a 7 dias)
- Se muestra en Home y perfil

### Achievements
- **34 logros** definidos en `src/config/achievements.ts`
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
- Redirect a /login en caso de fallo total

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

## Onboarding

Tutorial interactivo de 6 pasos usando **driver.js**:

1. Bienvenida a STANNUM Game
2. Video introductorio (Mux)
3. Navegacion (sidebar)
4. XP y niveles
5. Tins (moneda virtual)
6. Comenzar

Estado del tutorial se persiste en backend (`/user/tutorial/:name/complete`).

## Manejo de Errores

**Archivo:** `src/helpers/errorHandler.ts`

- Intercepta errores de Axios y los convierte a `AppError`
- Muestra `toast.error()` con mensaje descriptivo
- En desarrollo (`NEXT_PUBLIC_ENV=development`): logs en consola

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

---

**STANNUM 2025 - Repositorio Privado**
