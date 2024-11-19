<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { distanciaEntreCoordenadas } from './utilidades/ayudas';
import FichaLugar from './componentes/FichaLugar.vue';
import VisualizacionIndices from './componentes/VisualizacionIndices.vue';
import type { Punto } from '@/tipos/compartidos';

import { usarCerebro } from './utilidades/cerebro';
import Titulo from './componentes/Titulo.vue';
import SobreProyecto from './componentes/SobreProyecto.vue';

const puntos: Ref<Punto[]> = ref([]);
const puntosUbicados: Ref<Punto[]> = ref([]);
const ilustraciones: Ref<{ nombre: string; x: number }[]> = ref([]);
const podcasts: Ref<{ id: string; x: number }[]> = ref([]);
const perfiles: Ref<{ id: string; x: number }[]> = ref([]);
const idPodcast: Ref<string | null> = ref(null);
const idLugar: Ref<string | null> = ref(null);
const etiquetaIlustracion: Ref<HTMLElement | null> = ref(null);
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
function mostrarNombreLugar(id: string) {
  const punto = puntosUbicados.value.find((punto) => punto.id === id);

  if (!punto?.ilustraciones || !etiquetaIlustracion.value) return;
  ratonSobreLugar = punto?.ilustraciones[0];

  etiquetaIlustracion.value.innerText = ratonSobreLugar.split('_').join(' ');
  etiquetaIlustracion.value.style.left = `${punto.ubicacionX}vw`;
  etiquetaIlustracion.value.style.bottom = `250px`;
  etiquetaIlustracion.value.style.display = 'block';
}

function ocultarNombreLugar() {
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
  const infoProyecto = elemento.classList.contains('infoProyecto');

  if (botonAbrir || fichaLugar || infoProyecto) return;
  cerebro.infoVisible = false;
  cerebro.fichaVisible = false;
}

async function cargarDatos() {
  try {
    const ruido = await fetch('/datos/ruido.json').then((res) => res.json());

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
  puntos.value = (await fetch('/datos/puntos.json').then((res) => res.json())) as Punto[];
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

        // const ancho = convertirEscala(distanciaParcial, 0, 25, 0, 100 * multiplicadorAncho);
        distanciaTotal += distanciaParcial;

        const x = convertirEscala(distanciaTotal, 0, 25, 0, 100 * multiplicadorAncho);

        puntosUbicados.value[i].ubicacionX = x;

        if (puntoB.ilustraciones) {
          ilustraciones.value.push({ nombre: 'iglesia_san_francisco', x });
        }
        if (puntoB.podcast) {
          podcasts.value.push({ id: puntoB.podcast, x });
        }
        if (puntoB.perfil) {
          perfiles.value.push({ id: puntoB.perfil, x });
        }
      }
    }
  }
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

    <div id="cra7">
      <Titulo />
      <div id="fondoCalle"></div>
      <div id="contenedorElementos">
        <div class="elementosPunto" v-for="punto in puntosUbicados" :key="punto.slug">
          <img
            @mouseenter="mostrarNombreLugar(punto.id)"
            @mouseleave="ocultarNombreLugar"
            class="ilustracion"
            v-if="punto.ilustraciones"
            :src="`/imagenes/lugares/${punto.ilustraciones}.png`"
            :alt="`${punto.ilustraciones}`"
            :style="`left:${punto.ilustraciones[0] === 'Seminario Conciliar' || punto.ilustraciones[0] === 'Centro de abastos Codabas' ? punto.ubicacionX - 12 : punto.ubicacionX - 5}vw`"
          />

          <!--árboles: pintar uno si el valor de ambiente del punto >= 0.7 y dos si es > 0.8 -->
          <img
            @click="abrirFicha(punto.slug)"
            class="arbol"
            v-if="punto.ambiente ? punto.ambiente >= 0.7 : 0"
            :src="`/imagenes/vegetacion/${arboles[numeroAleatorio(arboles.length)]}.png`"
            alt="árbol"
            :style="`left:${punto.ubicacionX - 5}vw`"
          />

          <img
            @click="abrirFicha(punto.slug)"
            class="arbol"
            v-if="punto.ambiente ? punto.ambiente > 0.8 : 0"
            :src="`/imagenes/vegetacion/${arboles[numeroAleatorio(arboles.length)]}.png`"
            alt="árbol"
            :style="`left:${punto.ubicacionX - 2}vw`"
          />

          <!--íconos de podcast y perfil-->
          <img
            @click="abrirFicha(punto.slug)"
            class="icono iconoPodcast botonAbrir"
            v-if="punto.podcast"
            src="/imagenes/icono_podcast.png"
            alt="ícono abrir podcast"
            :style="`left:${punto.ubicacionX}vw`"
          />

          <img
            @click="abrirFicha(punto.slug)"
            class="icono iconoPerfil botonAbrir"
            v-if="punto.perfil"
            src="/imagenes/icono_perfil2.png"
            alt="ícono abrir perfil"
            :style="`left:${punto.ubicacionX - 3}vw`"
          />

          <img
            @click="punto.slug === 'calle-32' ? abrirFicha(punto.slug) : ''"
            class="icono iconoPajaro"
            :class="punto.slug === 'calle-32' ? 'texto' : ''"
            v-if="punto.txtPajaros"
            src="/imagenes/icono_pajaro.png"
            alt="ícono abrir perfil"
            :style="`left:${punto.ubicacionX - 3}vw; bottom:${210 + numeroAleatorio(60)}px`"
          />

          <p
            class="nombreCalle"
            :style="`width: ${punto.slug === 'diagonal-40a' || punto.slug === 'plaza-de-bolivar' ? '55' : '40'}px; left:${punto.ubicacionX ? punto.ubicacionX - 1 : 0}vw; padding:${punto.slug === 'plaza-de-bolivar' || punto.slug === 'avenida-jimenez' ? '0.4em 0.6em 0.4em 0.4em' : '0.4em 0em'}`"
          >
            {{ punto.nombre }}
          </p>

          <FichaLugar v-if="cerebro.fichaVisible" :id="punto.slug" :cerrar="cerrarFicha" />
        </div>
        <div ref="etiquetaIlustracion" class="etiquetaIlustracion" :style="``"></div>
      </div>
    </div>
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
}

// Etiqueta del lugar ilustrado
.etiquetaIlustracion {
  font-family: var(--fuentePrincipal);
  bottom: 5vh;
  position: absolute;
  height: 1em;
  font-size: 1em;
  text-align: center;
  background-color: #f5d68ed7;
  border-radius: 5px;
  padding: 0.5em;
  display: none;
}

.icono {
  position: absolute;
  z-index: 9;
}

.botonAbrir {
  cursor: pointer;
}

.iconoPodcast {
  width: 35px;
  bottom: 180px;
  background: var(--amarillo);
  border-radius: 50%;
  padding: 0.3em;
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
    //background-color: var(--amarillo);
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
