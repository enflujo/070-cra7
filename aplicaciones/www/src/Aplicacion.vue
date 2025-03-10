<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { distanciaEntreCoordenadas, base, convertirEscala } from './utilidades/ayudas';
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
const puntosUbicados: Ref<Punto[]> = ref([]);
const ilustraciones: Ref<{ nombre: string; x: number }[]> = ref([]);
const perfiles: Ref<{ id: string; x: number }[]> = ref([]);
const arbolesElegidos: Ref<string[]> = ref([]);
const alturaPajaros: Ref<number[]> = ref([]);
const idPodcast: Ref<string | null> = ref(null);
const idLugar: Ref<string | null> = ref(null);
const etiquetaIlustracion: Ref<HTMLElement | null> = ref(null);

const cerebro = usarCerebro();

const multiplicadorAncho = screen.width > 767 ? 8 : 12; // valor para multiplicar 100vw
let distanciaTotal = 0;

let ratonSobreLugar: string = '';

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
  // Punto por lugar
  puntos.value = (await fetch(`${import.meta.env.BASE_URL}/datos/puntos.json`).then((res) => res.json())) as Punto[];
  puntosUbicados.value = puntos.value;

  // Calcular lugar de cada punto por lugar y pintarlos
  for (let i = 0; i < puntos.value.length; i++) {
    // Dibujar el primer punto
    if (i === 0) {
      puntosUbicados.value[i].ubicacionX = -5;
      // Dibujar el resto de puntos
    } else {
      const puntoA = puntos.value[i - 1];
      const puntoB = puntos.value[i];

      if (puntoA.lat && puntoA.lon && puntoB.lat && puntoB.lon) {
        const distanciaParcial = distanciaEntreCoordenadas(puntoA.lat, puntoA.lon, puntoB.lat, puntoB.lon);
        // ir calculando la distancia total sumando las parciales
        // distancia total = 24.7921;

        distanciaTotal += distanciaParcial;

        const x = convertirEscala(distanciaTotal, 0, 25, 0, 100 * multiplicadorAncho);

        puntosUbicados.value[i].ubicacionX = x;

        if (puntoB.ilustraciones) {
          ilustraciones.value.push({ nombre: 'iglesia_san_francisco', x });
        }

        if (puntoB.perfil) {
          perfiles.value.push({ id: puntoB.perfil, x });
        }
      }
    }
  }

  // Generar índices para árboles que van a pintarse y alturas para los pájaros
  puntosUbicados.value.forEach((punto) => {
    if (!punto.ambiente) return;
    let arbol = arboles[numeroAleatorio(arboles.length)];
    let altura = 210 + numeroAleatorio(60);
    arbolesElegidos.value.push(arbol);
    alturaPajaros.value.push(altura);
  });
});

function numeroAleatorio(maximo: number) {
  return Math.floor(Math.random() * maximo);
}
</script>

<template>
  <div id="contenedorGeneral" @click="clicFuera($event)">
    <SobreProyecto />
    <Podcast :cerrar="cerrarFicha" />

    <div id="cra7">
      <Titulo />
      <div id="fondoCalle"></div>

      <div id="contenedorElementos">
        <div
          class="elementosPunto"
          v-for="(punto, i) in puntosUbicados"
          :key="punto.slug"
          :style="`transform:translateX(${punto.ubicacionX}vw)`"
        >
          <img
            @mouseenter="mostrarEtiquetaLugar(punto.id)"
            @mouseleave="ocultarEtiquetaLugar"
            class="ilustracion"
            :class="slugificar(punto.ilustraciones[0])"
            v-if="punto.ilustraciones"
            :src="`${base}/imagenes/lugares/${punto.ilustraciones}.png`"
            :alt="`${punto.ilustraciones}`"
          />

          <!--árboles: pintar uno si el valor de ambiente del punto >= 0.7 y dos si es > 0.8 -->
          <img
            class="arbol sinEventos"
            v-if="punto.ambiente ? punto.ambiente >= 0.7 : 0"
            :src="`${base}/imagenes/vegetacion/${arbolesElegidos[i]}.png`"
            alt="árbol"
          />

          <img
            class="arbol sinEventos"
            v-if="punto.ambiente ? punto.ambiente > 0.8 : 0"
            :src="`${base}/imagenes/vegetacion/${arbolesElegidos[i]}.png`"
            alt="árbol"
          />

          <img
            @click="abrirFicha(punto.slug)"
            class="icono iconoPerfil botonAbrir"
            v-if="punto.perfil"
            :src="`${base}/imagenes/icono_perfil.png`"
            alt="ícono abrir perfil"
          />

          <img
            @click="punto.slug === 'calle-32' ? abrirFicha(punto.slug) : ''"
            class="icono iconoPajaro sinEventos"
            v-if="punto.txtPajaros"
            :src="`${base}/imagenes/icono_pajaro.png`"
            alt="ícono abrir perfil"
            :style="`bottom:${alturaPajaros[i]}px`"
          />
        </div>

        <div ref="etiquetaIlustracion" class="etiqueta etiquetaIlustracion sinEventos"></div>
      </div>
    </div>

    <VisualizacionIndices :multiplicadorAncho="multiplicadorAncho" />
    <FichaIndicadores :cerrar="cerrarFicha" />
    <FichaLugar v-if="cerebro.fichaVisible" :id="idLugar ? idLugar : ''" :cerrar="cerrarFicha" />
  </div>
</template>

<style lang="scss" scoped>
@use 'scss/constantes' as *;
@use 'scss/general' as *;

#aplicacion {
  display: flex;
  width: 1213vw;
}

#cra7 {
  background-image: url(/imagenes/fondos/montanias_septimazo.png);
  background-position: 0;
  background-size: 24%;
  position: relative;
  top: 0;
  height: 65vh;
  background-repeat: repeat-x;
  // width: 1213vw;

  &::after {
    content: '';
    background-image: url(/imagenes/fondos/calle-piso.webp);
    background-repeat: repeat-x;
    background-position: center bottom;
    background-size: 50%;
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 148px;
    z-index: -1;
  }

  #fondoCalle {
    background-image: url(/imagenes/fondos/calle_septimazo.png);
    height: 400px;
    position: absolute;
    width: 100%;
    bottom: 0vw;
    background-position: bottom;
    background-size: contain;
    background-repeat: repeat-x;
  }

  #contenedorElementos {
    padding: 0 0 0 3vw;
    height: 60vh;
    position: relative;
    left: 3vw;
    top: 14px;

    .elementosPunto {
      position: absolute;
    }
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
  height: auto;
  bottom: 87px;
  width: 75vw;

  &:hover {
    opacity: 1;
  }

  &.plaza-de-bolivar {
    transform: translate(-50px, 26px) rotate(1deg);
  }

  &.iglesia-san-francisco {
    transform: translate(-50px, -15px) rotate(1deg);
  }

  &.planetario-de-bogota {
    transform: translate(-9vw, -43px);
  }

  &.parque-nacional {
    transform: translate(0px, -21px);
  }
  &.universidad-javeriana {
    transform: translate(0px, -21px);
  }

  &.parque-de-los-hippies {
    transform: translate(-81px, -29px);
  }
  &.edificio-caracol {
    transform: translate(-22px, -24px);
  }
  &.edificio-los-venados {
    transform: translate(40px, -24px);
  }
  &.escuela-de-caballeria {
    transform: translateY(-14px);
  }

  &.subida-a-patios {
    transform: translateY(27px);
  }

  &.museo-del-chico {
    transform: translate(-32px, -19px);
  }

  &.seminario-conciliar {
    width: 27vw;
    transform: translate(-73px, -8px) rotate(2deg);
  }

  &.hacienda-santa-barbara {
    transform: translate(15px, -10px);
  }

  &.centro-de-abastos-codabas {
    transform: translateX(-150px);
  }
  &.barrio-el-codito {
    transform: translate(120px, 9px) rotate(-1deg);
  }
  &.centro-comercial-palatino {
    transform: translateY(20px);
  }
  &.hospital-simon-bolivar {
    transform: translateY(-16px);
  }
  &.finca-la-suiza {
    transform: translateY(20px) rotate(1deg);
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
  #aplicacion {
    display: flex;
    width: 830vw;
  }

  #cra7 {
    // background-image: url(/imagenes/fondos/montanias_septimazo.png);
    // background-position: top;
    // background-size: contain;
    // position: relative;
    // top: 0;
    // height: 65vh;
    // width: 830vw;
  }

  .arbol {
    height: 200px;
  }

  .ilustracion {
    bottom: 53px;
    width: 35vw;
  }
}
</style>
