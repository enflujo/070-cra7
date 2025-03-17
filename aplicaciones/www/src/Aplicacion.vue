<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';
import { distanciaEntreCoordenadas, base, convertirEscala, pedirDatos, numeroAleatorio } from './utilidades/ayudas';
import slugificar from 'slug';
import FichaPerfil from './componentes/FichaPerfil.vue';
import VisualizacionIndices from './componentes/VisualizacionIndices.vue';

import { perfiles, textos, usarCerebro } from './utilidades/cerebro';
import Titulo from './componentes/Titulo.vue';
import SobreProyecto from './componentes/SobreProyecto.vue';
import Podcast from './componentes/Podcast.vue';
import type { Punto } from '@/tipos/compartidos';
import FichaIndicadores from './componentes/FichaIndicadores.vue';
import Animacion from './componentes/Animacion.vue';
import type { Perfil } from './tipos';

const puntos: Ref<Punto[]> = ref([]);
/** Lugares que tienen ilustración */
const idPodcast: Ref<string | null> = ref(null);
const idLugar: Ref<string | null> = ref(null);
const etiquetaIlustracion: Ref<HTMLElement | null> = ref(null);
const anchoContenedor = ref(0);
const pasoX = 1500;
const alto = ref(0);
const dims = computed(() => ({ fondo: alto.value * 0.5, calle: alto.value * 0.11, vis: alto.value * 0.368 }));
const xMinCarros = computed(() =>
  puntos.value.length ? ((puntos.value[2].ubicacionX || 0) / 100) * anchoContenedor.value : 0
);
const perfilElegido: Ref<Perfil | null> = ref(null);

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

const escalaLogaritmica = (valor: number, min: number, max: number, minEscala: number, maxEscala: number): number => {
  const factor = (valor - min) / (max - min);
  return Math.round(minEscala + (maxEscala - minEscala) * factor);
};

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

/** Eventos de la página general */
const escalar = () => {
  alto.value = window.innerHeight;
};

const abrirFichaPerfil = (perfil: Perfil) => {
  perfilElegido.value = perfil;
};

const cerrarFicha = () => {
  idPodcast.value = null;
  idLugar.value = null;
  cerebro.fichaVisible = false;
  cerebro.indicadoresVisible = false;
  perfilElegido.value = null;
};

// Mostrar los nombres de los lugares ilustrados cuando el ratón está encima
const mostrarEtiquetaLugar = (nombre: string) => {
  if (!etiquetaIlustracion.value) return;
  etiquetaIlustracion.value.innerText = nombre;
  etiquetaIlustracion.value.classList.add('visible');
};

const ocultarEtiquetaLugar = () => {
  if (!etiquetaIlustracion.value) return;
  etiquetaIlustracion.value.innerText = '';
  etiquetaIlustracion.value.classList.remove('visible');
};

const actualizarPosicionEtiqueta = (evento: MouseEvent) => {
  if (!etiquetaIlustracion.value) return;
  etiquetaIlustracion.value.style.left = `${evento.clientX + window.scrollX}px`;
  etiquetaIlustracion.value.style.top = `${evento.clientY}px`;
};

// Cerrar ficha o info de proyecto al hacer clic afuera
const clicFuera = (evento: MouseEvent) => {
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
});

onUnmounted(() => {
  window.removeEventListener('resize', escalar);
});
</script>

<template>
  <main id="contenedorGeneral" @click="clicFuera($event)" :style="{ width: `${anchoContenedor + 300}px` }">
    <Titulo />
    <SobreProyecto />
    <Podcast :cerrar="cerrarFicha" />

    <div id="animacionesCalle" :style="{ top: `${dims.fondo}px` }">
      <Animacion
        ruta="septimazo-bici2.webp"
        idAnim="bici1"
        :puntoA="0"
        :puntoB="anchoContenedor"
        :y="-20"
        :alto="50"
        sentido="izquierda"
        :invertir="true"
        :velocidad="1500"
      />

      <Animacion
        ruta="septimazo-bici.webp"
        idAnim="bici2"
        :puntoA="0"
        :puntoB="anchoContenedor"
        :y="dims.calle - 90"
        :alto="70"
        sentido="derecha"
        :invertir="false"
        :velocidad="1000"
      />

      <Animacion
        ruta="septimazo-ambulancia.webp"
        idAnim="ambulancia"
        :puntoA="anchoContenedor - 300"
        :puntoB="xMinCarros"
        :y="dims.calle - 100"
        :alto="50"
        sentido="izquierda"
        :invertir="false"
        :velocidad="300"
      />

      <Animacion
        ruta="septimazo-basura.webp"
        idAnim="basura"
        :puntoA="anchoContenedor - 300"
        :puntoB="xMinCarros"
        :y="dims.calle - 150"
        :alto="100"
        sentido="izquierda"
        :invertir="false"
        :velocidad="500"
      />

      <Animacion
        ruta="septimazo-bus1.webp"
        idAnim="bus1"
        :puntoA="anchoContenedor - 100"
        :puntoB="xMinCarros"
        :y="dims.calle - 180"
        :alto="150"
        sentido="izquierda"
        :invertir="false"
        :velocidad="400"
      />

      <Animacion
        ruta="septimazo-bus2.webp"
        idAnim="bus2"
        :puntoA="xMinCarros"
        :puntoB="anchoContenedor - 100"
        :y="dims.calle - 150"
        :alto="150"
        sentido="izquierda"
        :invertir="true"
        :velocidad="400"
      />

      <Animacion
        ruta="septimazo-bus3.webp"
        idAnim="bus3"
        :puntoA="xMinCarros * 2"
        :puntoB="anchoContenedor - 100"
        :y="dims.calle - 150"
        :alto="150"
        sentido="izquierda"
        :invertir="true"
        :velocidad="300"
      />
    </div>

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
        v-for="punto in puntos"
        :key="punto.slug"
        :style="{ left: `${punto.ubicacionX}%`, width: `${punto.ancho}%` }"
      >
        <img
          v-if="punto.ilustraciones && punto.ilustraciones.length"
          @mouseenter="mostrarEtiquetaLugar(punto.ilustraciones[0])"
          @mouseleave="ocultarEtiquetaLugar"
          @mousemove="actualizarPosicionEtiqueta"
          class="ilustracion"
          :class="slugificar(punto.ilustraciones[0])"
          :src="`${base}/imagenes/lugares/${punto.ilustraciones}.webp`"
          :alt="`Ilustración de ${punto.ilustraciones}`"
        />

        <div class="perfil" v-if="punto.perfil" @click="abrirFichaPerfil(punto.perfil)">
          <img class="iconoPerfil" :src="`${base}/imagenes/icono_perfil.png`" alt="ícono abrir perfil" />
          <p>{{ punto.perfil.nombre }}</p>
        </div>

        <!-- <img
          v-if="punto.perfil"
          @click="abrirFichaPerfil(punto.slug)"
          class="icono iconoPerfil botonAbrir"
          :src="`${base}/imagenes/icono_perfil.png`"
          alt="ícono abrir perfil"
        /> -->

        <div class="vegetacion">
          <img
            v-for="arbol in punto.vegetacion"
            class="arbol sinEventos"
            :src="arbol"
            alt="árbol"
            :style="{
              left: `${numeroAleatorio(100)}%`,
              bottom: `${Math.random() * 5}%`,
              scale: `${0.3 + (1.5 - 0.3) * Math.random()}`,
            }"
          />

          <img
            v-if="punto.pajaros"
            v-for="pajaro in punto.pajaros"
            class="icono iconoPajaro"
            :src="pajaro"
            alt="pájaro"
            :style="{
              left: `${numeroAleatorio(100)}%`,
              top: `${Math.random() * 20}%`,
              scale: `${1 + (1.5 - 1) * Math.random()}`,
              transform: `scale(${numeroAleatorio(2) === 1 ? -1 : 1}, 1)`,
            }"
          />
        </div>

        <div v-if="punto.malAire" class="malAire">
          <img
            v-for="humo in punto.malAire"
            class="humo"
            :src="humo"
            alt="Humo que representa contaminación del aire"
            :style="{
              left: `${numeroAleatorio(100)}%`,
              top: `${Math.random() * 10}%`,
              scale: `${0.2 + (1 - 0.2) * Math.random()}`,
              transform: `scale(${numeroAleatorio(2) === 1 ? -1 : 1}, 1)`,
            }"
          />
        </div>
      </div>

      <div ref="etiquetaIlustracion" class="etiqueta etiquetaIlustracion sinEventos"></div>
    </div>

    <div id="fondoCalle" :style="{ width: `${anchoContenedor}px`, height: `${dims.calle}px` }"></div>

    <VisualizacionIndices :puntos="puntos" :ancho="anchoContenedor" :alto="dims.vis" :pasoX="pasoX" />
    <FichaIndicadores :cerrar="cerrarFicha" />
    <FichaPerfil v-if="perfilElegido" :perfil="perfilElegido" :cerrar="cerrarFicha" />
  </main>
</template>

<style lang="scss">
@use 'scss/constantes' as *;
@use 'scss/general' as *;

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
