# Propuesta de Modelo de Datos SQL - PocketTools

Esta propuesta transforma la persistencia actual de `localStorage` en un esquema relacional normalizado para un motor como **PostgreSQL** o **MySQL**.

## 1. Diagrama de Relaciones (Estructura)

### Núcleo y Configuración
*   **users**: Gestiona la identidad del usuario.
    *   `id` (UUID, PK)
    *   `username` (VARCHAR, Unique)
    *   `password_hash` (TEXT)
    *   `created_at` (TIMESTAMP)

*   **settings**: Preferencias globales y por herramienta.
    *   `user_id` (FK -> users.id)
    *   `global_theme` (VARCHAR)
    *   `last_active_tool` (VARCHAR)

*   **tool_themes**: Temas personalizados por herramienta.
    *   `user_id` (FK -> users.id)
    *   `tool_id` (VARCHAR)
    *   `theme_name` (VARCHAR)

---

### Herramientas de Productividad
*   **notes**: Notas rápidas.
    *   `user_id` (FK)
    *   `content` (TEXT)
    *   `updated_at` (TIMESTAMP)

*   **todos**: Lista de tareas simple (To-Do).
    *   `id` (PK)
    *   `user_id` (FK)
    *   `text` (VARCHAR)
    *   `is_done` (BOOLEAN)
    *   `created_at` (TIMESTAMP)

*   **tasks**: Tareas con historial (Estadísticas).
    *   `id` (PK)
    *   `user_id` (FK)
    *   `text` (VARCHAR)
    *   `sort_order` (INT)
*   **tasks_history**: Registro de cumplimiento diario.
    *   `task_id` (FK -> tasks.id)
    *   `date` (DATE)
    *   `is_completed` (BOOLEAN)

---

### Finanzas y Vehículo
*   **expense_sources**: Categorías de pago (Efectivo, Tarjeta).
    *   `id` (PK)
    *   `user_id` (FK)
    *   `name` (VARCHAR)

*   **expenses**: Registro de gastos.
    *   `id` (PK)
    *   `user_id` (FK)
    *   `source_id` (FK -> expense_sources.id)
    *   `concept` (VARCHAR)
    *   `value` (DECIMAL)
    *   `timestamp` (BIGINT)
    *   `simple_date` (DATE)
    *   `cierre_at` (TIMESTAMP, Nullable)

*   **fuel_logs**: Control de combustible.
    *   `id` (PK)
    *   `user_id` (FK)
    *   `date` (TIMESTAMP)
    *   `dist_km` (DECIMAL)
    *   `gallons` (DECIMAL)
    *   `cost` (DECIMAL)
    *   `type` (ENUM: 'log', 'reset')
    *   `total_cost_period` (DECIMAL) -- Solo para filas de tipo reset

---

### Organización Jerárquica y Geo
*   **shopping_nodes**: Lista de compras (Estructura de Árbol).
    *   `id` (PK)
    *   `user_id` (FK)
    *   `parent_id` (FK -> self.id, Nullable)
    *   `type` (ENUM: 'list', 'item')
    *   `title` (VARCHAR)
    *   `color` (VARCHAR)
    *   `is_expanded` (BOOLEAN)
    *   `is_checked` (BOOLEAN)
    *   `sort_order` (INT)

*   **milestones**: Hitos históricos.
    *   `id` (PK)
    *   `user_id` (FK)
    *   `type` (VARCHAR)
    *   `event_date` (DATE)
    *   `description` (TEXT)
    *   `count` (INT)
    *   `is_locked` (BOOLEAN)
    *   `image_url` (VARCHAR) -- Referencia a almacenamiento S3/Cloud alternativo a Base64

*   **guided_notes**: Notas con GPS.
    *   `id` (PK)
    *   `user_id` (FK)
    *   `title` (VARCHAR)
    *   `latitude` (DECIMAL)
    *   `longitude` (DECIMAL)
*   **guided_items**: Puntos dentro de una nota guiada.
    *   `note_id` (FK)
    *   `text` (VARCHAR)

---

### Seguimiento y Salud
*   **tracker_sites**: Sitios de personas.
    *   `id` (PK)
    *   `user_id` (FK)
    *   `name` (VARCHAR)
    *   `is_pinned` (BOOLEAN)
*   **tracker_persons**: Personas en un sitio.
    *   `id` (PK)
    *   `site_id` (FK)
    *   `name` (VARCHAR)
    *   `description` (TEXT)

*   **cycle_tracking**: Calendario de ritmo.
    *   `user_id` (FK, PK)
    *   `last_start_date` (DATE)
