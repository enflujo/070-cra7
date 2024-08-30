<script setup lang="ts">
import Hola from './componentes/Hola.vue';

async function cargarDatos() {
  try {
    const ruido = await fetch('/datos/ruido.json').then((res) => res.json());
    console.log(ruido);
  } catch (error) {
    console.error('Error descargando datos del ruido', error);
  }
}

cargarDatos().catch(console.error);
</script>

<template>
  <Hola />
</template>

<style lang="scss" scoped>
#main {
  background-color: yellow;
}
</style>
