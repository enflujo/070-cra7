<script setup lang="ts">
import { Punto } from '@/tipos/compartidos';
import { convertirEscala } from '@/utilidades/ayudas';
import { onMounted, ref, Ref } from 'vue';

const props = defineProps<{ punto: Punto | null; posX: number; distanciaTotal: number }>();
const infoPuntoA: Ref<HTMLElement | null> = ref(null);
const xZona: Ref<number | null> = ref(null);

onMounted(async () => {
  const ancho = 1;
  const multiplicadorAncho = 8;
  const contenedorZonas: HTMLElement = document.getElementById('contenedorZonas') as HTMLElement;
  const zona = document.createElement('a');
  xZona.value = convertirEscala(props.distanciaTotal, 0, 25, 0, 100 * multiplicadorAncho);
  /* zona.classList.add('zona');
  zona.style.width = `${ancho}vw`;
  zona.href = `#${props.punto.slug}`;
  zona.style.left = `${xZona - ancho / 2}vw`;

  // Agregar cada punto a la línea de la 7
  contenedorZonas.appendChild(zona); */
  console.log(props.punto);
  //zona.addEventListener('mouseenter', () => {
  if (!infoPuntoA.value) return;
  if (!props.punto) return;
  infoPuntoA.value.style.left = `${xZona.value + 1}vw`;
  infoPuntoA.value.style.display = 'block';
  // });

  /*   zona.addEventListener('mouseleave', () => {
    if (!infoPuntoA.value) return;
    infoPuntoA.value.innerText = '';
    infoPuntoA.value.style.display = 'none';
  }); */
});
</script>

<template>
  <div v-if="punto" class="infoPunto" ref="infoPuntoA" id="infoPuntoA" :style="`left: ${posX}`">
    <h4>{{ punto.nombre }}</h4>
    <p class="elementoEtiqueta">
      <span class="circuloEtiqueta" id="circuloAmbiente"></span> ambiente:
      {{ punto.ambiente ? punto.ambiente : 'sin información' }}
    </p>
    <p class="elementoEtiqueta">
      <span class="circuloEtiqueta" id="circuloCaminabilidad"></span> caminabilidad:
      {{ punto.caminabilidad ? punto.caminabilidad : 'sin información' }}
    </p>
    <p class="elementoEtiqueta">
      <span class="circuloEtiqueta" id="circuloHabitabilidad"></span>habitabilidad:
      {{ punto.habitabilidad ? punto.habitabilidad : 'sin información' }}
    </p>
    <p class="elementoEtiqueta">
      <span class="circuloEtiqueta" id="circuloInfraestructura"></span>infraestructura:
      {{ punto.infraestructura ? punto.infraestructura : 'sin información' }}
    </p>
    <p class="elementoEtiqueta">
      <span class="circuloEtiqueta" id="circuloMovilidad"></span>movilidad:
      {{ punto.movilidad ? punto.movilidad : 'sin información' }}
    </p>
    <p class="elementoEtiqueta">
      <span class="circuloEtiqueta" id="circuloProximidad"></span>proximidad:
      {{ punto.proximidad ? punto.proximidad : 'sin información' }}
    </p>
    <p class="elementoEtiqueta">
      <span class="circuloEtiqueta" id="circuloSeguridad"></span>seguridad:
      {{ punto.seguridad ? punto.seguridad : 'sin información' }}
    </p>
  </div>
</template>

<style lang="scss" global>
@import '../scss/constantes';
@import '../scss/general';

/* .infoPunto {
  // display: none;
  position: absolute;
  font-size: 0.8em;
  text-align: center;
  text-transform: lowercase;
  top: 75px;

  min-width: fit-content;
  width: 160px;
  bottom: 0em;
  border: 2px black solid;
  background-color: var(--piel);
  padding: 0.5em 1em;
  p,
  h4 {
    margin: 0;
    text-align: start;
  }
} */

.infoPunto {
  position: absolute;
  font-size: 0.8em;
  text-align: center;
  text-transform: lowercase;
  top: 75px;

  min-width: fit-content;
  width: 160px;
  bottom: 0em;
  border: 2px black solid;
  background-color: var(--piel);
  padding: 0.5em 1em;
  p,
  h4 {
    margin: 0;
    text-align: start;
  }

  .elementoEtiqueta {
    display: flex;
    align-items: center;
  }

  .circuloEtiqueta {
    height: 4px;
    width: 4px;
    margin-right: 0.5em;
    border-radius: 50%;
    display: block;
    background-color: black;
  }

  #circuloAmbiente {
    background-color: var(--colorAmbiente);
  }
  #circuloCaminabilidad {
    background-color: var(--colorCaminabilidad);
  }
  #circuloHabitabilidad {
    background-color: var(--colorHabitabilidad);
  }
  #circuloInfraestructura {
    background-color: var(--colorInfraestructura);
  }
  #circuloMovilidad {
    background-color: var(--colorMovilidad);
  }
  #circuloProximidad {
    background-color: var(--colorProximidad);
  }
  #circuloSeguridad {
    background-color: var(--colorSeguridad);
  }
}
</style>
