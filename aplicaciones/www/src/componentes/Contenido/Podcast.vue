<script setup lang="ts">
import { usarCerebro } from '@/utilidades/cerebro';
import { base } from '@/utilidades/ayudas';

const cerebro = usarCerebro();
</script>

<template>
  <div class="fichaPodcast" v-if="cerebro.podcastActual">
    <div class="tituloContenido">
      <img class="iconoPodcast" :src="`${base}/imagenes/icono_podcast.png`" />
      <h3>{{ cerebro.podcastActual.nombre }}</h3>
    </div>

    <iframe
      style="border-radius: 12px"
      :src="cerebro.podcastActual.ruta"
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>

    <p class="contenedorTexto" v-html="cerebro.podcastActual.descripcion"></p>
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

.contenedorPersonaje {
  margin-top: 2em;
}

.contenedorTexto {
  margin-top: 2em;
}
</style>
