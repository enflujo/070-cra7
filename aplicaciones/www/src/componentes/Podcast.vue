<script setup lang="ts">
import type { ElementoPaisaje } from '../tipos';
defineProps<ElementoPaisaje>();
</script>

<template>
  <div class="contenedorPodcast">
    <h2>{{ nombre }}</h2>
    <p>{{ descripcion }}</p>
    <audio :src="ruta" controls="true"></audio>
  </div>
</template>

<style lang="scss" scoped>
.contenedorPodcast {
  border: 1px solid black;
  max-width: 30vw;
  padding: 1em;
  display: none;
}
</style>
