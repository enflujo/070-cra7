<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import type { ElementoPaisaje } from '../tipos';
import Podcast from './Podcast.vue';
const props = defineProps<{ id: string; cerrar: () => void }>();

const nombre: Ref<string> = ref('');
const descripcion: Ref<string> = ref('');
const ruta: Ref<string> = ref('');
const hayPodcast: Ref<boolean> = ref(false);

const datos: ElementoPaisaje[] = [
  {
    id: '4',
    nombre: 'Podcast 4',
    descripcion: 'descripción podcast 4',
  },
  {
    id: '10',
    nombre: 'Podcast 10',
    descripcion: 'descripción podcast 10',
  },
];

onMounted(() => {
  const podcast = datos.find((podcast) => podcast.id === props.id);
  console.log(datos);

  if (podcast) {
    if (podcast.nombre) nombre.value = podcast.nombre;
    if (podcast.descripcion) descripcion.value = podcast.descripcion;
    hayPodcast.value = true;
    console.log(hayPodcast);
  }
});
</script>

<template>
  <div id="fichaLugar">
    <span id="cerrar" @click="cerrar">Cerrar</span>

    <!--   <Podcast :id="podcast.id" /> -->

    <div v-if="hayPodcast" class="contenedorPodcast">
      <h2>{{ nombre }}</h2>
      <p>{{ descripcion }}</p>
      <audio :src="ruta" controls="true"></audio>
    </div>

    <div class="contenedorPersonaje">
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
.contenedorPodcast {
}
</style>
