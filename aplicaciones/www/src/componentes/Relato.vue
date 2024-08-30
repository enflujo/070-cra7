<script setup lang="ts">
import { defineProps } from 'vue';
import type { ElementoPaisaje } from '../tipos';
interface Props {
  relato: ElementoPaisaje;
  // Definir qué tipo de dato va a ser la ubicación
  ubicacion: any;
}

defineProps<Props>();
</script>

<template>
  <h2>{{ relato.nombre }}</h2>
  <p>{{ relato.descripcion }}</p>
</template>

<style lang="scss" scoped></style>
