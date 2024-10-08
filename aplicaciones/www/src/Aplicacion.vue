<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { distanciaEntreCoordenadas } from './utilidades/ayudas';
import type { ElementoPaisaje } from './tipos';
import Personaje from './componentes/Personaje.vue';
import Podcast from './componentes/Podcast.vue';
import Relato from './componentes/Relato.vue';
import FichaLugar from './componentes/FichaLugar.vue';
import VisualizacionIndices from './componentes/VisualizacionIndices.vue';
import type { Punto } from '@/tipos/compartidos';

import { usarCerebro } from './utilidades/cerebro';

const puntos: Ref<Punto[]> = ref([]);
const puntosUbicados: Ref<Punto[]> = ref([]);
const ilustraciones: Ref<{ nombre: string; x: number }[]> = ref([]);
const podcasts: Ref<{ id: string; x: number }[]> = ref([]);
const perfiles: Ref<{ id: string; x: number }[]> = ref([]);
const idPodcast: Ref<string | null> = ref(null);
const idLugar: Ref<string | null> = ref(null);
const fichaVisible: Ref<boolean> = ref(false);

const cerebro = usarCerebro();

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

/*const ilustracion = createVNode(Ilustracion, {
  nombre: 'Elemento Ilustración',
  descripcion: 'Ilustración bla bla',
  ubicacion: '3',
  ruta: '/imagenes/iglesia_san_francisco.png',
})*/

/* if (contenedorIlustraciones) {
  contenedorIlustraciones.appendChild(ilustracion);
} */

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
  <div id="titulo">
    <h1>24/7</h1>
    <h2>Habitabilidad en la cra 7 de Bogotá</h2>
  </div>

  <div id="cra7">
    <!-- <div id="fondoMontaña"></div> -->

    <div class="elementosPunto" v-for="punto in puntosUbicados" :key="punto.slug">
      <img
        class="ilustracion"
        v-if="punto.ilustraciones"
        :src="`/imagenes/${punto.ilustraciones}.png`"
        alt=""
        :style="`left:${punto.ubicacionX}vw`"
      />

      <img
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
      />

      <p class="nombreCalle" :style="`left:${punto.ubicacionX}vw`">{{ punto.nombre }}</p>

      <FichaLugar v-if="fichaVisible" :id="punto.slug" :cerrar="cerrarFicha" />
    </div>
  </div>
  <VisualizacionIndices />
</template>

<style lang="scss">
@import 'scss/general';

#aplicacion {
  display: flex;
}
#titulo {
  margin: 2em auto;
  display: block;
  font-family: var(--fuenteTitulo);
  text-align: center;

  h1 {
    margin: 0;
  }

  h2 {
    margin: 0;
    font-family: var(--fuenteTitulo);
  }
}

#cra7 {
  /*  background-color: rgb(243, 156, 255);
  height: 8px; */
  width: 300vw; // debe ser igual que anchoEnPantalla
  top: 15vw;
  height: 30vh;
  position: absolute;

  #fondoMontaña {
    background-image: url('/imagenes/silueta_montaña_prueba.png');
    left: 0;
    top: 0;
    background-position: bottom;
    height: 15vw;
    width: 99vw;
    opacity: 0.2;
    position: absolute;
  }
}

.ilustracion {
  bottom: 2vh;
  position: absolute;
  height: 48vh;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    //filter: brightness(0.5);
  }
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
