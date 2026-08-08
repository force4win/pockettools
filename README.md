# PocketTools 🛠️

PocketTools es una suite personal de herramientas de productividad y utilidades locales diseñadas para ejecutarse directamente en el navegador. Actualmente, funciona como una aplicación estática y desconectada ("offline-first" nativo por almacenamiento en `localStorage`) que ofrece soluciones rápidas para el día a día sin necesidad de servidores externos.

El proyecto está diseñado para ser desplegado fácilmente en plataformas de hosting estático (como GitHub Pages) y está en vías de evolucionar hacia una plataforma SaaS y aplicación móvil profesional.

---

## 📂 Estructura del Proyecto

*   **`docs/`**: Contiene la aplicación web estática actual. Es el punto de entrada para producción y pruebas locales.
    *   `index.html`: Página de inicio y menú principal de la suite.
    *   `styles.css`: Estilos visuales compartidos y específicos de la aplicación.
    *   `app.js`: Lógica principal, enrutamiento simulado, utilidades comunes y gestión de persistencia en `localStorage`.
    *   *Herramientas (.html):* Cada una de las utilidades individuales integradas.
*   **`sources/`**: Directorio reservado para futuros desarrollos del código fuente (por ejemplo, frontend Next.js/React y backend NestJS).
*   **Modelos de Base de Datos**: Propuestas de bases de datos para la transición a la nube.
    *   `sql_model.md` / `nosql_model.md`: Documentos de diseño lógico y relacional.
    *   `pockettools_postgres.sql`, `pockettools_mysql.sql`, `pockettools_mariadb.sql`: Scripts SQL de inicialización.
*   **`software_roadmap.md`**: Plan estratégico y tecnológico para transformar esta suite local en una plataforma SaaS multi-dispositivo.
*   **`.alvhere/`**: Carpeta de contexto para agentes de IA que documenta estados, tareas y guías de desarrollo.

---

## 🛠️ Herramientas Disponibles

La suite de PocketTools incluye las siguientes utilidades:

1.  **Notas Rápidas (`notes.html`)**: Bloc de notas ágil con guardado automático.
2.  **Lista de Tareas Simple (`todo.html`)**: Gestor básico de pendientes del día.
3.  **Tareas con Historial (`tasks.html`)**: Registro diario de hábitos y tareas recurrentes con visualización de cumplimiento.
4.  **Control de Gastos (`gastos.html`)**: Registro de ingresos y gastos clasificados por método de pago (Efectivo, Tarjeta, etc.).
5.  **Control de Combustible (`fuel.html`)**: Registro de kilometraje, galones y costo de gasolina de vehículos, calculando rendimiento e historial.
6.  **Lista de Compras Jerárquica (`shopping.html`)**: Lista interactiva estructurada en forma de árbol (categorías y sub-elementos).
7.  **Notas con GPS (`guided.html`)**: Creación de notas geolocalizadas que almacenan coordenadas de latitud y longitud.
8.  **Seguimiento de Sitios y Personas (`tracker.html`)**: Organización de ubicaciones y personas de contacto asociadas a estas.
9.  **Calendario de Ritmo (`ritmo.html`)**: Seguimiento y predicción del ciclo de ritmo biológico o menstrual.
10. **Creador de Tiers (`tiers.html`)**: Clasificador visual de elementos en categorías de prioridad (S, A, B, C, D, E).
11. **Sudoku (`sudoku.html`)**: Juego clásico interactivo para estimulación mental.
12. **Generador de Contraseñas (`password.html`)**: Creación de claves seguras con longitud y caracteres personalizables.
13. **Conversor de Unidades (`converter.html`)**: Conversión ágil de medidas y unidades comunes.
14. **Temporizador (`timer.html`)**: Alarma y cuenta regresiva para control de tiempos de estudio o trabajo.
15. **Contador (`counter.html`)**: Utilidad sencilla para conteo incremental de elementos.

---

## 🚀 Cómo Ejecutar el Proyecto

Dado que la versión actual es puramente estática (HTML/CSS/JS nativo):
1. Descarga o clona este repositorio.
2. Abre el archivo `docs/index.html` en cualquier navegador web moderno.
3. No requiere instalación de dependencias, base de datos ni conexión a internet activa para su funcionamiento básico.

---

## 🔮 Visión de Futuro y Hoja de Ruta

Para escalar PocketTools a un entorno SaaS profesional se planean las siguientes fases:
*   **Fase 1: Modernización Frontend:** Migración del código HTML/JS plano a componentes de **Next.js** y **TypeScript**, utilizando **Tailwind CSS** para un diseño moderno y fluido.
*   **Fase 2: Conectividad y Backend:** Creación de una API REST segura utilizando **NestJS**, con persistencia en **PostgreSQL** y autenticación JWT, además de sincronización offline-first con IndexedDB.
*   **Fase 3: Aplicación Móvil:** Adaptación como PWA o desarrollo de aplicación móvil nativa/híbrida con **Flutter** para Android e iOS.
