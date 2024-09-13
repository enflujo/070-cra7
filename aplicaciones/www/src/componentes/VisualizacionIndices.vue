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

const multiplicadorAncho: number = 1; // medida en vw
const alturaContenedor: number = 310;

let distanciaTotal: number = 0;
let distanciaParcial: number = 0;
let lineaHabitabilidad: string = `M 0 ${alturaContenedor}`;
let lineaAmbiente: string = `M 0 ${alturaContenedor}`;
let lineaInfraestructura: string = `M 0 ${alturaContenedor}`;
let lineaMovilidad: string = `M 0 ${alturaContenedor}`;
let lineaSeguridad: string = `M 0 ${alturaContenedor}`;

onMounted(async () => {
  // Cargar datos
  const puntos = await fetch('/datos/puntos.json').then((res) => res.json());

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

  // Movilidad
  const trazoMovilidad: SVGPathElement = document.getElementById('trazoMovilidad') as HTMLElement & SVGPathElement;
  const circulosMovilidad: SVGElement = document.getElementById('circulosMovilidad') as HTMLElement & SVGElement;

  // Seguridad
  const trazoSeguridad: SVGPathElement = document.getElementById('trazoSeguridad') as HTMLElement & SVGPathElement;
  const circulosSeguridad: SVGElement = document.getElementById('circulosSeguridad') as HTMLElement & SVGElement;

  // Calcular lugar de cada punto por lugar y pintarlos
  for (let i = 0; i < puntos.length; i++) {
    // Dibujar el primer punto
    if (i === 0) {
      const lineaCalle = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const circuloHabitabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloAmbiente = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloInfraestructura = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloMovilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloSeguridad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      // línea
      lineaHabitabilidad += `L 0 ${alturaContenedor - puntos[0].habitabilidad * alturaContenedor} `;
      lineaAmbiente += `L 0 ${alturaContenedor - puntos[0].ambiente * alturaContenedor} `;
      lineaInfraestructura += `L 0 ${alturaContenedor - puntos[0].infraestructura * alturaContenedor} `;
      lineaMovilidad += `L 0 ${alturaContenedor - puntos[0].movilidad * alturaContenedor} `;
      lineaSeguridad += `L 0 ${alturaContenedor - puntos[0].seguridad * alturaContenedor} `;

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

      // Puntos Infraestructura
      circuloInfraestructura.setAttribute('class', 'puntoIndicador');
      circuloInfraestructura.setAttribute('cx', '0');
      circuloInfraestructura.setAttribute('cy', `${alturaContenedor - puntos[0].infraestructura * alturaContenedor}`);
      circulosInfraestructura.append(circuloInfraestructura);

      // Puntos Movilidad
      circuloMovilidad.setAttribute('class', 'puntoIndicador');
      circuloMovilidad.setAttribute('cx', '0');
      circuloMovilidad.setAttribute('cy', `${alturaContenedor - puntos[0].movilidad * alturaContenedor}`);
      circulosMovilidad.append(circuloMovilidad);

      // Puntos Seguridad
      circuloSeguridad.setAttribute('class', 'puntoIndicador');
      circuloSeguridad.setAttribute('cx', '0');
      circuloSeguridad.setAttribute('cy', `${alturaContenedor - puntos[0].seguridad * alturaContenedor}`);
      circulosSeguridad.append(circuloSeguridad);

      // Dibujar el resto de puntos
    } else {
      const puntoA = puntos[i - 1];
      const puntoB = puntos[i];

      const circuloHabitabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloAmbiente = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloInfraestructura = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloMovilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloSeguridad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      distanciaParcial = distanciaEntreCoordenadas(puntoA.lat, puntoA.lon, puntoB.lat, puntoB.lon);
      // ir calculando la distancia total sumando las parciales
      // distancia total = 24.7921;
      distanciaTotal += distanciaParcial;

      const x = convertirEscala(distanciaTotal, 0, 25, 0, window.innerWidth * multiplicadorAncho);
      const yInfraestructura = alturaContenedor - puntoB.infraestructura * alturaContenedor;
      const yHabitabilidad = alturaContenedor - puntoB.habitabilidad * alturaContenedor;
      const yAmbiente = alturaContenedor - puntoB.ambiente * alturaContenedor;
      const yMovilidad = alturaContenedor - puntoB.movilidad * alturaContenedor;
      const ySeguridad = alturaContenedor - puntoB.seguridad * alturaContenedor;

      // Puntos Habitabilidad
      circuloHabitabilidad.setAttribute('class', 'puntoIndicador');
      circuloHabitabilidad.setAttribute('cx', `${x}`);
      circuloHabitabilidad.setAttribute('cy', `${yHabitabilidad}`);

      // Puntos Ambiente
      circuloAmbiente.setAttribute('class', 'puntoIndicador');
      circuloAmbiente.setAttribute('cx', `${x}`);
      circuloAmbiente.setAttribute('cy', `${yAmbiente}`);

      // Puntos Infraestructura
      circuloInfraestructura.setAttribute('class', 'puntoIndicador');
      circuloInfraestructura.setAttribute('cx', `${x}`);
      circuloInfraestructura.setAttribute('cy', `${yInfraestructura}`);

      // Puntos Movilidad
      circuloMovilidad.setAttribute('class', 'puntoIndicador');
      circuloMovilidad.setAttribute('cx', `${x}`);
      circuloMovilidad.setAttribute('cy', `${yMovilidad}`);

      // Puntos Seguridad
      circuloSeguridad.setAttribute('class', 'puntoIndicador');
      circuloSeguridad.setAttribute('cx', `${x}`);
      circuloSeguridad.setAttribute('cy', `${ySeguridad}`);

      if (i < puntos.length - 1) {
        lineaHabitabilidad += `L ${x} ${yHabitabilidad} `;
        lineaAmbiente += `L ${x} ${yAmbiente} `;
        lineaInfraestructura += `L ${x} ${yInfraestructura} `;
        lineaMovilidad += `L ${x} ${yMovilidad} `;
        lineaSeguridad += `L ${x} ${ySeguridad} `;
      } else {
        // cerrar el path si es el último punto
        lineaHabitabilidad += `L ${x} ${yHabitabilidad} L ${x} ${alturaContenedor} Z`;
        lineaAmbiente += `L ${x} ${yAmbiente} L ${x} ${alturaContenedor} Z`;
        lineaInfraestructura += `L ${x} ${yInfraestructura} L ${x} ${alturaContenedor} Z`;
        lineaMovilidad += `L ${x} ${yMovilidad} L ${x} ${alturaContenedor} Z`;
        lineaSeguridad += `L ${x} ${ySeguridad} L ${x} ${alturaContenedor} Z`;
      }

      // Agregar los círculos a los grupos
      circulosHabitabilidad.append(circuloHabitabilidad);
      circulosAmbiente.append(circuloAmbiente);
      circulosInfraestructura.append(circuloInfraestructura);
      circulosMovilidad.append(circuloMovilidad);
      circulosSeguridad.append(circuloSeguridad);
    }

    trazoHabitabilidad.setAttribute('d', lineaHabitabilidad);
    trazoAmbiente.setAttribute('d', lineaAmbiente);
    trazoInfraestructura.setAttribute('d', lineaInfraestructura);
    trazoMovilidad.setAttribute('d', lineaMovilidad);
    trazoSeguridad.setAttribute('d', lineaSeguridad);
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
  <div id="contenedorVis">
    <svg id="contenedorTrazos" xmlns="http://www.w3.org/2000/svg">
      <g id="contenedorCalles"></g>
      <path id="trazoHabitabilidad" class="trazo" />
      <g id="circulosHabitabilidad"></g>

      <path id="trazoAmbiente" class="trazo" />
      <g id="circulosAmbiente"></g>

      <path id="trazoInfraestructura" class="trazo" />
      <g id="circulosInfraestructura"></g>

      <path id="trazoMovilidad" class="trazo" />
      <g id="circulosMovilidad"></g>

      <path id="trazoSeguridad" class="trazo" />
      <g id="circulosSeguridad"></g>
    </svg>

    <div id="etiquetas">
      <p class="etiqueta" id="etiqHabitabilidad">Habitabilidad</p>
      <p class="etiqueta" id="etiqAmbiente">Ambiente</p>
      <p class="etiqueta" id="etiqInfraestructura">Infraestructura</p>
      <p class="etiqueta" id="etiqMovilidad">Movilidad</p>
      <p class="etiqueta" id="etiqSeguridad">Seguridad</p>
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/constantes';

#contenedorVis {
  position: fixed;
  top: 50px;
}

#contenedorTrazos {
  // Ancho del contenedor
  width: 100vw;
  height: 330px;
}

#trazoHabitabilidad {
  stroke: var(--colorHabitabilidad);
}

#trazoAmbiente {
  stroke: var(--colorAmbiente);
}

#trazoInfraestructura {
  stroke: var(--colorInfraestructura);
}

#trazoMovilidad {
  stroke: var(--colorMovilidad);
}

#trazoSeguridad {
  stroke: var(--colorSeguridad);
}

.etiqueta {
  border-bottom: 2px solid;
  width: fit-content;
  font-size: 0.8em;
}

#etiqHabitabilidad {
  border-color: var(--colorHabitabilidad);
}

#etiqAmbiente {
  border-color: var(--colorAmbiente);
}

#etiqInfraestructura {
  border-color: var(--colorInfraestructura);
}

#etiqMovilidad {
  border-color: var(--colorMovilidad);
}

#etiqSeguridad {
  border-color: var(--colorSeguridad);
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
