<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const activePage = computed(() => route.path.startsWith('/libros') ? 'libros' : 'inicio')
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink to="/" class="brand"><span class="brand-mark">b.</span><span>booklist<span class="brand-dot">.</span></span></RouterLink>
      <nav class="main-nav" aria-label="Navegación principal"><RouterLink to="/" :class="{ active: activePage === 'inicio' }">Inicio</RouterLink><RouterLink to="/libros" :class="{ active: activePage === 'libros' }">Mis libros</RouterLink></nav>
      <RouterLink to="/libros" class="header-cta">Mi biblioteca <span>↗</span></RouterLink>
    </header>
    <main><RouterView /></main>
    <footer class="site-footer"><RouterLink to="/" class="footer-brand">b.</RouterLink><span>Un lugar para cada historia.</span><span>BOOKLIST © 2025</span></footer>
  </div>
</template>
