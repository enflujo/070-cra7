<script setup lang="ts">
import { defineProps } from 'vue';
import type { FichaIndicador } from '../tipos';

defineProps<FichaIndicador>();
</script>

<template>
  <h2>{{ nombre }}</h2>
  <p>{{ descripcion }}</p>
  <p>Unidad de medida: {{ unidadMedida }}</p>
</template>

<style lang="scss" scoped></style>
