<script setup lang="ts">
import type { ElementoPaisaje } from '../tipos';
defineProps<ElementoPaisaje>();
</script>

<template>
  <div class="contenedorPersonaje">
    <h2>{{ nombre }}</h2>
    <p>{{ descripcion }}</p>
    <video :src="ruta" controls="true"></video>
  </div>
</template>

<style lang="scss" scoped>
.contenedorPersonaje {
  border: 1px solid black;
  max-width: 30vw;
  padding: 1em;
  display: none;
}
</style>
