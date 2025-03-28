<script setup lang="ts">
import { usarCerebro } from '@/utilidades/cerebro';

const cerebro = usarCerebro();
const controlInfo = () => (cerebro.infoVisible = !cerebro.infoVisible);
</script>

<template>
  <span ref="botonInformacion" id="botonInformacion" class="botonAbrir" @click="controlInfo">Sobre el proyecto</span>

  <div class="ficha infoProyecto" :class="{ visible: cerebro.infoVisible }">
    <div class="cerrar" :onclick="controlInfo">X</div>
    <h2>VEINTICUATRO / SIETE</h2>

    <p>
      Han pasado más de 25 años y Bogotá todavía no se pone de acuerdo en cómo transformar la carrera Séptima, una de
      las avenidas más emblemáticas de la ciudad. Este corredor, que conecta el centro histórico con el norte y bordea
      los cerros orientales, sigue siendo el epicentro de debates.
    </p>
    <p>
      Esta arteria vial, con más de 400 años de historia por donde han transitado pueblos indígenas, el tranvía, el
      Bogotazo, la Ciclovía y el Septimazo, es hoy un reflejo de la salud urbana de Bogotá y sus habitantes.
    </p>
    <p>
      CIVICA
      <span class="resaltar"
        >es un proyecto que estudió a fondo la habitabilidad de Bogotá y, en particular, de la carrera Séptima</span
      >, analizando datos de varias fuentes y entrevistando a diferentes ciudadanos. Veinticuatro Siete, uno de los
      resultados creado en colaboración con Cerosetenta, busca contar y visibilizar los hallazgos de la habitabilidad en
      la carrera Séptima.
    </p>
    <p>
      <span class="resaltar">Habitabilidad</span>. Es decir, qué tanto la gente que vive, trabaja y transita por esta
      avenida tiene acceso a educación, transporte, salud, seguridad, empleo, recreación y cultura. O, dicho de forma
      sencilla: ¿qué tan chévere es vivir en la carrera Séptima?
    </p>
    <p>
      Este proyecto se enfoca en la carrera Séptima como caso de estudio al ser una avenida donde se puede ver toda la
      diversidad de quienes viven y se mueven en Bogotá. Sin embargo, la misma metodología se puede replicar para
      evaluar la habitabilidad de otros puntos claves de Bogotá u otras ciudades del país.
    </p>

    <h2>Créditos</h2>
    <p>
      Este es un proyecto realizado por investigadores y profesores de la
      <a href="https://unal.edu.co/">Universidad Nacional de Colombia</a> y la
      <a href="https://www.uniandes.edu.co/">Universidad de los Andes</a>, con sus facultades de Medicina e Ingeniería.
    </p>

    <p>
      Los contenidos de Veinticuatro Siete fueron creados por
      <a href="https://cerosetenta.uniandes.edu.co/proyectos/">070 Proyectos</a>. La página web fue desarrollada por el
      <a href="https://enflujo.com">Laboratorio EnFlujo</a>, del Ceper, de la Universidad de los Andes.
    </p>
  </div>
</template>

<style lang="scss" scoped>
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
