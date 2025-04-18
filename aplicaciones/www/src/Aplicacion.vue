<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';
import {
  distanciaEntreCoordenadas,
  base,
  convertirEscala,
  pedirDatos,
  numeroAleatorio,
  escalaLogaritmica,
} from './utilidades/ayudas';
import VisualizacionIndices from './componentes/VisualizacionIndices.vue';

import { perfiles, podcasts, textos, usarCerebro } from './utilidades/cerebro';
import Titulo from './componentes/Titulo.vue';
import type { Punto } from '@/tipos/compartidos';
import AnimacionesCalle from './componentes/AnimacionesCalle.vue';
import Paisaje from './componentes/Paisaje.vue';
import IndicadorGesto from './componentes/IndicadorGesto.vue';
import VentanaContenido from './componentes/VentanaContenido.vue';

const contenedorGeneral = ref<HTMLElement | null>(null);
const puntos: Ref<Punto[]> = ref([]);
const anchoContenedor = ref(0);
const pasoX = 1500;
const alto = ref(0);
const listaPodcastsVisible = ref(false);
const dims = computed(() => ({ fondo: alto.value * 0.5, calle: alto.value * 0.11, vis: alto.value * 0.368 }));
let posX = 0;

const arboles = [
  'septimazo-arbol.webp',
  'septimazo-arbol2.webp',
  'septimazo-arbol3.webp',
  'septimazo-borrachero.webp',
  'septimazo-palmera.webp',
  'septimazo-yarumoamarillo.webp',
  'septimazo-yarumorosa.webp',
  'septimazo-yarumoverde.webp',
].map((ruta) => `${base}/imagenes/vegetacion/${ruta}`);

const cantidadArboles = (valor: number): string[] => {
  const valorMin = 0.6;
  if (valor <= valorMin) return [];
  const cantidad = escalaLogaritmica(valor, 0.6, 1, 2, 30);
  const arbolesElegidos: string[] = [];

  for (let i = 0; i < cantidad; i++) {
    arbolesElegidos.push(arboles[numeroAleatorio(arboles.length - 1)]);
  }

  return arbolesElegidos;
};

const cerebro = usarCerebro();
const controlInfo = () => {
  cerebro.mostrarFicha('sobre');
};

/** Eventos de la página general */
const escalar = () => {
  alto.value = window.innerHeight;
};

const moverEjeXEnScrollY = (evento: WheelEvent) => {
  if (!contenedorGeneral.value) return;

  if (evento.deltaY !== 0) {
    evento.preventDefault();
    const diferencia = posX - (posX + evento.deltaY);
    posX += evento.deltaY;
    if (posX < 0) posX = 0;
    if (posX > anchoContenedor.value) posX = anchoContenedor.value;

    window.scrollBy({ left: -diferencia, behavior: 'instant' });
  }
};

// Cerrar ficha o info de proyecto al hacer clic afuera
const clicFuera = (evento: MouseEvent) => {
  evento.stopPropagation();

  const elemento = evento.target as HTMLElement;
  const ficha = document.getElementById('ficha');

  if (!ficha || !(ficha === elemento || ficha.contains(elemento))) {
    cerebro.fichaVisible = false;
  }
};

onMounted(async () => {
  try {
    const datosPuntos = await pedirDatos<Punto[]>('/datos/puntos.json');

    if (!datosPuntos) return;

    // Calcular lugar de cada punto por lugar
    let distanciaTotal = 0;

    datosPuntos.forEach((punto, i) => {
      punto.ubicacionX = 0;
      punto.malAire = [];

      if (i > 0) {
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

      const indiceAmbiente = punto.indices.find((obj) => obj.indicador === 'ambiente');
      punto.vegetacion = cantidadArboles(indiceAmbiente?.valor || 0);

      if (indiceAmbiente && indiceAmbiente.valor > 0.75) {
        punto.pajaros = [];
        for (let i = 0; i < escalaLogaritmica(indiceAmbiente.valor, 0.75, 1, 1, 20); i++) {
          punto.pajaros.push(`${base}/imagenes/vegetacion/pajaros.webp`);
        }
      }

      const malAire = ['Calle 76', 'Calle 84', 'Calle 170', 'Calle 180', 'Calle 189'];
      const imgsRuido = ['ruido-septimazo.webp', 'ruido2-septimazo.webp', 'ruido3-septimazo.webp'];

      if (malAire.includes(punto.nombre)) {
        for (let i = 0; i < 15; i++) {
          punto.malAire.push(`${base}/imagenes/fondos/${imgsRuido[numeroAleatorio(imgsRuido.length - 1)]}`);
        }
      }

      const perfil = perfiles.find((perfil) => perfil.slug === punto.slug);

      if (perfil) {
        punto.perfil = perfil;
      } else {
        punto.perfil = undefined;
      }

      const textosPunto = textos[punto.slug];

      if (textosPunto) {
        punto.textos = textosPunto.textos;
      }
    });

    puntos.value = datosPuntos;
    anchoContenedor.value = datosPuntos.length * pasoX;
  } catch (error) {
    console.error('Error descargando datos de los puntos', error);
  }

  escalar();

  window.addEventListener('resize', escalar);

  if (contenedorGeneral.value) {
    posX = window.scrollX;
    contenedorGeneral.value.addEventListener('wheel', moverEjeXEnScrollY, { passive: false });
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', escalar);
  contenedorGeneral.value?.removeEventListener('wheel', moverEjeXEnScrollY);
});

function mostrarListaPodcasts() {
  listaPodcastsVisible.value = !listaPodcastsVisible.value;
}
</script>

<template>
  <span ref="botonInformacion" id="botonInformacion" class="botonAbrir" @click="controlInfo">Sobre el proyecto</span>

  <div id="contenedorIconos">
    <h2 class="tituloBoton" @click="mostrarListaPodcasts">Podcasts</h2>

    <div id="enlacesPodcasts" :class="listaPodcastsVisible ? 'visible' : ''">
      <div v-for="podcast in podcasts" @click="cerebro.elegirPodcast(podcast, $event)" class="enlacePodcast">
        <img class="iconoPodcast botonAbrir" :src="`${base}/imagenes/icono_podcast.png`" alt="ícono abrir podcast" />
        <span class="nombrePodcast">{{ podcast.nombre }}</span>
      </div>
    </div>
  </div>

  <main
    id="contenedorGeneral"
    ref="contenedorGeneral"
    @click="clicFuera($event)"
    :style="{ width: `${anchoContenedor + 300}px` }"
  >
    <Titulo />
    <VentanaContenido v-if="cerebro.fichaVisible" />
    <AnimacionesCalle :puntos="puntos" :anchoContenedor="anchoContenedor" :dims="dims" />
    <Paisaje :puntos="puntos" :anchoContenedor="anchoContenedor" :dims="dims" />

    <div id="fondoCalle" :style="{ width: `${anchoContenedor}px`, height: `${dims.calle}px` }"></div>

    <VisualizacionIndices
      :puntos="puntos"
      :ancho="anchoContenedor"
      :alto="dims.vis"
      :pasoX="pasoX"
      :y="dims.fondo + dims.calle"
    />
    <IndicadorGesto />
  </main>
</template>

<style lang="scss">
@use 'scss/constantes' as *;
@use 'scss/general' as *;

#botonInformacion {
  display: block;
  padding: 0.8em;
  background-color: var(--lila);
  position: fixed;
  text-align: center;
  right: 0px;
  top: 0px;
  opacity: 0.7;
  cursor: pointer;
  z-index: 10;
  font-family: var(--fuentePrincipal);

  &:hover {
    opacity: 1;
  }
}

#contenedorIconos {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 3em;
  z-index: 11;
  border-radius: 15px;

  .tituloBoton {
    background-color: var(--lila);
    padding: 0.5em 0.8em;
    margin: 0;
    font-size: 1.1em;
    font-weight: normal;
    cursor: pointer;
  }

  .enlacePodcast {
    cursor: pointer;
    display: flex;
    align-items: center;
    max-width: 173px;
    margin-bottom: 0.2em;
    font-size: 0.85em;
    font-family: var(--fuentePrincipal);
    background-color: #ffffffde;
    padding: 0.5em;
  }

  #enlacesPodcasts {
    height: 0;
    overflow: auto;

    &.visible {
      height: 100%;
    }
  }

  .iconoPodcast {
    width: 50px;
  }

  .iconoPodcast {
    width: 35px;
    border-radius: 50%;
    padding: 0.3em;
  }

  .tituloPodcast {
    position: absolute;
    display: none;
    background-color: #ffffffde;
    right: 20px;
    padding: 0.7em;
    text-align: right;
    font-size: 0.9em;
    border-radius: 5px;

    .visible {
      display: block;
    }
  }
}

.perfil {
  background-color: rgba(255, 255, 255, 0.4);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    font-size: 1.3em;
    font-weight: bold;
    background-color: var(--lila);
  }

  &::before {
    content: '▶';
    font-size: 4em;
    flex-shrink: 0;
    color: var(--morado);
  }
}
#animacionesCalle {
  position: absolute;
  z-index: 9;
  pointer-events: none;
}

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

.vegetacion {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;

  .arbol {
    position: absolute;
    bottom: 0;
    height: 150px;
    z-index: 1;
    pointer-events: none;
    transform-origin: bottom center;
  }
}

.malAire {
  opacity: 0.6;
  animation: vibrarOpacidad 1s infinite;

  .humo {
    position: absolute;
    z-index: 1;
    pointer-events: none;
    transform-origin: bottom center;
    animation: moverHumo 3s infinite linear;
  }
}

@keyframes vibrarOpacidad {
  0% {
    opacity: 0.6;
  }

  50% {
    opacity: 0.8;
  }

  100% {
    opacity: 0.6;
  }
}

@keyframes moverHumo {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

// Etiqueta del lugar ilustrado
.etiqueta {
  font-family: var(--fuentePrincipal);
  position: absolute;
  font-size: 1em;
  text-align: center;
  background-color: #f58ef5d7;
  border-radius: 5px;
  padding: 0.5em;
  z-index: 99;
  transform: translate(-50%, -150%);
  pointer-events: none;
  display: none;

  &.visible {
    display: block;
  }
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
