# Lista de Tareas (Task List) 📝

Lista de tareas para el seguimiento del desarrollo y evolución de PocketTools.

## Fase 0: Inicialización y Contexto (Completado)
*   [x] Ejecutar inicialización del proyecto (`/InitIAproject`)
*   [x] Crear archivo de control de inicialización `AlvWasHere.md` en la raíz
*   [x] Generar el archivo de documentación principal `README.md`
*   [x] Crear estructura de contexto `.alvhere/` con `guideLines.md`, `PROJECT_CONTEXT.md`, `handoff.md` y `task.md`

## Fase 1: Modernización y Mejoras Locales
*   [ ] Revisar la usabilidad de la interfaz actual en móviles y aplicar las pautas de `experto-ux-mobile` (ej. asegurar tamaños de botones de 48px y espaciados basados en múltiplos de 8px en `docs/styles.css`).
*   [ ] Refactorizar la gestión de estado de `localStorage` en `docs/app.js` para estandarizar el guardado/recuperación de datos de cada herramienta.
*   [ ] Evaluar la unificación de los estilos comunes de las 15 herramientas para evitar duplicidad de CSS y mejorar la consistencia visual.
*   [ ] Implementar transiciones de página suaves y micro-animaciones en el dashboard principal (`docs/index.html`).

## Fase 2: Planificación de la Migración SaaS / React
*   [ ] Diseñar la estructura del nuevo frontend en Next.js (TypeScript + Tailwind CSS) dentro del directorio `/sources`.
*   [ ] Estructurar la lógica offline-first mediante IndexedDB (evaluar uso de Dexie.js) para reemplazar el flujo simple de localStorage actual.
*   [ ] Inicializar el backend en NestJS con la estructura básica de autenticación y las APIs REST necesarias según `sql_model.md`.
