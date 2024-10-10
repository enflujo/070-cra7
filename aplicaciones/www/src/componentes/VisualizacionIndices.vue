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

const multiplicadorAncho: number = 0.96; // medida en vw
const alturaContenedor: number = 160;

let distanciaTotal: number = 0;
let distanciaParcial: number = 0;

// Definir el primer punto de todas las líneas
let lineaHabitabilidad: string = `M 0 ${alturaContenedor}`;
let lineaAmbiente: string = `M 0 ${alturaContenedor}`;
let lineaInfraestructura: string = `M 0 ${alturaContenedor}`;
let lineaMovilidad: string = `M 0 ${alturaContenedor}`;
let lineaSeguridad: string = `M 0 ${alturaContenedor}`;
let lineaProximidad: string = `M 0 ${alturaContenedor}`;
let lineaCaminabilidad: string = `M 0 ${alturaContenedor}`;

onMounted(async () => {
  const contenedorZonas: HTMLElement = document.getElementById('contenedorZonas') as HTMLElement;
  const infoPuntoA: HTMLElement = document.getElementById('infoPuntoA') as HTMLElement;

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

  // Proximidad
  const trazoProximidad: SVGPathElement = document.getElementById('trazoProximidad') as HTMLElement & SVGPathElement;
  const circulosProximidad: SVGElement = document.getElementById('circulosProximidad') as HTMLElement & SVGElement;

  // Caminabilidad
  const trazoCaminabilidad: SVGPathElement = document.getElementById('trazoCaminabilidad') as HTMLElement &
    SVGPathElement;
  const circulosCaminabilidad: SVGElement = document.getElementById('circulosCaminabilidad') as HTMLElement &
    SVGElement;

  // Calcular lugar de cada punto y pintarlos
  for (let i = 0; i < puntos.length; i++) {
    // Dibujar el primer punto
    if (i === 0) {
      const circuloHabitabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloAmbiente = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloInfraestructura = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloMovilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloSeguridad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloProximidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloCaminabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      // línea
      lineaHabitabilidad += ` L 0 ${alturaContenedor - puntos[0].habitabilidad * alturaContenedor} `;
      lineaAmbiente += ` L 0 ${alturaContenedor - puntos[0].ambiente * alturaContenedor} `;
      lineaInfraestructura += ` L 0 ${alturaContenedor - puntos[0].infraestructura * alturaContenedor} `;
      lineaMovilidad += ` L 0 ${alturaContenedor - puntos[0].movilidad * alturaContenedor} `;
      lineaSeguridad += ` L 0 ${alturaContenedor - puntos[0].seguridad * alturaContenedor} `;
      lineaProximidad += ` L 0 ${alturaContenedor - puntos[0].proximidad * alturaContenedor} `;
      lineaCaminabilidad += ` L 0 ${alturaContenedor - puntos[0].caminabilidad * alturaContenedor} `;

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

      // Puntos Proximidad
      circuloProximidad.setAttribute('class', 'puntoIndicador');
      circuloProximidad.setAttribute('cx', '0');
      circuloProximidad.setAttribute('cy', `${alturaContenedor - puntos[0].proximidad * alturaContenedor}`);
      circulosProximidad.append(circuloProximidad);

      // Puntos Caminabilidad
      circuloCaminabilidad.setAttribute('class', 'puntoIndicador');
      circuloCaminabilidad.setAttribute('cx', '0');
      circuloCaminabilidad.setAttribute('cy', `${alturaContenedor - puntos[0].caminabilidad * alturaContenedor}`);
      circulosCaminabilidad.append(circuloCaminabilidad);

      // Dibujar el resto de puntos
    } else {
      const puntoA = puntos[i - 1];
      const puntoB = puntos[i];

      const zona = document.createElement('div');

      const circuloHabitabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloAmbiente = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloInfraestructura = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloMovilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloSeguridad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloProximidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloCaminabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      distanciaParcial = distanciaEntreCoordenadas(puntoA.lat, puntoA.lon, puntoB.lat, puntoB.lon);

      const xZona = convertirEscala(distanciaTotal, 0, 25, 0, 100 * multiplicadorAncho);

      // ¿Dejar el ancho en 1 o haver el cálculo?
      const ancho = 1; /*
        convertirEscala(distanciaParcial, 0, 25, 0, 100 * multiplicadorAncho) < 3
          ? convertirEscala(distanciaParcial, 0, 25, 0, 100 * multiplicadorAncho) - 0.5
          : 2; */

      distanciaTotal += distanciaParcial;
      const x = convertirEscala(distanciaTotal, 0, 25, 0, window.innerWidth * multiplicadorAncho);

      // Definir posición en y de cada punto por indicador
      const yInfraestructura = alturaContenedor - puntoB.infraestructura * alturaContenedor;
      const yHabitabilidad = alturaContenedor - puntoB.habitabilidad * alturaContenedor;
      const yAmbiente = alturaContenedor - puntoB.ambiente * alturaContenedor;
      const yMovilidad = alturaContenedor - puntoB.movilidad * alturaContenedor;
      const ySeguridad = alturaContenedor - puntoB.seguridad * alturaContenedor;
      const yProximidad = alturaContenedor - puntoB.proximidad * alturaContenedor;
      const yCaminabilidad = alturaContenedor - puntoB.caminabilidad * alturaContenedor;

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

      // Puntos Proximidad
      circuloProximidad.setAttribute('class', 'puntoIndicador');
      circuloProximidad.setAttribute('cx', `${x}`);
      circuloProximidad.setAttribute('cy', `${yProximidad}`);

      // Puntos Caminabilidad
      circuloCaminabilidad.setAttribute('class', 'puntoIndicador');
      circuloCaminabilidad.setAttribute('cx', `${x}`);
      if (yCaminabilidad) {
        circuloCaminabilidad.setAttribute('cy', `${yCaminabilidad}`);
      }

      zona.classList.add('zona');
      zona.style.width = `${ancho}vw`;
      zona.style.left = `${xZona - ancho / 2}vw`; //`${distanciaTotal}%`
      //  zona.style.bottom = '14px';

      // Agregar cada punto a la línea de la 7
      contenedorZonas.appendChild(zona);

      zona.addEventListener('mouseenter', () => {
        infoPuntoA.innerText = `${puntoA.nombre}`;
        infoPuntoA.style.left = `${xZona - 1}vw`;
        infoPuntoA.style.display = 'block';
      });
      zona.addEventListener('mouseleave', () => {
        infoPuntoA.innerText = '';
        infoPuntoA.style.display = 'none';
      });

      if (i < puntos.length - 1) {
        lineaHabitabilidad += `L ${x} ${yHabitabilidad} `;
        lineaAmbiente += `L ${x} ${yAmbiente} `;
        lineaInfraestructura += `L ${x} ${yInfraestructura} `;
        lineaMovilidad += `L ${x} ${yMovilidad} `;
        lineaSeguridad += `L ${x} ${ySeguridad} `;
        lineaProximidad += `L ${x} ${yProximidad} `;
        if (yCaminabilidad) {
          // En el punto 1 no hay caminabilidad. ¿Deberíamos comprobar que haya valor en todos los indicadores antes de sumar a la línea?
          lineaCaminabilidad += `L ${x} ${yCaminabilidad} `;
        }
      } else {
        // cerrar el path si es el último punto
        lineaHabitabilidad += `L ${x} ${yHabitabilidad} L ${x} ${alturaContenedor} Z`;
        lineaAmbiente += `L ${x} ${yAmbiente} L ${x} ${alturaContenedor} Z`;
        lineaInfraestructura += `L ${x} ${yInfraestructura} L ${x} ${alturaContenedor} Z`;
        lineaMovilidad += `L ${x} ${yMovilidad} L ${x} ${alturaContenedor} Z`;
        lineaSeguridad += `L ${x} ${ySeguridad} L ${x} ${alturaContenedor} Z`;
        lineaProximidad += `L ${x} ${yProximidad} L ${x} ${alturaContenedor} Z`;
        lineaCaminabilidad += `L ${x} ${yCaminabilidad} L ${x} ${alturaContenedor} Z`;
      }

      // Agregar los círculos a los grupos
      circulosHabitabilidad.append(circuloHabitabilidad);
      circulosAmbiente.append(circuloAmbiente);
      circulosInfraestructura.append(circuloInfraestructura);
      circulosMovilidad.append(circuloMovilidad);
      circulosSeguridad.append(circuloSeguridad);
      circulosProximidad.append(circuloProximidad);
      circulosCaminabilidad.append(circuloCaminabilidad);
    }

    trazoHabitabilidad.setAttribute('d', lineaHabitabilidad);
    trazoAmbiente.setAttribute('d', lineaAmbiente);
    trazoInfraestructura.setAttribute('d', lineaInfraestructura);
    trazoMovilidad.setAttribute('d', lineaMovilidad);
    trazoSeguridad.setAttribute('d', lineaSeguridad);
    trazoProximidad.setAttribute('d', lineaProximidad);
    trazoCaminabilidad.setAttribute('d', lineaCaminabilidad);
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
    <div id="etiquetas">
      <p class="etiqueta" id="etiqHabitabilidad">Habitabilidad</p>
      <p class="etiqueta" id="etiqAmbiente">Ambiente</p>
      <p class="etiqueta" id="etiqInfraestructura">Infraestructura</p>
      <p class="etiqueta" id="etiqMovilidad">Movilidad</p>
      <p class="etiqueta" id="etiqSeguridad">Seguridad</p>
      <p class="etiqueta" id="etiqProximidad">Proximidad</p>
      <p class="etiqueta" id="etiqCaminabilidad">Caminabilidad</p>
    </div>
    <svg id="contenedorTrazos" xmlns="http://www.w3.org/2000/svg">
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

      <path id="trazoProximidad" class="trazo" />
      <g id="circulosProximidad"></g>

      <path id="trazoCaminabilidad" class="trazo" />
      <g id="circulosCaminabilidad"></g>
    </svg>

    <div id="contenedorZonas">
      <div class="infoPunto" id="infoPuntoA"></div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/constantes';
@import '../scss/general';

#contenedorVis {
  position: fixed;
  bottom: 0;
  left: 2em;
  bottom: 0;
}

#contenedorTrazos {
  // Ancho del contenedor
  background-color: white;
  width: 95vw;
  height: 160px;
  border: 1px black solid;
  margin-bottom: 2em;
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

#trazoProximidad {
  stroke: var(--colorProximidad);
}

#trazoCaminabilidad {
  stroke: var(--colorCaminabilidad);
}

#etiquetas {
  display: flex;
}

.etiqueta {
  border-bottom: 2px solid;
  width: fit-content;
  font-size: 0.8em;
  margin: 0 1em 0.5em 0em;
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

#etiqProximidad {
  border-color: var(--colorProximidad);
}
#etiqCaminabilidad {
  border-color: var(--colorCaminabilidad);
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

.infoPunto {
}

.lineasCalle {
  stroke: rgba(255, 24, 24, 0.3);
}

.zona {
  position: absolute;
  bottom: 14px;
  background-color: rgba(16, 255, 255, 0.222);
  border: rgba(10, 197, 248, 0.5) solid 1px;
  height: 160px;
  opacity: 0.1;
  cursor: pointer;
  z-index: 99;
}
.zona:hover {
  opacity: 0.9;
}

#contenedorZonas {
  height: 215px;
  position: absolute;
  bottom: 22px;
}
</style>
