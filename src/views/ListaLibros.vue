<script setup>
import { computed, reactive, ref } from 'vue'
import Libro from '../components/Libro.vue'
import { useBooks } from '../useBooks'

const { books, count, saveBook, removeBook } = useBooks()
const query = ref('')
const categoryFilter = ref('Todas')
const showForm = ref(false)
const submitted = ref(false)
const form = reactive({ title: '', author: '', category: 'Novela', description: '', year: '' })
const editingId = ref(null)
const categories = ['Novela', 'Realismo mágico', 'Cuento', 'Fantasía', 'Ciencia ficción', 'Ensayo', 'Poesía', 'Historia', 'Otro']
const categoryOptions = computed(() => ['Todas', ...new Set([...categories, ...books.map(book => book.category)])])
const filteredBooks = computed(() => books.filter(book => {
  const matchesText = `${book.title} ${book.author}`.toLocaleLowerCase('es').includes(query.value.trim().toLocaleLowerCase('es'))
  const matchesCategory = categoryFilter.value === 'Todas' || book.category === categoryFilter.value
  return matchesText && matchesCategory
}))
function resetForm() { Object.assign(form, { title: '', author: '', category: 'Novela', description: '', year: '' }); editingId.value = null; submitted.value = false }
function openForm() { resetForm(); showForm.value = true }
function editBook(book) { Object.assign(form, { title: book.title, author: book.author, category: book.category, description: book.description || '', year: book.year || '' }); editingId.value = book.id; showForm.value = true; submitted.value = false; window.scrollTo({ top: 0, behavior: 'smooth' }) }
function submitBook() {
  submitted.value = true
  if (!form.title.trim() || !form.author.trim()) return
  saveBook({ id: editingId.value, title: form.title.trim(), author: form.author.trim(), category: form.category, description: form.description.trim(), year: form.year ? Number(form.year) : '' })
  showForm.value = false; resetForm()
}
function deleteBook(id) { if (window.confirm('¿Eliminar este libro de tu colección?')) removeBook(id) }
</script>

<template>
  <section class="page-section catalog-page">
    <div class="page-heading"><div><span class="eyebrow">TU ESPACIO DE LECTURA</span><h1>Mi biblioteca<span class="brand-dot">.</span></h1><p>Una colección de historias que te acompañan.</p></div><button class="button primary" type="button" @click="showForm ? (showForm = false) : openForm()"><span>{{ showForm ? '×' : '+' }}</span> {{ showForm ? 'Cerrar' : 'Agregar libro' }}</button></div>
    <transition name="fade"><form v-if="showForm" class="book-form" @submit.prevent="submitBook">
      <div class="form-heading"><div><span class="eyebrow">{{ editingId ? 'ACTUALIZÁ TU COLECCIÓN' : 'UNA NUEVA HISTORIA' }}</span><h2>{{ editingId ? 'Editar libro' : 'Agregar un libro' }}</h2></div><span class="form-sparkle">✳</span></div>
      <div class="form-grid"><label>Título del libro<input v-model="form.title" type="text" placeholder="Ej. El nombre de la rosa" required @keyup.enter="submitBook"/><small v-if="submitted && !form.title.trim()" class="field-error">Ingresá el título.</small></label><label>Autor/a<input v-model="form.author" type="text" placeholder="Ej. Umberto Eco" required @keyup.enter="submitBook"/><small v-if="submitted && !form.author.trim()" class="field-error">Ingresá el autor.</small></label><label>Categoría<select v-model="form.category"><option v-for="category in categories" :key="category">{{ category }}</option></select></label><label>Año de publicación <span class="optional">(opcional)</span><input v-model="form.year" type="number" min="-3000" :max="new Date().getFullYear()" placeholder="1980"/></label><label class="full-width">¿De qué trata? <span class="optional">(opcional)</span><textarea v-model="form.description" rows="3" placeholder="Una breve nota para recordar esta historia..."></textarea></label></div>
      <div class="live-preview"><span class="preview-dot"></span><span>Vista previa:</span><strong>{{ form.title || 'Título del libro' }}</strong><span>— {{ form.author || 'Autor/a' }}</span><span class="preview-category">{{ form.category }}</span></div>
      <div class="form-actions"><button class="button primary" type="submit">{{ editingId ? 'Guardar cambios' : 'Guardar libro' }} <span>→</span></button><button class="button ghost" type="button" @click="showForm = false; resetForm()">Cancelar</button></div>
    </form></transition>
    <div class="catalog-toolbar"><div class="catalog-count"><strong>{{ count }}</strong> {{ count === 1 ? 'libro' : 'libros' }} en tu colección</div><div class="filters"><label class="search-box"><span>⌕</span><input v-model="query" type="search" placeholder="Buscar por título o autor..." aria-label="Buscar libros"/></label><select v-model="categoryFilter" aria-label="Filtrar por categoría"><option v-for="category in categoryOptions" :key="category">{{ category }}</option></select></div></div>
    <div v-if="books.length" class="book-grid"><Libro v-for="book in filteredBooks" :key="book.id" :book="book" @edit="editBook" @remove="deleteBook"/></div>
    <div v-else class="empty-state"><span class="empty-icon">✳</span><h2>Tu próxima historia empieza aquí</h2><p>Agregá el primer libro a tu biblioteca personal.</p><button class="button primary" type="button" @click="openForm">Agregar mi primer libro <span>→</span></button></div>
    <div v-if="books.length && !filteredBooks.length" class="empty-filter"><span>⌕</span><p>No hay resultados para esa búsqueda.</p><button type="button" @click="query = ''; categoryFilter = 'Todas'">Limpiar filtros</button></div>
    <p v-show="books.length > 0" class="catalog-footnote">Mostrando {{ filteredBooks.length }} de {{ count }} {{ count === 1 ? 'libro' : 'libros' }} · Tus cambios se guardan automáticamente en este dispositivo.</p>
  </section>
</template>
