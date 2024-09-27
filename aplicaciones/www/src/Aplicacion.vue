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

const ilustraciones: Ref<{ nombre: string; x: number }[]> = ref([]);
const podcasts: Ref<{ id: string; x: number }[]> = ref([]);
const perfiles: Ref<{ id: string; x: number }[]> = ref([]);
const idPodcast: Ref<string | null> = ref(null);
const idLugar: Ref<string | null> = ref(null);
const fichaVisible: Ref<boolean> = ref(false);

const lugarElegido: Ref<string> = ref('1'); //Cómo se trae desde el cerebro?

//lugarElegido.value = '1'; // ¿Dónde se define esto para que abajo no se ueje de que puede ser nulo?

function abrirFicha(id: string) {
  lugarElegido.value = id;
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
  ubicacion: '0',
};

const podcastPrueba: ElementoPaisaje = {
  id: 'pd4',
  nombre: 'Elemento podcast',
  descripcion: 'descripción podcast',
  ubicacion: '1',
};

const relatoPrueba: ElementoPaisaje = {
  nombre: 'Elemento personaje',
  descripcion: 'Relato bla bla',
  ubicacion: '2',
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

const multiplicadorAncho = 3; // valor para multiplicar 100vw por
let distanciaTotal = 0;

onMounted(async () => {
  // Punto por lugar
  const puntos = (await fetch('/datos/puntos.json').then((res) => res.json())) as Punto[];

  // Calcular lugar de cada punto por lugar y pintarlos
  for (let i = 0; i < puntos.length; i++) {
    // Dibujar el primer punto
    if (i === 0) {
      // Dibujar el resto de puntos
    } else {
      const puntoA = puntos[i - 1];
      const puntoB = puntos[i];

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
    <VisualizacionIndices />

    <div id="ilustraciones">
      <img
        class="ilustracion"
        v-for="ilustracion in ilustraciones"
        :key="ilustracion.nombre"
        :src="`/imagenes/${ilustracion.nombre}.png`"
        alt=""
        :style="`left:${ilustracion.x}vw`"
      />
    </div>

    <div id="iconos_podcast">
      <img
        @click="abrirFicha(lugarElegido)"
        class="icono icono_podcast"
        v-for="podcast in podcasts"
        :key="podcast.id"
        src="/imagenes/icono_podcast.png"
        alt=""
        :style="`left:${podcast.x}vw`"
      />
    </div>
    <div id="iconos_perfiles">
      <img
        class="icono icono_perfil"
        v-for="perfil in perfiles"
        :key="perfil.id"
        src="/imagenes/icono_perfil.png"
        alt=""
        :style="`left:${perfil.x}vw`"
      />
    </div>

    <FichaLugar v-if="fichaVisible" :id="lugarElegido" :cerrar="cerrarFicha" />
    <!--  <Personaje v-bind="personajePrueba" />
    <Podcast v-if="idPodcast" :id="idPodcast" :cerrar="cerrarFicha" />
    <Relato v-bind="relatoPrueba" /> -->
  </div>
</template>

<style lang="scss">
#titulo {
  position: fixed;
}

#cra7 {
  /*  background-color: rgb(243, 156, 255);
  height: 8px; */
  width: 300vw; // debe ser igual que anchoEnPantalla
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
  width: 100px;
  position: absolute;
  bottom: 0;
}

.icono {
  position: absolute;
  cursor: pointer;
}

.icono_podcast {
  width: 30px;
  bottom: 80px;
}

.icono_perfil {
  height: 30px;
  bottom: 120px;
}

.infoPunto {
  display: none;
  position: absolute;
  font-size: 0.8em;
  text-align: center;
  text-transform: lowercase;
  top: 270px;
}
</style>
