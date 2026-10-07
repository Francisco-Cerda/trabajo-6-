# BookList SPA

Aplicación de una sola página para organizar una biblioteca personal. Proyecto desarrollado con Vue 3, Vue Router y Vite.

## Requisitos
- Node.js 20 o superior
- npm

## Instalación y ejecución
```bash
npm install
npm run dev
```
Vite mostrará la dirección local para abrir la aplicación. Para generar la versión de producción:
```bash
npm run build
npm run preview
```

## Funcionalidades
- Inicio con saludo reactivo, contador y resumen de colección.
- Catálogo en `/libros` con búsqueda por título/autor y filtro por categoría.
- Alta, edición y eliminación de libros.
- Formulario reactivo con `v-model`, campos requeridos, categoría, año, descripción y vista previa en vivo.
- Envío mediante botón y tecla Enter; uso de `@submit.prevent`.
- Tarjeta reutilizable `Libro.vue` con propiedades y eventos personalizados.
- Ficha individual en `/libros/:id` con Vue Router y paso del parámetro como prop.
- Persistencia local automática en `localStorage`.
- Estado vacío, estado sin resultados y ruta comodín.

## Estructura
```text
src/
├── App.vue                 # Layout y navegación
├── main.js                 # Inicialización de Vue y Router
├── style.css               # Estilos responsivos
├── useBooks.js             # Estado compartido, persistencia y operaciones
├── components/Libro.vue    # Tarjeta reutilizable
├── router/index.js         # Rutas de la SPA
└── views/
    ├── InicioView.vue
    ├── ListaLibros.vue
    └── DetalleLibro.vue
```

## Notas
Los datos iniciales son ejemplos de demostración. Las modificaciones se guardan en el almacenamiento local del navegador; para reiniciar la demo, borrar la clave `booklist-books` en `localStorage`. La fuente tipográfica remota usa Google Fonts y, si no hay conexión, se aplican fuentes de respaldo.
