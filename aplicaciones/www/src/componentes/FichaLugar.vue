<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import type { ElementoPaisaje } from '../tipos';
import { usarCerebro } from '../utilidades/cerebro';
import { base } from '@/utilidades/ayudas';

defineProps<{ id: string; cerrar: () => void }>();

//const nombrePodcast: Ref<string> = ref('');
const nombrePerfil: Ref<string> = ref('');
//const descripcionPodcast: Ref<string> = ref('');
const descripcionPerfil: Ref<string> = ref('');
const descripcionTextoPajaro: Ref<string> = ref('');

const ruta: Ref<string> = ref('');
//const rutaPodcast: Ref<string> = ref('');

//const hayPodcast: Ref<boolean> = ref(false);
const hayPerfil: Ref<boolean> = ref(false);
const hayTextoPajaro: Ref<boolean> = ref(false);

const cerebro = usarCerebro();

const perfiles: ElementoPaisaje[] = [
  {
    id: 'calle-32',
    nombre: 'Perfil 1 Habitabilidad',
    descripcion: 'descripción pe1',
  },
  {
    id: 'calle-175',
    nombre: 'Perfil 2 Habitabilidad',
    descripcion: 'descripción pe2',
  },
  {
    id: 'calle-151',
    nombre: 'Perfil 3 Pájaros',
    descripcion: 'descripción pe3',
  },
  {
    id: 'calle-60',
    nombre: 'Perfil 4 Calidad aire',
    descripcion: 'descripción pe4',
  },
  {
    id: 'calle-175',
    nombre: 'Perfil 5 Peor caminabilidad',
    descripcion: 'descripción pe5',
  },
  {
    id: 'calle-19',
    nombre: 'Perfil 6 Mayor flujo personas',
    descripcion: 'descripción pe6',
  },
  {
    id: 'calle-100',
    nombre: 'Perfil 7 Mayor delito peatones',
    descripcion: 'descripción pe7',
  },
  {
    id: 'calle-180',
    nombre: 'Perfil 8 salud mental',
    descripcion: 'descripción pe8',
  },
];

const textosPajaros: ElementoPaisaje[] = [
  {
    id: 'calle-32',
    nombre: 'tp1',
    descripcion:
      'En el tramo 1 (entre la calle 26 y la calle 45) se encontraron específicamente 34 especies y 702 individuos. Las especies más abundantes son Turdus fucater (mirla patinaranja) y Columba livia (paloma bravía), que representan el 35,6% de los individuos observados, siendo Columba livia la especie más observada con un 20%. A su vez, las aves migratorias presentes en los avistamientos representan el 14,4% con 10 especies. Al analizar las abundancias relativas de cada especie, se determina que las especies más abundantes reflejan el estado de deterioro de los ecosistemas del tramo 1, al ser especies generalistas, es decir, especies que se adaptan a cambios drásticos y abruptos debido a su alimentación omnívora, territorialidad y tolerancia a los cambios antropogénicos de los ecosistemas que habitan. <br> <br> Es importante mencionar que Columba livia es una especie invasora, que mantiene una estrecha relación con los asentamientos humanos, ya que encuentra estructuras que permiten la anidación y utiliza la basura como fuente de alimentación. <br> <br> El dato de un 14,4% de aves migratorias con 10 especies es alentador, pues muestra que los ecosistemas semiurbanos de la ciudad todavía permiten la llegada de especies con migración boreal que provienen desde Estados Unidos, encontrando zonas de descanso y alimentación en nuestras áreas verdes. Sin embargo, la baja abundancia de especies nativas con nichos ecológicos específicos resalta la necesidad de proteger y mejorar las áreas verdes urbanas, con el fin de promover la biodiversidad, la conectividad ecológica y la habitabilidad de la ciudad, fomentando espacios naturales que contribuyan a la disminución del estrés de los ciudadanos.',
  },
  {
    id: 'calle-60',
    nombre: 'tp2',
    descripcion:
      'En el tramo 2 (entre la calle 45 y la calle 100) se encontraron 673 individuos y un total de 30 especies. Las especies más abundantes son Turdus fuscater (mirla patinaranja), Columba livia (paloma bravía), Zenaida auriculata (torcaza), Zonotrichia capensis (copetón) y Colibri coruscans (colibrí rutilante). Se observa que la abundancia de Columba livia y Turdus fuscater representa el 36,3%, siendo Turdus fuscater la especie más abundante, con una representación del 21,2% de las aves observadas. Las especies migratorias constituyen el 13,1% de las aves avistadas, incluyendo 10 especies que se diferencian de las del tramo 1. Las especies migratorias más abundantes son Leiothlypis peregrina (reinita de Tennessee) y Setophaga fusca (reinita gorjinaranja), que representan el 3,3% y el 2,7% respectivamente. <br> <br> En este caso, la discusión sobre la salud ecosistémica es similar a la del tramo 1, aunque en un área de estudio más extensa. Las especies generalistas, como Columba livia, Turdus fuscater y Zonotrichia capensis, dominan el territorio. Aunque Colibri coruscans no es una especie generalista, sí es territorial y tiende a dominar zonas verdes de la ciudad con disponibilidad de alimento, como arbustos florales que producen néctar. Esto explica su presencia y sugiere una mayor cantidad de áreas verdes con diversidad de especies vegetales. <br> <br> Aún hay suficiente cubierta vegetal para permitir la llegada de aves migratorias; sin embargo, llama la atención la disminución en el número de especies avistadas, lo que evidencia un problema probablemente relacionado con la fragmentación de los ecosistemas (áreas verdes), que impide el flujo de especies entre ellas.',
  },
  {
    id: 'calle-151',
    nombre: 'tp3',
    descripcion:
      'En el tramo 3 (entre la calle 100 y la calle 160) se registran 698 individuos y 50 especies. Las especies más comunes son las ya mencionadas, aunque la población de Columba livia (paloma bravía) disminuye drásticamente el número de individuos observados. La biomasa en este tramo varía ligeramente, siendo las aves más abundantes Turdus fuscater (mirla patinaranja) y Colibri coruscans (colibrí rutilante), que representan el 31,5% de las aves observadas (17,2% y 14,3% respectivamente). Se identificaron 11 especies de aves migratorias, que constituyen el 10% del total, destacando una mayor abundancia de Setophaga fusca (reinita gorjinaranja) y Piranga rubra (tángara roja migratoria). Por otro lado, Columba livia tuvo una abundancia del 5,2%. <br> <br> Algunas especies encontradas fuera de la sabana, como Grallaria ruficapilla (tororoí compadre) y Myiothlypis fulvicauda (arañero ribereño), son más comunes en el bosque del cerro. Sin embargo, al estudiar las zonas limítrofes a áreas urbanas, se observó una baja abundancia de estas especies. <br> <br> Dado que esta zona de estudio se encuentra más cerca de los cerros orientales, es posible encontrar especies que prefieren nichos específicos del bosque alto andino. Se observa una relación débil entre los asentamientos humanos (como conjuntos y barrios) y estas especies, que tienden a alejarse de las zonas urbanas. A pesar de ello, la preservación del cerro y la proximidad a áreas verdes en la ciudad favorece una conectividad y un flujo de biodiversidad más robustos. Por ello, se han encontrado especies que indican una buena salud ecosistémica, como Grallaria ruficapilla y Myiothlypis fulvicauda, aunque estas fueron localizadas en el punto conocido como "Finca la Suiza", que se caracteriza por ser una extensa área natural dedicada a la ganadería y ubicada en el cerro oriental. <br> <br> Esta situación evidencia la importancia de la conectividad ecológica y la conservación de ecosistemas estratégicos, con el fin de fomentar un uso sostenible de estos recursos. Esto contribuye a una dinámica hidrológica óptima, a una mejora en la calidad del aire y a la promoción del cuidado de la biodiversidad distrital. A pesar de las amenazas, Colombia se mantiene como el país número uno en diversidad de aves, albergando una riqueza notable en especies endémicas, residentes, exóticas y migratorias.',
  },
];

function cerrar() {
  cerebro.fichaVisible = false;
}

onMounted(() => {
  /* No elimino esto aún hasta que no decidamos si en estas fichas habrá podcasts*/
  //const podcast = podcasts.find((podcast) => podcast.id === cerebro.lugarElegido);
  const perfil = perfiles.find((perfil) => perfil.id === cerebro.lugarElegido);
  const textoPajaro = textosPajaros.find((texto) => texto.id === cerebro.lugarElegido);

  /*  if (podcast) {
    if (podcast.nombre) nombrePodcast.value = podcast.nombre;
    if (podcast.descripcion) descripcionPodcast.value = podcast.descripcion;
    if (podcast.ruta) rutaPodcast.value = podcast.ruta;
    hayPodcast.value = true;
  } */

  if (perfil) {
    if (perfil.nombre) nombrePerfil.value = perfil.nombre;
    if (perfil.descripcion) descripcionPerfil.value = perfil.descripcion;
    hayPerfil.value = true;
  }

  if (textoPajaro) {
    if (textoPajaro.descripcion) descripcionTextoPajaro.value = textoPajaro.descripcion;
    hayTextoPajaro.value = true;
  }
});
</script>

<template>
  <div class="ficha fichaLugar">
    <span id="cerrar" @click="cerrar">X</span>

    <!--   <h2>{{ cerebro.lugarElegido?.replace('-', ' ') }}</h2> -->
    <!--     <div v-if="hayPodcast" class="contenedorPodcast">
      <div class="tituloContenido">
        <img class="iconoFicha iconoPodcast" src="/imagenes/icono_podcast.png" />
        <h3>{{ nombrePodcast }}</h3>
      </div>
      <iframe
        style="border-radius: 12px"
        src="https://open.spotify.com/embed/episode/4KLNWodM68BNvhxlmKY7fu?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <p v-html="descripcionPodcast"></p>
    </div> -->

    <div v-if="hayPerfil" class="contenedorPersonaje">
      <div class="tituloContenido">
        <img class="iconoFicha iconoPerfil" :src="`${base}/imagenes/icono_perfil.png`" />
        <h3>{{ nombrePerfil }}</h3>
      </div>

      <p>{{ descripcionPerfil }}</p>
      <video :src="ruta" controls="true"></video>
    </div>

    <div v-if="hayTextoPajaro" class="contenedorTexto">
      <div class="tituloContenido">
        <img class="iconoFicha iconoPajaro" :src="`${base}/imagenes/icono_pajaro.png`" />
        <h3>Pájaros</h3>
      </div>
      <p v-html="descripcionTextoPajaro"></p>
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

.contenedorPersonaje {
  margin-top: 2em;
}

.contenedorTexto {
  margin-top: 2em;
}
</style>
