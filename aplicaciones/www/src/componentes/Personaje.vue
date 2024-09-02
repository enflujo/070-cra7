<script setup lang="ts">
import type { ElementoPaisaje } from '../tipos';
interface Props {
  personaje: ElementoPaisaje;
  // Definir qué tipo de dato va a ser la ubicación
  ubicacion: any;
}

defineProps<Props>();
</script>

<template>
  <div class="contenedorPersonaje">
    <h2>{{ personaje.nombre }}</h2>
    <p>{{ personaje.descripcion }}</p>
    <video :src="personaje.ruta" controls="true"></video>
  </div>
</template>

<style lang="scss" scoped>
.contenedorPersonaje {
  border: 1px solid black;
  max-width: 30vw;
  padding: 1em;
}
</style>
