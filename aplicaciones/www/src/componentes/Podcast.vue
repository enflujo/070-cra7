<script setup lang="ts">
import { defineProps } from 'vue';
import type { ElementoPaisaje } from '../tipos';
interface Props {
  podcast: ElementoPaisaje;
  // Definir qué tipo de dato va a ser la ubicación
  ubicacion: any;
}

defineProps<Props>();
</script>

<template>
  <h1>{{ podcast.nombre }}</h1>
  <p>{{ podcast.descripcion }}</p>
  <audio :src="podcast.ruta"></audio>
</template>

<style lang="scss" scoped></style>
