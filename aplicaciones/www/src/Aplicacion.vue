<script setup lang="ts">
import { onMounted } from 'vue';
import { distanciaEntreCoordenadas } from './utilidades/ayudas';
import { ElementoPaisaje } from './tipos';
import Personaje from './componentes/Personaje.vue';
import Podcast from './componentes/Podcast.vue';
import Relato from './componentes/Relato.vue';
import Ilustracion from './componentes/Ilustracion.vue';
import VisualizacionIndices from './componentes/VisualizacionIndices.vue';

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

const ilustracionPrueba: ElementoPaisaje = {
  nombre: 'Elemento Ilustración',
  descripcion: 'Ilustración bla bla',
  ubicacion: '3',
  ruta: '/imagenes/iglesia_san_francisco.png',
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

const multiplicadorAncho: number = 3; // valor para multiplicar 100vw por
let distanciaTotal: number = 0;
let distanciaParcial: number = 0;

//const ilustraciones: ElementoPaisaje[] = [];

onMounted(async () => {
  // Punto por lugar
  const contenedorZonas: HTMLElement = document.getElementById('contenedorZonas') as HTMLElement;
  const infoPuntoA: HTMLElement = document.getElementById('infoPuntoA') as HTMLElement;
  const infoPuntoB: HTMLElement = document.getElementById('infoPuntoB') as HTMLElement;
  const contenedorIlustraciones = document.getElementById('ilustraciones') as HTMLDivElement;
  const puntos = await fetch('/datos/puntos.json').then((res) => res.json());
  const elementos = await fetch('/datos/elementos.json').then((res) => res.json());

  // Calcular lugar de cada punto por lugar y pintarlos
  for (let i = 0; i < puntos.length; i++) {
    // Dibujar el primer punto
    if (i === 0) {
      // Dibujar el resto de puntos
    } else if (i === 1) {
      const puntoA = puntos[0];
      const puntoB = puntos[1];

      const zona = document.createElement('div');
      const x = convertirEscala(distanciaTotal, 0, 25, 0, 100 * multiplicadorAncho);

      distanciaParcial = distanciaEntreCoordenadas(puntoA.lat, puntoA.lon, puntoB.lat, puntoB.lon);
      const ancho = convertirEscala(distanciaParcial, 0, 25, 0, 100);

      zona.style.width = `${ancho}vw`;
      zona.classList.add('zona'); // No funciona y no sé por qué
      zona.style.left = `${x}vw`; //`${distanciaTotal}%`
      zona.style.top = '10px';

      distanciaTotal += distanciaParcial;

      // Agregar cada punto a la línea de la 7
      contenedorZonas.appendChild(zona);
      zona.addEventListener('mouseenter', () => {
        infoPuntoA.innerText = `${puntoA.nombre}`;
        infoPuntoA.style.left = `${x}vw`;
        infoPuntoA.style.display = 'block';
        infoPuntoB.innerText = `${puntoB.nombre}`;
        infoPuntoB.style.left = `${x + ancho}vw`;
        infoPuntoB.style.display = 'block';
      });
      zona.addEventListener('mouseleave', () => {
        infoPuntoA.innerText = infoPuntoB.innerText = '';
        infoPuntoA.style.display = infoPuntoB.style.display = 'none';
      });

      // Agregar primera ilustración
      if (elementos[i + 1].ilustraciones.length) {
        if (elementos[i + 1].ilustraciones.length === 1) {
          const ilustracion = document.createElement('img') as HTMLImageElement;
          ilustracion.className = 'ilustracion';
          ilustracion.src = `/imagenes/${elementos[i + 1].ilustraciones[0].ruta}.png`;
          ilustracion.style.left = `${x}vw`;

          contenedorIlustraciones.appendChild(ilustracion);
        }
      }
    } else {
      const puntoA = puntos[i - 1];
      const puntoB = puntos[i];

      const zona = document.createElement('div');

      distanciaParcial = distanciaEntreCoordenadas(puntoA.lat, puntoA.lon, puntoB.lat, puntoB.lon);
      // ir calculando la distancia total sumando las parciales
      // distancia total = 24.7921;
      const x = convertirEscala(distanciaTotal, 0, 25, 0, 100 * multiplicadorAncho);
      const ancho = convertirEscala(distanciaParcial, 0, 25, 0, 100 * multiplicadorAncho);
      distanciaTotal += distanciaParcial;

      zona.classList.add('zona'); // No funciona y no sé por qué
      zona.style.width = `${ancho}vw`;
      zona.style.left = `${x}vw`; //`${distanciaTotal}%`
      zona.style.top = '10px';

      // Agregar cada punto a la línea de la 7
      contenedorZonas.appendChild(zona);

      zona.addEventListener('mouseenter', () => {
        infoPuntoA.innerText = `${puntoA.nombre}`;
        infoPuntoA.style.left = `${x - 1}vw`;
        infoPuntoA.style.display = 'block';
        infoPuntoB.innerText = `${puntoB.nombre}`;
        infoPuntoB.style.left = `${x + ancho}vw`;
        infoPuntoB.style.display = 'block';
      });
      zona.addEventListener('mouseleave', () => {
        infoPuntoA.innerText = infoPuntoB.innerText = '';
        infoPuntoA.style.display = infoPuntoB.style.display = 'none';
      });

      // Agregar las demás ilustraciones
      if (elementos[i + 1].ilustraciones.length) {
        if (elementos[i + 1].ilustraciones.length === 1) {
          const ilustracion = document.createElement('img') as HTMLImageElement;
          ilustracion.className = 'ilustracion';
          ilustracion.src = '/imagenes/iglesia_san_francisco.png'; // `/imagenes/${elementos[i + 1].ilustraciones[0].ruta}.png`;
          ilustracion.style.left = `${x}vw`;

          /*  const ilustracion: ElementoPaisaje = {
          nombre: 'Elemento Ilustración',
          descripcion: 'Ilustración bla bla',
          ubicacion: `${i + 1}`,
          ruta: `/imagenes/${elementos[i + 1].ilustraciones[0].ruta}.png`,
        }; 
        ilustraciones.push(ilustracion);*/

          contenedorIlustraciones.appendChild(ilustracion);
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

    <div id="ilustraciones"></div>

    <!--     <Ilustracion v-bind="ilustraciones[0]" /> -->
    <Personaje v-bind="personajePrueba" />
    <Podcast v-bind="podcastPrueba" />
    <Relato v-bind="relatoPrueba" />

    <div id="contenedorZonas">
      <div class="infoPunto" id="infoPuntoA"></div>
      <div class="infoPunto" id="infoPuntoB"></div>
    </div>
  </div>
</template>

<style lang="scss">
#titulo {
  position: fixed;
}

#cra7 {
  /*  background-color: rgb(243, 156, 255);
  height: 8px; */
  width: 200vw; // debe ser igual que anchoEnPantalla
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
  width: 300px;
  position: absolute;
  bottom: 0;
}

.infoPunto {
  display: none;
  position: absolute;
  font-size: 0.8em;
  text-align: center;
  text-transform: lowercase;
  top: 303px;
}

.zona {
  position: absolute;
  background-color: rgba(16, 255, 255, 0.222);
  border: rgba(10, 197, 248, 0.5) solid 1px;
  height: 292px;
  opacity: 0.1;
  cursor: pointer;
  z-index: 99;
}
.zona:hover {
  opacity: 0.9;
}

#contenedorZonas {
  height: 300px;
  position: absolute;
  top: 88px;
}
</style>
