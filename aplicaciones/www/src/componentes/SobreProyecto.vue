<script setup lang="ts">
import { usarCerebro } from '@/utilidades/cerebro';

const cerebro = usarCerebro();
const controlInfo = () => (cerebro.infoVisible = !cerebro.infoVisible);
</script>

<template>
  <span ref="botonInformacion" id="botonInformacion" class="botonAbrir" @click="controlInfo">Sobre el proyecto</span>

  <div class="ficha infoProyecto" :class="{ visible: cerebro.infoVisible }">
    <div id="cerrar" :onclick="controlInfo">X</div>
    <h2>VEINTICUATRO / SIETE</h2>
    <p>
      Han pasado más de 25 años y Bogotá todavía no se pone de acuerdo en cómo transformar la carrera Séptima, la
      avenida más representativa de la ciudad, que conecta el centro histórico con el norte y bordea los cerros
      orientales y los barrios más pudientes de la capital de Colombia.
    </p>
    <p>
      Han pasado 25 años, cinco alcaldes, muchos proyectos de infraestructura y dinero para pagar estudios y renders que
      justifican por qué no se debe hacer el plan del antecesor sino el del sucesor: que si Transmilenio pesado o
      ligero, que si tranvía, que mejor metro, o que quizá lo que se debe hacer es un Corredor Verde. Hasta ahora, sin
      embargo, todo se ha quedado en promesas.
    </p>
    <p>
      Mientras tanto, la arteria vial más importante de Bogotá, por la que han transitado pueblos indígenas, el tranvía,
      el Bogotazo, la Ciclovía y el Septimazo, y que tiene más de 400 años de historia, sigue ocupando los primeros
      lugares de congestión en una de las ciudades con peor tráfico de América Latina.
    </p>
    <p>
      Además, sigue siendo un importante reflejo de cómo está la salud urbana de Bogotá y de sus habitantes: Personas
      diversas, de todas las edades y estratos sociales, con necesidades específicas, que todos los días recorren la
      Séptima en medio del tráfico, la inseguridad, una infraestructura pobre y la contaminación del aire y el ruido. Y
      que, a pesar de todo, le tienen mucho cariño a esta avenida.
    </p>
    <p>
      Veinticuatro Siete es un proyecto que estudió a fondo la carrera Séptima, entrevistó a sus habitantes, revisó cada
      una de sus cuadras con inteligencia artificial, y analizó las cifras y datos de varias dimensiones y fuentes, para
      comparar lo que a simple vista parece incomparable. Para crear mecanismos e indicadores que usen toda esa
      información de la mejor manera para evaluar las transformaciones urbanas que pueden hacer que Bogotá sea una
      ciudad más sostenible, accesible y habitable.
    </p>
    <p>
      Habitable. Es decir, qué tanto la gente que vive y transita por esta avenida tiene acceso a educación, a servicios
      de transporte, a servicios de salud, de seguridad, de empleo, a espacios para construir cohesión social y por lo
      tanto, qué tantas posibilidades tienen de tener una mejor calidad de vida. En una palabra: qué tan chévere es
      vivir en la carrera Séptima.
    </p>
    <p>
      Este proyecto se enfoca en la carrera Séptima como caso de estudio, porque es una avenida donde se puede ver toda
      la diversidad de quienes viven y se mueven en Bogotá. Sin embargo, la misma metodología se puede replicar para
      evaluar la habitabilidad no sólo de otras avenidas claves de Bogotá, sino de otras ciudades del país.
    </p>

    <h2>Créditos</h2>
    <p>
      Este es un proyecto realizado por investigadores y profesores de la
      <a href="https://unal.edu.co/">Universidad Nacional de Colombia</a> y la
      <a href="https://www.uniandes.edu.co/">Universidad de los Andes</a>, con sus facultades de Medicina e Ingeniería.
    </p>

    <p>
      Los contenidos fueron creados por <a href="https://cerosetenta.uniandes.edu.co/proyectos/">070 Proyectos</a> y la
      página fue desarrollada por el <a href="">Laboratorio EnFlujo</a>, del
      <a href="https://ceper.uniandes.edu.co/">Ceper</a>, de la Universidad de los Andes.
    </p>

    <div id="contenedorLogos"></div>
  </div>
</template>

<style lang="scss" scoped>
#cerrar {
  background-color: var(--menta);
  border-radius: 50%;
  cursor: pointer;
  height: 1.5em;
  width: 1.5em;
  margin: 0;
  line-height: 1.5em;

  right: 1em;
  top: 1em;

  position: absolute;

  display: flex;
  text-align: center;
  justify-content: center;

  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
}

#botonInformacion {
  display: block;
  padding: 0.8em;
  background-color: var(--lila);
  position: fixed;
  text-align: center;
  right: 0px;
  top: 0px;
  opacity: 0.7;
  cursor: pointer;
  z-index: 10;
  font-family: var(--fuentePrincipal);

  &:hover {
    opacity: 1;
  }
}

.infoProyecto {
  display: none;

  &.visible {
    display: block;
    height: 86vh;
  }
}
</style>
