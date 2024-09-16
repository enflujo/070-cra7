<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { distanciaEntreCoordenadas } from './utilidades/ayudas';
import type { ElementoPaisaje } from './tipos';
import Personaje from './componentes/Personaje.vue';
import Podcast from './componentes/Podcast.vue';
import Relato from './componentes/Relato.vue';
import VisualizacionIndices from './componentes/VisualizacionIndices.vue';
import type { Punto } from '@/tipos/compartidos';

const ilustraciones: Ref<{ nombre: string; x: number }[]> = ref([]);

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

    <!--     <Ilustracion v-bind="ilustraciones[0]" /> -->
    <Personaje v-bind="personajePrueba" />
    <Podcast v-bind="podcastPrueba" />
    <Relato v-bind="relatoPrueba" />
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

.infoPunto {
  display: none;
  position: absolute;
  font-size: 0.8em;
  text-align: center;
  text-transform: lowercase;
  top: 270px;
}
</style>
