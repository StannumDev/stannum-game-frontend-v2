# STANNUM Game - Frontend

**Plataforma educativa gamificada** construida con Next.js 16, React 19 y TypeScript. Interfaz de usuario moderna con gamificación completa: XP, niveles, logros, daily streaks, rankings y comunidad.

Este es un **repositorio privado**.

## 🎮 ¿Qué es STANNUM Game?

STANNUM Game es una plataforma educativa gamificada que combina contenido de alta calidad con mecánicas de juego para maximizar el engagement y la retención del aprendizaje. Los estudiantes completan lecciones (videos), realizan instrucciones prácticas calificadas por IA, ganan XP, suben de nivel, desbloquean logros y compiten en rankings.

## 🚀 Quick Start

### Prerequisitos

- Node.js 18+
- Backend API corriendo (ver `stannum-game-backend-v2`)

### Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Iniciar en desarrollo
npm run dev

# Build para producción
npm run build
npm start
```

La app estará disponible en `http://localhost:3000`.

## 🏗️ Stack Tecnológico

### Core

- **Framework:** Next.js 16.1.6 (App Router)
- **React:** 19.2.4
- **TypeScript:** 5.9.3
- **Styling:** Tailwind CSS 3.4.1

### State Management

- **Zustand 5.0.11** - State management global
  - `userStore` - Usuario, autenticación, achievements
  - `sidebarStore` - Estado del sidebar móvil

### Autenticación

- **js-cookie** - Manejo de JWT tokens
- **@react-oauth/google** - Google OAuth login
- **@google-recaptcha/react** - reCAPTCHA v3

### UI/UX

- **Framer Motion 12** - Animaciones fluidas con LazyMotion (`MotionProvider` global, componentes `m.*`)
- **Lucide React** - Iconografía moderna
- **driver.js** - Onboarding y tutorials interactivos
- **canvas-confetti** - Efectos de celebración (achievements, level up)
- **react-toastify** - Notificaciones toast
- **class-variance-authority** - Variantes de componentes
- **tailwind-merge** - Merge de clases Tailwind

### Formularios

- **React Hook Form 7.71** - Manejo de formularios
- **Zod 3.25** - Validación de schemas
- **@hookform/resolvers** - Integración Zod + RHF
- **input-otp** - Input de códigos OTP

### Multimedia

- **@mux/mux-player-react** - Reproductor de video Mux
- **@mux/blurup** - Placeholder blur de videos
- **react-easy-crop** - Crop de imágenes de perfil

### HTTP Client

- **Axios 1.13.5** - Requests HTTP al backend

### Utils

- **react-country-region-selector** - Selector de país/región
- **sharp** - Optimización de imágenes

## 📂 Estructura del Proyecto

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── login/                    # Login page
│   ├── register/                 # Registro y Google OAuth
│   ├── password-recovery/        # Recuperación de contraseña
│   └── dashboard/                # App principal (protegida)
│       ├── page.tsx              # Home dashboard
│       ├── library/              # Biblioteca de programas
│       │   ├── page.tsx          # Lista de programas
│       │   └── [program_id]/     # Detalles de programa
│       │       ├── page.tsx      # Overview del programa
│       │       ├── [section]/    # Secciones del programa
│       │       │   └── [program_module]/ # Módulos con lecciones
│       │       ├── lessons/      # Páginas de lecciones
│       │       │   └── [lessonId]/
│       │       └── instructions/ # Páginas de instrucciones
│       │           └── [instructionId]/
│       ├── community/            # Comunidad (prompts/assistants)
│       │   ├── prompts/
│       │   └── assistants/
│       ├── store/                # Tienda de programas
│       ├── profile/[username]/   # Perfil de usuario
│       └── search/               # Búsqueda de usuarios
│
├── components/                   # Componentes React
│   ├── ui/                       # Componentes base reutilizables
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── AnimatedCounter.tsx
│   │   └── ...
│   └── dashboard/                # Componentes específicos del dashboard
│       ├── home/                 # Home dashboard
│       ├── program/              # Lecciones e instrucciones
│       ├── community/            # Prompts y assistants
│       └── ...
│
├── services/                     # API calls al backend
│   ├── auth.ts                   # Login, register, Google OAuth
│   ├── user.ts                   # CRUD de usuario
│   ├── lesson.ts                 # Completar lecciones
│   ├── instruction.ts            # CRUD de instrucciones
│   ├── prompt.ts                 # CRUD de prompts
│   ├── assistant.ts              # CRUD de assistants
│   ├── ranking.ts                # Rankings
│   └── productKey.ts             # Activación de códigos
│
├── stores/                       # Zustand stores
│   ├── userStore.ts              # Usuario y autenticación
│   └── sidebarStore.ts           # Estado del sidebar
│
├── interfaces/                   # TypeScript interfaces
│   ├── user/                     # User, Level, Achievement
│   ├── program/                  # Program, Lesson, Instruction
│   ├── prompt/                   # Prompt
│   ├── assistant/                # Assistant
│   └── ...
│
├── helpers/                      # Funciones utilitarias
│   ├── errorHandler.ts           # Manejo de errores
│   ├── achievementHandler.ts     # Confetti de achievements
│   └── ...
│
├── hooks/                        # Custom React hooks
│   ├── useModuleProgress.ts      # Cálculo de progreso
│   └── ...
│
├── config/                       # Configuraciones
│   ├── achievements.ts           # Metadata de achievements
│   └── ...
│
└── utilities/                    # Helpers adicionales
    └── continue.ts               # Lógica de "Continuar viendo"
```

## 🌍 Variables de Entorno

```env
# API Backend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_client_id.apps.googleusercontent.com

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key

# AWS S3 (imágenes)
NEXT_PUBLIC_AWS_S3_BASE_URL=https://yourdomain.s3.region.amazonaws.com
NEXT_PUBLIC_AWS_S3_FOLDER_NAME=...
```

## 🎨 Páginas Principales

### Páginas Públicas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page |
| `/login` | Login con email/password o Google |
| `/register` | Registro de cuenta nueva |
| `/register/google` | Callback de Google OAuth |
| `/password-recovery` | Recuperación de contraseña con OTP |

### Dashboard (Autenticado)

| Ruta | Descripción |
|------|-------------|
| `/dashboard` | Home con continuar viendo, rankings, achievements |
| `/dashboard/library` | Biblioteca de programas |
| `/dashboard/library/[program_id]` | Detalles del programa |
| `/dashboard/library/[program_id]/lessons/[lessonId]` | Reproducir lección (video) |
| `/dashboard/library/[program_id]/instructions/[instructionId]` | Realizar instrucción práctica |
| `/dashboard/community` | Hub de comunidad |
| `/dashboard/community/prompts` | Explorar prompts compartidos |
| `/dashboard/community/assistants` | Explorar GPTs/assistants |
| `/dashboard/store` | Tienda para activar códigos |
| `/dashboard/profile/[username]` | Perfil público de usuario |
| `/dashboard/search` | Búsqueda de usuarios |

## 🔐 Autenticación

### Sistema de JWT

Tokens almacenados en cookies:

```typescript
// Login exitoso
Cookies.set('token', jwtToken, {
  expires: 365,  // 1 año
  secure: true,
  sameSite: 'strict'
});
```

### Flujo de Autenticación

```
Usuario ingresa a la app
  ↓
useUserStore.initUser()
  ├─ Leer cookie 'token'
  ├─ Si no existe → isAuthenticated = false
  └─ Si existe → POST /api/auth/auth-user
      ├─ Verificar token
      ├─ Retornar achievementsUnlocked + profileStatus
      └─ GET /api/user para obtener usuario completo
  ↓
set({ user, isAuthenticated: true })
```

### Middleware de Protección

La protección de rutas está implementada en `src/proxy.ts` (Next.js 16 lo reconoce como middleware):

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

> **Nota:** En Next.js 16 el archivo de middleware se llama `proxy.ts` y la función exportada se llama `proxy` (no `middleware`).

## 📊 State Management - Zustand

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

// Después de completar lección
await completeLessonService(...);
await refreshUser();  // Actualiza XP, level, achievements
```

**Detección de Achievements:**

```typescript
// En refreshUser():
if (user.achievements.length > previousLength) {
  const newAchievements = getNewAchievements();
  achievementHandler(newAchievements);  // 🎉 Confetti + toast
}
```

### sidebarStore

**Archivo:** `src/stores/sidebarStore.ts`

Maneja estado del sidebar móvil:

```typescript
interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}
```

## 🎬 Lecciones (Videos)

### Reproductor de Video

**Componente:** `src/components/dashboard/program/lessons/LessonVideoPlayer.tsx`

**Stack:**
- **Mux Player** para streaming de video
- **Blurup** para placeholders blur
- **Auto-save** de progreso cada 5 segundos

### Guardar Progreso

```typescript
useEffect(() => {
  const interval = setInterval(async () => {
    if (playerRef.current?.currentTime) {
      await saveLastWatchedLesson(
        programId,
        lessonId,
        playerRef.current.currentTime
      ).catch(() => {});  // Silent fail
    }
  }, 5000);

  return () => clearInterval(interval);
}, []);
```

### Completar Lección

```typescript
const handleComplete = async () => {
  try {
    const response = await completeLesson(programId, lessonId);

    // Mostrar XP ganado
    toast.success(`¡+${response.totalGain} XP!`);

    // Mostrar achievements desbloqueados
    if (response.achievementsUnlocked?.length) {
      achievementHandler(response.achievementsUnlocked);
    }

    // Actualizar usuario
    await refreshUser();
  } catch (error) {
    errorHandler(error);
  }
};
```

## 📝 Instrucciones (Tareas Prácticas)

### Estados de Instrucción

| Estado | Descripción | Clase CSS |
|--------|-------------|-----------|
| **PENDING** | No iniciada | `text-gray-500` |
| **IN_PROCESS** | Iniciada pero no enviada | `text-yellow-500` |
| **SUBMITTED** | Enviada, esperando AI | `text-blue-500` |
| **GRADED** | Calificada por AI | `text-green-500` |
| **ERROR** | Error en AI grading | `text-red-500` |

### Flujo de Instrucción

```typescript
// 1. Iniciar instrucción
await startInstruction(programId, instructionId);

// 2. Subir archivo (si deliverable = file)
const { presignedUrl } = await getPresignedUrl(programId, instructionId, {
  fileName: file.name,
  contentType: file.type
});

await axios.put(presignedUrl, file, {
  headers: { 'Content-Type': file.type }
});

// 3. Enviar instrucción
await submitInstruction(programId, instructionId, {
  s3Key: s3Key,  // O submittedText si es texto
});

// 4. Polling para detectar cuando AI termina
useEffect(() => {
  if (instruction?.status === "SUBMITTED") {
    const interval = setInterval(async () => {
      await refreshUser();
      // Si cambió a GRADED o ERROR, mostrar resultado
    }, 3000);
    return () => clearInterval(interval);
  }
}, [instruction?.status]);

// 5. Mostrar resultado
if (instruction.status === "GRADED") {
  // Mostrar score, observations, XP ganado
}
```

## 🏆 Sistema de Gamificación

### Componentes Clave

**AnimatedCounter**
```typescript
<AnimatedCounter value={user.level.experienceTotal} duration={1000} />
```

**Achievement Badge**
```typescript
{user.achievements.map(a => (
  <AchievementBadge
    key={a.achievementId}
    achievement={achievementConfig[a.achievementId]}
    unlockedAt={a.unlockedAt}
  />
))}
```

**Level Progress Bar**
```typescript
<ProgressBar
  current={user.level.experienceTotal - user.level.experienceCurrentLevel}
  max={user.level.experienceNextLevel - user.level.experienceCurrentLevel}
/>
```

### Confetti de Achievements

**Helper:** `src/helpers/achievementHandler.ts`

```typescript
export const achievementHandler = (achievements: Achievement[]) => {
  achievements.forEach((a) => {
    const config = achievementConfig[a.achievementId];

    // Confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Toast con achievement
    toast.success(
      <AchievementToast title={config.name} description={config.description} />,
      { duration: 5000 }
    );
  });
};
```

## 🎨 Componentes UI

### Componentes Base

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `Button` | `src/components/ui/button.tsx` | Botón con variantes (primary, secondary, ghost, etc.) |
| `Input` | `src/components/ui/input.tsx` | Input con validación visual |
| `Card` | `src/components/ui/card.tsx` | Card container con variantes |
| `AnimatedCounter` | `src/components/ui/AnimatedCounter.tsx` | Contador animado para XP |

### Variantes con CVA

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
        ghost: "hover:bg-gray-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

## 🌐 API Services

### Estructura de Services

Todos los services siguen el patrón:

```typescript
import api from '@/lib/api';

// api instance (src/lib/api.ts) includes:
// - baseURL from NEXT_PUBLIC_API_URL
// - withCredentials: true (cookies automáticos)
// - timeout: 15000ms
// - Interceptor de refresh token automático
// - Toast de "Sesión expirada" + redirect en caso de fallo

export const someAction = async (params) => {
  const response = await api.post('/endpoint', { ...params });
  return response.data;
};
```

### Services Disponibles

| Service | Endpoints Principales |
|---------|----------------------|
| `auth.ts` | login, register, Google OAuth, authUserByToken, logout, password recovery, updateUsername |
| `user.ts` | getUserByTokenClient, editUser, uploadProfilePhoto |
| `lesson.ts` | completeLesson (returns achievementsUnlocked), saveLastWatchedLesson |
| `instruction.ts` | startInstruction, submitInstruction, retryGrading |
| `prompt.ts` | getPrompts, createPrompt, updatePrompt, deletePrompt |
| `assistant.ts` | getAssistants, createAssistant, updateAssistant |
| `ranking.ts` | getRanking |
| `productKey.ts` | activateProductKey |

## 🔍 Búsqueda y Filtros

### Comunidad (Prompts/Assistants)

**Filtros disponibles:**
- Category (Productividad, Marketing, Programación, etc.)
- Difficulty (Fácil, Intermedio, Avanzado)
- SortBy (Más recientes, Más vistos, Más copiados)

**Búsqueda:**
```typescript
const [filters, setFilters] = useState({
  search: '',
  category: '',
  difficulty: '',
  sortBy: 'recent'
});

const prompts = await getPrompts(filters);
```

## 📱 PWA (Progressive Web App)

### Install Prompt Modal

**Componente:** `src/components/InstallPromptModal.tsx`

Detecta soporte de PWA y muestra modal de instalación:

```typescript
useEffect(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
    setShowModal(true);
  });
}, []);

const handleInstall = () => {
  deferredPrompt?.prompt();
  deferredPrompt?.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      toast.success('¡App instalada!');
    }
  });
};
```

## 🎓 Onboarding

**Driver.js** para tours interactivos:

```typescript
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: '#sidebar',
      popover: {
        title: 'Navegación',
        description: 'Aquí puedes navegar...'
      }
    },
    {
      element: '#xp-display',
      popover: {
        title: 'Tu XP',
        description: 'Gana XP completando...'
      }
    }
  ]
});

driverObj.drive();
```

## 🚦 Manejo de Errores

### errorHandler Helper

**Archivo:** `src/helpers/errorHandler.ts`

```typescript
export const errorHandler = (error: unknown): AppError => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.msg || 'Error de conexión';
    const code = error.response?.data?.code || 'SERVER_ERROR';
    return { message, code };
  }

  return {
    message: 'Error inesperado',
    code: 'UNKNOWN_ERROR'
  };
};
```

**Uso:**

```typescript
try {
  await someAction();
} catch (err) {
  const appError = errorHandler(err);
  toast.error(appError.message);
}
```

## 🎯 Hooks Personalizados

### useModuleProgress

**Archivo:** `src/hooks/useModuleProgress.ts`

Calcula progreso de módulo basado en lecciones completadas:

```typescript
export const useModuleProgress = (
  moduleId: string,
  programId: string
) => {
  const { user } = useUserStore();

  const module = getModuleById(moduleId);
  const completed = user?.programs[programId]?.lessonsCompleted.filter(
    l => module.lessons.some(ml => ml.id === l.lessonId)
  ).length ?? 0;

  return {
    completed,
    total: module.lessons.length,
    percentage: (completed / module.lessons.length) * 100
  };
};
```

## 🔗 Comunicación con Backend

**Base URL:** Configurada en `.env.local`

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Ej: http://localhost:8000/api
```

**Autenticación:** JWT token en header `Authorization: Bearer {token}`

**Cookies:** Token almacenado en cookie `token` con 365 días de expiración

---

**© STANNUM 2025 - Repositorio Privado**
