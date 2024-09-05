<script setup lang="ts">
import { onMounted } from 'vue';
import { distanciaEntreCoordenadas } from './utilidades/ayudas';
import { ElementoPaisaje } from './tipos';
import Personaje from './componentes/Personaje.vue';
import Podcast from './componentes/Podcast.vue';
import Relato from './componentes/Relato.vue';

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

const anchoEnPantalla: number = 98; // medida en vw
let distanciaTotal: number = 0;

onMounted(async () => {
  const cra7: HTMLElement = document.getElementById('cra7') as HTMLElement;
  const infoPunto: HTMLElement = document.getElementById('infoPunto') as HTMLElement;
  const puntos = await fetch('/datos/puntos.json').then((res) => res.json());

  // Calcular
  for (let i = 0; i < puntos.length; i++) {
    // Dibujar el primer punto
    if (i === 0) {
      const punto = document.createElement('div');
      punto.classList.add('punto'); // No funciona y no sé por qué
      punto.style.left = `0vw`; //`${distanciaTotal}%`
      cra7.appendChild(punto);

      punto.addEventListener('mouseenter', () => {
        infoPunto.innerText = `${puntos[0].nombre}`;
        infoPunto.style.left = `0vw`;
        infoPunto.style.display = 'block';
      });
      punto.addEventListener('mouseleave', () => {
        infoPunto.innerText = '';
        infoPunto.style.display = 'none';
      });
      // Dibujar el resto de puntos
    } else {
      const puntoA = puntos[i - 1];
      const puntoB = puntos[i];

      const distanciaParcial = distanciaEntreCoordenadas(puntoA.lat, puntoA.lon, puntoB.lat, puntoB.lon);
      // ir calculando la distancia total sumando las parciales
      // distancia total = 24.7921;
      distanciaTotal += distanciaParcial;

      const posicionPunto = escalar(distanciaTotal, 24.7921);

      //console.log(escalar(distanciaParcial, 24.7921));

      const punto = document.createElement('div');
      punto.classList.add('punto'); // No funciona y no sé por qué
      punto.style.left = `${posicionPunto}vw`; //`${distanciaTotal}%`

      // Agregar cada punto a la línea de la 7
      cra7.appendChild(punto);

      punto.addEventListener('mouseenter', () => {
        infoPunto.innerText = `${puntoB.nombre}`;
        infoPunto.style.left = `${posicionPunto - 1}vw`;
        infoPunto.style.display = 'block';
      });
      punto.addEventListener('mouseleave', () => {
        infoPunto.innerText = '';
        infoPunto.style.display = 'none';
      });
    }
  }
});

function escalar(x: number, max: number) {
  return (x * anchoEnPantalla) / max;
}
</script>

<template>
  <h1>Habitabilidad en la cra 7 de Bogotá</h1>
  <div id="cra7">
    <div id="infoPunto"></div>
  </div>
  <Personaje v-bind="personajePrueba" />
  <Podcast v-bind="podcastPrueba" />
  <Relato v-bind="relatoPrueba" />
</template>

<style lang="scss">
#main {
  background-color: yellow;
}

#cra7 {
  background-color: rgb(243, 156, 255);
  height: 8px;
  width: 98vw; // debe ser igual que anchoEnPantalla
  position: relative;
}

#infoPunto {
  display: none;
  position: absolute;
  top: 10px;
}

.punto {
  position: absolute;
  background-color: black;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
