<script setup lang="ts">
import { usarCerebro } from '../utilidades/cerebro';
import type { ElementoPaisaje } from '../tipos';

defineProps<{ podcast: ElementoPaisaje | undefined; cerrar: () => void }>();

const cerebro = usarCerebro();
function cerrar() {
  cerebro.podcastVisible = false;
}
</script>

<template>
  <div class="ficha fichaPodcast">
    <span id="cerrar" @click="cerrar">X</span>

    <div class="tituloContenido">
      <img class="iconoPodcast" src="/imagenes/icono_podcast.png" />
      <h3>{{ podcast ? podcast.nombre : '' }}</h3>
    </div>
    <iframe
      style="border-radius: 12px"
      :src="podcast?.ruta"
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
    <p class="contenedorTexto" v-html="podcast ? podcast.descripcion : ''"></p>
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
  margin-right: 0.5em;
}

.contenedorPersonaje {
  margin-top: 2em;
}

.contenedorTexto {
  margin-top: 2em;
}
</style>
