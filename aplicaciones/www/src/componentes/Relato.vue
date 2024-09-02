<script setup lang="ts">
import type { ElementoPaisaje } from '../tipos';
interface Props {
  relato: ElementoPaisaje;
  // Definir qué tipo de dato va a ser la ubicación
  ubicacion: any;
}

defineProps<Props>();
</script>

<template>
  <div class="contenedorRelato">
    <h2>{{ relato.nombre }}</h2>
    <p>{{ relato.descripcion }}</p>
  </div>
</template>

<style lang="scss" scoped>
.contenedorRelato {
  border: 1px solid black;
  max-width: 30vw;
  padding: 1em;
}
</style>
