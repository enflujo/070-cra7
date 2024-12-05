<script setup lang="ts">
import { onMounted, ref, Ref, defineProps } from 'vue';
import { convertirEscala, distanciaEntreCoordenadas } from '../utilidades/ayudas';
import { Punto } from '@/tipos/compartidos';
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
const alturaContenedor: number = 250; // Debe ser la misma que en #contenedorTrazos

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
  const puntos = await fetch(`${import.meta.env.BASE_URL}/datos/puntos.json`).then((res) => res.json());

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
      lineaHabitabilidad += ` M ${inicioGrafica} ${alturaContenedor - puntos[0].habitabilidad * alturaContenedor} `;
      lineaAmbiente += ` M ${inicioGrafica} ${alturaContenedor - puntos[0].ambiente * alturaContenedor} `;
      lineaInfraestructura += ` M ${inicioGrafica} ${alturaContenedor - puntos[0].infraestructura * alturaContenedor} `;
      lineaMovilidad += `M ${inicioGrafica} ${alturaContenedor - puntos[0].movilidad * alturaContenedor} `;
      lineaSeguridad += ` M ${inicioGrafica} ${alturaContenedor - puntos[0].seguridad * alturaContenedor} `;
      lineaProximidad += ` M ${inicioGrafica} ${alturaContenedor - puntos[0].proximidad * alturaContenedor} `;
      lineaCaminabilidad += ` M ${inicioGrafica} ${alturaContenedor - puntos[0].caminabilidad * alturaContenedor} `;

      // puntos Habitabilidad
      circuloHabitabilidad.setAttribute('class', 'puntoIndicador habitabilidad');
      circuloHabitabilidad.setAttribute('cx', `${inicioGrafica}`);
      circuloHabitabilidad.setAttribute('cy', `${alturaContenedor - puntos[0].habitabilidad * alturaContenedor}`);
      circuloHabitabilidad.setAttribute('r', `${puntos[0].habitabilidad * multiplicadorRadio}`);

      circulosHabitabilidad.append(circuloHabitabilidad);

      // puntos Ambiente
      circuloAmbiente.setAttribute('class', 'puntoIndicador ambiente');
      circuloAmbiente.setAttribute('cx', `${inicioGrafica}`);
      circuloAmbiente.setAttribute('cy', `${alturaContenedor - puntos[0].ambiente * alturaContenedor}`);
      circuloAmbiente.setAttribute('r', `${puntos[0].ambiente * multiplicadorRadio}`);

      circulosAmbiente.append(circuloAmbiente);

      // Puntos Infraestructura
      circuloInfraestructura.setAttribute('class', 'puntoIndicador infraestructura');
      circuloInfraestructura.setAttribute('cx', `${inicioGrafica}`);
      circuloInfraestructura.setAttribute('cy', `${alturaContenedor - puntos[0].infraestructura * alturaContenedor}`);
      circuloInfraestructura.setAttribute('r', `${puntos[0].infraestructura * multiplicadorRadio}`);

      circulosInfraestructura.append(circuloInfraestructura);

      // Puntos Movilidad
      circuloMovilidad.setAttribute('class', 'puntoIndicador movilidad');
      circuloMovilidad.setAttribute('cx', `${inicioGrafica}`);
      circuloMovilidad.setAttribute('cy', `${alturaContenedor - puntos[0].movilidad * alturaContenedor}`);
      circuloMovilidad.setAttribute('r', `${puntos[0].movilidad * multiplicadorRadio}`);

      circulosMovilidad.append(circuloMovilidad);

      // Puntos Seguridad
      circuloSeguridad.setAttribute('class', 'puntoIndicador seguridad');
      circuloSeguridad.setAttribute('cx', `${inicioGrafica}`);
      circuloSeguridad.setAttribute('cy', `${alturaContenedor - puntos[0].seguridad * alturaContenedor}`);
      circuloSeguridad.setAttribute('r', `${puntos[0].seguridad * multiplicadorRadio}`);

      circulosSeguridad.append(circuloSeguridad);

      // Puntos Proximidad
      circuloProximidad.setAttribute('class', 'puntoIndicador proximidad');
      circuloProximidad.setAttribute('cx', `${inicioGrafica}`);
      circuloProximidad.setAttribute('cy', `${alturaContenedor - puntos[0].proximidad * alturaContenedor}`);
      circuloProximidad.setAttribute('r', `${puntos[0].proximidad * multiplicadorRadio}`);

      circulosProximidad.append(circuloProximidad);

      // Puntos Caminabilidad
      circuloCaminabilidad.setAttribute('class', 'puntoIndicador caminabilidad');
      circuloCaminabilidad.setAttribute('cx', `${inicioGrafica}`);
      circuloCaminabilidad.setAttribute('cy', `${alturaContenedor - puntos[0].caminabilidad * alturaContenedor}`);
      circuloCaminabilidad.setAttribute('r', `${puntos[0].caminabilidad * multiplicadorRadio}`);

      circulosCaminabilidad.append(circuloCaminabilidad);

      // Agregar nombre de primer punto
      calle.innerText = puntos[0].nombre;
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
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloAmbiente"></span> ambiente: ${puntoA.ambiente ? puntoA.ambiente : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloCaminabilidad"></span> caminabilidad: ${puntoA.caminabilidad ? puntoA.caminabilidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloHabitabilidad"></span>habitabilidad: ${puntoA.habitabilidad ? puntoA.habitabilidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloInfraestructura"></span>infraestructura: ${puntoA.infraestructura ? puntoA.infraestructura : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloMovilidad"></span>movilidad: ${puntoA.movilidad ? puntoA.movilidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloProximidad"></span>proximidad: ${puntoA.proximidad ? puntoA.proximidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloSeguridad"></span>seguridad: ${puntoA.seguridad ? puntoA.seguridad : 'sin información'}</p>`;
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
      const puntoB = puntos[i];

      const zona = document.createElement('a');

      // Crear los círculos de cada indicador
      const circuloHabitabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloAmbiente = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloInfraestructura = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloMovilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloSeguridad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloProximidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloCaminabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      distanciaParcial = distanciaEntreCoordenadas(puntoA.lat, puntoA.lon, puntoB.lat, puntoB.lon);
      distanciaTotal += distanciaParcial;

      // Calcular la posición en x de cada punto
      const x = convertirEscala(distanciaTotal, 0, 25, 20, screen.width * props.multiplicadorAncho);

      // Definir posición en y de cada punto por indicador
      const yInfraestructura = alturaContenedor - puntoB.infraestructura * alturaContenedor;
      const yHabitabilidad = alturaContenedor - puntoB.habitabilidad * alturaContenedor;
      const yAmbiente = alturaContenedor - puntoB.ambiente * alturaContenedor;
      const yMovilidad = alturaContenedor - puntoB.movilidad * alturaContenedor;
      const ySeguridad = alturaContenedor - puntoB.seguridad * alturaContenedor;
      const yProximidad = alturaContenedor - puntoB.proximidad * alturaContenedor;
      const yCaminabilidad = alturaContenedor - puntoB.caminabilidad * alturaContenedor;

      // Puntos Habitabilidad
      circuloHabitabilidad.setAttribute('class', 'puntoIndicador habitabilidad');
      circuloHabitabilidad.setAttribute('cx', `${x}`);
      circuloHabitabilidad.setAttribute('cy', `${yHabitabilidad}`);
      circuloHabitabilidad.setAttribute('r', `${puntoB.habitabilidad * multiplicadorRadio}`);

      // Puntos Ambiente
      circuloAmbiente.setAttribute('class', 'puntoIndicador ambiente');
      circuloAmbiente.setAttribute('cx', `${x}`);
      circuloAmbiente.setAttribute('cy', `${yAmbiente}`);
      circuloAmbiente.setAttribute('r', `${puntoB.ambiente * multiplicadorRadio}`);

      // Puntos Infraestructura
      circuloInfraestructura.setAttribute('class', 'puntoIndicador infraestructura');
      circuloInfraestructura.setAttribute('cx', `${x}`);
      circuloInfraestructura.setAttribute('cy', `${yInfraestructura}`);
      circuloInfraestructura.setAttribute('r', `${puntoB.infraestructura * multiplicadorRadio}`);

      // Puntos Movilidad
      circuloMovilidad.setAttribute('class', 'puntoIndicador movilidad');
      circuloMovilidad.setAttribute('cx', `${x}`);
      circuloMovilidad.setAttribute('cy', `${yMovilidad}`);
      circuloMovilidad.setAttribute('r', `${puntoB.movilidad * multiplicadorRadio}`);

      // Puntos Seguridad
      circuloSeguridad.setAttribute('class', 'puntoIndicador seguridad');
      circuloSeguridad.setAttribute('cx', `${x}`);
      circuloSeguridad.setAttribute('cy', `${ySeguridad}`);
      circuloSeguridad.setAttribute('r', `${puntoB.seguridad * multiplicadorRadio}`);

      // Puntos Proximidad
      circuloProximidad.setAttribute('class', 'puntoIndicador proximidad');
      circuloProximidad.setAttribute('cx', `${x}`);
      circuloProximidad.setAttribute('cy', `${yProximidad}`);
      circuloProximidad.setAttribute('r', `${puntoB.proximidad * multiplicadorRadio}`);

      // Puntos Caminabilidad
      circuloCaminabilidad.setAttribute('class', 'puntoIndicador caminabilidad');
      circuloCaminabilidad.setAttribute('cx', `${x}`);
      if (yCaminabilidad) {
        circuloCaminabilidad.setAttribute('cy', `${yCaminabilidad}`);
        circuloCaminabilidad.setAttribute('r', `${puntoB.caminabilidad * multiplicadorRadio}`);
      }

      // Agregar nombre de calles
      const calle = document.createElement('p');
      calle.innerText = puntoB.nombre;
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
        infoPuntoA.innerHTML = `<h4>${puntoB.nombre}</h4>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloAmbiente"></span> ambiente: ${puntoA.ambiente ? puntoA.ambiente : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloCaminabilidad"></span> caminabilidad: ${puntoA.caminabilidad ? puntoA.caminabilidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloHabitabilidad"></span>habitabilidad: ${puntoA.habitabilidad ? puntoA.habitabilidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloInfraestructura"></span>infraestructura: ${puntoA.infraestructura ? puntoA.infraestructura : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloMovilidad"></span>movilidad: ${puntoA.movilidad ? puntoA.movilidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloProximidad"></span>proximidad: ${puntoA.proximidad ? puntoA.proximidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloSeguridad"></span>seguridad: ${puntoA.seguridad ? puntoA.seguridad : 'sin información'}</p>`;
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
      <div id="etiquetas">
        <p @click="cerebro.indicadoresVisible = true" class="etiquetaDatos" id="etiqAmbiente">Ambiente</p>
        <p @click="cerebro.indicadoresVisible = true" class="etiquetaDatos" id="etiqCaminabilidad">Caminabilidad</p>
        <p @click="cerebro.indicadoresVisible = true" class="etiquetaDatos" id="etiqHabitabilidad">Habitabilidad</p>
        <p @click="cerebro.indicadoresVisible = true" class="etiquetaDatos" id="etiqInfraestructura">Infraestructura</p>
        <p @click="cerebro.indicadoresVisible = true" class="etiquetaDatos" id="etiqMovilidad">Movilidad</p>
        <p @click="cerebro.indicadoresVisible = true" class="etiquetaDatos" id="etiqProximidad">Proximidad</p>
        <p @click="cerebro.indicadoresVisible = true" class="etiquetaDatos" id="etiqSeguridad">Seguridad</p>
      </div>
    </div>

    <div id="contenedorZonas">
      <div class="infoPunto" ref="infoPuntoA" id="infoPuntoA"></div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/constantes';
@import '../scss/general';

#contenedorVis {
  display: flex;
  flex-direction: column;
  // border: 1px black solid;
  margin: 1em;
  height: 300px;
}

#contenedorTrazos {
  height: 270px;
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
  padding: 0em 1em;
  position: absolute;
  top: 104vh;

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
  }

  #circuloAmbiente {
    background-color: var(--colorAmbiente);
  }
  #circuloCaminabilidad {
    background-color: var(--colorCaminabilidad);
  }
  #circuloHabitabilidad {
    background-color: var(--colorHabitabilidad);
  }
  #circuloInfraestructura {
    background-color: var(--colorInfraestructura);
  }
  #circuloMovilidad {
    background-color: var(--colorMovilidad);
  }
  #circuloProximidad {
    background-color: var(--colorProximidad);
  }
  #circuloSeguridad {
    background-color: var(--colorSeguridad);
  }
}

.calles {
  position: absolute;
  bottom: 36vh;
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
    width: 800vw;
  }
  #contenedorEtiquetas {
    position: unset;
  }
  #etiquetas {
    flex-direction: row;
  }

  .infoPunto {
    top: 72vh;
  }
}
</style>
