<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue';
import { usarCerebro } from '../utilidades/cerebro';

const cerrar: Ref<HTMLDivElement | undefined> = ref();
const contenedorInfo: Ref<HTMLDivElement | undefined> = ref();

const cerebro = usarCerebro();

function cerrarInfo() {
  if (!contenedorInfo.value) return;
  cerebro.infoVisible = false;
}

onMounted(async () => {});
</script>

<template>
  <div ref="contenedorInfo" class="infoProyecto visible">
    <div id="cerrar" ref="cerrar" :onclick="cerrarInfo">X</div>
    <h2>VEINTICUATRO SIETE</h2>
    <p>Descripción del proyecto</p>
  </div>
</template>

<style lang="scss">
.infoProyecto {
  position: fixed;
  left: 5vw;
  top: 5vh;
  border: 1px solid black;
  width: 50vw;
  height: 85vh;
  background-color: var(--menta);
  padding: 1em;
  display: block;
  z-index: 100;
  opacity: 0;

  &.visible {
    opacity: 1;
  }
}

#cerrar {
  background-color: var(--lila);
  border-radius: 50%;
  cursor: pointer;
  height: 1em;
  margin: 0;
  padding: 0.5em;
  position: absolute;
  right: 1em;
  text-align: center;
  top: 1em;
  width: 1em;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
}
</style>
