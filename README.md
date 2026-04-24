# Matrimonios

Aplicacion web para una evaluacion matrimonial de iglesia, construida con Next.js, TypeScript y Supabase.

## Estado actual

El MVP funcional ya esta implementado y el proyecto se encuentra en fase de `Event Readiness`:

- flujo publico completo en `/encuesta`
- persistencia real en Supabase para `submissions` y `answers`
- resultados personalizados en `/resultado?token=...`
- descarga de PDF mediante vista imprimible en `/api/pdf?token=...`
- area administrativa protegida por PIN en `/administracion`
- exportacion CSV compatible con Excel en `/api/export`
- modo presentacion en `/administracion/presentacion`

La referencia de producto esta en `design.md` y la referencia de ejecucion/continuidad esta en `plan.md`.

## Stack

- Next.js App Router
- TypeScript
- Supabase
- Vercel

## Variables de entorno

El proyecto espera estas variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SECRET_KEY=
ADMIN_PIN=
```

Reglas importantes:

- `SUPABASE_SECRET_KEY` debe permanecer solo del lado del servidor
- `ADMIN_PIN` se valida del lado del servidor
- las mismas variables deben configurarse tambien en Vercel para produccion

## Desarrollo local

En esta maquina `node` y `npm` no estan en el `PATH`, asi que puede ser necesario usar la ruta completa de Node.js.

Ejemplos:

```powershell
& 'C:\Program Files\nodejs\node.exe' '.\node_modules\next\dist\bin\next' dev
& 'C:\Program Files\nodejs\node.exe' '.\node_modules\eslint\bin\eslint.js' .
& 'C:\Program Files\nodejs\node.exe' '.\node_modules\next\dist\bin\next' build
```

Si tu entorno ya tiene `node` y `npm` en el `PATH`, tambien funcionan los comandos normales:

```bash
npm run dev
npm run lint
npm run build
```

## Rutas principales

- `/` landing publica
- `/encuesta` flujo del participante
- `/resultado?token=...` resumen individual
- `/administracion` panel administrativo
- `/administracion/presentacion` modo presentacion
- `/api/survey` catalogo y envio de encuesta
- `/api/admin/pin` login/logout administrativo
- `/api/export` exportacion CSV
- `/api/pdf?token=...` vista imprimible para PDF

## Verificacion actual

Chequeo mas reciente en este repositorio:

- `eslint` ejecuta correctamente
- la compilacion de Next compila el proyecto, pero dentro del sandbox puede fallar despues con `spawn EPERM`
- ese fallo ya esta documentado como restriccion del entorno, no como defecto confirmado del proyecto

## Siguiente paso recomendado

La siguiente etapa practica es:

1. hacer QA manual de punta a punta
2. pulir detalles visuales o de copy detectados
3. configurar variables en Vercel
4. desplegar y validar la instancia de produccion
