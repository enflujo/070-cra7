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
    <h2>VEINTICUATRO / SIETE</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipiscing elit, cubilia proin cum placerat nullam fringilla nascetur,
      magnis laoreet ut tristique litora congue. Cras lobortis litora varius vulputate per mollis sollicitudin elementum
      cubilia mattis, blandit integer inceptos dui justo mi malesuada odio congue, orci ultricies himenaeos suscipit
      nostra pellentesque et dictumst vehicula. Porttitor pretium blandit etiam torquent luctus turpis sagittis
      parturient habitasse nam dictum, vehicula habitant quisque cum mauris integer ligula est elementum aenean,
      ultrices nulla gravida cursus potenti curabitur sollicitudin consequat litora vivamus.
    </p>
    <p>
      Curae pulvinar tincidunt vel velit integer fermentum dapibus potenti, elementum vivamus platea ac netus habitasse
      pellentesque, mi facilisis felis aliquet rutrum ultricies hac. Dictumst eu sociis mollis interdum risus praesent
      metus vivamus malesuada mi, fusce taciti lacus tellus nam cum molestie aenean urna, blandit morbi platea porta dis
      dui elementum cubilia odio. Eget porta sodales pharetra primis sem duis porttitor leo elementum, ultricies lacus
      nulla ullamcorper urna sociis lobortis eu sed, arcu lectus dignissim interdum tempus himenaeos turpis pulvinar.
    </p>
  </div>
</template>

<style lang="scss">
.infoProyecto {
  position: fixed;
  left: 5vw;
  top: 5vh;
  border: 1px solid black;
  width: 40vw;
  height: 85vh;
  background-color: var(--lila);
  padding: 3em 6em;
  display: block;
  z-index: 100;
  opacity: 0;

  &.visible {
    opacity: 1;
  }
}

#cerrar {
  background-color: var(--menta);
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
