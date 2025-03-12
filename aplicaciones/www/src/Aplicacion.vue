<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { distanciaEntreCoordenadas, base, convertirEscala, pedirDatos, numeroAleatorio } from './utilidades/ayudas';
import slugificar from 'slug';
import FichaLugar from './componentes/FichaLugar.vue';
import VisualizacionIndices from './componentes/VisualizacionIndices.vue';

import { usarCerebro } from './utilidades/cerebro';
import Titulo from './componentes/Titulo.vue';
import SobreProyecto from './componentes/SobreProyecto.vue';
import Podcast from './componentes/Podcast.vue';
import type { Punto } from '@/tipos/compartidos';
import FichaIndicadores from './componentes/FichaIndicadores.vue';

const puntos: Ref<Punto[]> = ref([]);
/** Lugares que tienen ilustración */
const lugares: Ref<Punto[]> = ref([]);
const puntosUbicados: Ref<Punto[]> = ref([]);
const perfiles: Ref<Punto[]> = ref([]);
const arbolesElegidos: Ref<string[]> = ref([]);
const alturaPajaros: Ref<number[]> = ref([]);
const idPodcast: Ref<string | null> = ref(null);
const idLugar: Ref<string | null> = ref(null);
const etiquetaIlustracion: Ref<HTMLElement | null> = ref(null);
const anchoContenedor = ref(0);
const pasoX = 900;
const alto = ref(0);
const dims = computed(() => ({ fondo: alto.value * 0.5, calle: alto.value * 0.11, vis: alto.value * 0.368 }));
const tituloVisible = ref(true);

const cerebro = usarCerebro();
let distanciaTotal = 0;

let ratonSobreLugar: string = '';

function escalar() {
  alto.value = window.innerHeight;
}

const arboles: string[] = [
  'arbol1',
  'arbol2',
  'arbol3',
  'borrachero',
  'palmera',
  'yarumoamarillo',
  'yarumorosa',
  'yarumoverde',
];

// Funciones para abrir y cerrar ficha de cada lugar
function abrirFicha(id: string) {
  cerebro.lugarElegido = id;
  idPodcast.value = id;
  idLugar.value = id;
  cerebro.fichaVisible = true;
}

function cerrarFicha() {
  idPodcast.value = null;
  idLugar.value = null;
  cerebro.fichaVisible = false;
  cerebro.indicadoresVisible = false;
}

// Mostrar los nombres de los lugares ilustrados cuando el ratón está encima
function mostrarEtiquetaLugar(id: string) {
  const punto = puntosUbicados.value.find((punto) => punto.id === id);

  if (!punto?.ilustraciones || !etiquetaIlustracion.value) return;
  ratonSobreLugar = punto?.ilustraciones[0];

  etiquetaIlustracion.value.innerText = ratonSobreLugar.split('_').join(' ');
  etiquetaIlustracion.value.style.left = `${punto.ubicacionX ? punto.ubicacionX + 10 : 0}vw`;
  etiquetaIlustracion.value.style.bottom = `250px`;
  etiquetaIlustracion.value.style.display = 'block';
}

function ocultarEtiquetaLugar() {
  if (!etiquetaIlustracion.value) return;
  etiquetaIlustracion.value.innerText = '';
  etiquetaIlustracion.value.style.display = 'none';
}

// Cerrar ficha o info de proyecto al hacer clic afuera
function clicFuera(evento: MouseEvent) {
  evento.stopPropagation();

  const elemento = evento.target as HTMLElement;
  const botonAbrir = elemento.classList.contains('botonAbrir');
  const botonIndicador = elemento.classList.contains('etiquetaDatos');
  const fichaLugar = elemento.classList.contains('fichaLugar');
  const fichaPodcast = elemento.classList.contains('fichaPodcast');
  const infoProyecto = elemento.classList.contains('infoProyecto');
  const infoIndicadores = elemento.classList.contains('infoProyecto');

  if (botonAbrir || fichaLugar || infoProyecto || fichaPodcast || infoIndicadores || botonIndicador) return;
  cerebro.infoVisible = false;
  cerebro.fichaVisible = false;
  cerebro.podcastVisible = false;
  cerebro.indicadoresVisible = false;
}

async function cargarDatos() {
  try {
    //const ruido = await fetch('/datos/ruido.json').then((res) => res.json());
    // console.log(ruido);
  } catch (error) {
    console.error('Error descargando datos del ruido', error);
  }
}

cargarDatos().catch(console.error);

onMounted(async () => {
  window.addEventListener('scroll', () => {
    if (window.scrollX > 100) {
      tituloVisible.value = false;
    } else {
      tituloVisible.value = true;
    }
  });
  try {
    const datosPuntos = await pedirDatos<Punto[]>('/datos/puntos.json');

    if (!datosPuntos) return;
    // Calcular lugar de cada punto por lugar
    datosPuntos.forEach((punto, i) => {
      if (i === 0) {
        punto.ubicacionX = 0;
      } else {
        const puntoAnterior = datosPuntos[i - 1];
        if (puntoAnterior.lat && puntoAnterior.lon && punto.lat && punto.lon) {
          const distanciaParcial = distanciaEntreCoordenadas(
            puntoAnterior.lat,
            puntoAnterior.lon,
            punto.lat,
            punto.lon
          );
          distanciaTotal += distanciaParcial;
          const x = convertirEscala(distanciaTotal, 0, 25, 0, 100);
          punto.ubicacionX = x;
          datosPuntos[i - 1].ancho = x - (datosPuntos[i - 1].ubicacionX || 0);

          if (i === datosPuntos.length - 1) {
            punto.ancho = 100 - x;
          }
        }
      }
    });

    puntos.value = datosPuntos;
    anchoContenedor.value = datosPuntos.length * pasoX;
    // lugares.value = datosPuntos.filter((punto) => punto.ilustraciones && punto.ilustraciones.length);
    // perfiles.value = datosPuntos.filter((punto) => !!punto.perfil);
  } catch (error) {
    console.error('Error descargando datos de los puntos', error);
  }
  puntosUbicados.value = puntos.value;

  // Generar índices para árboles que van a pintarse y alturas para los pájaros
  // puntosUbicados.value.forEach((punto) => {
  //   if (!punto.ambiente) return;
  //   let arbol = arboles[numeroAleatorio(arboles.length)];
  //   let altura = 210 + numeroAleatorio(60);
  //   arbolesElegidos.value.push(arbol);
  //   alturaPajaros.value.push(altura);
  // });

  escalar();
  window.addEventListener('resize', escalar);
});
</script>

<template>
  <main id="contenedorGeneral" @click="clicFuera($event)" :style="{ width: `${anchoContenedor + 300}px` }">
    <Titulo :class="{ visible: tituloVisible }" />
    <SobreProyecto />
    <Podcast :cerrar="cerrarFicha" />

    <div
      id="paisaje"
      :style="{
        width: `${anchoContenedor}px`,
        height: `${dims.fondo}px`,
        backgroundSize: `${dims.fondo * 1.8}px`,
      }"
    >
      <div
        class="elementosPunto"
        v-for="punto in puntosUbicados"
        :key="punto.slug"
        :style="{ left: `${punto.ubicacionX}%` }"
      >
        <img
          v-if="punto.ilustraciones && punto.ilustraciones.length"
          @mouseenter="mostrarEtiquetaLugar(punto.id)"
          @mouseleave="ocultarEtiquetaLugar"
          class="ilustracion"
          :class="slugificar(punto.ilustraciones[0])"
          :src="`${base}/imagenes/lugares/${punto.ilustraciones}.webp`"
          :alt="`${punto.ilustraciones}`"
        />

        <img
          v-if="punto.perfil"
          @click="abrirFicha(punto.slug)"
          class="icono iconoPerfil botonAbrir"
          :src="`${base}/imagenes/icono_perfil.png`"
          alt="ícono abrir perfil"
        />

        <!--árboles: pintar uno si el valor de ambiente del punto >= 0.7 y dos si es > 0.8 -->
        <!-- <img
            v-if="punto.ambiente ? punto.ambiente >= 0.7 : 0"
            class="arbol sinEventos"
            :src="`${base}/imagenes/vegetacion/${arbolesElegidos[i]}.png`"
            alt="árbol"
          /> -->

        <!-- <img
            v-if="punto.ambiente ? punto.ambiente > 0.8 : 0"
            class="arbol sinEventos"
            :src="`${base}/imagenes/vegetacion/${arbolesElegidos[i]}.png`"
            alt="árbol"
          /> -->

        <!-- <img
            v-if="punto.txtPajaros"
            @click="punto.slug === 'calle-32' ? abrirFicha(punto.slug) : ''"
            class="icono iconoPajaro sinEventos"
            :src="`${base}/imagenes/icono_pajaro.png`"
            alt="ícono abrir perfil"
            :style="`bottom:${alturaPajaros[i]}px`"
          /> -->
      </div>

      <div ref="etiquetaIlustracion" class="etiqueta etiquetaIlustracion sinEventos"></div>
    </div>

    <div id="fondoCalle" :style="{ width: `${anchoContenedor}px`, height: `${dims.calle}px` }"></div>

    <VisualizacionIndices :puntos="puntos" :ancho="anchoContenedor" :alto="dims.vis" :pasoX="pasoX" />

    <FichaIndicadores :cerrar="cerrarFicha" />
    <FichaLugar v-if="cerebro.fichaVisible" :id="idLugar ? idLugar : ''" :cerrar="cerrarFicha" />
  </main>
</template>

<style lang="scss">
@use 'scss/constantes' as *;
@use 'scss/general' as *;

#contenedorGeneral {
  display: flex;
  flex-direction: column;
}

#fondoCalle {
  position: relative;
  z-index: 1;

  &::before,
  &::after {
    content: '';
    background-image: url(/imagenes/fondos/calle-piso.webp);
    background-size: contain;
    width: 100%;
    height: 11px;
    display: block;
    position: absolute;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
    rotate: 180deg;
  }
}

#paisaje {
  background-image: url(/imagenes/fondos/montanias_septimazo.png);
  background-repeat: repeat-x;
  z-index: 2;
  position: relative;

  .elementosPunto {
    position: absolute;
    height: 100%;
  }

  @keyframes cambioColor {
    0% {
      background-color: var(--amarillo);
      height: 30px;
    }
    50% {
      background-color: var(--rosa);
      height: 40px;
    }
    100% {
      background-color: var(--amarillo);
      height: 30px;
    }
  }

  .iconoPerfil {
    bottom: 180px;
    border-radius: 50%;
    padding: 0.3em;
    animation-name: cambioColor;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    box-shadow: 5px 9px 7px #59593d;
  }
}

.ilustracion {
  width: auto;
  z-index: 5;
  position: absolute;
  bottom: 0;
  height: 100%;

  &:hover {
    opacity: 1;
  }

  &.plaza-de-bolivar {
    transform: translate(10%, 15%) rotate(1deg);
  }

  &.iglesia-san-francisco {
    transform: translate(0, 10%) rotate(-0.7deg);
    height: 110%;
  }

  &.planetario-de-bogota {
    transform: translate(0, 10%);
    height: 90%;
  }

  &.parque-nacional {
    transform: translate(0, 1%);
  }
  &.universidad-javeriana {
    transform: translate(0px, 1%);
  }

  &.parque-de-los-hippies {
    transform: translate(-30%, 5%);
  }

  &.edificio-caracol {
    transform: translate(-20%, 1%);
  }

  &.edificio-los-venados {
    transform: translate(-50%, 2%);
  }

  &.subida-a-patios {
    transform: translate(-50%, 15%);
  }

  &.museo-del-chico {
    transform: translate(-50%, 3%);
  }

  &.seminario-conciliar {
    transform: translate(-50%, 4%) rotate(1deg);
  }

  &.escuela-de-caballeria {
    transform: translate(-30%, 1%);
  }

  &.hacienda-santa-barbara {
    transform: translate(-50%, 1%);
  }

  &.centro-comercial-palatino {
    transform: translate(-50%, 4%) rotate(-2deg);
    height: 80%;
  }

  &.hospital-simon-bolivar {
    transform: translate(-50%, 1%);
    height: 70%;
    filter: hue-rotate(30deg);
  }

  &.centro-de-abastos-codabas {
    transform: translate(-50%, 1%);
    height: 60%;
  }

  &.barrio-el-codito {
    transform: translate(-20%, 2%) rotate(-1deg);
  }

  &.finca-la-suiza {
    transform: translate(-20%, 3%) rotate(2deg);
    height: 70%;
  }

  &.subestacion-torca {
    transform: translate(0, 1%) rotate(-1deg);
  }
}
.arbol {
  position: absolute;
  bottom: 0px;
  height: 15vh;
  z-index: 8;
}

// Etiqueta del lugar ilustrado
.etiqueta {
  font-family: var(--fuentePrincipal);
  position: absolute;
  height: 1em;
  font-size: 1em;
  text-align: center;
  background-color: #f5d68ed7;
  border-radius: 5px;
  padding: 0.5em;
}

.etiquetaIlustracion {
  bottom: 5vh;
  height: auto;
  display: none;
}

.icono {
  position: absolute;
  z-index: 9;
}

.iconoPajaro {
  height: 35px;
  border-radius: 50%;
  padding: 0.3em;

  &.texto {
    cursor: pointer;
  }
}

@media screen and (min-width: $minTablet) {
  .arbol {
    height: 200px;
  }
}
</style>
