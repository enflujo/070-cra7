<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue';
import { distanciaEntreCoordenadas } from '../utilidades/ayudas';
import { usarCerebro } from '@/utilidades/cerebro';
//import VisualizacionIndices from './VisualizacionIndices.vue';

/**  Este archivo lo dejé por si queríamos volver a poner la gráfica de los indicadores completa en la ficha de info de
 * los indicadores, pero no funciona bien. Habría que arreglarlo.*/

const cerebro = usarCerebro();

const infoPuntoA: Ref<HTMLElement | null> = ref(null);
const nombresCalles: Ref<HTMLElement | null> = ref(null);

const multiplicadorAncho: number = 0.96; // medida en vw
const alturaContenedor: number = 120;

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

let puntosCalle: { nombreAbreviado: string; x: number }[] = [];

watch(puntosCalle, () => {});

onMounted(async () => {
  const contenedorZonas: HTMLElement = document.getElementById('contenedorZonas') as HTMLElement;
  //const infoPuntoA: HTMLElement = document.getElementById('infoPuntoA') as HTMLElement;

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
      //   puntosCalle.push({ nombreAbreviado: 'Plaza de Bolívar', x: 0 });

      const nombreCalle = document.createElement('p');
      nombreCalle.classList.add('calle');
      nombreCalle.style.left = '-1.2vw';
      nombreCalle.innerText = 'Plaza de Bolívar';
      nombresCalles.value?.appendChild(nombreCalle);

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
      console.log(circulosInfraestructura);

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

      const zona = document.createElement('a');

      const circuloHabitabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloAmbiente = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloInfraestructura = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloMovilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloSeguridad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloProximidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const circuloCaminabilidad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      distanciaParcial = distanciaEntreCoordenadas(puntoA.lat, puntoA.lon, puntoB.lat, puntoB.lon);

      const xZona = convertirEscala(distanciaTotal, 0, 25, 0, 100 * multiplicadorAncho);

      //puntosCalle.push({ nombreAbreviado: puntoA.nombre, x: x });

      /*   if (i === 1) {
        const nombreCalle = document.createElement('p');
        nombreCalle.classList.add('calle');
        nombreCalle.style.left = zona.style.left = `${xZona + 0.5}vw`;
        nombreCalle.innerText = `${puntoB.nombre}`;

        nombresCalles.value?.appendChild(nombreCalle);
      } */

      if (i > 0) {
        const nombreCalle = document.createElement('p');
        nombreCalle.classList.add('calle');
        nombreCalle.style.left = zona.style.left = `${xZona + 0.5}vw`;
        nombreCalle.innerText = `${puntoB.nombre}`;

        nombresCalles.value?.appendChild(nombreCalle);
      }

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
      zona.href = `#${puntoA.slug}`;
      zona.style.left = `${xZona - ancho / 2}vw`;

      // Agregar cada punto a la línea de la 7
      contenedorZonas.appendChild(zona);

      zona.addEventListener('mouseenter', () => {
        if (!infoPuntoA.value) return;
        infoPuntoA.value.innerHTML = `<h4>${puntoA.nombre}</h4>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloAmbiente"></span> ambiente: ${puntoA.ambiente ? puntoA.ambiente : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloCaminabilidad"></span> caminabilidad: ${puntoA.caminabilidad ? puntoA.caminabilidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloHabitabilidad"></span>habitabilidad: ${puntoA.habitabilidad ? puntoA.habitabilidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloInfraestructura"></span>infraestructura: ${puntoA.infraestructura ? puntoA.infraestructura : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloMovilidad"></span>movilidad: ${puntoA.movilidad ? puntoA.movilidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloProximidad"></span>proximidad: ${puntoA.proximidad ? puntoA.proximidad : 'sin información'}</p>
        <p class="elementoEtiqueta"><span class="circuloEtiqueta" id="circuloSeguridad"></span>seguridad: ${puntoA.seguridad ? puntoA.seguridad : 'sin información'}</p>`;
        infoPuntoA.value.style.left = `${xZona + 1}vw`;
        infoPuntoA.value.style.display = 'block';
      });

      zona.addEventListener('mouseleave', () => {
        if (!infoPuntoA.value) return;
        infoPuntoA.value.innerText = '';
        infoPuntoA.value.style.display = 'none';
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

function cerrar() {
  cerebro.indicadoresVisible = false;
}
</script>

<template>
  <div v-if="cerebro.indicadoresVisible" id="contenedorInfoIndicadores">
    <span id="cerrar" @click="cerrar">X</span>

    <div id="etiquetas">
      <h2>Índices</h2>
      <p>
        Esta gráfica muestra siete índices medidos durante la investigación a lo largo de la Carrera Séptima. Los
        valores van de 0 a 1.
      </p>
      <p class="infoIndicador">
        <span id="etiqAmbiente" class="etiquetaDatos">Ambiente:</span> Son las condiciones del entorno natural que puede
        ser afectado por las intervenciones urbanas de la ciudad. Para este proyecto, las condiciones de ambiente se
        miden a partir de la calidad del ruido y el aire, el arbolado urbano y la avifauna.
      </p>
      <p class="infoIndicador">
        <span id="etiqCaminabilidad" class="etiquetaDatos">Caminabilidad:</span> Se refiere a la capacidad que tienen
        las personas de moverse caminando por la infraestructura pública.
      </p>
      <p class="infoIndicador">
        <span id="etiqHabitabilidad" class="etiquetaDatos">Habitabilidad:</span> La habitabilidad hace referencia a un
        barrio seguro, con un ambiente sin contaminación, hogar cerca al transporte, donde se puede caminar y andar en
        bicicleta y está cerca de servicios de salud, educación, cultura y recreación (Badland, 2014). En pocas
        palabras, ¿qué tan chévere es vivir en esta ciudad?
      </p>
      <p class="infoIndicador">
        <span id="etiqInfraestructura" class="etiquetaDatos">Infraestructura:</span> Se refiere a la provisión de
        infraestructura pública y social para que las personas accedan a servicios esenciales y tengan espacios de
        encuentro. Se mide a través de espacio público efectivo que tiene un carácter permanente, como zonas verdes,
        parques, plazas y plazoletas. También a través de indicadores como la caminabilidad, la proximidad a estos
        servicios esenciales, la seguridad y la comodidad para desplazarse en las vías.
      </p>
      <p class="infoIndicador">
        <span id="etiqMovilidad" class="etiquetaDatos">Movilidad:</span> La movilidad se refiere a la capacidad de las
        personas para ocupar, usar y desplazarse en el espacio público para acceder a bienes y servicios de la ciudad,
        oportunidades de trabajo, educación, recreación y otros espacios de convivencia. La inversión en infraestructura
        de transporte no solo facilita la movilidad, sino que también promueve la equidad social al proporcionar acceso
        a oportunidades a todos los estratos poblacionales.
      </p>
      <p class="infoIndicador">
        <span id="etiqProximidad" class="etiquetaDatos">Proximidad:</span> Se refiere a la capacidad que tiene una
        persona en un determinado lugar a acceder caminando a sus necesidades básicas y a trabajo, salud, educación y
        parques, cerca a su vivienda y sin tener que moverse en carro o en moto.
      </p>
      <p class="infoIndicador">
        <span id="etiqSeguridad" class="etiquetaDatos">Seguridad:</span>La seguridad se refiere a la capacidad que
        tienen las personas de usar el espacio público con tranquilidad, a diferentes horas del día y sin importar su
        edad, género, raza y condición social.
      </p>
    </div>
    <!-- <svg id="contenedorTrazosVis" xmlns="http://www.w3.org/2000/svg">
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
    <div id="nombresCalles" ref="nombresCalles"></div>
    <div id="contenedorZonas">
      <div class="infoPunto" ref="infoPuntoA" id="infoPuntoA"></div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
@use '../scss/constantes' as *;
@use '../scss/general' as *;

#contenedorInfoIndicadores {
  background: #fff0f5;
  display: flex;
  height: 100vh;
  overflow-y: auto;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 99;

  #contenedorTrazosVis {
    // Ancho del contenedor
    position: absolute;
    background-color: white;
    width: 96vw;
    height: 120px;
    border: 1px black solid;
    margin-bottom: 1em;
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

    #titulo {
      margin: 0 3em 0.5em 0;
    }
  }

  #etiquetas {
    display: flex;
    flex-direction: column;
  }

  .etiquetaDatos {
    border-bottom: 2px solid;
    width: fit-content;
    margin: 0 2em 0.5em 0em;
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
    top: 70vh;
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

    #circuloambiente {
      background-color: var(--colorAmbiente);
    }
    #circulocaminabilidad {
      background-color: var(--colorCaminabilidad);
    }
    #circulohabitabilidad {
      background-color: var(--colorHabitabilidad);
    }
    #circuloinfraestructura {
      background-color: var(--colorInfraestructura);
    }
    #circulomovilidad {
      background-color: var(--colorMovilidad);
    }
    #circuloproximidad {
      background-color: var(--colorProximidad);
    }
    #circuloseguridad {
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
}
</style>
