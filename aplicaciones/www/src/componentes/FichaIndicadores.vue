<script setup lang="ts">
import { usarCerebro } from '../utilidades/cerebro';

defineProps<{ cerrar: () => void }>();

const cerebro = usarCerebro();

function cerrar() {
  cerebro.indicadoresVisible = false;
}
</script>

<template>
  <div v-if="cerebro.indicadoresVisible" class="ficha fichaIndicadores">
    <span id="cerrar" @click="cerrar">X</span>

    <div id="etiquetas">
      <h2>Índices</h2>
      <p>
        Nuestro indicador de <span class="resaltar subrayar">habitabilidad</span> tiene valores entre 0 y 1. Está
        compuesto por seis dominios, los cuales hacen que una ciudad sea
        <span class="resaltar">chévere para vivir</span>. Estos van desde qué tan fácil es moverse, hasta la facilidad
        de acceso a infraestructura o empleo. Cada dominio también tiene valores entre 0 y 1, y pueden ser estudiados de
        forma independiente.
      </p>

      <p class="infoIndicador">
        <span id="etiqHabitabilidad" class="etiquetaDatos">Habitabilidad:</span> Un barrio o zona habitable debería ser
        seguro, sin contaminación, con un transporte sostenible y eficiente cerca, donde se pueda caminar y andar en
        bicicleta sin peligros. Además debería estar cerca de servicios básicos como salud, educación, cultura y
        recreación.
      </p>

      <p class="infoIndicador">
        <span id="etiqAmbiente" class="etiquetaDatos">Ambiente:</span> Un barrio habitable debería tener poca o ninguna
        contaminación del aire y zonas verdes con muchos árboles.
      </p>

      <p class="infoIndicador">
        <span id="etiqAccesibilidad" class="etiquetaDatos">Vivienda y empleo:</span> Un barrio habitable debería
        facilitar el acceso a las oportunidades de vivienda y empleo, mientras mejora sus condiciones físicas. Esto
        incluye minimizar las viviendas sin servicios públicos, tener en cuenta el valor del suelo, el nivel educativo
        de la población y su densidad poblacional versus el acceso a empleo en la misma zona.
      </p>

      <p class="infoIndicador">
        <span id="etiqCaminabilidad" class="etiquetaDatos">Caminabilidad:</span> Se refiere a la capacidad que tienen
        las personas de moverse caminando por la infraestructura pública.
      </p>

      <p class="infoIndicador">
        <span id="etiqMovilidad" class="etiquetaDatos">Movilidad:</span> Un barrio habitable debería permitir e incluso
        incentivar a que las personas se muevan en él de forma segura y eficiente. Si hay movilidad sostenible, y si se
        invierte en ella, disminuyen los siniestros viales, la congestión, y los tiempos para movilizarse. También
        debería aumentar la asequibilidad y la oferta de movilidad activa y transporte público. Esto mejora el acceso a
        oportunidades y servicios básicos que ofrece la ciudad: empleo, educación, recreación, entre otras oportunidades
        que promueven la equidad social.
      </p>

      <p class="infoIndicador">
        <span id="etiqInfraestructura" class="etiquetaDatos">Infraestructura pública y social:</span> Por último, un
        barrio habitable debería tener infraestructura pública y social de calidad, que promueva el acceso a
        oportunidades y servicios básicos, y que disponga de espacios de encuentro para la comunidad. Un barrio con este
        tipo de infraestructura debería tener espacios públicos permanentes y de calidad, zonas verdes, parques, plazas
        y plazoletas. También debería incentivar la caminata, el uso de la bicicleta y ser un barrio de proximidad: un
        barrio que tenga cerca las soluciones a las necesidades básicas de sus habitantes.
      </p>

      <p class="infoIndicador">
        <span id="etiqProximidad" class="etiquetaDatos">Proximidad:</span> Se refiere a la capacidad que tiene una
        persona en un determinado lugar a acceder caminando a sus necesidades básicas y a trabajo, salud, educación y
        parques, cerca a su vivienda y sin tener que moverse en carro o en moto.
      </p>
      <p class="infoIndicador">
        <span id="etiqSeguridad" class="etiquetaDatos">Seguridad:</span>Un barrio habitable debería permitir que las
        personas usen el espacio público con tranquilidad, sin miedo, a diferentes horas del día y sin importar su edad,
        género, raza y condición social. Un barrio seguro, por ende habitable, debería minimizar el número de delitos,
        tener CAIs, cámaras y una buena iluminación.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tituloContenido {
  display: inline-flex;
  align-items: center;
  .iconoFicha {
    margin-right: 1em;
    background: transparent;
  }
}

#etiquetas {
  display: flex;
  flex-direction: column;
}

.etiquetaDatos {
  margin: 0;
  font-weight: bold;
}

.resaltar {
  font-weight: bold;
  font-size: 1.2em;
}

.subrayar {
  text-decoration: underline;
}
</style>
