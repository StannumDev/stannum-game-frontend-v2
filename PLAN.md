# Plan: Implementación de Refresh Token

## Contexto actual
- JWT con expiración de 1 año (8760h) - básicamente no expira
- Token guardado en cookie `token` (js-cookie, no httpOnly)
- Cada servicio lee el token manualmente con `Cookies.get("token")`
- No hay axios interceptors, no hay manejo de 401 automático
- 10 archivos de servicios repiten el patrón de lectura de token

## Arquitectura propuesta
- **Access token**: JWT, 1 hora de vida, enviado como `Authorization: Bearer`
- **Refresh token**: UUID random, 30 días de vida, guardado en cookie `refreshToken`
- **Revocación**: el refresh token se hashea y se guarda en el user model. Al hacer logout se borra, invalidando el token

## Cambios Backend (4 archivos)

### 1. `helpers/newJWT.js`
- Cambiar expiración de `8760h` a `1h`
- Agregar función `newRefreshToken()` que genera UUID con `crypto.randomUUID()` y calcula `expiresAt = Date.now() + 30 días`
- Agregar función `hashToken(token)` con `crypto.createHash('sha256')`

### 2. `models/userModel.js`
- Agregar campo al schema:
```js
refreshToken: {
    hash: { type: String, default: null },
    expiresAt: { type: Date, default: null }
}
```

### 3. `controllers/authController.js`
- **login**: generar refresh token, hashear y guardar en user, retornar `{ token, refreshToken }`
- **createUser (register)**: igual, retornar ambos tokens
- **googleAuth**: igual
- **Nuevo endpoint `refreshAccessToken`**: recibe refreshToken, valida hash contra DB, valida que no expiró, genera nuevo access token, retorna `{ token }`

### 4. `routes/authRoutes.js`
- Agregar ruta `POST /refresh` → `authController.refreshAccessToken` (con rate limiter)

## Cambios Frontend (12+ archivos)

### 5. Crear `src/lib/api.ts` - Instancia de Axios centralizada
- Crea instancia axios con baseURL
- **Request interceptor**: inyecta `Authorization: Bearer` desde cookie automáticamente
- **Response interceptor**: si recibe 401 `JWT_EXPIRED_TOKEN`:
  1. Lee `refreshToken` de cookie
  2. Llama a `POST /auth/refresh` con el refresh token
  3. Guarda nuevo access token en cookie
  4. Reintenta la request original
  5. Si el refresh también falla → logout
- Cola de requests pendientes mientras se hace refresh (evita múltiples refreshes simultáneos)

### 6. `services/auth.ts`
- **requestLogin**: guardar ambos tokens en cookies (`token` + `refreshToken`)
- **createUser**: igual
- **googleLogin**: igual
- **logout**: borrar ambas cookies + llamar endpoint de logout en backend (que borra el refresh hash del user)
- Agregar `refreshAccessToken()` que llama a `POST /auth/refresh`
- Cookie del refresh token: expires 30 días, secure, sameSite Strict

### 7-12. Migrar todos los servicios a usar `api` (la instancia centralizada)
Los archivos que cambian:
- `services/user.ts`
- `services/lesson.ts`
- `services/instruction.ts`
- `services/profilePhoto.ts`
- `services/productKey.ts`
- `services/prompt.ts`
- `services/assistant.ts`
- `services/ranking.ts`

En cada uno:
- Reemplazar `import axios from 'axios'` → `import { api } from '@/lib/api'`
- Eliminar el bloque `tokenError` duplicado
- Eliminar `Cookies.get("token")` manual y la inyección de headers
- Usar `api.get(...)`, `api.post(...)` directamente (el interceptor maneja el token)

### 13. `services/userServer.ts` (server-side)
- Este archivo se usa en server components, no puede usar el interceptor del cliente
- Mantener lectura manual de token desde cookies de Next.js (next/headers)

### 14. `stores/userStore.ts`
- `initUser`: ya no pasa `token` a `authUserByToken()` — el interceptor lo inyecta
- Sin cambios grandes, el interceptor maneja todo transparentemente

## Orden de implementación
1. Backend: `newJWT.js` + `userModel.js` (fundamentos)
2. Backend: `authController.js` + `authRoutes.js` (endpoint de refresh)
3. Frontend: `lib/api.ts` (interceptor)
4. Frontend: `services/auth.ts` (login/register guardan ambos tokens)
5. Frontend: Migrar cada servicio a usar `api`
6. Testing manual: login → esperar expiración → verificar refresh automático
