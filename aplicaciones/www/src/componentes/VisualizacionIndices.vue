<script setup lang="ts">
import { onMounted } from 'vue';
import { distanciaEntreCoordenadas } from '../utilidades/ayudas';

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
const alturaContenedor: number = 310;

let distanciaTotal: number = 0;
let distanciaParcial: number = 0;
let lineaHabitabilidad: string = `M 0 ${alturaContenedor}`;
let lineaAmbiente: string = `M 0 ${alturaContenedor}`;
let lineaInfraestructura: string = `M 0 ${alturaContenedor}`;

onMounted(async () => {
  // Cargar datos
  const puntos = await fetch('/datos/puntos.json').then((res) => res.json());

  const contenedorCalles: SVGElement = document.getElementById('contenedorCalles') as HTMLElement & SVGElement;

  // Habitabilidad
  const trazoHabitabilidad: SVGPathElement = document.getElementById('trazoHabitabilidad') as HTMLElement &
    SVGPathElement;
  const circulosHabitabilidad: SVGElement = document.getElementById('circulosHabitabilidad') as HTMLElement &
    SVGElement;

  // Ambiente
  const trazoAmbiente: SVGPathElement = document.getElementById('trazoAmbiente') as HTMLElement & SVGPathElement;
  const circulosAmbiente: SVGElement = document.getElementById('circulosAmbiente') as HTMLElement & SVGElement;

  // Infraestructura
  const trazoInfraestructura: SVGPathElement = document.getElementById('trazoInfraestructura') as HTMLElement &
    SVGPathElement;
  const circulosInfraestructura: SVGElement = document.getElementById('circulosInfraestructura') as HTMLElement &
    SVGElement;

  // Calcular lugar de cada punto por lugar y pintarlos
  for (let i = 0; i < puntos.length; i++) {
    // Dibujar el primer punto
    if (i === 0) {
      const lineaCalle = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const circuloHabitabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloAmbiente = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      // línea calle
      /*  lineaCalle.setAttribute('class', 'lineasCalle');
      lineaCalle.setAttribute('x1', '0');
      lineaCalle.setAttribute('y1', `${alturaContenedor - 100}`);
      lineaCalle.setAttribute('x2', '0');
      lineaCalle.setAttribute('y2', `${alturaContenedor}`);

      contenedorCalles.append(lineaCalle);
 */
      // línea
      lineaHabitabilidad += `L 0 ${alturaContenedor - puntos[0].habitabilidad * alturaContenedor} `;
      lineaAmbiente += `L 0 ${alturaContenedor - puntos[0].ambiente * alturaContenedor} `;
      lineaInfraestructura += `L 0 ${alturaContenedor - puntos[0].infraestructura * alturaContenedor} `;

      // puntos Habitabilidad
      circuloHabitabilidad.setAttribute('class', 'puntoIndicador');
      circuloHabitabilidad.setAttribute('cx', '0');
      circuloHabitabilidad.setAttribute('cy', `${alturaContenedor - puntos[0].habitabilidad * alturaContenedor}`);
      circulosHabitabilidad.append(circuloHabitabilidad);

      // puntos Ambiente
      circuloAmbiente.setAttribute('class', 'puntoIndicador');
      circuloAmbiente.setAttribute('cx', '0');
      circuloAmbiente.setAttribute('cy', `${alturaContenedor - puntos[0].habitabilidad * alturaContenedor}`);
      circulosAmbiente.append(circuloAmbiente);

      // Dibujar el resto de puntos
    } else {
      const puntoA = puntos[i - 1];
      const puntoB = puntos[i];

      const circuloHabitabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloAmbiente = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      distanciaParcial = distanciaEntreCoordenadas(puntoA.lat, puntoA.lon, puntoB.lat, puntoB.lon);
      // ir calculando la distancia total sumando las parciales
      // distancia total = 24.7921;
      distanciaTotal += distanciaParcial;

      const x = convertirEscala(distanciaTotal, 0, 25, 0, window.innerWidth);
      const yInfraestructura = alturaContenedor - puntoB.infraestructura * alturaContenedor;
      const yHabitabilidad = alturaContenedor - puntoB.habitabilidad * alturaContenedor;
      const yAmbiente = alturaContenedor - puntoB.ambiente * alturaContenedor;

      circuloHabitabilidad.setAttribute('class', 'puntoIndicador');
      circuloHabitabilidad.setAttribute('cx', `${x}`);
      circuloHabitabilidad.setAttribute('cy', `${yHabitabilidad}`);

      circuloAmbiente.setAttribute('class', 'puntoIndicador');
      circuloAmbiente.setAttribute('cx', `${x}`);
      circuloAmbiente.setAttribute('cy', `${yAmbiente}`);

      if (i < puntos.length - 1) {
        lineaHabitabilidad += `L ${x} ${yHabitabilidad} `;
        lineaAmbiente += `L ${x} ${yAmbiente} `;
        lineaInfraestructura += `L ${x} ${yInfraestructura} `;
      } else {
        // cerrar el path si es el último punto
        lineaHabitabilidad += `L ${x} ${yHabitabilidad} L ${x} ${alturaContenedor} Z`;
        lineaAmbiente += `L ${x} ${yAmbiente} L ${x} ${alturaContenedor} Z`;
        lineaInfraestructura += `L ${x} ${yInfraestructura} L ${x} ${alturaContenedor} Z`;
      }

      // Agregar los círculos a los grupos
      circulosHabitabilidad.append(circuloHabitabilidad);
      circulosAmbiente.append(circuloAmbiente);
    }
    trazoHabitabilidad.setAttribute('d', lineaHabitabilidad);
    trazoAmbiente.setAttribute('d', lineaAmbiente);
    trazoInfraestructura.setAttribute('d', lineaInfraestructura);
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
  <h2></h2>
  <svg id="contenedorTrazos" xmlns="http://www.w3.org/2000/svg">
    <g id="contenedorCalles"></g>
    <path id="trazoHabitabilidad" class="trazo" />
    <g id="circulosHabitabilidad"></g>

    <path id="trazoAmbiente" class="trazo" />
    <g id="circulosAmbiente"></g>

    <path id="trazoInfraestructura" class="trazo" />
    <g id="circulosInfraestructura"></g>
  </svg>
  <div id="etiquetas">
    <p class="etiqueta" id="etiqHabitabilidad">Habitabilidad</p>
    <p class="etiqueta" id="etiqAmbiente">Ambiente</p>
    <p class="etiqueta" id="etiqInfraestructura">Infraestructura</p>
  </div>
</template>

<style lang="scss">
@import '../scss/constantes';

#contenedorTrazos {
  width: 100vw;
  height: 330px;
}

#trazoHabitabilidad {
  stroke: rgb(65, 134, 56);
}

#trazoAmbiente {
  stroke: var(--colorAmbiente);
}

#trazoInfraestructura {
  stroke: rgb(5, 19, 208);
}

.etiqueta {
  border-bottom: 2px solid;
  width: fit-content;
  font-size: 0.8em;
}

#etiqHabitabilidad {
  border-color: rgb(65, 134, 56);
}

#etiqAmbiente {
  border-color: var(--colorAmbiente);
}

#etiqInfraestructura {
  border-color: rgb(5, 19, 208);
}

.trazo {
  fill: none;
  stroke-width: 1;
  pointer-events: none;
}

.puntoIndicador {
  fill: rgb(26, 26, 26);
  r: 2;
  cursor: pointer;
}

.lineasCalle {
  stroke: rgba(255, 24, 24, 0.3);
}

.textoCalle {
  stroke: none;
  fill: black;
  font-size: 15px;
}
</style>
