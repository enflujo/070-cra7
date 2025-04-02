<script setup lang="ts">
import { usarCerebro } from '@/utilidades/cerebro';
import SobreProyecto from './Contenido/Sobre.vue';
import Podcast from './Contenido/Podcast.vue';
import Perfil from './Contenido/Perfil.vue';
import Indicadores from './Contenido/Indicadores.vue';

const cerebro = usarCerebro();

function cerrarFicha() {
  cerebro.fichaVisible = false;
}

function eventoDentro(evento: MouseEvent) {
  evento.stopPropagation();
}
</script>

<template>
  <div id="ficha" @mouseover="eventoDentro" @wheel="eventoDentro">
    <div class="cerrar" :onclick="cerrarFicha">X</div>

    <SobreProyecto v-if="cerebro.tipoContenido === 'sobre'" />
    <Podcast v-else-if="cerebro.tipoContenido === 'podcast'" />
    <Perfil v-else-if="cerebro.tipoContenido === 'perfil'" />
    <Indicadores v-else-if="cerebro.tipoContenido === 'indicadores'" />
  </div>
</template>

<style lang="scss">
#ficha {
  border: 1px solid black;
  height: 86vh;
  overflow: auto;
  background-color: var(--lila);
  position: fixed;
  top: 5vh;
  left: 6vw;
  padding: 3em;
  width: 62vw;
  z-index: 99;

  h2 {
    font-size: 1.2em;
    letter-spacing: -0.02em;
  }

  .cerrar {
    background-color: var(--menta);
    border-radius: 50%;
    cursor: pointer;
    height: 1.5em;
    width: 1.5em;
    margin: 0;
    line-height: 1.5em;
    right: 1em;
    top: 1em;
    position: absolute;
    display: flex;
    text-align: center;
    justify-content: center;

    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
}

@media (max-width: 800px) {
  #ficha {
    left: 2vw;
    width: 96vw;
    height: 90vh;
    padding: 1em;
  }
}
</style>
