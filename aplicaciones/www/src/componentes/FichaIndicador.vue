<script setup lang="ts">
import { defineProps } from 'vue';
import type { FichaIndicador } from '../tipos';
interface Props {
  indicador: FichaIndicador;
}

defineProps<Props>();
</script>

<template>
  <h2>{{ indicador.nombre }}</h2>
  <p>{{ indicador.descripcion }}</p>
  <p>Unidad de medida: {{ indicador.unidadMedida }}</p>
</template>

<style lang="scss" scoped></style>
