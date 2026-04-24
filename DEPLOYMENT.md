# QA y Despliegue

Este archivo resume la fase actual de `Event Readiness` y sirve como checklist operativa para la salida a produccion.

## Variables en Vercel

Configurar estas variables en el proyecto de Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SECRET_KEY=
ADMIN_PIN=
```

Verificar antes de publicar:

- `NEXT_PUBLIC_SUPABASE_URL` apunta al proyecto correcto de Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` es la publishable key publica
- `SUPABASE_SECRET_KEY` o service role solo existe del lado servidor
- `ADMIN_PIN` coincide con el PIN esperado por liderazgo

Auditoria local ya confirmada en esta sesion:

- `.env.local` contiene las 4 variables requeridas
- no hace falta inventar nombres nuevos para Vercel

## Carga en Vercel

Crear cada variable en estos entornos:

- `Production`
- `Preview`
- `Development` si tambien se usara el entorno de Vercel para correr localmente

Checklist de carga:

1. abrir el proyecto en Vercel
2. entrar a `Settings > Environment Variables`
3. copiar una por una las claves desde `.env.local`
4. pegar exactamente el mismo nombre de variable
5. asignarla al menos a `Preview` y `Production`
6. guardar cambios
7. volver a desplegar el proyecto para que los cambios tomen efecto

Validacion rapida despues de cargar variables:

- la landing carga sin errores
- `/encuesta` puede obtener la definicion de preguntas
- enviar una encuesta crea datos en Supabase
- `/administracion` acepta el PIN correcto
- `/api/export` responde solo despues de autenticacion admin

## QA funcional

### Flujo publico

- abrir `/`
- confirmar que el CTA principal dirige a `/encuesta`
- completar una encuesta para `Hombre`
- completar una encuesta para `Mujer`
- verificar que el flujo muestra 20 preguntas en cada caso
- verificar que no se puede enviar una encuesta incompleta
- confirmar redireccion al resultado al terminar

### Resultado

- abrir `/resultado?token=...` con un token real
- confirmar que muestra 1 fortaleza y 2 areas debiles
- confirmar que cada area debil muestra toda su lista de sugerencias
- abrir el boton `Descargar PDF`
- verificar que la vista imprimible carga y que el navegador permite guardar PDF
- probar tambien el caso sin token y con token invalido

### Administracion

- abrir `/administracion` sin sesion y confirmar que pide PIN
- probar un PIN invalido y confirmar rechazo
- probar el PIN correcto y confirmar acceso
- verificar conteo total, hombres, mujeres y ultima encuesta completada
- descargar `/api/export` desde una sesion activa
- abrir el CSV en Excel y confirmar columnas y caracteres
- abrir `/administracion/presentacion` y revisar el recorrido completo
- cerrar sesion y confirmar que `/administracion` vuelve a pedir PIN

## QA visual

- revisar en movil el flujo completo de encuesta
- revisar en desktop landing, resultado y administracion
- confirmar que no hay desbordes horizontales
- confirmar contraste legible en botones, tarjetas y texto pequeno
- revisar que el logo del footer cargue correctamente
- confirmar que `resultado` y `administracion` queden con `noindex`

## Verificacion tecnica

- ejecutar `lint`
- ejecutar `build` fuera del sandbox si el entorno local bloquea `.next`
- confirmar que Supabase recibe nuevas filas en `submissions` y `answers`
- confirmar que las variables de Vercel quedaron tanto en `Preview` como en `Production`

## Publicacion

1. subir el repositorio a GitHub si aun no esta publicado
2. importar el repositorio en Vercel
3. configurar variables de entorno
4. desplegar un preview
5. correr QA rapido sobre el preview
6. promover a produccion
7. repetir QA minimo en produccion con una encuesta real de prueba

## Riesgos conocidos

- en esta maquina `node` y `npm` no estan en `PATH`, asi que puede tocar usar `node.exe` directo
- dentro del sandbox local, `next build` puede fallar por permisos sobre `.next`
- el PDF depende de la impresion del navegador, no de un generador binario en servidor
