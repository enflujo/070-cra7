<script setup lang="ts">
import { usarCerebro } from '../utilidades/cerebro';
import type { ElementoPaisaje } from '../tipos';
import { base } from '@/utilidades/ayudas';
import { type Ref, ref } from 'vue';

defineProps<{ cerrar: () => void }>();

const cerebro = usarCerebro();
const podcastActual = ref<ElementoPaisaje | null>(null);
const tituloPodcast = ref('');
const infoPodcast: Ref<HTMLElement | null> = ref(null);
const infoVisible = ref(false);

function elegirPodcast(podcast: ElementoPaisaje, evento: MouseEvent) {
  evento.stopPropagation();
  podcastActual.value = podcast;
  cerebro.podcastVisible = true;
}

const podcasts: ElementoPaisaje[] = [
  {
    id: '1',
    ruta: 'https://open.spotify.com/embed/episode/4LjdcPIIOWgX6hw58sTZ4h',
    nombre: 'Una ciudad habitable: ¿es chévere vivir en Bogotá?',
    descripcion:
      '¿Qué significa que una ciudad sea habitable? ¿Qué factores inciden en que consideremos que una ciudad es más o menos agradable para vivir? ¿Pueden los trancones y la contaminación de una ciudad afectar la salud física y mental de quienes vivimos allí? <br> <br> En este episodio de Veinticuatro Siete, la profesora y médica Olga Lucía Sarmiento nos explicará el concepto de habitabilidad urbana, y usará como ejemplo la carrera Séptima, una de las avenidas más importantes y representativas de Bogotá.',
  },
  {
    id: '2',
    ruta: 'https://open.spotify.com/embed/episode/6SOndW9Jo3nPKpzBp9IEul',
    nombre: 'Una ciudad para moverse, una ciudad para quedarse',
    descripcion:
      '¿Cómo construir soluciones de movilidad para que las personas no solo piensen en moverse, en llegar de un punto a otro en una ciudad, sino que se quieran quedar a vivir allí? ¿Se puede pensar en soluciones para transportarse mejor pero también para vivir mejor? <br> <br> En este segundo episodio de Veinticuatro Siete, el profesor e ingeniero Carlos Moncada nos explica cómo pensar una movilidad sostenible para hacer ciudades más habitables.',
  },
  {
    id: '3',
    ruta: 'https://open.spotify.com/embed/episode/4KLNWodM68BNvhxlmKY7fu',
    nombre: '¿Qué nos dicen las aves sobre la calidad del aire y el ruido en Bogotá?',
    descripcion:
      'En este episodio quisimos hacer algo diferente: entender los efectos que tiene vivir en una ciudad como Bogotá, no para los humanos sino para otros seres, como las aves, que habitan con nosotros desde otra altura. <br> <br> ¿Qué nos dicen las palomas, torcazas, mirlas, colibríes, reinitas y demás aves sobre el ruido y la contaminación en la capital? <br> <br> En este episodio de Veinticuatro Siete, la médica veterinaria Arlen Patricia Gómez y el profesor Ricardo Morales nos explican cómo estos factores medioambientales pueden hacer que Bogotá sea más o menos habitable para los humanos y otros seres con los que convivimos.',
  },
  {
    id: '4',
    ruta: 'https://open.spotify.com/embed/episode/0Wy6oN44v3MiBdHlwaWgnV?si=6786b72e435b4389',
    nombre: 'Movilidad y proximidad en la carrera Séptima: 25 años de promesas incumplidas',
    descripcion: 'descripción pd3',
  },
];
</script>

<template>
  <div id="contenedorIconos">
    <h2>Podcasts</h2>
    <p ref="infoPodcast" class="tituloPodcast sinEventos" :class="{ visible: infoVisible }">{{ tituloPodcast }}</p>

    <div v-for="podcast in podcasts" @click="elegirPodcast(podcast, $event)" class="enlacePodcast">
      <img class="iconoPodcast botonAbrir" :src="`${base}/imagenes/icono_podcast.png`" alt="ícono abrir podcast" />
      <span class="nombrePodcast">{{ podcast.nombre }}</span>
    </div>
  </div>

  <div class="ficha fichaPodcast" v-if="cerebro.podcastVisible && podcastActual">
    <span id="cerrar" @click="cerrar">X</span>

    <div class="tituloContenido">
      <img class="iconoPodcast" :src="`${base}/imagenes/icono_podcast.png`" />
      <h3>{{ podcastActual ? podcastActual.nombre : '' }}</h3>
    </div>

    <iframe
      style="border-radius: 12px"
      :src="podcastActual?.ruta"
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>

    <p class="contenedorTexto" v-html="podcastActual ? podcastActual.descripcion : ''"></p>
  </div>
</template>

<style lang="scss" scoped>
.tituloContenido {
  display: inline-flex;
  align-items: center;
  margin-bottom: 2em;
}

.iconoPodcast {
  width: 50px;
}

.enlacePodcast {
  cursor: pointer;
  display: flex;
  align-items: center;
  max-width: 200px;
  margin-bottom: 2em;
  font-size: 0.85em;
  font-family: var(--fuentePrincipal);
  background-color: #ffffffde;
  padding: 0.5em;
}

.contenedorPersonaje {
  margin-top: 2em;
}

.contenedorTexto {
  margin-top: 2em;
}

#contenedorIconos {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 40px;
  top: 22vh;
  z-index: 11;
  border-radius: 15px;
  padding: 0.4em;

  .iconoPodcast {
    width: 35px;
    border-radius: 50%;
    padding: 0.3em;
  }

  .tituloPodcast {
    position: absolute;
    display: none;
    background-color: #ffffffde;
    right: 20px;
    padding: 0.7em;
    text-align: right;
    font-size: 0.9em;
    border-radius: 5px;

    .visible {
      display: block;
    }
  }
}
</style>
