<script setup lang="ts">
import { podcasts, usarCerebro } from '../utilidades/cerebro';
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
</script>

<template>
  <div id="contenedorIconos">
    <h2 class="tituloBoton">Podcasts</h2>
    <p ref="infoPodcast" class="tituloPodcast sinEventos" :class="{ visible: infoVisible }">{{ tituloPodcast }}</p>

    <div v-for="podcast in podcasts" @click="elegirPodcast(podcast, $event)" class="enlacePodcast">
      <img class="iconoPodcast botonAbrir" :src="`${base}/imagenes/icono_podcast.png`" alt="ícono abrir podcast" />
      <span class="nombrePodcast">{{ podcast.nombre }}</span>
    </div>
  </div>

  <div class="ficha fichaPodcast" v-if="cerebro.podcastVisible && podcastActual">
    <span class="cerrar" @click="cerrar">X</span>

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
.tituloBoton {
  background-color: var(--lila);
  padding: 0.5em 0.8em;
  margin: 0;
  font-size: 1.1em;
  font-weight: normal;
  cursor: pointer;
}

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
  max-width: 173px;
  margin-bottom: 0.2em;
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
  right: 0;
  top: 3em;
  z-index: 11;
  border-radius: 15px;

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
