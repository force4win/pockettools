# Lineamientos del Proyecto (GuideLines) 📋

Este documento establece las pautas técnicas, de diseño y metodológicas para todos los agentes de IA y desarrolladores que colaboren en el proyecto **PocketTools**.

---

## 1. Principios de Arquitectura (KISS & Seguridad)

Como principio rector (según el skill `arquitecto-soluciones`), todas las decisiones técnicas deben priorizar la simplicidad y la seguridad por diseño:
*   **Keep It Simple, Stupid (KISS):** Evita la sobreingeniería. La suite actual es simple y ágil; cualquier mejora o migración debe mantener esa ligereza.
*   **Seguridad por Diseño (PoLP):** Al proponer o implementar autenticación o almacenamiento (como la base de datos de la hoja de ruta), utiliza el principio de privilegios mínimos. No aceptes atajos temporales que comprometan las credenciales o los datos privados.
*   **Offline-First:** Las utilidades deben funcionar sin conexión. La transición a SaaS debe mantener los datos en el cliente (ej. utilizando `localStorage` en la versión actual o `IndexedDB`/`Dexie.js` en futuras versiones) y sincronizarlos en segundo plano de forma no intrusiva.

---

## 2. Pautas de Interfaz y UX/UI Móvil (Mobile-First)

Para asegurar una experiencia premium e intuitiva (de acuerdo con el skill `experto-ux-mobile`):
*   **Enfoque Responsivo:** Todo componente debe verse impecable en pantallas táctiles móviles y adaptarse con gracia a tablets y portátiles utilizando layouts de ancho fluido y media queries (`640px`, `768px`, `1024px`).
*   **Áreas de Toque:** Los botones, enlaces y controles interactivos deben tener un área táctil mínima de **48x48px** para evitar toques accidentales.
*   **Grid de 8px:** Diseña la distribución de espacios (paddings y margins) en múltiplos de 8 (8px, 16px, 24px, 32px...) para lograr consistencia y armonía visual.
*   **Retroalimentación Visual (Feedback):** Al tocar o hacer hover sobre botones e inputs, proporciona cambios sutiles y fluidos (ej. transiciones de color de `200ms` a `300ms` con `ease-in-out` o micro-animaciones de escala de `scale(0.98)`).
*   **Evitar Hover Crítico:** No ocultes información vital o acciones necesarias bajo estados de hover, ya que en dispositivos móviles no existe el cursor.

---

## 3. Estilo de Código y Mantenibilidad

*   **HTML Semántico:** Utiliza etiquetas semánticas (`<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`) en lugar de `<div>` anidados sin sentido.
*   **Modularidad:** En JavaScript plano (`docs/app.js`), mantén las funciones de enrutamiento, almacenamiento local e inicialización separadas y bien documentadas.
*   **Preservación de Comentarios:** Respeta los comentarios y estructuras existentes al realizar modificaciones para evitar la pérdida de contexto histórico del código.
*   **Variables CSS:** Todos los colores, fuentes y radios de borde deben manejarse mediante propiedades personalizadas de CSS (variables globales) en `docs/styles.css` para permitir temas dinámicos.
