<script setup lang="ts">
import { defineProps } from 'vue';
import type { ElementoPaisaje } from '../tipos';
interface Props {
  personaje: ElementoPaisaje;
  // Definir qué tipo de dato va a ser la ubicación
  ubicacion: any;
}

defineProps<Props>();
</script>

<template>
  <h2>{{ personaje.nombre }}</h2>
  <p>{{ personaje.descripcion }}</p>
  <video :src="personaje.ruta"></video>
</template>

<style lang="scss" scoped></style>
