# IntegrateNew — Guía de Integración de Nuevas Herramientas a PocketTools

> **Audiencia**: Este documento es exclusivamente para el agente IA (Antigravity/Gemini).
> Define las reglas exactas, plantillas y pasos para transformar un archivo HTML autónomo
> ubicado en la carpeta `NUEVAS/` en una herramienta completamente integrada al sistema
> estático de PocketTools dentro de `docs/`.

---

## 1. Contexto del Sistema

### 1.1 Arquitectura General
PocketTools es un sitio **100% estático** (sin servidor). Cada herramienta es un archivo HTML
independiente dentro de `docs/` que funciona de manera autónoma:

```
pockettools/
├── NUEVAS/              ← HTMLs autónomos de entrada (input del usuario)
├── docs/                ← Sitio estático desplegado (output final)
│   ├── index.html       ← Dashboard principal con grid de herramientas
│   ├── styles.css       ← Hoja de estilos compartida (sistema de diseño)
│   ├── app.js           ← ⚠️ ARCHIVO LEGACY — NO SE USA, NO MODIFICAR
│   ├── notes.html       ← Herramienta individual
│   ├── counter.html     ← Herramienta individual
│   ├── ...              ← Más herramientas
│   └── {nueva}.html     ← ← La nueva herramienta se crea aquí
└── IntegrateNew.md      ← Este archivo
```

### 1.2 Principios Clave
- **Cero dependencias de servidor**: Todo funciona con `file://` o cualquier hosting estático.
- **Cada HTML es autónomo**: Contiene TODO su markup, estilos específicos y JS inline.
- **Estilo compartido vía `styles.css`**: El sistema de diseño base (temas, tipografía, grid, botones, inputs) vive en este archivo CSS único.
- **`app.js` está DEPRECADO**: NO se referencia desde ningún HTML. Ignorar completamente.
- **JavaScript es 100% inline**: Cada herramienta tiene un único bloque `<script>` al final del `<body>`.

---

## 2. Inventario Actual de Herramientas

| TOOL_ID     | Nombre Visible          | Icono Font Awesome                      | Archivo         |
|-------------|-------------------------|-----------------------------------------|-----------------|
| `notes`     | Notas Rápidas           | `fa-regular fa-note-sticky`             | `notes.html`    |
| `counter`   | Contador                | `fa-solid fa-stopwatch`                 | `counter.html`  |
| `password`  | Generador Pass          | `fa-solid fa-key`                       | `password.html` |
| `todo`      | Lista Tareas            | `fa-solid fa-check-double`              | `todo.html`     |
| `converter` | Conversor               | `fa-solid fa-arrow-right-arrow-left`    | `converter.html`|
| `fuel`      | Control Gasolina        | `fa-solid fa-gas-pump`                  | `fuel.html`     |
| `sudoku`    | Sudoku Master           | `fa-solid fa-chess-board`               | `sudoku.html`   |
| `tasks`     | Tareas & Estadísticas   | `fa-solid fa-list-check`                | `tasks.html`    |
| `timer`     | Cuenta Regresiva        | `fa-solid fa-hourglass-half`            | `timer.html`    |
| `gastos`    | Control de Gastos       | `fa-solid fa-coins`                     | `gastos.html`   |
| `shopping`  | Lista de Compras        | `fa-solid fa-cart-shopping`             | `shopping.html` |
| `tiers`     | Hitos Históricos        | `fa-solid fa-clock-rotate-left`         | `tiers.html`    |
| `guided`    | Notas Guiadas           | `fa-solid fa-map-location-dot`          | `guided.html`   |
| `tracker`   | Seguimiento Personas    | `fa-solid fa-people-arrows`             | `tracker.html`  |
| `ritmo`     | Calendario Ciclo        | `fa-solid fa-calendar-days`             | `ritmo.html`    |

---

## 3. Plantilla HTML Exacta de una Herramienta

Cada archivo HTML en `docs/` DEBE seguir esta estructura exacta. Las secciones marcadas
con `{PLACEHOLDER}` son los puntos de personalización:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>PocketTools | {NOMBRE_VISIBLE}</title>

    <!-- Fuentes Externas -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">

    <!-- Iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Estilos Compartidos -->
    <link rel="stylesheet" href="styles.css">

    <!-- Estilos Específicos de la Herramienta (OPCIONAL) -->
    <style>
        /* CSS específico de esta herramienta va aquí */
        /* Usar variables CSS del sistema: var(--bg-color), var(--surface-color), etc. */
        {ESTILOS_ESPECIFICOS}
    </style>
</head>

<body>
    <div class="app-container tool-view active">

        <!-- Header de Herramienta (OBLIGATORIO — estructura exacta) -->
        <div class="tool-header">
            <a href="index.html" class="back-btn" aria-label="Volver">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
            <h2 class="tool-title" style="flex:1;">{NOMBRE_VISIBLE}</h2>
            <button id="theme-toggle" class="secondary-btn" aria-label="Cambiar Tema"
                style="padding: 8px; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                <i class="fa-solid fa-moon"></i>
            </button>
        </div>

        <!-- Contenido Principal -->
        <div id="tool-content" style="flex: 1; display: flex; flex-direction: column;">
            {CONTENIDO_HTML_DE_LA_HERRAMIENTA}
        </div>

    </div>

    <script>
        // === Theme System === (OBLIGATORIO — copiar TEXTUALMENTE, solo cambiar TOOL_ID)
        const TOOL_ID = '{TOOL_ID}';
        const themeBtn = document.getElementById('theme-toggle');

        function loadTheme() {
            const saved = JSON.parse(localStorage.getItem('pt_tool_themes') || '{}');
            applyTheme(saved[TOOL_ID] || 'dark');
        }

        function toggleTheme() {
            const list = ['dark', 'light', 'matrix', 'kids', 'cyberpunk', 'nordic', 'forest'];
            const saved = JSON.parse(localStorage.getItem('pt_tool_themes') || '{}');
            let current = saved[TOOL_ID] || 'dark';
            let idx = list.indexOf(current);
            if (idx === -1) idx = 0;
            const next = list[(idx + 1) % list.length];
            saved[TOOL_ID] = next;
            localStorage.setItem('pt_tool_themes', JSON.stringify(saved));
            applyTheme(next);
        }

        function applyTheme(theme) {
            if (theme === 'dark') document.documentElement.removeAttribute('data-theme');
            else document.documentElement.setAttribute('data-theme', theme);
            updateThemeIcon(theme);
        }

        function updateThemeIcon(theme) {
            const icon = themeBtn.querySelector('i');
            icon.className = ''; icon.style.color = '';
            switch (theme) {
                case 'light': icon.className = 'fa-solid fa-sun'; icon.style.color = '#f59e0b'; break;
                case 'matrix': icon.className = 'fa-solid fa-terminal'; icon.style.color = '#00ff41'; break;
                case 'kids': icon.className = 'fa-solid fa-shapes'; icon.style.color = '#ef4444'; break;
                case 'cyberpunk': icon.className = 'fa-solid fa-robot'; icon.style.color = '#00ffff'; break;
                case 'nordic': icon.className = 'fa-regular fa-snowflake'; icon.style.color = '#88c0d0'; break;
                case 'forest': icon.className = 'fa-solid fa-tree'; icon.style.color = '#95d5b2'; break;
                default: icon.className = 'fa-solid fa-moon'; break;
            }
        }

        themeBtn.addEventListener('click', toggleTheme);
        loadTheme();

        // === Tool Logic ===
        {JAVASCRIPT_ESPECIFICO_DE_LA_HERRAMIENTA}
    </script>
</body>

</html>
```

---

## 4. Sistema de Temas — Detalle Técnico

### 4.1 Temas Disponibles
Los 7 temas definidos en `styles.css` son:

| Tema        | Selector CSS              | Color Primario | Fuente Override       |
|-------------|---------------------------|----------------|-----------------------|
| `dark`      | `:root` (por defecto)     | `#3b82f6`      | `Outfit`              |
| `light`     | `[data-theme="light"]`    | `#ec4899`      | `Outfit`              |
| `matrix`    | `[data-theme="matrix"]`   | `#00ff41`      | `Courier New`         |
| `kids`      | `[data-theme="kids"]`     | `#f59e0b`      | `Comic Sans MS`       |
| `cyberpunk` | `[data-theme="cyberpunk"]`| `#00ffff`      | `Courier New`         |
| `nordic`    | `[data-theme="nordic"]`   | `#88c0d0`      | `Outfit`              |
| `forest`    | `[data-theme="forest"]`   | `#95d5b2`      | `Outfit`              |

### 4.2 Variables CSS Disponibles
Los estilos específicos de la herramienta DEBEN usar estas variables para ser compatibles
con todos los temas:

```css
var(--bg-color)         /* Fondo principal */
var(--surface-color)    /* Fondo de tarjetas/paneles (incluye transparencia para glassmorphism) */
var(--surface-border)   /* Color de bordes */
var(--primary-color)    /* Color de acento principal */
var(--primary-hover)    /* Color hover del acento */
var(--text-color)       /* Color de texto principal */
var(--text-muted)       /* Color de texto secundario/muted */
var(--input-bg)         /* Fondo de inputs */
var(--radius)           /* Border-radius del tema (varía: 0px matrix, 24px kids, etc.) */
var(--shadow)           /* Sombra estándar */
var(--glow)             /* Resplandor/glow */
var(--font-family)      /* Familia tipográfica del tema */
var(--transition)       /* Transición estándar: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) */
var(--h1-gradient)      /* Gradiente para títulos h1 */
```

### 4.3 Almacenamiento de Temas
- **Dashboard (index.html)**: Usa `localStorage.getItem('pt_theme')` — clave simple string.
- **Herramientas individuales**: Usan `localStorage.getItem('pt_tool_themes')` — objeto JSON `{ "toolId": "themeName" }`.
- **Diferencia clave**: El index usa `pt_theme`, las herramientas usan `pt_tool_themes[TOOL_ID]`.

---

## 5. Clases CSS Reutilizables de `styles.css`

Las siguientes clases están disponibles sin necesidad de redefinirlas:

### Layout
- `.app-container` — Contenedor raíz (max-width: 600px, centrado, flex column)
- `.tool-view` — Vista de herramienta (oculta por defecto)
- `.tool-view.active` — Vista activa (display: flex + animación slideIn)
- `.tool-header` — Barra superior con botón volver + título + theme toggle
- `.back-btn` — Estilo del botón de retorno
- `.tool-title` — Estilo del título h2
- `.fade-in` — Animación fadeIn
- `.hidden` — Ocultar elemento

### Formularios
- `.input-group` — Contenedor de campo (margin-bottom: 16px)
- `input`, `textarea`, `select` — Estilos base ya aplicados globalmente
- `.primary-btn` — Botón principal (fondo primary, texto blanco, full-width)
- `.secondary-btn` — Botón secundario (transparente con borde)

### Tablas
- `.glass-table` — Tabla con estilo glassmorphism
- `.glass-table th`, `.glass-table td` — Celdas con bordes y padding
- `.delete-btn-sm` — Botón de eliminar pequeño (icono rojo)
- `.reset-row` — Fila de corte/cierre
- `.reset-cell` — Celda de corte/cierre

### Componentes Específicos (ya definidos)
- `.counter-display`, `.counter-controls`, `.counter-btn` — Componentes del contador
- `.btn-minus`, `.btn-plus`, `.btn-reset` — Botones de acción del contador
- `.status-indicator`, `.saved-dot` — Indicadores de estado
- `#notes-area` — Textarea de notas

---

## 6. Convención de localStorage

### Regla de Naming
Todas las claves de localStorage DEBEN usar el prefijo `pt_` seguido del TOOL_ID y un descriptor:

```
pt_{TOOL_ID}_{descriptor}
```

### Ejemplos del sistema actual:
| Clave                  | Herramienta | Propósito                       |
|------------------------|-------------|---------------------------------|
| `pt_theme`             | index       | Tema global del dashboard       |
| `pt_tool_themes`       | (global)    | JSON de temas por herramienta   |
| `pt_counter_val`       | counter     | Valor actual del contador       |
| `pt_notes_content`     | notes       | Texto de las notas              |
| `pt_fuel_logs`         | fuel        | Array JSON de tanqueos          |
| `pt_expenses`          | gastos      | Array JSON de gastos            |
| `pt_expense_sources`   | gastos      | Array JSON de fuentes de ingreso|
| `pt_expense_cierre`    | gastos      | Timestamp del último cierre     |
| `pt_guided_notes`      | guided      | Array JSON de notas guiadas     |
| `pt_shopping_data`     | shopping    | Array JSON de lista de compras  |
| `pt_ritmo_date`        | ritmo       | Fecha del ciclo                 |
| `pt_todos`             | todo        | Array JSON de tareas            |
| `pt_tasks`             | tasks       | Array JSON de tareas avanzadas  |
| `pt_tasks_stats`       | tasks       | Estadísticas de tareas          |

---

## 7. Procedimiento de Integración — Paso a Paso

### Paso 0: Validar el archivo fuente
1. Leer el archivo HTML de `NUEVAS/{nombre}.html`.
2. Verificar que sea un HTML válido y autónomo.
3. Identificar:
   - **Nombre visible** de la herramienta (para el título y la tarjeta).
   - **TOOL_ID**: derivar del nombre del archivo sin extensión, en minúsculas, sin espacios ni caracteres especiales. Ejemplo: `mi-receta.html` → `mi-receta` o simplificar a `receta`.
   - **Icono**: Seleccionar un icono apropiado de [Font Awesome 6.4 Free](https://fontawesome.com/icons) que represente la funcionalidad.
   - **Contenido HTML**: Extraer solo el contenido funcional (sin `<html>`, `<head>`, `<body>` wrapper).
   - **CSS específico**: Extraer los estilos que NO estén cubiertos por `styles.css`.
   - **JavaScript**: Extraer la lógica funcional.

### Paso 1: Crear el archivo HTML adaptado en `docs/`
1. Usar la **plantilla exacta de la Sección 3**.
2. Reemplazar todos los `{PLACEHOLDER}`:
   - `{NOMBRE_VISIBLE}` → Nombre legible en español.
   - `{TOOL_ID}` → ID único en minúsculas (SOLO en la línea `const TOOL_ID = '...'`).
   - `{ESTILOS_ESPECIFICOS}` → CSS propio (adaptado a variables del sistema).
   - `{CONTENIDO_HTML_DE_LA_HERRAMIENTA}` → Markup funcional adaptado.
   - `{JAVASCRIPT_ESPECIFICO_DE_LA_HERRAMIENTA}` → Lógica adaptada.

### Paso 2: Adaptar estilos al sistema de diseño
**OBLIGATORIO** — Los estilos del HTML original deben ser transformados:

| En el HTML original                         | Adaptar a...                                      |
|---------------------------------------------|---------------------------------------------------|
| `background: #222`                          | `background: var(--surface-color)`                |
| `color: white`                              | `color: var(--text-color)`                        |
| `color: gray` o texto secundario            | `color: var(--text-muted)`                        |
| `background: blue` o color de acento        | `background: var(--primary-color)`                |
| `border: 1px solid #333`                    | `border: 1px solid var(--surface-border)`         |
| `border-radius: 8px`                        | `border-radius: var(--radius)`                    |
| `font-family: Arial`                        | `font-family: var(--font-family)`                 |
| `background: #111` en inputs                | `background: var(--input-bg)`                     |
| `box-shadow: ...`                           | `box-shadow: var(--shadow)` o `var(--glow)`       |
| `transition: all 0.3s ease`                 | `transition: var(--transition)`                   |
| Gradientes en títulos                       | `background: var(--h1-gradient)` + clip           |
| Colores fijos para hover                    | `background: var(--primary-hover)`                |
| Fondo de la página body                     | NO tocar — `styles.css` ya lo maneja              |

**REGLA CRÍTICA**: Nunca usar colores hardcodeados para elementos temáticos. Usar SIEMPRE
las variables CSS. Solo se permiten colores fijos para:
- Colores semánticos (rojo error `#ef4444`, verde éxito `#22c55e`, amarillo aviso `#f59e0b`).
- Gradientes decorativos de la herramienta que sean parte de su identidad visual.
- Fondos con opacity/rgba para efectos glassmorphism.

### Paso 3: Adaptar localStorage
1. Renombrar TODAS las claves de localStorage del HTML original al formato `pt_{TOOL_ID}_{descriptor}`.
2. Verificar que no colisionen con las claves existentes (ver tabla Sección 6).
3. Si el original usa `sessionStorage`, evaluar si convertir a `localStorage` para persistencia.

### Paso 4: Adaptar el JavaScript
1. Preservar TODA la lógica funcional del HTML original.
2. **NO eliminar funcionalidades** — la herramienta adaptada debe hacer exactamente lo mismo.
3. Si el original usa librerías externas vía CDN (Chart.js, jsPDF, etc.), mantener los `<script src="...">` **antes** del bloque `<script>` principal.
4. Si el original usa `fetch()` a APIs externas, mantenerlo tal cual.
5. Eliminar cualquier código de tema/dark mode del original — será reemplazado por el Theme System estándar.

### Paso 5: Agregar la entrada al `index.html`
Insertar un nuevo bloque `<a>` en la sección `<div id="tools-grid" class="tools-grid">`
del archivo `docs/index.html`, **antes del cierre `</div>` del grid** (después de la
última herramienta existente):

```html
<a href="{TOOL_ID}.html" class="tool-card">
    <i class="{CLASES_ICONO_FONT_AWESOME} tool-icon"></i>
    <div class="tool-name">{NOMBRE_VISIBLE}</div>
</a>
```

**Reglas para la entrada del index:**
- El `href` debe apuntar al archivo `.html` en el mismo directorio.
- Las clases del icono DEBEN ser de Font Awesome 6.4 Free (solid, regular o brands).
- El nombre visible debe ser conciso (máx. ~20 caracteres para que quepa en la tarjeta).
- La posición en el grid determina el orden visual (el grid es de 2 columnas).

### Paso 6: Verificación
Después de crear ambos archivos, verificar:

1. **Estructura HTML**:
   - [ ] El archivo sigue la plantilla exacta de la Sección 3.
   - [ ] El `<title>` sigue el formato `PocketTools | {Nombre}`.
   - [ ] El header tiene el botón volver (`href="index.html"`), título y theme toggle.
   - [ ] El contenedor principal usa `class="app-container tool-view active"`.
   - [ ] El contenido está dentro de `<div id="tool-content" ...>`.

2. **Theme System**:
   - [ ] El bloque Theme System está copiado textualmente.
   - [ ] `const TOOL_ID` usa un valor único que no existe en la tabla de la Sección 2.
   - [ ] No hay código de tema/dark mode residual del HTML original.

3. **Estilos**:
   - [ ] Todos los colores temáticos usan variables CSS.
   - [ ] Los estilos específicos están en un bloque `<style>` en el `<head>`.
   - [ ] Se reutilizan las clases existentes de `styles.css` donde sea posible.

4. **JavaScript**:
   - [ ] El JS está en un único bloque `<script>` inline al final del `<body>`.
   - [ ] Las claves de localStorage siguen la convención `pt_{TOOL_ID}_{descriptor}`.
   - [ ] No hay `console.log` residuales en producción.
   - [ ] Todas las funcionalidades del original se mantienen.

5. **Index**:
   - [ ] Se agregó la entrada `<a class="tool-card">` al grid.
   - [ ] El icono es apropiado y existe en Font Awesome 6.4 Free.
   - [ ] El `href` apunta correctamente al nuevo archivo.

---

## 8. Reglas Especiales y Advertencias

### 8.1 NO hacer
- ❌ **NO referenciar `app.js`** desde ningún HTML — está deprecado.
- ❌ **NO agregar `<link rel="manifest">` ni meta PWA** — el sistema actual no las usa.
- ❌ **NO crear archivos JS externos** para herramientas — todo debe ser inline.
- ❌ **NO modificar `styles.css`** para agregar estilos específicos de la herramienta nueva — usar `<style>` en el `<head>` del HTML.
- ❌ **NO cambiar la estructura del Theme System** — copiarlo textual, solo cambiar `TOOL_ID`.
- ❌ **NO agregar `<footer>`** en las herramientas individuales — solo `index.html` tiene footer.
- ❌ **NO usar emojis como iconos** — usar exclusivamente Font Awesome.
- ❌ **NO usar IDs genéricos** que puedan colisionar (como `btn`, `input`, `list`) — prefixar con el TOOL_ID.

### 8.2 SÍ hacer
- ✅ **SÍ usar `backdrop-filter: blur(12px)`** para efectos glassmorphism en paneles.
- ✅ **SÍ mantener `max-width: 600px`** — la app está diseñada como mobile-first.
- ✅ **SÍ agregar `aria-label`** en botones de solo icono para accesibilidad.
- ✅ **SÍ usar `inputmode="numeric"` o `inputmode="decimal"`** en inputs numéricos para teclado móvil.
- ✅ **SÍ usar zona horaria `'America/Bogota'`** si se manejan fechas/horas.
- ✅ **SÍ usar formato de fecha `'sv-SE'`** para formato ISO en claves/storage.
- ✅ **SÍ preservar la funcionalidad al 100%** del HTML original.

### 8.3 Librerías externas permitidas
Si la herramienta original usa CDNs, mantenerlos. Las librerías ya usadas en el proyecto:
- **Font Awesome 6.4.0** — Iconos (ya incluida en la plantilla).
- **Google Fonts (Outfit)** — Tipografía (ya incluida en la plantilla).
- **Chart.js** — Gráficas (usado por `tasks.html`).
- **jsPDF** — Generación de PDFs (usado por `sudoku.html`).
- Cualquier otra librería CDN que el HTML original necesite es aceptable.

---

## 9. Ejemplo Completo de Integración

### Input: `NUEVAS/reloj.html` (ejemplo simplificado)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Reloj</title>
    <style>
        body { background: #1a1a1a; color: white; font-family: monospace; }
        .clock { font-size: 4rem; text-align: center; margin-top: 100px; }
    </style>
</head>
<body>
    <div class="clock" id="clock">00:00:00</div>
    <script>
        function tick() {
            document.getElementById('clock').textContent =
                new Date().toLocaleTimeString('es-CO', { timeZone: 'America/Bogota' });
        }
        setInterval(tick, 1000);
        tick();
    </script>
</body>
</html>
```

### Output: `docs/reloj.html`
```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>PocketTools | Reloj</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
    <style>
        .clock-display {
            font-size: 4rem;
            text-align: center;
            font-weight: 800;
            margin: 40px 0;
            font-variant-numeric: tabular-nums;
            color: var(--primary-color);
            text-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
        }
    </style>
</head>

<body>
    <div class="app-container tool-view active">
        <div class="tool-header">
            <a href="index.html" class="back-btn" aria-label="Volver">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
            <h2 class="tool-title" style="flex:1;">Reloj</h2>
            <button id="theme-toggle" class="secondary-btn" aria-label="Cambiar Tema"
                style="padding: 8px; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                <i class="fa-solid fa-moon"></i>
            </button>
        </div>
        <div id="tool-content" style="flex: 1; display: flex; flex-direction: column;">
            <div class="clock-display" id="reloj-clock">00:00:00</div>
        </div>
    </div>

    <script>
        // === Theme System ===
        const TOOL_ID = 'reloj';
        const themeBtn = document.getElementById('theme-toggle');

        function loadTheme() {
            const saved = JSON.parse(localStorage.getItem('pt_tool_themes') || '{}');
            applyTheme(saved[TOOL_ID] || 'dark');
        }

        function toggleTheme() {
            const list = ['dark', 'light', 'matrix', 'kids', 'cyberpunk', 'nordic', 'forest'];
            const saved = JSON.parse(localStorage.getItem('pt_tool_themes') || '{}');
            let current = saved[TOOL_ID] || 'dark';
            let idx = list.indexOf(current);
            if (idx === -1) idx = 0;
            const next = list[(idx + 1) % list.length];
            saved[TOOL_ID] = next;
            localStorage.setItem('pt_tool_themes', JSON.stringify(saved));
            applyTheme(next);
        }

        function applyTheme(theme) {
            if (theme === 'dark') document.documentElement.removeAttribute('data-theme');
            else document.documentElement.setAttribute('data-theme', theme);
            updateThemeIcon(theme);
        }

        function updateThemeIcon(theme) {
            const icon = themeBtn.querySelector('i');
            icon.className = ''; icon.style.color = '';
            switch (theme) {
                case 'light': icon.className = 'fa-solid fa-sun'; icon.style.color = '#f59e0b'; break;
                case 'matrix': icon.className = 'fa-solid fa-terminal'; icon.style.color = '#00ff41'; break;
                case 'kids': icon.className = 'fa-solid fa-shapes'; icon.style.color = '#ef4444'; break;
                case 'cyberpunk': icon.className = 'fa-solid fa-robot'; icon.style.color = '#00ffff'; break;
                case 'nordic': icon.className = 'fa-regular fa-snowflake'; icon.style.color = '#88c0d0'; break;
                case 'forest': icon.className = 'fa-solid fa-tree'; icon.style.color = '#95d5b2'; break;
                default: icon.className = 'fa-solid fa-moon'; break;
            }
        }

        themeBtn.addEventListener('click', toggleTheme);
        loadTheme();

        // === Tool Logic ===
        function tick() {
            document.getElementById('reloj-clock').textContent =
                new Date().toLocaleTimeString('es-CO', { timeZone: 'America/Bogota' });
        }
        setInterval(tick, 1000);
        tick();
    </script>
</body>

</html>
```

### Entrada en `docs/index.html` (agregar al grid):
```html
<a href="reloj.html" class="tool-card">
    <i class="fa-solid fa-clock tool-icon"></i>
    <div class="tool-name">Reloj</div>
</a>
```

---

## 10. Resumen Rápido — Checklist de Integración

```
□ 1. Leer HTML de NUEVAS/
□ 2. Determinar: TOOL_ID, nombre visible, icono Font Awesome
□ 3. Crear docs/{TOOL_ID}.html usando la plantilla de §3
□ 4. Adaptar estilos → variables CSS (§4.2, §7.2)
□ 5. Adaptar localStorage → prefijo pt_ (§6, §7.3)
□ 6. Adaptar JS → inline, sin theme code original (§7.4)
□ 7. Copiar Theme System textualmente → solo cambiar TOOL_ID (§3)
□ 8. Agregar <a class="tool-card"> al grid de docs/index.html (§7.5)
□ 9. Verificar contra checklist de §7.6
□ 10. Confirmar que no se tocó app.js ni styles.css
```
