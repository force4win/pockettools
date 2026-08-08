# Contexto del Proyecto (Project Context) 🌐

Este archivo proporciona una visión global del estado actual, propósito y antecedentes de **PocketTools**.

---

## 1. ¿Qué es PocketTools?

PocketTools es una suite consolidada de utilidades personales enfocadas en la productividad, finanzas, salud y entretenimiento. Nació con la filosofía de ser una **caja de herramientas digital rápida y privada**.

### Propiedades Clave:
*   **Persistencia Local:** Guarda toda la información de manera inmediata en el navegador mediante `localStorage` para garantizar la privacidad y rapidez sin depender de una base de datos externa.
*   **Navegación Fluida:** Emplea un sistema centralizado de carga dinámica de herramientas en la misma página (single-page behavior simulado mediante AJAX/Fetch en `app.js` y `styles.css`).
*   **Diseño Unificado:** Utiliza temas y estilos adaptables con micro-interacciones interactivas.

---

## 2. Estado Técnico Actual

*   **Tecnologías:** HTML5, CSS3 vanilla (con animaciones dinámicas), y JavaScript vanilla (ES6).
*   **Distribución:** El código ejecutable se encuentra en la carpeta `/docs`, la cual está configurada para ser servida directamente como una web estática (ej. GitHub Pages).
*   **Estructura de Base de Datos Propuesta:** Aunque el proyecto corre de forma local en el navegador, ya se cuenta con esquemas de modelado de datos para una futura migración a servidores en la nube:
    *   Soportes relacionales detallados para **PostgreSQL**, **MySQL** y **MariaDB**.
    *   Una propuesta lógica para bases de datos NoSQL.
*   **Hojas de Ruta de Software:** El documento `software_roadmap.md` traza el camino para transformar esta utilidad simple en una PWA modular o SaaS, estructurando el frontend en **React/Next.js** y el backend en **NestJS**.

---

## 3. Glosario de Herramientas Implementadas

Actualmente se dispone de 15 utilidades completamente operacionales en `docs/`:
*   `index.html`: Dashboard / Menú principal de la aplicación.
*   `notes.html`: Notas de texto rápido.
*   `todo.html`: Lista To-Do clásica.
*   `tasks.html`: Tareas diarias tipo hábito con historial y progreso semanal.
*   `gastos.html`: Control financiero con categorías de pago.
*   `fuel.html`: Bitácora de repostaje y rendimiento de combustible.
*   `shopping.html`: Lista de compras basada en nodos jerárquicos (árboles).
*   `guided.html`: Notas con metadatos de posicionamiento GPS.
*   `tracker.html`: Tablero de contactos y sitios recomendados.
*   `ritmo.html`: Tracker de ciclos biológicos femeninos.
*   `tiers.html`: Organizador visual de prioridades y tiers (S a E).
*   `sudoku.html`: Generador e interfaz de juego para Sudoku.
*   `password.html`: Creador de claves aleatorias y seguras.
*   `converter.html`: Conversor de unidades del sistema métrico/imperial.
*   `timer.html`: Temporizador y cuenta regresiva.
*   `counter.html`: Contador numérico incremental rápido.
