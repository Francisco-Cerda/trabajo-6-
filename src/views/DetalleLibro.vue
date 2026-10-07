<script setup>
import { computed } from 'vue'
import { useBooks } from '../useBooks'
const props = defineProps({ id: { type: String, required: true } })
const { findBook } = useBooks()
const book = computed(() => findBook(props.id))
</script>

<template>
  <section class="page-section detail-page">
    <RouterLink to="/libros" class="back-link">← Volver al catálogo</RouterLink>
    <div v-if="book" class="detail-card">
      <div class="detail-cover"><span>✦</span><small>BOOKLIST<br />EDICIÓN PERSONAL</small></div>
      <div class="detail-copy"><span class="eyebrow">{{ book.category }} <span v-if="book.year">· {{ book.year }}</span></span><h1>{{ book.title }}</h1><p class="detail-author">por {{ book.author }}</p><div class="detail-rule"></div><h2>Sobre este libro</h2><p class="detail-description">{{ book.description || 'Todavía no agregaste una descripción para este libro.' }}</p><RouterLink to="/libros" class="button secondary">Regresar a mis libros</RouterLink></div>
    </div>
    <div v-else class="empty-state"><span class="empty-icon">⌕</span><h2>No encontramos ese libro</h2><p>Es posible que haya sido eliminado de tu colección.</p><RouterLink to="/libros" class="button primary">Ir al catálogo</RouterLink></div>
  </section>
</template>
