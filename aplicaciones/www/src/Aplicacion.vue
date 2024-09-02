<script setup lang="ts">
import Hola from './componentes/Hola.vue';
import { distanciaEntreCoordenadas } from './utilidades/ayudas';

async function cargarDatos() {
  try {
    const ruido = await fetch('/datos/ruido.json').then((res) => res.json());
    console.log(ruido);
  } catch (error) {
    console.error('Error descargando datos del ruido', error);
  }
}

cargarDatos().catch(console.error);

const puntos = [
  [4.597813, -74.07569],
  [4.601444, -74.073396],
  [4.605297, -74.071588],
  [4.61134, -74.069874],
  [4.618599, -74.068069],
  [4.62475, -74.066423],
  [4.631393, -74.064257],
  [4.6282521, -74.0670904],
  [4.639489, -74.062897],
];

for (let i = 1; i < puntos.length; i++) {
  const puntoA = puntos[i - 1];
  const puntoB = puntos[i];

  console.log(i, i + 2, `${distanciaEntreCoordenadas(puntoA[0], puntoA[1], puntoB[0], puntoB[1])}km`);
}
</script>

<template>
  <Hola />
</template>

<style lang="scss" scoped>
#main {
  background-color: yellow;
}
</style>
