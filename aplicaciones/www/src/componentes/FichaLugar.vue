<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import type { ElementoPaisaje } from '../tipos';
import { usarCerebro } from '../utilidades/cerebro';

const props = defineProps<{ id: string; cerrar: () => void }>();

const nombrePodcast: Ref<string> = ref('');
const nombrePerfil: Ref<string> = ref('');
const descripcionPodcast: Ref<string> = ref('');
const descripcionPerfil: Ref<string> = ref('');

const ruta: Ref<string> = ref('');
const hayPodcast: Ref<boolean> = ref(false);
const hayPerfil: Ref<boolean> = ref(false);

const cerebro = usarCerebro();

const podcasts: ElementoPaisaje[] = [
  {
    id: 'calle-170',
    nombre: 'Aire y ruido',
    descripcion: 'descripción pd1',
  },
  {
    id: 'calle-60',
    nombre: 'Ciudad 15 min',
    descripcion: 'descripción pd2',
  },
  {
    id: 'calle-67',
    nombre: 'Ciudad 15 min',
    descripcion: 'descripción pd2',
  },
  {
    id: 'calle-70',
    nombre: 'Ciudad 15 min',
    descripcion: 'descripción pd2',
  },
  {
    id: 'calle-72',
    nombre: 'Ciudad 15 min',
    descripcion: 'descripción pd2',
  },
  {
    id: 'calle-100',
    nombre: 'Movilidad / Congestión',
    descripcion: 'descripción pd3',
  },
  {
    id: 'calle-32',
    nombre: 'Habitabilidad',
    descripcion: 'descripción pd4',
  },
];

const perfiles: ElementoPaisaje[] = [
  {
    id: 'calle-32',
    nombre: 'Perfil 1 Habitabilidad',
    descripcion: 'descripción pe1',
  },
  {
    id: 'calle-175',
    nombre: 'Perfil 2 Habitabilidad',
    descripcion: 'descripción pe2',
  },
  {
    id: 'calle-151',
    nombre: 'Perfil 3 Pájaros',
    descripcion: 'descripción pe3',
  },
  {
    id: 'calle-60',
    nombre: 'Perfil 4 Calidad aire',
    descripcion: 'descripción pe4',
  },
  {
    id: 'calle-175',
    nombre: 'Perfil 5 Peor caminabilidad',
    descripcion: 'descripción pe5',
  },
  {
    id: 'calle-19',
    nombre: 'Perfil 6 Mayor flujo personas',
    descripcion: 'descripción pe6',
  },
  {
    id: 'calle-100',
    nombre: 'Perfil 7 Mayor delito peatones',
    descripcion: 'descripción pe7',
  },
  {
    id: 'calle-180',
    nombre: 'Perfil 8 salud mental',
    descripcion: 'descripción pe8',
  },
];

onMounted(() => {
  const podcast = podcasts.find((podcast) => podcast.id === cerebro.lugarElegido);
  const perfil = perfiles.find((perfil) => perfil.id === cerebro.lugarElegido);

  if (podcast) {
    if (podcast.nombre) nombrePodcast.value = podcast.nombre;
    if (podcast.descripcion) descripcionPodcast.value = podcast.descripcion;
    hayPodcast.value = true;
  }

  if (perfil) {
    if (perfil.nombre) nombrePerfil.value = perfil.nombre;
    if (perfil.descripcion) descripcionPerfil.value = perfil.descripcion;
    hayPerfil.value = true;
  }
});
</script>

<template>
  <div id="fichaLugar">
    <span id="cerrar" @click="cerrar">X</span>

    <!--   <Podcast :id="podcast.id" /> -->
    <h2>{{ cerebro.lugarElegido?.replace('-', ' ') }}</h2>
    <div v-if="hayPodcast" class="contenedorPodcast">
      <h3>{{ nombrePodcast }}</h3>
      <p>{{ descripcionPodcast }}</p>
      <audio :src="ruta" controls="true"></audio>
    </div>

    <div v-if="hayPerfil" class="contenedorPersonaje">
      <h3>{{ nombrePerfil }}</h3>
      <p>{{ descripcionPerfil }}</p>
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
  background-color: var(--lila);
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
