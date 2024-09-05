<script setup lang="ts">
import type { ElementoPaisaje } from '../tipos';
defineProps<ElementoPaisaje>();
</script>

<template>
  <div class="contenedorRelato">
    <h2>{{ nombre }}</h2>
    <p>{{ descripcion }}</p>
  </div>
</template>

<style lang="scss" scoped>
.contenedorRelato {
  border: 1px solid black;
  max-width: 30vw;
  padding: 1em;
  display: none;
}
</style>
