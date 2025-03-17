<script setup lang="ts">
import { base } from '@/utilidades/ayudas';
import type { Perfil } from '@/tipos';

defineProps<{ perfil: Perfil; cerrar: () => void }>();
</script>

<template>
  <div class="ficha fichaLugar">
    <span class="cerrar" @click="cerrar">X</span>

    <div class="contenedorPersonaje">
      <div class="tituloContenido">
        <img class="iconoFicha iconoPerfil" :src="`${base}/imagenes/icono_perfil.png`" />
        <h3>{{ perfil.nombre }}</h3>
      </div>

      <p>{{ perfil.descripcion }}</p>
      <video class="video" :src="`${base}/videos/${perfil.video}`" controls="true"></video>
    </div>
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
  height: 500px;
}
</style>
