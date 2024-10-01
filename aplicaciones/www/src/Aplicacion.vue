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
const ilustraciones: Ref<{ nombre: string; x: number }[]> = ref([]);
const podcasts: Ref<{ id: string; x: number }[]> = ref([]);
const perfiles: Ref<{ id: string; x: number }[]> = ref([]);
const idPodcast: Ref<string | null> = ref(null);
const idLugar: Ref<string | null> = ref(null);
const fichaVisible: Ref<boolean> = ref(false);

const cerebro = usarCerebro();

//const lugarElegido: Ref<string> = ref('1'); //Cómo se trae desde el cerebro?
console.log(cerebro.lugarElegido);
//lugarElegido.value = '1'; // ¿Dónde se define esto para que abajo no se ueje de que puede ser nulo?

function abrirFicha(id: string) {
  cerebro.lugarElegido = id;

  console.log(cerebro.lugarElegido);
  idPodcast.value = id;
  idLugar.value = id;
  fichaVisible.value = true;
}

function cerrarFicha() {
  idPodcast.value = null;
  idLugar.value = null;
  fichaVisible.value = false;
}

/** Si se definen así los props desde un objeto,
 * toca usar el v-bind="" en elemento de vue para pasar los props.
 * Ver explicación en: https://vuejs.org/guide/components/props.html#binding-multiple-properties-using-an-object
 * */
const personajePrueba: ElementoPaisaje = {
  nombre: 'Elemento personaje',
  descripcion: 'descripción personaje',
};

const podcastPrueba: ElementoPaisaje = {
  id: 'pd4',
  nombre: 'Elemento podcast',
  descripcion: 'descripción podcast',
};

const relatoPrueba: ElementoPaisaje = {
  nombre: 'Elemento personaje',
  descripcion: 'Relato bla bla',
};

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

  // Calcular lugar de cada punto por lugar y pintarlos
  for (let i = 0; i < puntos.value.length; i++) {
    // Dibujar el primer punto
    if (i === 0) {
      // Dibujar el resto de puntos
    } else {
      const puntoA = puntos.value[i - 1];
      const puntoB = puntos.value[i];

      if (puntoA.lat && puntoA.lon && puntoB.lat && puntoB.lon) {
        const distanciaParcial = distanciaEntreCoordenadas(puntoA.lat, puntoA.lon, puntoB.lat, puntoB.lon);
        // ir calculando la distancia total sumando las parciales
        // distancia total = 24.7921;
        const x = convertirEscala(distanciaTotal, 0, 25, 0, 100 * multiplicadorAncho);
        // const ancho = convertirEscala(distanciaParcial, 0, 25, 0, 100 * multiplicadorAncho);
        distanciaTotal += distanciaParcial;

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
  <h1 id="titulo">Habitabilidad en la cra 7 de Bogotá</h1>

  <div id="cra7">
    <!-- <div id="fondoMontaña"></div> -->

    <div class="elementosPunto" v-for="punto in puntos">
      <img
        class="ilustracion"
        v-for="ilustracion in ilustraciones"
        :key="ilustracion.nombre"
        :src="`/imagenes/${ilustracion.nombre}.png`"
        alt=""
        :style="`left:${ilustracion.x}vw`"
      />

      <img
        @click="abrirFicha(punto.slug)"
        class="icono icono_podcast"
        v-for="podcast in podcasts"
        :key="podcast.id"
        src="/imagenes/icono_podcast.png"
        alt=""
        :style="`left:${podcast.x}vw`"
      />

      <img
        @click="abrirFicha(punto.slug)"
        class="icono icono_perfil"
        v-for="perfil in perfiles"
        :key="perfil.id"
        src="/imagenes/icono_perfil.png"
        alt=""
        :style="`left:${perfil.x}vw`"
      />

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
  margin: 0.5em auto;
  display: block;
  font-family: var(--fuenteTitulo);
}

#cra7 {
  /*  background-color: rgb(243, 156, 255);
  height: 8px; */
  width: 300vw; // debe ser igual que anchoEnPantalla
  top: 15vw;
  height: 30vh;
  position: absolute;

  //position: relative;

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

.icono_podcast {
  width: 30px;
  bottom: 8vh;
}

.icono_perfil {
  height: 30px;
  bottom: 3vh;
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
