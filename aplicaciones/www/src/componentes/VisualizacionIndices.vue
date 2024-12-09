<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { convertirEscala, distanciaEntreCoordenadas, pedirDatos } from '../utilidades/ayudas';
import { DatosRuido, Punto } from '@/tipos/compartidos';
import { usarCerebro } from '@/utilidades/cerebro';

/* async function cargarDatos() {
  try {
    const ruido = await fetch('/datos/ruido.json').then((res) => res.json());

    // console.log(ruido);
  } catch (error) {
    console.error('Error descargando datos del ruido', error);
  }
}

cargarDatos().catch(console.error); */

// multiplicadorAncho es el valor por el cual se multiplica el vw para agrandar el ancho de la ventana
const props = defineProps<{ multiplicadorAncho: number }>();

const cerebro = usarCerebro();
const infoPuntoA: Ref<HTMLElement | null> = ref(null);
const calles: Ref<HTMLElement | null> = ref(null);
const alturaContenedor: number = 200; // Debe ser la misma que en #contenedorTrazos

let puntoElegido: Ref<Punto | null> = ref(null);

let distanciaTotal: number = 0;
let distanciaParcial: number = 0;
const multiplicadorRadio = 12; // Multiplica los valores de los índices para pintar los círculos
const inicioGrafica = 20;
const ancho = 70; // Ancho zona

// Definir el primer punto de todas las líneas
let lineaHabitabilidad: string = '';
let lineaAmbiente: string = '';
let lineaInfraestructura: string = '';
let lineaMovilidad: string = '';
let lineaSeguridad: string = '';
let lineaProximidad: string = '';
let lineaCaminabilidad: string = '';

onMounted(async () => {
  const contenedorZonas: HTMLElement = document.getElementById('contenedorZonas') as HTMLElement;
  const infoPuntoA: HTMLElement = document.getElementById('infoPuntoA') as HTMLElement;

  // Cargar datos
  const puntos = await pedirDatos<Punto[]>(`/datos/puntos.json`);
  const ruido = await pedirDatos<DatosRuido>('/datos/ruido.json');
  console.log(ruido);

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
    /**
     * Organizar Índices
     */
    const punto = puntos[i];
    const indices = [
      { indicador: 'ambiente', valor: punto.ambiente || -1 },
      { indicador: 'caminabilidad', valor: punto.caminabilidad || -1 },
      { indicador: 'habitabilidad', valor: punto.habitabilidad || -1 },
      { indicador: 'infraestructura', valor: punto.infraestructura || -1 },
      { indicador: 'movilidad', valor: punto.movilidad || -1 },
      { indicador: 'proximidad', valor: punto.proximidad || -1 },
      { indicador: 'seguridad', valor: punto.seguridad || -1 },
    ];

    indices.sort((a, b) => b.valor - a.valor);
    punto.indices = indices;

    const habitabilidad = punto.habitabilidad || 0;
    const ambiente = punto.ambiente || 0;
    const infraestructura = punto.infraestructura || 0;
    const movilidad = punto.movilidad || 0;
    const seguridad = punto.seguridad || 0;
    const proximidad = punto.proximidad || 0;
    const caminabilidad = punto.caminabilidad || 0;

    // Dibujar el primer punto
    if (i === 0) {
      const calle = document.createElement('p');
      const zona = document.createElement('a');
      const circuloHabitabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloAmbiente = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloInfraestructura = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloMovilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloSeguridad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloProximidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloCaminabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      // línea
      lineaHabitabilidad += ` M ${inicioGrafica} ${alturaContenedor - habitabilidad * alturaContenedor} `;
      lineaAmbiente += ` M ${inicioGrafica} ${alturaContenedor - ambiente * alturaContenedor} `;
      lineaInfraestructura += ` M ${inicioGrafica} ${alturaContenedor - infraestructura * alturaContenedor} `;
      lineaMovilidad += `M ${inicioGrafica} ${alturaContenedor - movilidad * alturaContenedor} `;
      lineaSeguridad += ` M ${inicioGrafica} ${alturaContenedor - seguridad * alturaContenedor} `;
      lineaProximidad += ` M ${inicioGrafica} ${alturaContenedor - proximidad * alturaContenedor} `;
      lineaCaminabilidad += ` M ${inicioGrafica} ${alturaContenedor - caminabilidad * alturaContenedor} `;

      // puntos Habitabilidad
      circuloHabitabilidad.setAttribute('class', 'puntoIndicador habitabilidad');
      circuloHabitabilidad.setAttribute('cx', `${inicioGrafica}`);
      circuloHabitabilidad.setAttribute('cy', `${alturaContenedor - habitabilidad * alturaContenedor}`);
      circuloHabitabilidad.setAttribute('r', `${habitabilidad * multiplicadorRadio}`);

      circulosHabitabilidad.append(circuloHabitabilidad);

      // puntos Ambiente
      circuloAmbiente.setAttribute('class', 'puntoIndicador ambiente');
      circuloAmbiente.setAttribute('cx', `${inicioGrafica}`);
      circuloAmbiente.setAttribute('cy', `${alturaContenedor - ambiente * alturaContenedor}`);
      circuloAmbiente.setAttribute('r', `${ambiente * multiplicadorRadio}`);

      circulosAmbiente.append(circuloAmbiente);

      // Puntos Infraestructura
      circuloInfraestructura.setAttribute('class', 'puntoIndicador infraestructura');
      circuloInfraestructura.setAttribute('cx', `${inicioGrafica}`);
      circuloInfraestructura.setAttribute('cy', `${alturaContenedor - infraestructura * alturaContenedor}`);
      circuloInfraestructura.setAttribute('r', `${infraestructura * multiplicadorRadio}`);

      circulosInfraestructura.append(circuloInfraestructura);

      // Puntos Movilidad
      circuloMovilidad.setAttribute('class', 'puntoIndicador movilidad');
      circuloMovilidad.setAttribute('cx', `${inicioGrafica}`);
      circuloMovilidad.setAttribute('cy', `${alturaContenedor - movilidad * alturaContenedor}`);
      circuloMovilidad.setAttribute('r', `${movilidad * multiplicadorRadio}`);

      circulosMovilidad.append(circuloMovilidad);

      // Puntos Seguridad
      circuloSeguridad.setAttribute('class', 'puntoIndicador seguridad');
      circuloSeguridad.setAttribute('cx', `${inicioGrafica}`);
      circuloSeguridad.setAttribute('cy', `${alturaContenedor - seguridad * alturaContenedor}`);
      circuloSeguridad.setAttribute('r', `${seguridad * multiplicadorRadio}`);

      circulosSeguridad.append(circuloSeguridad);

      // Puntos Proximidad
      circuloProximidad.setAttribute('class', 'puntoIndicador proximidad');
      circuloProximidad.setAttribute('cx', `${inicioGrafica}`);
      circuloProximidad.setAttribute('cy', `${alturaContenedor - proximidad * alturaContenedor}`);
      circuloProximidad.setAttribute('r', `${proximidad * multiplicadorRadio}`);

      circulosProximidad.append(circuloProximidad);

      // Puntos Caminabilidad
      circuloCaminabilidad.setAttribute('class', 'puntoIndicador caminabilidad');
      circuloCaminabilidad.setAttribute('cx', `${inicioGrafica}`);
      circuloCaminabilidad.setAttribute('cy', `${alturaContenedor - caminabilidad * alturaContenedor}`);
      circuloCaminabilidad.setAttribute('r', `${caminabilidad * multiplicadorRadio}`);

      circulosCaminabilidad.append(circuloCaminabilidad);

      // Agregar nombre de primer punto
      calle.innerText = punto.nombre;
      calle.classList.add('nombreCalle');
      calle.style.left = `${0}px`;
      if (calles.value) {
        calles.value.appendChild(calle);
      }

      // Agregar zonas que no se ven pero son la región de hover que muestra la información de los indicadores en cada punto
      zona.classList.add('zona');
      zona.style.width = `${ancho}px`;
      zona.href = `#${puntos[0].slug}`;
      zona.style.left = `0px`;

      // Agregar cada punto a la línea de la 7
      contenedorZonas.appendChild(zona);

      zona.addEventListener('mouseenter', () => {
        const puntoA = puntos[0];

        infoPuntoA.innerHTML = `<h4>${puntoA.nombre}</h4>
        ${indices
          .map((indice: { indicador: string; valor: number }) => {
            return `<p class="elementoEtiqueta"><span class="circuloEtiqueta ${indice.indicador}"></span> ${indice.indicador}: ${indice.valor >= 0 ? indice.valor : 'sin información'}</p>`;
          })
          .join('')}`;
        infoPuntoA.style.left = `50px`;
        infoPuntoA.style.display = 'block';
      });

      zona.addEventListener('mouseleave', () => {
        puntoElegido.value = null;
        infoPuntoA.innerText = '';
        infoPuntoA.style.display = 'none';
      });

      // Dibujar el resto de puntos
    } else {
      const puntoA = puntos[i - 1];
      const zona = document.createElement('a');

      // Crear los círculos de cada indicador
      const circuloHabitabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloAmbiente = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloInfraestructura = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloMovilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloSeguridad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloProximidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloCaminabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      if (puntoA.lat && puntoA.lon && punto.lat && punto.lon) {
        distanciaParcial = distanciaEntreCoordenadas(puntoA.lat, puntoA.lon, punto.lat, punto.lon);
        distanciaTotal += distanciaParcial;
      }

      // Calcular la posición en x de cada punto
      const x = convertirEscala(distanciaTotal, 0, 25, 20, screen.width * props.multiplicadorAncho);

      // Definir posición en y de cada punto por indicador
      const yInfraestructura = alturaContenedor - infraestructura * alturaContenedor;
      const yHabitabilidad = alturaContenedor - habitabilidad * alturaContenedor;
      const yAmbiente = alturaContenedor - ambiente * alturaContenedor;
      const yMovilidad = alturaContenedor - movilidad * alturaContenedor;
      const ySeguridad = alturaContenedor - seguridad * alturaContenedor;
      const yProximidad = alturaContenedor - proximidad * alturaContenedor;
      const yCaminabilidad = alturaContenedor - caminabilidad * alturaContenedor;

      // Puntos Habitabilidad
      circuloHabitabilidad.setAttribute('class', 'puntoIndicador habitabilidad');
      circuloHabitabilidad.setAttribute('cx', `${x}`);
      circuloHabitabilidad.setAttribute('cy', `${yHabitabilidad}`);
      circuloHabitabilidad.setAttribute('r', `${habitabilidad * multiplicadorRadio}`);

      // Puntos Ambiente
      circuloAmbiente.setAttribute('class', 'puntoIndicador ambiente');
      circuloAmbiente.setAttribute('cx', `${x}`);
      circuloAmbiente.setAttribute('cy', `${yAmbiente}`);
      circuloAmbiente.setAttribute('r', `${ambiente * multiplicadorRadio}`);

      // Puntos Infraestructura
      circuloInfraestructura.setAttribute('class', 'puntoIndicador infraestructura');
      circuloInfraestructura.setAttribute('cx', `${x}`);
      circuloInfraestructura.setAttribute('cy', `${yInfraestructura}`);
      circuloInfraestructura.setAttribute('r', `${infraestructura * multiplicadorRadio}`);

      // Puntos Movilidad
      circuloMovilidad.setAttribute('class', 'puntoIndicador movilidad');
      circuloMovilidad.setAttribute('cx', `${x}`);
      circuloMovilidad.setAttribute('cy', `${yMovilidad}`);
      circuloMovilidad.setAttribute('r', `${movilidad * multiplicadorRadio}`);

      // Puntos Seguridad
      circuloSeguridad.setAttribute('class', 'puntoIndicador seguridad');
      circuloSeguridad.setAttribute('cx', `${x}`);
      circuloSeguridad.setAttribute('cy', `${ySeguridad}`);
      circuloSeguridad.setAttribute('r', `${seguridad * multiplicadorRadio}`);

      // Puntos Proximidad
      circuloProximidad.setAttribute('class', 'puntoIndicador proximidad');
      circuloProximidad.setAttribute('cx', `${x}`);
      circuloProximidad.setAttribute('cy', `${yProximidad}`);
      circuloProximidad.setAttribute('r', `${proximidad * multiplicadorRadio}`);

      // Puntos Caminabilidad
      circuloCaminabilidad.setAttribute('class', 'puntoIndicador caminabilidad');
      circuloCaminabilidad.setAttribute('cx', `${x}`);
      if (yCaminabilidad) {
        circuloCaminabilidad.setAttribute('cy', `${yCaminabilidad}`);
        circuloCaminabilidad.setAttribute('r', `${caminabilidad * multiplicadorRadio}`);
      }

      // Agregar nombre de calles
      const calle = document.createElement('p');
      calle.innerText = punto.nombre;
      calle.classList.add('nombreCalle');
      calle.style.left = `${x - 25}px`;
      if (calles.value) {
        calles.value.appendChild(calle);
      }

      // Agregar zonas que no se ven pero son la región de hover que muestra la información de los indicadores en cada punto
      zona.classList.add('zona');
      zona.style.width = `${ancho}px`;
      zona.href = `#${puntoA.slug}`;
      zona.style.left = `${x - ancho / 4}px`;

      contenedorZonas.appendChild(zona);

      zona.addEventListener('mouseenter', () => {
        infoPuntoA.innerHTML = `<h4>${punto.nombre}</h4>
        ${indices
          .map((indice: { indicador: string; valor: number }) => {
            return `<p class="elementoEtiqueta"><span class="circuloEtiqueta ${indice.indicador}"></span> ${indice.indicador}: ${indice.valor >= 0 ? indice.valor : 'sin información'}</p>`;
          })
          .join('')}`;
        infoPuntoA.style.left = `${x + 30}px`;

        infoPuntoA.style.display = 'block';
      });

      zona.addEventListener('mouseleave', () => {
        puntoElegido.value = null;
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
        lineaHabitabilidad += `L ${x} ${yHabitabilidad} L ${x} ${alturaContenedor}`;
        lineaAmbiente += `L ${x} ${yAmbiente} L ${x} ${alturaContenedor}`;
        lineaInfraestructura += `L ${x} ${yInfraestructura} L ${x} ${alturaContenedor}`;
        lineaMovilidad += `L ${x} ${yMovilidad} L ${x} ${alturaContenedor}`;
        lineaSeguridad += `L ${x} ${ySeguridad} L ${x} ${alturaContenedor}`;
        lineaProximidad += `L ${x} ${yProximidad} L ${x} ${alturaContenedor}`;
        lineaCaminabilidad += `L ${x} ${yCaminabilidad} L ${x} ${alturaContenedor}`;
      }

      // Agregar los círculos a los grupos
      circulosHabitabilidad.append(circuloHabitabilidad);
      circulosAmbiente.append(circuloAmbiente);
      circulosInfraestructura.append(circuloInfraestructura);
      circulosMovilidad.append(circuloMovilidad);
      circulosSeguridad.append(circuloSeguridad);
      circulosProximidad.append(circuloProximidad);
      if (yCaminabilidad) {
        circulosCaminabilidad.append(circuloCaminabilidad);
      }
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
</script>

<template>
  <div id="contenedorVis">
    <div class="calles" ref="calles"></div>

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

    <div id="contenedorEtiquetas">
      <p id="titulo">
        Índices medidos a lo largo de la carrera Séptima durante la investigación. Los valores van de 0 a 1 y muestran,
        en cada punto, los datos de cada indicador:
      </p>
      <div id="etiquetas" @click="(cerebro.indicadoresVisible = true)">
        <p class="etiquetaDatos" id="etiqAmbiente">Ambiente</p>
        <p class="etiquetaDatos" id="etiqCaminabilidad">Caminabilidad</p>
        <p class="etiquetaDatos" id="etiqHabitabilidad">Habitabilidad</p>
        <p class="etiquetaDatos" id="etiqInfraestructura">Infraestructura</p>
        <p class="etiquetaDatos" id="etiqMovilidad">Movilidad</p>
        <p class="etiquetaDatos" id="etiqProximidad">Proximidad</p>
        <p class="etiquetaDatos" id="etiqSeguridad">Seguridad</p>
      </div>
    </div>

    <div id="contenedorZonas">
      <div class="infoPunto" ref="infoPuntoA" id="infoPuntoA"></div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../scss/constantes' as *;
@use '../scss/general' as *;

#contenedorVis {
  // border: 1px black solid;
  padding: 1em;
  height: 28vh;
}

#contenedorTrazos {
  height: 200px;
  left: 3vw;
  width: 1200vw;
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

#contenedorEtiquetas {
  bottom: 0;
  width: 100vw;
  padding: 0em 1em;
  position: fixed;

  #titulo {
    margin: 0 3em 0.5em 0;
  }
}

#etiquetas {
  display: flex;
  flex-direction: column;
  z-index: 2;
  position: relative;
}

.etiquetaDatos {
  border-bottom: 2px solid;
  width: fit-content;
  margin: 0 2em 0.5em 0em;
  cursor: pointer;
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
  //fill: rgb(26, 26, 26);
  // r: 2;
  cursor: pointer;

  &.habitabilidad {
    fill: var(--colorHabitabilidad);
  }

  &.ambiente {
    fill: var(--colorAmbiente);
  }

  &.infraestructura {
    fill: var(--colorInfraestructura);
  }

  &.movilidad {
    fill: var(--colorMovilidad);
  }

  &.seguridad {
    fill: var(--colorSeguridad);
  }

  &.proximidad {
    fill: var(--colorProximidad);
  }

  &.caminabilidad {
    fill: var(--colorCaminabilidad);
  }
}

.zona {
  background-color: aqua;
  cursor: pointer;
  height: 40vh;
  opacity: 0;
  position: absolute;
  top: 55vh;
  width: 70px;
  z-index: 10;
}

.infoPunto {
  display: none;
  position: absolute;
  min-width: fit-content;
  width: 160px;
  top: 75vh;
  border: 2px black solid;
  background-color: var(--piel);
  padding: 0.5em 1em;
  font-size: 0.8em;
  p,
  h4 {
    margin: 0;
    text-align: start;
  }

  .elementoEtiqueta {
    display: flex;
    align-items: center;
  }

  .circuloEtiqueta {
    height: 4px;
    width: 4px;
    margin-right: 0.5em;
    border-radius: 50%;
    display: block;
    background-color: black;

    &.ambiente {
      background-color: var(--colorAmbiente);
    }

    &.caminabilidad {
      background-color: var(--colorCaminabilidad);
    }

    &.habitabilidad {
      background-color: var(--colorHabitabilidad);
    }

    &.infraestructura {
      background-color: var(--colorInfraestructura);
    }

    &.movilidad {
      background-color: var(--colorMovilidad);
    }

    &.proximidad {
      background-color: var(--colorProximidad);
    }

    &.seguridad {
      background-color: var(--colorSeguridad);
    }
  }
}

.calles {
  position: absolute;
  bottom: 42vh;
  display: flex;
  align-items: flex-start;
}

.nombreCalle {
  background-color: hsla(42, 84%, 76%, 1);
  border-radius: 5px;
  font-size: 0.7em;
  position: absolute;
  text-align: center;
  padding: 0.5em;
  z-index: 8;
  min-width: 35px;
  border: 1px black solid;
}

.lineasCalle {
  stroke: rgba(255, 24, 24, 0.3);
}

@media screen and (min-width: $minTablet) {
  #contenedorTrazos {
    width: 820vw;
  }

  #etiquetas {
    flex-direction: row;
  }

  .infoPunto {
    top: 72vh;
  }
  .calles {
    bottom: 36vh;
  }
}
</style>
