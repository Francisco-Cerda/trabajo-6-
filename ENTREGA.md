# Entrega — Proyecto Módulo 6: BookList

## 1. Descripción
BookList es una SPA para gestionar una colección personal de libros. Permite registrar libros, consultar y filtrar el catálogo, editar o eliminar entradas y navegar a una ficha individual. La interfaz se adapta a escritorio y móvil; los datos se conservan localmente en el navegador.

## 2. Resolución por lección

### Lección 1 — Introducción a Vue.js
- `src/App.vue` es el componente raíz y mantiene el layout general de la aplicación.
- `InicioView.vue` muestra el nombre del usuario con `ref`, un contador reactivo y el total de libros.
- Se aplica MVVM: la vista usa el estado reactivo como modelo, y las interacciones actualizan el modelo y se reflejan automáticamente en pantalla.

### Lección 2 — Templates y rendering
- `components/Libro.vue` recibe `book` mediante props y enlaza sus valores con interpolación y `:to` (`v-bind` abreviado).
- `ListaLibros.vue` recorre libros con `v-for`, muestra el estado vacío con `v-if` y presenta el texto de persistencia con `v-show`.
- Las vistas de detalle distinguen entre libro encontrado y libro inexistente con `v-if`/`v-else`.

### Lección 3 — Binding de formularios
- El formulario utiliza `v-model` en título, autor, categoría, año y descripción.
- Una vista previa refleja los campos en tiempo real.
- Se validan título y autor como obligatorios antes de guardar.

### Lección 4 — Manejo de eventos
- `@click` permite agregar, editar, eliminar, cambiar el nombre y operar el contador.
- `@submit.prevent` evita la recarga tradicional del formulario.
- `@click.once` muestra un consejo de bienvenida una sola vez por carga de la vista.
- `@keyup.enter` permite guardar desde los campos de texto.
- Los eventos `edit` y `remove` comunican acciones desde la tarjeta reutilizable a la vista de catálogo.

### Lección 5 — Manejo de rutas
- Vue Router define `/`, `/libros` y `/libros/:id`.
- Las vistas corresponden a `InicioView.vue`, `ListaLibros.vue` y `DetalleLibro.vue`.
- La ruta dinámica pasa `id` como prop a `DetalleLibro.vue`; una ruta comodín redirige a Inicio.

## 3. Decisiones técnicas
- **Vue 3 + Vite:** entorno pequeño y rápido para ejecutar y compilar la SPA.
- **Estado compartido:** `useBooks.js` centraliza libros, búsqueda por ID, alta/edición, eliminación y persistencia, para que las vistas accedan al mismo catálogo.
- **Persistencia local:** `localStorage` permite que la demostración conserve cambios sin servidor ni base de datos.
- **Componentes:** `Libro.vue` es reutilizable y comunica acciones con eventos; el router separa las vistas.
- **Datos demo:** se incluyen tres obras para que la navegación y los filtros se puedan probar de inmediato.

## 4. Cómo ejecutar
Desde la carpeta del proyecto:
```bash
npm install
npm run dev
```
Abrir la URL local indicada por Vite. Para comprobar la compilación de producción:
```bash
npm run build
```

## 5. Pruebas manuales sugeridas
1. En Inicio, cambiar el nombre y pulsar el contador.
2. Abrir **Mis libros**, buscar un título y filtrar por categoría.
3. Agregar un libro; observar la vista previa antes de guardarlo.
4. Editar una tarjeta y confirmar que los cambios aparecen en la colección.
5. Eliminar una tarjeta y confirmar el diálogo.
6. Abrir **Ver detalle** y comprobar `/libros/{id}`.
7. Recargar la página y verificar que la colección persiste.
8. Eliminar o filtrar todos los libros para observar los estados vacíos.

## 6. Alcance
Es un prototipo funcional de frontend. La persistencia se limita al navegador actual: no hay cuentas, sincronización entre dispositivos ni API/backend. Las eliminaciones solicitan confirmación del usuario.
