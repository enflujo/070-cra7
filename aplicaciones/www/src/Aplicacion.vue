<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { distanciaEntreCoordenadas, base } from './utilidades/ayudas';
import FichaLugar from './componentes/FichaLugar.vue';
import VisualizacionIndices from './componentes/VisualizacionIndices.vue';

import { usarCerebro } from './utilidades/cerebro';
import Titulo from './componentes/Titulo.vue';
import SobreProyecto from './componentes/SobreProyecto.vue';
import { ElementoPaisaje } from './tipos';
import Podcast from './componentes/Podcast.vue';
import type { Punto } from '@/tipos/compartidos';

const puntos: Ref<Punto[]> = ref([]);
const puntosUbicados: Ref<Punto[]> = ref([]);
const ilustraciones: Ref<{ nombre: string; x: number }[]> = ref([]);
//const podcasts: Ref<{ id: string; x: number; titulo: string }[]> = ref([]);
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
    ruta: 'https://open.spotify.com/embed/episode/4KLNWodM68BNvhxlmKY7fu?utm_source=generator',
    nombre: '¿Qué nos dicen las aves sobre la calidad del aire y el ruido de Bogotá?',
    descripcion:
      'En este episodio quisimos hacer algo diferente: entender los efectos que tiene vivir en una ciudad como Bogotá, no para los humanos sino para otros seres, como las aves, que habitan con nosotros desde otra altura. <br> <br> ¿Qué nos dicen las palomas, torcazas, mirlas, colibríes, reinitas y demás aves sobre el ruido y la contaminación en la capital? <br> <br> En este episodio de Veinticuatro Siete, la médica veterinaria Arlen Patricia Gómez y el profesor Ricardo Morales nos explican cómo estos factores medioambientales pueden hacer que Bogotá sea más o menos habitable para los humanos y otros seres con los que convivimos.',
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
    nombre: 'Movilidad / Congestión',
    descripcion: 'descripción pd3',
  },
  {
    id: '4',
    ruta: 'https://open.spotify.com/embed/episode/4LjdcPIIOWgX6hw58sTZ4h?utm_source=generator',
    nombre: 'Una ciudad habitable: ¿es chévere vivir en Bogotá?',
    descripcion:
      '¿Qué significa que una ciudad sea habitable? ¿Qué factores inciden en que consideremos que una ciudad es más o menos agradable para vivir? ¿Pueden los trancones y la contaminación de una ciudad afectar la salud física y mental de quienes vivimos allí? <br> <br> En este episodio de Veiticuatro Siete, la profesora y médica Olga Lucía Sarmiento nos explicará el concepto de habitabilidad urbana, y usará como ejemplo la carrera Séptima, una de las avenidas más importantes y representativas de Bogotá.',
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
}

// Función para abrir información sobre el proyecto
function abrirInfo() {
  cerebro.infoVisible = true;
}

// Mostrar los nombres de los lugares ilustrados cuando el ratón está encima
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

// Mostrar los nombres de los podcasts cuando el ratón está encima
function mostrarEtiquetaLugar(id: string) {
  const punto = puntosUbicados.value.find((punto) => punto.id === id);

  if (!punto?.ilustraciones || !etiquetaIlustracion.value) return;
  ratonSobreLugar = punto?.ilustraciones[0];

  etiquetaIlustracion.value.innerText = ratonSobreLugar.split('_').join(' ');
  etiquetaIlustracion.value.style.left = `${punto.ubicacionX}vw`;
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
  const fichaLugar = elemento.classList.contains('fichaLugar');
  const fichaPodcast = elemento.classList.contains('fichaPodcast');
  const infoProyecto = elemento.classList.contains('infoProyecto');

  if (botonAbrir || fichaLugar || infoProyecto || fichaPodcast) return;
  cerebro.infoVisible = false;
  cerebro.fichaVisible = false;
  cerebro.podcastVisible = false;
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

const multiplicadorAncho = 6; // valor para multiplicar 100vw por
let distanciaTotal = 0;

onMounted(async () => {
  // Punto por lugar
  puntos.value = (await fetch(`${import.meta.env.BASE_URL}/datos/puntos.json`).then((res) => res.json())) as Punto[];
  puntosUbicados.value = puntos.value;

  // Calcular lugar de cada punto por lugar y pintarlos
  for (let i = 0; i < puntos.value.length; i++) {
    // Dibujar el primer punto
    if (i === 0) {
      puntosUbicados.value[i].ubicacionX = 0;
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
        if (puntoB.podcast) {
          // podcasts.value.push({ id: puntoB.podcast, x });
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

function convertirEscala(
  valor: number,
  escalaBaseMin: number,
  escalaBaseMax: number,
  escalaDestinoMin: number,
  escalaDestinoMax: number
): number {
  return (
    ((valor - escalaBaseMin) * (escalaDestinoMax - escalaDestinoMin)) / (escalaBaseMax - escalaBaseMin) +
    escalaDestinoMin
  );
}

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
      <p ref="tituloPodcast" class="tituloPodcast"></p>
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
            v-if="punto.ilustraciones"
            :src="`${base}/imagenes/lugares/${punto.ilustraciones}.png`"
            :alt="`${punto.ilustraciones}`"
            :style="`left:${punto.ilustraciones[0] === 'Seminario Conciliar' || punto.ilustraciones[0] === 'Centro de abastos Codabas' ? (punto.ubicacionX || 0) - 12 : (punto.ubicacionX || 0) - 5}vw`"
          />

          <!--árboles: pintar uno si el valor de ambiente del punto >= 0.7 y dos si es > 0.8 -->
          <img
            @click="abrirFicha(punto.slug)"
            class="arbol"
            v-if="punto.ambiente ? punto.ambiente >= 0.7 : 0"
            :src="`${base}/imagenes/vegetacion/${arbolesElegidos[i]}.png`"
            alt="árbol"
            :style="`left:${(punto.ubicacionX || 0) - 5}vw`"
          />

          <img
            @click="abrirFicha(punto.slug)"
            class="arbol"
            v-if="punto.ambiente ? punto.ambiente > 0.8 : 0"
            :src="`${base}/imagenes/vegetacion/${arbolesElegidos[i]}.png`"
            alt="árbol"
            :style="`left:${(punto.ubicacionX || 0) - 2}vw`"
          />

          <!--íconos de podcast y perfil-->
          <!-- <img
            @click="abrirFicha(punto.slug)"
            class="icono iconoPodcast botonAbrir"
            v-if="punto.podcast"
            src="/imagenes/icono_podcast.png"
            alt="ícono abrir podcast"
            :style="`left:${punto.ubicacionX}vw`"
          /> -->

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
            class="icono iconoPajaro"
            :class="punto.slug === 'calle-32' ? 'texto' : ''"
            v-if="punto.txtPajaros"
            :src="`${base}/imagenes/icono_pajaro.png`"
            alt="ícono abrir perfil"
            :style="`left:${(punto.ubicacionX || 0) - 3}vw; bottom:${alturaPajaros[i]}px`"
          />

          <p
            class="nombreCalle"
            :id="punto.slug"
            :style="`width: ${punto.slug === 'diagonal-40a' || punto.slug === 'plaza-de-bolivar' ? '55' : '40'}px; left:${punto.ubicacionX ? punto.ubicacionX - 1 : 0}vw; padding:${punto.slug === 'plaza-de-bolivar' || punto.slug === 'avenida-jimenez' ? '0.4em 0.6em 0.4em 0.4em' : '0.4em 0em'}`"
          >
            {{ punto.nombre }}
          </p>
        </div>
        <FichaLugar v-if="cerebro.fichaVisible" :id="idLugar ? idLugar : ''" :cerrar="cerrarFicha" />

        <div ref="etiquetaIlustracion" class="etiqueta etiquetaIlustracion"></div>
      </div>
    </div>
    <Podcast
      v-if="cerebro.podcastVisible"
      :podcast="podcastElegido ? podcastElegido : undefined"
      :cerrar="cerrarFicha"
    />
    <VisualizacionIndices />
  </div>
</template>

<style lang="scss">
@import 'scss/constantes';
@import 'scss/general';

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
  width: 604vw;
}

#cra7 {
  background-image: url(/imagenes/fondos/montanias_septimazo.png);
  background-position: top;
  background-size: contain;
  position: relative;
  top: 0;
  height: 60vh;
  width: 604vw;

  #fondoCalle {
    background-image: url(/imagenes/fondos/calle_septimazo.png);
    height: 400px;
    position: absolute;
    width: 100%;
    bottom: -4vw;
    background-position: bottom;
    background-size: contain;
    background-repeat: repeat-x;
  }

  #contenedorElementos {
    padding: 0 0 0 3vw;
    width: 594vw;
    height: 70vh;
    position: absolute;
    left: 3vw;
    top: 14px;
  }
}

.ilustracion {
  bottom: 10vh;
  position: absolute;
  height: auto;
  width: 23vw;

  &:hover {
    opacity: 1;
  }
}
.arbol {
  position: absolute;
  height: 90px;
  bottom: 90px;
  z-index: 9;
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
  display: none;
}

.icono {
  position: absolute;
  z-index: 9;
}

.botonAbrir {
  cursor: pointer;
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

.iconoPerfil {
  height: 35px;
  bottom: 180px;
  background: var(--amarillo);
  border-radius: 50%;
  padding: 0.3em;
}

.iconoPajaro {
  height: 35px;
  border-radius: 50%;
  padding: 0.3em;

  &.texto {
    cursor: pointer;
  }
}

.nombreCalle {
  position: absolute;
  bottom: -3vh;
  font-size: 0.7em;
  text-align: center;
  background-color: #f5d68ed7;
  border-radius: 5px;
}

.infoPunto {
  display: none;
  position: absolute;
  font-size: 0.8em;
  text-align: center;
  text-transform: lowercase;
  bottom: -1.2em;
}
</style>
