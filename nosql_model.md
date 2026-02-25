# Propuesta de Modelo de Datos NoSQL - PocketTools

Esta propuesta utiliza un enfoque basado en documentos (tipo **MongoDB**), ideal para reflejar la flexibilidad actual de JSON en `localStorage` pero con escalabilidad.

## 1. Colecciones Propuestas

### Colección: `users`
Almacena el perfil y la configuración en un solo documento (Data Locality).
```json
{
  "_id": "uuid",
  "username": "usuario_alv",
  "auth": {
    "passwordHash": "...",
    "lastLogin": "ISODate"
  },
  "config": {
    "globalTheme": "dark",
    "lastActiveTool": "shopping",
    "toolThemes": {
      "notes": "matrix",
      "fuel": "forest"
    }
  }
}
```

### Colección: `notes`
```json
{
  "userId": "uuid",
  "content": "Texto de la nota rápida...",
  "updatedAt": "ISODate"
}
```

### Colección: `productivity`
Agrupa herramientas simples para reducir el número de colecciones si se desea, o mantener por separado.
*   **To-Do List:**
    ```json
    {
      "userId": "uuid",
      "tool": "todo",
      "items": [
        { "text": "Comprar pan", "done": false },
        { "text": "Llamar a mamá", "done": true }
      ]
    }
    ```
*   **Tasks & Stats:**
    ```json
    {
      "userId": "uuid",
      "tool": "tasks",
      "currentTasks": [
        { "id": "t1", "text": "Ejercicio", "order": 1 }
      ],
      "history": {
        "2026-02-25": { "t1": true, "t2": false },
        "2026-02-24": { "t1": true }
      }
    }
    ```

### Colección: `finances` (Gastos y Gasolina)
Ideal para filtrado por fecha.
```json
{
  "_id": "uuid",
  "userId": "uuid",
  "type": "expense",
  "details": {
    "concept": "Supermercado",
    "value": 150000.00,
    "source": "Efectivo",
    "timestamp": 1740500000000,
    "cierreId": "c123" 
  }
}
```

### Colección: `shopping` (Estructura Árbol)
La fortaleza de NoSQL: guardar la jerarquía completa en un solo documento o usar referencias.
```json
{
  "userId": "uuid",
  "root": [
    {
      "id": "list1",
      "type": "list",
      "title": "Mercado Mes",
      "color": "#6366f1",
      "expanded": true,
      "children": [
        { "id": "i1", "type": "item", "title": "Arroz", "checked": false },
        { "id": "sub1", "type": "list", "title": "Aseo", "children": [] }
      ]
    }
  ]
}
```

### Colección: `milestones`
```json
{
  "userId": "uuid",
  "eventDate": "2026-01-01",
  "description": "Viaje a la costa",
  "type": "counter",
  "meta": { "count": 5, "isLocked": false },
  "media": {
    "imageType": "url",
    "content": "https://storage.provider/img-123.jpg"
  }
}
```

### Colección: `locations` (Guided Notes)
Uso de índices Geoespaciales.
```json
{
  "userId": "uuid",
  "title": "Restaurante X",
  "location": {
    "type": "Point",
    "coordinates": [-74.0721, 4.6097] 
  },
  "notes": ["Menú del día recomendado", "Precio económico"],
  "createdAt": "ISODate"
}
```

### Colección: `tracker`
```json
{
  "userId": "uuid",
  "sites": [
    {
      "name": "Gym",
      "pinned": true,
      "persons": [
        { "name": "Entrenador Luis", "desc": "Estatura media, muy amable\nUsa gorra roja" }
      ]
    }
  ]
}
```

## Resumen de Ventajas NoSQL para PocketTools:
1.  **Flexibilidad de Esquema:** Si una herramienta nueva necesita campos diferentes (como las notas guiadas que necesitan coordenadas), no hay que alterar tablas existentes.
2.  **Jerarquías:** La lista de compras "Shopping List" es mucho más fácil de manejar como un documento anidado que como una tabla con `parent_id` (recursividad SQL).
3.  **Velocidad de Desarrollo:** El mapeo entre los objetos JS de la App y la base de datos es directo (JSON -> BSON).
