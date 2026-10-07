<script setup>
import { ref } from 'vue'
import { useBooks } from '../useBooks'
const userName = ref('Alex')
const clicks = ref(0)
const showTip = ref(false)
const { count } = useBooks()
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <span class="eyebrow">TU BIBLIOTECA, EN UN SOLO LUGAR</span>
      <h1>Historias que<br /><em>merecen quedarse.</em></h1>
      <p>Organiza tus lecturas favoritas, descubre tu colección y encuentra tu próxima gran historia.</p>
      <div class="hero-actions"><RouterLink to="/libros" class="button primary">Explorar biblioteca <span>→</span></RouterLink><span class="quiet-note">✦ Hecho para lectores</span></div>
      <div class="welcome-chip"><span class="avatar">{{ userName.charAt(0).toUpperCase() }}</span><span>Hola, <strong>{{ userName }}</strong>. Qué bueno verte.</span><button type="button" class="edit-name" @click="userName = userName === 'Alex' ? 'Lector' : 'Alex'">Cambiar nombre</button><button type="button" class="edit-name" @click.once="showTip = true">Ver tip rápido</button><span v-if="showTip" class="tip-message">Tus libros se guardan en este dispositivo.</span></div>
    </div>
    <div class="hero-art" aria-label="Ilustración decorativa de libros">
      <div class="sun"></div><div class="floating-label">LECTURAS<br /><strong>CON ALMA</strong></div>
      <div class="book-stack"><div class="book book-one"><span>la casa<br />de los<br />espíritus</span><small>ISABEL ALLENDE</small></div><div class="book book-two"><span>EL<br />ALEPH</span><small>JORGE L. BORGES</small></div><div class="book book-three"><span>rayuela</span><small>JULIO CORTÁZAR</small></div></div>
      <div class="sparkle sparkle-one">✳</div><div class="sparkle sparkle-two">✦</div><div class="art-caption">Una buena historia<br />siempre encuentra su lugar.</div>
    </div>
  </section>
  <section class="home-stats">
    <div><span class="stat-number">{{ count }}</span><span class="stat-label">libros en tu colección</span></div>
    <div class="stat-divider"></div>
    <div><span class="stat-number">∞</span><span class="stat-label">mundos por descubrir</span></div>
    <div class="stat-divider"></div>
    <div class="counter-widget"><button type="button" @click="clicks++">+{{ clicks }}</button><span class="stat-label">clics de inspiración</span></div>
  </section>
</template>
