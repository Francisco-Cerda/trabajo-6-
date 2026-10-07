<script setup>
defineProps({ book: { type: Object, required: true } })
defineEmits(['remove', 'edit'])
</script>

<template>
  <article class="book-card">
    <div class="book-cover" aria-hidden="true"><span>✦</span><small>{{ book.category }}</small></div>
    <div class="book-info">
      <div class="book-meta"><span class="eyebrow">{{ book.category }}</span><span v-if="book.year" class="muted">{{ book.year }}</span></div>
      <h3><RouterLink :to="{ name: 'detalle-libro', params: { id: book.id } }">{{ book.title }}</RouterLink></h3>
      <p class="author">{{ book.author }}</p>
      <p v-if="book.description" class="description">{{ book.description }}</p>
      <div class="card-actions">
        <RouterLink class="text-link" :to="{ name: 'detalle-libro', params: { id: book.id } }">Ver detalle <span>→</span></RouterLink>
        <div class="icon-actions">
          <button class="icon-button" type="button" :aria-label="`Editar ${book.title}`" @click="$emit('edit', book)">Editar</button>
          <button class="icon-button danger" type="button" :aria-label="`Eliminar ${book.title}`" @click="$emit('remove', book.id)">Eliminar</button>
        </div>
      </div>
    </div>
  </article>
</template>
