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
import { ElementoPaisaje } from './tipos';
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
const tituloPodcast: Ref<HTMLElement | null> = ref(null);
const podcastElegido: Ref<ElementoPaisaje | null> = ref(null);
const botonInformacion: Ref<HTMLDivElement | null> = ref(null);

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

const podcasts: ElementoPaisaje[] = [
  {
    id: '1',
    ruta: 'https://open.spotify.com/embed/episode/4LjdcPIIOWgX6hw58sTZ4h?utm_source=generator',
    nombre: 'Una ciudad habitable: ¿es chévere vivir en Bogotá?',
    descripcion:
      '¿Qué significa que una ciudad sea habitable? ¿Qué factores inciden en que consideremos que una ciudad es más o menos agradable para vivir? ¿Pueden los trancones y la contaminación de una ciudad afectar la salud física y mental de quienes vivimos allí? <br> <br> En este episodio de Veiticuatro Siete, la profesora y médica Olga Lucía Sarmiento nos explicará el concepto de habitabilidad urbana, y usará como ejemplo la carrera Séptima, una de las avenidas más importantes y representativas de Bogotá.',
  },
  {
    id: '2',
    ruta: 'https://open.spotify.com/embed/episode/6SOndW9Jo3nPKpzBp9IEul?utm_source=generator',
    nombre: 'Una ciudad para moverse, una ciudad para quedarse',
    descripcion:
      '¿Cómo construir soluciones de movilidad para que las personas no solo piensen en moverse, en llegar de un punto a otro en una ciudad, sino que se quieran quedar a vivir allí? ¿Se puede pensar en soluciones para transportarse mejor pero también para vivir mejor? <br> <br> En este segundo episodio de Veinticuatro Siete, el profesor e ingeniero Carlos Moncada nos explica cómo pensar una movilidad sostenible para hacer ciudades más habitables.',
  },
  {
    id: '3',
    ruta: 'https://open.spotify.com/embed/episode/4KLNWodM68BNvhxlmKY7fu?utm_source=generator',
    nombre: '¿Qué nos dicen las aves sobre la calidad del aire y el ruido de Bogotá?',
    descripcion:
      'En este episodio quisimos hacer algo diferente: entender los efectos que tiene vivir en una ciudad como Bogotá, no para los humanos sino para otros seres, como las aves, que habitan con nosotros desde otra altura. <br> <br> ¿Qué nos dicen las palomas, torcazas, mirlas, colibríes, reinitas y demás aves sobre el ruido y la contaminación en la capital? <br> <br> En este episodio de Veinticuatro Siete, la médica veterinaria Arlen Patricia Gómez y el profesor Ricardo Morales nos explican cómo estos factores medioambientales pueden hacer que Bogotá sea más o menos habitable para los humanos y otros seres con los que convivimos.',
  },
  {
    id: '4',
    ruta: '',
    nombre: 'Movilidad / Congestión',
    descripcion: 'descripción pd3',
  },
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

// Función para abrir información sobre el proyecto
function abrirInfo() {
  cerebro.infoVisible = true;
}

// Mostrar los nombres de los podcasts cuando el ratón está encima
function mostrarTituloPodcast(titulo: string, evento: MouseEvent) {
  if (!tituloPodcast.value) return;
  tituloPodcast.value.innerText = titulo;
  tituloPodcast.value.style.display = 'block';
  tituloPodcast.value.style.top = `${evento.clientY - 200}px`;
}

function ocultarEtiquetaPodcast() {
  if (!tituloPodcast.value) return;
  tituloPodcast.value.innerText = '';
  tituloPodcast.value.style.display = 'none';
}

function elegirPodcast(podcast: ElementoPaisaje) {
  podcastElegido.value = podcast;
  cerebro.podcastVisible = true;
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
    <span ref="botonInformacion" id="botonInformacion" @click="abrirInfo" class="botonAbrir">?</span>

    <SobreProyecto v-if="cerebro.infoVisible" />
    <div id="contenedorIconos">
      <img
        v-for="podcast in podcasts"
        @click="elegirPodcast(podcast)"
        @mouseenter="mostrarTituloPodcast(podcast.nombre, $event)"
        @mouseleave="ocultarEtiquetaPodcast"
        class="iconoPodcast botonAbrir"
        :src="`${base}/imagenes/icono_podcast.png`"
        alt="ícono abrir podcast"
      />
      <p ref="tituloPodcast" class="tituloPodcast sinEventos"></p>
    </div>

    <div id="cra7">
      <Titulo />
      <div id="fondoCalle"></div>
      <div id="contenedorElementos">
        <div class="elementosPunto" v-for="(punto, i) in puntosUbicados" :key="punto.slug">
          <img
            @mouseenter="mostrarEtiquetaLugar(punto.id)"
            @mouseleave="ocultarEtiquetaLugar"
            class="ilustracion"
            :class="slugificar(punto.ilustraciones[0])"
            v-if="punto.ilustraciones"
            :src="`${base}/imagenes/lugares/${punto.ilustraciones}.png`"
            :alt="`${punto.ilustraciones}`"
            :style="`left:${punto.ubicacionX}vw`"
          />

          <!--árboles: pintar uno si el valor de ambiente del punto >= 0.7 y dos si es > 0.8 -->
          <img
            class="arbol sinEventos"
            v-if="punto.ambiente ? punto.ambiente >= 0.7 : 0"
            :src="`${base}/imagenes/vegetacion/${arbolesElegidos[i]}.png`"
            alt="árbol"
            :style="`left:${(punto.ubicacionX || 0) - 5}vw`"
          />

          <img
            class="arbol sinEventos"
            v-if="punto.ambiente ? punto.ambiente > 0.8 : 0"
            :src="`${base}/imagenes/vegetacion/${arbolesElegidos[i]}.png`"
            alt="árbol"
            :style="`left:${(punto.ubicacionX || 0) - 2}vw`"
          />

          <img
            @click="abrirFicha(punto.slug)"
            class="icono iconoPerfil botonAbrir"
            v-if="punto.perfil"
            :src="`${base}/imagenes/icono_perfil.png`"
            alt="ícono abrir perfil"
            :style="`left:${(punto.ubicacionX || 0) - 3}vw`"
          />

          <img
            @click="punto.slug === 'calle-32' ? abrirFicha(punto.slug) : ''"
            class="icono iconoPajaro sinEventos"
            v-if="punto.txtPajaros"
            :src="`${base}/imagenes/icono_pajaro.png`"
            alt="ícono abrir perfil"
            :style="`left:${(punto.ubicacionX || 0) - 3}vw; bottom:${alturaPajaros[i]}px`"
          />
        </div>

        <div ref="etiquetaIlustracion" class="etiqueta etiquetaIlustracion sinEventos"></div>
      </div>
    </div>
    <Podcast
      v-if="cerebro.podcastVisible"
      :podcast="podcastElegido ? podcastElegido : undefined"
      :cerrar="cerrarFicha"
    />
    <VisualizacionIndices :multiplicadorAncho="multiplicadorAncho" />
    <FichaIndicadores :cerrar="cerrarFicha" />
    <FichaLugar v-if="cerebro.fichaVisible" :id="idLugar ? idLugar : ''" :cerrar="cerrarFicha" />
  </div>
</template>

<style lang="scss" scoped>
@use 'scss/constantes' as *;
@use 'scss/general' as *;

#botonInformacion {
  display: block;
  padding: 0.5em;
  border-radius: 50%;
  background-color: var(--lila);
  position: fixed;
  text-align: center;
  height: 1em;
  width: 1em;
  right: 10px;
  top: 10px;
  opacity: 0.7;
  cursor: pointer;
  z-index: 10;

  &:hover {
    opacity: 1;
  }
}

#aplicacion {
  display: flex;
  width: 1213vw;
}

#cra7 {
  background-image: url(/imagenes/fondos/montanias_septimazo.png);
  background-position: top;
  background-size: contain;
  position: relative;
  top: 0;
  height: 60vh;
  width: 1213vw;

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
    width: 594vw;
    height: 60vh;
    position: absolute;
    left: 3vw;
    top: 14px;
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
  position: absolute;
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

#contenedorIconos {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 40px;
  top: 22vh;
  z-index: 11;
  border-radius: 15px;
  padding: 0.4em;

  .iconoPodcast {
    width: 35px;
    border-radius: 50%;
    padding: 0.3em;
    margin: 0.3em;
    background: #ffffffde;
  }

  .tituloPodcast {
    position: absolute;
    display: none;
    width: 200px;
    background-color: #ffffffde;
    right: 70px;
    padding: 0.7em;
    text-align: right;
    font-size: 0.9em;
    border-radius: 5px;
  }
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
    background-image: url(/imagenes/fondos/montanias_septimazo.png);
    background-position: top;
    background-size: contain;
    position: relative;
    top: 0;
    height: 65vh;
    width: 830vw;
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
