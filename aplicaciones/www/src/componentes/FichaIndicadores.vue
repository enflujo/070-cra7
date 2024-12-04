<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import type { ElementoPaisaje } from '../tipos';
import { usarCerebro } from '../utilidades/cerebro';
import { base } from '@/utilidades/ayudas';

defineProps<{ id: string; cerrar: () => void }>();

const cerebro = usarCerebro();

function cerrar() {
  cerebro.indicadoresVisible = false;
}

onMounted(() => {});
</script>

<template>
  <div v-if="cerebro.indicadoresVisible" id="fichaIndicadores" class="ficha">
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
}
</style>
