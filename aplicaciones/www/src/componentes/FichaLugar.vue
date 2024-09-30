<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import type { ElementoPaisaje } from '../tipos';
import Podcast from './Podcast.vue';
const props = defineProps<{ id: string; cerrar: () => void }>();

const nombre: Ref<string> = ref('');
const descripcion: Ref<string> = ref('');
const ruta: Ref<string> = ref('');
const hayPodcast: Ref<boolean> = ref(false);
const hayPerfil: Ref<boolean> = ref(false);

const datos: ElementoPaisaje[] = [
  {
    id: '1',
    nombre: 'Podcast 4',
    descripcion: 'descripción podcast 4',
  },
  {
    id: '2',
    nombre: 'Podcast 10',
    descripcion: 'descripción podcast 10',
  },
];

onMounted(() => {
  const podcast = datos.find((podcast) => podcast.id === props.id);
  const perfil = datos.find((perfil) => perfil.id === props.id);

  if (podcast) {
    if (podcast.nombre) nombre.value = podcast.nombre;
    if (podcast.descripcion) descripcion.value = podcast.descripcion;
    hayPodcast.value = true;
  }

  if (perfil) {
    if (perfil.nombre) nombre.value = perfil.nombre;
    if (perfil.descripcion) descripcion.value = perfil.descripcion;
    hayPerfil.value = true;
  }
});
</script>

<template>
  <div id="fichaLugar">
    <span id="cerrar" @click="cerrar">X</span>

    <!--   <Podcast :id="podcast.id" /> -->
    <h2>Calle xx</h2>
    <div v-if="hayPodcast" class="contenedorPodcast">
      <h3>{{ nombre }}</h3>
      <p>{{ descripcion }}</p>
      <audio :src="ruta" controls="true"></audio>
    </div>

    <div v-if="hayPerfil" class="contenedorPersonaje">
      <h3>Personaje</h3>
      <p>Descripción perfil</p>
      <video :src="ruta" controls="true"></video>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/constantes';
@import '../scss/general';

#fichaLugar {
  border: 1px solid black;
  width: 40vw;
  height: 85vh;
  padding: 1em;
  background-color: var(--rosaTrans);
  position: fixed;
  top: 2em;
  left: 2vw;
  z-index: 9;
}

#cerrar {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;

  &:hover {
    font-weight: 600;
  }
}
.contenedorPodcast {
}
</style>
