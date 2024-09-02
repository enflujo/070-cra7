<script setup lang="ts">
import { ElementoPaisaje } from '../tipos';
import Personaje from './Personaje.vue';
import Podcast from './Podcast.vue';
import Relato from './Relato.vue';

const personajePrueba: ElementoPaisaje = {
  nombre: 'Elemento personaje',
  descripcion: 'descripción personaje',
  ubicacion: 0,
};
const podcastPrueba: ElementoPaisaje = {
  nombre: 'Elemento podcast',
  descripcion: 'descripción podcast',
  ubicacion: 1,
};
const relatoPrueba: ElementoPaisaje = {
  nombre: 'Elemento personaje',
  descripcion: 'Relato bla bla',
  ubicacion: 2,
};
</script>

<template>
  <h1>Habitabilidad en la cra 7 de Bogotá</h1>
  <Personaje :personaje="personajePrueba" />
  <Podcast :podcast="podcastPrueba" />
  <Relato :relato="relatoPrueba" />
</template>

<style lang="scss" scoped></style>
