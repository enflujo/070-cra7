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

    <div v-if="hayPodcast" class="contenedorPodcast">
      <h2>{{ nombre }}</h2>
      <p>{{ descripcion }}</p>
      <audio :src="ruta" controls="true"></audio>
    </div>

    <div v-if="hayPerfil" class="contenedorPersonaje">
      <h2>Personaje</h2>
      <p>Descripción perfil</p>
      <video :src="ruta" controls="true"></video>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#fichaLugar {
  border: 1px solid black;
  max-width: 40vw;
  padding: 1em;
  background-color: azure;
  position: relative;
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
