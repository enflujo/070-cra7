<script setup lang="ts">
import { base } from '@/utilidades/ayudas';
import { usarCerebro } from '@/utilidades/cerebro';
const cerebro = usarCerebro();
</script>

<template>
  <div class="contenedorPersonaje" v-if="cerebro.perfilActual">
    <div class="tituloContenido">
      <img class="iconoFicha iconoPerfil" :src="`${base}/imagenes/icono_perfil.png`" />
      <h3>{{ cerebro.perfilActual.nombre }}</h3>
    </div>

    <video class="video" :src="`${base}/videos/${cerebro.perfilActual.video}`" controls="true"></video>

    <p>{{ cerebro.perfilActual.descripcion }}</p>
  </div>
</template>

<style lang="scss" scoped>
.tituloContenido {
  display: inline-flex;
  align-items: center;

  .iconoFicha {
    margin-right: 1em;
    background: transparent;
    height: 45px;
  }
}

.contenedorPersonaje {
  display: flex;
  flex-direction: column;

  .iconoPerfil {
    bottom: 180px;
    border-radius: 50%;
    padding: 0.3em;
    height: 45px;
  }
}

.contenedorTexto {
  margin-top: 2em;
}

.video {
  height: 60vh;
}
</style>
