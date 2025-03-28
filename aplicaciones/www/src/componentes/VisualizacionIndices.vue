<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue';
import type { LlavesIndices, Punto } from '@/tipos/compartidos';
import { escalaColores } from '@enflujo/alquimia';
import { usarCerebro } from '@/utilidades/cerebro';

const props = defineProps<{ puntos: Punto[]; ancho: number; alto: number; pasoX: number; y: number }>();
const cerebro = usarCerebro();
const nombresIndices = {
  ambiente: 'Ambiente',
  infraestructura: 'Infraestructura',
  movilidad: 'Movilidad',
  seguridad: 'Seguridad',
  viviendaEmpleo: 'Vivienda y empleo',
};
const infoPunto: Ref<Punto | null> = ref(null);
const infoLeyenda = ref(false);
const posInfo = ref({ x: 0, y: 0 });

const indices: Ref<{ indicador: LlavesIndices; linea: string }[]> = ref([
  { indicador: 'ambiente', linea: '' },
  { indicador: 'infraestructura', linea: '' },
  { indicador: 'movilidad', linea: '' },
  { indicador: 'seguridad', linea: '' },
  { indicador: 'viviendaEmpleo', linea: '' },
]);

const coloresHabitabilidad = { positivo: '#00FF00', negativo: '#FF0000' };

const colorHabitabilidad = escalaColores(0.35, 0.9, coloresHabitabilidad.negativo, coloresHabitabilidad.positivo);

onMounted(() => {
  construirLineas();
});

watch(() => props.puntos, construirLineas);
watch(() => props.ancho, construirLineas);
watch(() => props.alto, construirLineas);

const mostrarInfoPunto = (punto: Punto) => (infoPunto.value = punto);
const mostrarInfoLeyenda = () => (infoLeyenda.value = true);
const esconderInfoLeyenda = () => (infoLeyenda.value = false);

function esconderInfoPunto() {
  infoPunto.value = null;
}

function actualizarPosicionInfoPunto(evento: MouseEvent) {
  posInfo.value = { x: evento.clientX, y: evento.clientY };
}

function construirLineas() {
  indices.value.forEach((indice) => {
    indice.linea = '';
  });

  // Construir líneas de los indicadores
  for (let i = 0; i < props.puntos.length; i++) {
    const punto = props.puntos[i];

    indices.value.forEach((indice) => {
      const valor = punto.indices.find((indicePunto) => indicePunto.indicador === indice.indicador)?.valor;
      if (valor) {
        indice.linea += `${i === 0 ? 'M' : 'L'} ${((punto.ubicacionX || 0) / 100) * props.ancho + 50} ${props.alto - valor * props.alto} `;
      }
    });
  }
}
</script>

<template>
  <div id="contenedorVis" :style="{ height: `${alto}px`, width: `${ancho}px` }">
    <div
      v-for="punto in puntos"
      :ref="`zona${punto.slug}`"
      class="zona"
      :style="{
        width: `${punto.ancho}%`,
        left: `${punto.ubicacionX}%`,
        backgroundColor: colorHabitabilidad(punto.habitabilidad),
      }"
      @mouseenter="mostrarInfoPunto(punto)"
      @mouseleave="esconderInfoPunto"
      @mousemove="actualizarPosicionInfoPunto"
    >
      <span class="nombreCalle">
        {{ punto.nombre }}
      </span>

      <span class="valorHabitabilidad">Habitabilidad: {{ punto.habitabilidad }}</span>
    </div>

    <svg id="graficaIndices" xmlns="http://www.w3.org/2000/svg" :width="`${ancho}px`" :height="`${alto}px`">
      <g
        v-for="punto in puntos"
        :ref="`punto${punto.slug}`"
        class="grupoPuntos"
        :style="{ transform: `translateX(${((punto.ubicacionX || 0) / 100) * ancho + 50}px)` }"
      >
        <g
          v-for="indice in punto.indices"
          :key="indice.indicador"
          :class="`grupoIndicadores ${indice.indicador}`"
          :style="{ transform: `translateY(${100 - indice.valor * 100}%)` }"
        >
          <circle :class="`puntoIndicador`" cx="0" :cy="0" :r="5" />
          <text class="valorIndicador">{{ `${indice.indicador}: ${indice.valor}` }}</text>
        </g>
      </g>

      <path v-for="indice in indices" :class="`trazo ${indice.indicador}`" :d="indice.linea" stroke="black" />
    </svg>

    <div id="contenedorEtiquetas">
      <div id="etiquetas" @click="cerebro.indicadoresVisible = true">
        <p class="etiquetaDatos" id="etiqAmbiente">Ambiente</p>
        <p class="etiquetaDatos" id="etiqMovilidad">Movilidad</p>
        <p class="etiquetaDatos" id="etiqViviendaEmpleo">Vivienda y Empleo</p>
        <p class="etiquetaDatos" id="etiqSeguridad">Seguridad</p>
        <p class="etiquetaDatos" id="etiqInfraestructura">Infraestructura</p>
      </div>
    </div>
  </div>

  <div
    id="leyendaIndices"
    @mouseenter="mostrarInfoLeyenda"
    @mouseleave="esconderInfoLeyenda"
    @mousemove="actualizarPosicionInfoPunto"
    :style="{ height: `${alto}px`, top: `${y}px` }"
  >
    <span>1</span>
    <span>0.75</span>
    <span>0.50</span>
    <span>0.25</span>
    <span>0</span>
  </div>

  <div id="info" :class="{ visible: infoPunto }" :style="{ top: `${posInfo.y}px`, left: `${posInfo.x}px` }">
    <div class="indicadores">
      <h4>{{ infoPunto?.nombre }}</h4>
      <p v-for="indice in infoPunto?.indices" :class="`indiceInfo ${indice.indicador}`">
        <span :class="`circuloEtiqueta ${indice.indicador}`"></span>
        {{ nombresIndices[indice.indicador] }}: {{ indice.valor }}
      </p>
    </div>

    <div class="textos" v-if="infoPunto?.textos">
      <div class="texto" v-for="texto in infoPunto.textos">
        <h4>{{ texto.titulo }}</h4>
        <p>{{ texto.texto }}</p>
      </div>
    </div>
  </div>

  <div id="infoLeyenda" :class="{ visible: infoLeyenda }" :style="{ top: `${posInfo.y}px`, left: `${posInfo.x}px` }">
    <p>Los indicadores de habitabilidad son una forma de medir la calidad de vida en un barrio o ciudad.</p>
    <p>Los valores van de 0 a 1, donde 1 es el mejor valor posible.</p>
  </div>
</template>

<style lang="scss" scoped>
@use '../scss/constantes' as *;

#contenedorVis {
  position: relative;
  z-index: 10;
}

#leyendaIndices {
  position: fixed;
  bottom: 5px;
  left: 0;
  z-index: 10;
  background: rgb(0, 255, 0);
  background: linear-gradient(180deg, rgba(0, 255, 0, 1) 0%, rgba(255, 0, 0, 1) 100%);
  font-weight: bold;
  height: 100%;
  width: 25px;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  font-size: 0.7em;
  cursor: help;

  span {
    background-color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
  }
}

#infoLeyenda {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: var(--lila);
  padding: 0.5em 1em;
  font-size: 0.8em;
  width: 200px;
  display: none;
  transform: translate(10px, -100%);

  &.visible {
    display: block;
  }
}

#graficaIndices {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.trazo {
  fill: none;
  stroke-width: 1;
  pointer-events: none;

  &.ambiente {
    stroke: var(--colorAmbiente);
  }

  &.infraestructura {
    stroke: var(--colorInfraestructura);
  }

  &.movilidad {
    stroke: var(--colorMovilidad);
  }

  &.seguridad {
    stroke: var(--colorSeguridad);
  }

  &.viviendaEmpleo {
    stroke: var(--colorViviendaEmpleo);
  }
}

#contenedorEtiquetas {
  bottom: 10px;
  left: 30px;
  padding: 0.4em;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.2);

  #titulo {
    margin: 0 3em 0.5em 0;
  }
}

#etiquetas {
  display: flex;
  flex-direction: column;
  z-index: 2;
  position: relative;
}

.etiquetaDatos {
  border-bottom: 2px solid;
  width: fit-content;
  margin: 0 2em 0.5em 0em;
  cursor: pointer;
}

#etiqHabitabilidad {
  border-color: var(--colorHabitabilidad);
}

#etiqAmbiente {
  border-color: var(--colorAmbiente);
}

#etiqInfraestructura {
  border-color: var(--colorInfraestructura);
}

#etiqMovilidad {
  border-color: var(--colorMovilidad);
}

#etiqSeguridad {
  border-color: var(--colorSeguridad);
}

#etiqViviendaEmpleo {
  border-color: var(--colorViviendaEmpleo);
}

.grupoIndicadores {
  cursor: pointer;

  .valorIndicador {
    font-family: var(--fuentePrincipal);
    font-size: 0.9em;
    transform: translate(10px, 5px);
    opacity: 0;
    transition: opacity 0.2s;
    fill: black;
  }

  &:hover {
    .valorIndicador {
      opacity: 1;
    }
  }

  &.ambiente {
    fill: var(--colorAmbiente);
  }

  &.infraestructura {
    fill: var(--colorInfraestructura);
  }

  &.movilidad {
    fill: var(--colorMovilidad);
  }

  &.seguridad {
    fill: var(--colorSeguridad);
  }

  &.viviendaEmpleo {
    fill: var(--colorViviendaEmpleo);
  }
}

.zona {
  height: 100%;
  position: absolute;
  top: 0;
  border: 2px solid black;

  .nombreCalle {
    font-family: var(--fuentePrincipal);
    background-color: hsla(42, 84%, 76%, 1);
    border-radius: 5px;
    font-size: 1.1em;
    position: absolute;
    text-align: center;
    padding: 0.5em;
    z-index: 8;
    min-width: 35px;
    border: 1px black solid;
    left: 10px;
    top: -2.5em;
  }

  .valorHabitabilidad {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 1em;
    font-weight: bold;
    font-family: var(--fuentePrincipal);
    text-align: center;
  }
}

#info {
  position: fixed;
  min-width: fit-content;
  width: 160px;
  border: 2px black solid;
  background-color: var(--menta);
  padding: 0.5em 1em;
  font-size: 0.8em;
  z-index: 10;
  display: none;
  transform: translate(10px, -100%);
  pointer-events: none;

  &.visible {
    display: flex;
  }

  .texto {
    width: 300px;
    font-size: 1em;
    border: 1px black dotted;
    padding: 0.5em;
  }

  p,
  h4 {
    margin: 0;
    text-align: start;
  }

  h4 {
    margin-bottom: 0.5em;
  }

  .indiceInfo {
    display: flex;
    align-items: center;
  }

  .circuloEtiqueta {
    height: 9px;
    width: 9px;
    margin-right: 0.5em;
    border-radius: 50%;
    background-color: black;
    box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.3);

    &.ambiente {
      background-color: var(--colorAmbiente);
    }

    &.infraestructura {
      background-color: var(--colorInfraestructura);
    }

    &.movilidad {
      background-color: var(--colorMovilidad);
    }

    &.seguridad {
      background-color: var(--colorSeguridad);
    }

    &.viviendaEmpleo {
      background-color: var(--colorViviendaEmpleo);
    }
  }
}

@media screen and (min-width: $minTablet) {
  #etiquetas {
    flex-direction: row;
  }
}
</style>
