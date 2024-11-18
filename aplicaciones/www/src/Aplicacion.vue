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
const fichaVisible: Ref<boolean> = ref(false);
const etiquetaIlustracion: Ref<HTMLElement | null> = ref(null);

const contenedorSobreProyecto: Ref<HTMLDivElement | undefined> = ref();

const cerebro = usarCerebro();

let ratonSobreLugar: string = '';

function abrirFicha(id: string) {
  cerebro.lugarElegido = id;
  idPodcast.value = id;
  idLugar.value = id;
  fichaVisible.value = true;
}

function cerrarFicha() {
  idPodcast.value = null;
  idLugar.value = null;
  fichaVisible.value = false;
}

// Mostrar los nombres de los lugares ilustrados cuando el ratón está encima
function mostrarNombreLugar(event: MouseEvent, id: string) {
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
</script>

<template>
  <SobreProyecto />

  <div id="cra7">
    <Titulo />
    <div id="fondoCalle"></div>
    <div id="contenedorElementos">
      <div class="elementosPunto" v-for="punto in puntosUbicados" :key="punto.slug">
        <img
          @mouseenter="mostrarNombreLugar($event, punto.id)"
          @mouseleave="ocultarNombreLugar"
          class="ilustracion"
          v-if="punto.ilustraciones"
          :src="`/imagenes/lugares/${punto.ilustraciones}.png`"
          :alt="`${punto.ilustraciones}`"
          :style="`left:${punto.ilustraciones[0] === 'seminario_conciliar' || punto.ilustraciones[0] === 'abastos_codabas' ? punto.ubicacionX - 12 : punto.ubicacionX - 5}vw`"
        />

        <!--Quizás hay que quitar esos íconos y dejar solo el nombre de la calle para abrir ficha. 
        Depende de si todos los puntos van a tener alguna información-->
        <!--        <img
          @click="abrirFicha(punto.slug)"
          class="icono iconoPodcast"
          v-if="punto.podcast"
          src="/imagenes/icono_podcast.png"
          alt="ícono abrir podcast"
          :style="`left:${punto.ubicacionX}vw`"
        />

        <img
          @click="abrirFicha(punto.slug)"
          class="icono iconoPerfil"
          v-if="punto.perfil"
          src="/imagenes/icono_perfil.png"
          alt="ícono abrir perfil"
          :style="`left:${punto.ubicacionX}vw`"
        /> -->

        <p
          @click="abrirFicha(punto.id)"
          class="nombreCalle"
          :style="`width: ${punto.slug === 'diagonal-40a' || punto.slug === 'plaza-de-bolivar' ? '55' : '40'}px; left:${punto.ubicacionX ? punto.ubicacionX - 1 : 0}vw; padding:${punto.slug === 'plaza-de-bolivar' || punto.slug === 'avenida-jimenez' ? '0.4em 0.6em 0.4em 0.4em' : '0.4em 0em'}`"
        >
          {{ punto.nombre }}
        </p>

        <FichaLugar v-if="fichaVisible" :id="punto.slug" :cerrar="cerrarFicha" />
      </div>
      <div ref="etiquetaIlustracion" class="etiquetaIlustracion" :style="``"></div>
    </div>
  </div>
  <VisualizacionIndices />
</template>

<style lang="scss">
@import 'scss/constantes';
@import 'scss/general';

#aplicacion {
  display: flex;
  width: 600vw;
}

#cra7 {
  background-image: url(/imagenes/fondos/montanias_septimazo.png);
  background-position: top;
  background-size: contain;
  position: relative;
  top: 0;
  height: 60vh;
  width: 600vw;

  #fondoCalle {
    background-image: url(/imagenes/fondos/calle_septimazo.png);
    height: 400px;
    position: absolute;
    width: 600vw;
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

// Etiqueta del lugar ilustrado
.etiquetaIlustracion {
  bottom: 5vh;
  position: absolute;
  height: 1em;
  font-size: 1em;
  text-align: center;
  background-color: #f5d68ed7;
  border-radius: 5px;
  padding: 0.5em;
}

.icono {
  position: absolute;
  cursor: pointer;
}

.iconoPodcast {
  width: 30px;
  bottom: 8vh;
}

.iconoPerfil {
  height: 30px;
  bottom: 3vh;
}

.nombreCalle {
  position: absolute;
  bottom: -3vh;
  font-size: 0.7em;
  text-align: center;
  background-color: #f5d68ed7;
  border-radius: 5px;
  cursor: pointer;
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
