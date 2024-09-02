<script setup lang="ts">
import type { ElementoPaisaje } from '../tipos';
interface Props {
  podcast: ElementoPaisaje;
  // Definir qué tipo de dato va a ser la ubicación
  ubicacion: any;
}

defineProps<Props>();
</script>

<template>
  <div class="contenedorPodcast">
    <h2>{{ podcast.nombre }}</h2>
    <p>{{ podcast.descripcion }}</p>
    <audio :src="podcast.ruta" controls="true"></audio>
  </div>
</template>

<style lang="scss" scoped>
.contenedorPodcast {
  border: 1px solid black;
  max-width: 30vw;
  padding: 1em;
}
</style>
