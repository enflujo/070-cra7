<script setup lang="ts">
import { distanciaEntreCoordenadas } from './utilidades/ayudas';
import { ElementoPaisaje } from './tipos';
import Personaje from './componentes/Personaje.vue';
import Podcast from './componentes/Podcast.vue';
import Relato from './componentes/Relato.vue';

/** Si se definen así los props desde un objeto,
 * toca usar el v-bind="" en elemento de vue para pasar los props.
 * Ver explicación en: https://vuejs.org/guide/components/props.html#binding-multiple-properties-using-an-object
 * */
const personajePrueba: ElementoPaisaje = {
  nombre: 'Elemento personaje',
  descripcion: 'descripción personaje',
  ubicacion: '0',
};

const podcastPrueba: ElementoPaisaje = {
  nombre: 'Elemento podcast',
  descripcion: 'descripción podcast',
  ubicacion: '1',
};

const relatoPrueba: ElementoPaisaje = {
  nombre: 'Elemento personaje',
  descripcion: 'Relato bla bla',
  ubicacion: '2',
};

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
  <h1>Habitabilidad en la cra 7 de Bogotá</h1>
  <Personaje v-bind="personajePrueba" />
  <Podcast v-bind="podcastPrueba" />
  <Relato v-bind="relatoPrueba" />
</template>

<style lang="scss" scoped>
#main {
  background-color: yellow;
}
</style>
