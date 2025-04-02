import { defineStore } from 'pinia';
import type { Cerebro, ElementoPaisaje, TiposContenido } from '../tipos';
import type { Perfil, Texto } from '@/tipos/compartidos';

// Guargar qué lugar está elegido para que quede disponible para todos los componentes
export const usarCerebro = defineStore('cerebro', {
  state: (): Cerebro => {
    return {
      lugarElegido: '',
      fichaVisible: true,
      tipoContenido: 'sobre',
      podcastActual: null,
      perfilActual: null,
    };
  },

  actions: {
    seleccionarPunto(lugar: string) {
      this.lugarElegido = lugar;
    },

    deseleccionarPunto() {
      this.lugarElegido = null;
    },

    mostrarFicha(contenido: TiposContenido) {
      this.fichaVisible = true;
      this.tipoContenido = contenido;
    },

    elegirPodcast(podcast: ElementoPaisaje, evento: MouseEvent) {
      evento.stopPropagation();
      this.fichaVisible = true;
      this.podcastActual = podcast;
      this.tipoContenido = 'podcast';
    },

    elegirPerfil(perfil: Perfil, evento: MouseEvent) {
      evento.stopPropagation();
      this.fichaVisible = true;
      this.perfilActual = perfil;
      this.tipoContenido = 'perfil';
    },

    mostrarIndicadores(evento: MouseEvent) {
      evento.stopPropagation();
      this.fichaVisible = true;
      this.tipoContenido = 'indicadores';
    },
  },
});

export const podcasts: ElementoPaisaje[] = [
  {
    id: '1',
    ruta: 'https://open.spotify.com/embed/episode/4LjdcPIIOWgX6hw58sTZ4h',
    nombre: 'Una ciudad habitable: ¿es chévere vivir en Bogotá?',
    descripcion:
      '¿Qué significa que una ciudad sea habitable? ¿Qué factores inciden en que consideremos que una ciudad es más o menos agradable para vivir? ¿Pueden los trancones y la contaminación de una ciudad afectar la salud física y mental de quienes vivimos allí? <br> <br> En este episodio de Veinticuatro Siete, la profesora y médica Olga Lucía Sarmiento nos explicará el concepto de habitabilidad urbana, y usará como ejemplo la carrera Séptima, una de las avenidas más importantes y representativas de Bogotá.',
  },
  {
    id: '2',
    ruta: 'https://open.spotify.com/embed/episode/6SOndW9Jo3nPKpzBp9IEul',
    nombre: 'Una ciudad para moverse, una ciudad para quedarse',
    descripcion:
      '¿Cómo construir soluciones de movilidad para que las personas no solo piensen en moverse, en llegar de un punto a otro en una ciudad, sino que se quieran quedar a vivir allí? ¿Se puede pensar en soluciones para transportarse mejor pero también para vivir mejor? <br> <br> En este segundo episodio de Veinticuatro Siete, el profesor e ingeniero Carlos Moncada nos explica cómo pensar una movilidad sostenible para hacer ciudades más habitables.',
  },
  {
    id: '3',
    ruta: 'https://open.spotify.com/embed/episode/4KLNWodM68BNvhxlmKY7fu',
    nombre: '¿Qué nos dicen las aves sobre la calidad del aire y el ruido en Bogotá?',
    descripcion:
      'En este episodio quisimos hacer algo diferente: entender los efectos que tiene vivir en una ciudad como Bogotá, no para los humanos sino para otros seres, como las aves, que habitan con nosotros desde otra altura. <br> <br> ¿Qué nos dicen las palomas, torcazas, mirlas, colibríes, reinitas y demás aves sobre el ruido y la contaminación en la capital? <br> <br> En este episodio de Veinticuatro Siete, la médica veterinaria Arlen Patricia Gómez y el profesor Ricardo Morales nos explican cómo estos factores medioambientales pueden hacer que Bogotá sea más o menos habitable para los humanos y otros seres con los que convivimos.',
  },
  {
    id: '4',
    ruta: 'https://open.spotify.com/embed/episode/0Wy6oN44v3MiBdHlwaWgnV?si=6786b72e435b4389',
    nombre: 'Movilidad y proximidad en la carrera Séptima: 25 años de promesas incumplidas',
    descripcion: `<p>Durante más de 25 años, la Carrera Séptima ha sido escenario de debates y planes que no han llegado a ejecución. ¿Cómo esto afecta la calidad de vida? ¿Qué rol juegan el poder, los intereses privados y la desigualdad? ¿Qué se necesita para que la Séptima sea diseñada para la gente?</p> <p>En el último episodio de <span class="resaltar">Veinticuatro/Siete</span>, el profesor e ingeniero Luis Ángel Guzmán analiza por qué la movilidad en la Séptima sigue atrapada en el mismo trancón de hace décadas.</p>`,
  },
];

export const perfiles: Perfil[] = [
  {
    id: 'pe1',
    slug: 'calle-189',
    nombre: 'Persona que se mueve en transporte público',
    descripcion:
      'Luisa González vive en el Codito, a pocas cuadras de la carrera Séptima, en el extremo nororiental de Bogotá. Aunque tomar el bus por esta avenida es la ruta más directa para ir a su trabajo, ella prefiere evitarla.',
    video: 'ep1.mp4',
  },
  {
    id: 'pe2',
    slug: 'calle-53',
    nombre: 'Persona que tiene mascota',
    descripcion:
      'Camilo Páez vive en el sector de Chapinero, cerca de la carrera Séptima y todos los días saca a pasear a su perro Rolo. Ambos tratan de evitar caminar por la Séptima, no solo por el ruido sino porque a Rolo le gusta la basura que allí abunda.',
    video: 'ep2.mp4',
  },
  {
    id: 'pe3',
    slug: 'calle-70',
    nombre: 'Persona que trabaja en la séptima',
    descripcion:
      'Don Carlos Mariño se gana la vida conduciendo su taxi por las calles de Bogotá. Sólo toma la carrera Séptima cuando un pasajero se lo pide, de resto, hace lo imposible por no transitarla.',
    video: 'ep3.mp4',
  },
  {
    id: 'pe4',
    slug: 'calle-106',
    nombre: 'Persona que monta en bici',
    descripcion:
      'Alejandra Guerrero es una biciusuaria recurrente de la Carrera Séptima. Y aunque le parece que se puede andar en bici en varias partes de Bogotá, se arriesga cada vez que llega a la altura de la 106 con Séptima, donde la ciclorruta termina abruptamente.',
    video: 'ep4.mp4',
  },
  {
    id: 'pe5',
    slug: 'calle-19',
    nombre: 'Persona con movilidad reducida ',
    descripcion:
      'Alejandro Henao piensa que la Séptima peatonalizada, ubicada en el centro de la ciudad, es una de las zonas más accesibles de esta vía para las personas con movilidad reducida. Sin embargo, señala que no es así para el resto de zonas de tránsito peatonal en esta carrera.',
    video: 'ep5.mp4',
  },
  {
    id: 'pe6',
    slug: 'calle-100',
    nombre: 'Persona de la tercera edad',
    descripcion:
      'Myrian Gaona llegó a vivir cerca a la Séptima con 107 cuando la naturaleza aún la rodeaba. Aunque hoy celebra la modernización de la zona, siente que la vía hoy se piensa solo para que transiten personas jóvenes, y pone en riesgo el tránsito de personas mayores.  ',
    video: 'ep6.mp4',
  },
];

const objHabitabilidadPositivo = {
  titulo: 'Habitabilidad',
  texto:
    'Este punto es el más habitable de la Séptima (valores entre 0.67 y 0.70 en un índice entre 0 y 1). Es decir, hay buena oferta de transporte público y es fácil caminar o andar en bicicleta. Es relativamente seguro e iluminado de noche. La gente camina en la calle regularmente, el ambiente es poco contaminado y tiene cerca múltiples servicios esenciales.',
};

const objHabitabilidadNegativo = {
  titulo: 'Habitabilidad',
  texto:
    'Este punto es el menos habitable de la Séptima (valores entre 0.42 a 0.55 en un índice entre 0 y 1). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro, hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
};

const objAireNegativo = {
  titulo: 'Calidad del aire',
  texto:
    'Este punto tiene mala calidad del aire (valores promedio de entre 94 y 129 µg/m3 para peatones y ciclistas).  La concentración de material particulado PM2.5 supera el límite diario recomendado por la Organización Mundial de la Salud (15 µg/m3), lo que puede afectar la salud de las personas.',
};

const objCaminabilidadPositivo = {
  titulo: 'Caminabilidad',
  texto:
    'Este punto tiene una buena caminabilidad (valores de entre 0.57 y 0.63 en un índice entre 0 y 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
};

const objCaminabilidadNegativo = {
  titulo: 'Caminabilidad',
  texto:
    'Este punto tiene una baja caminabilidad (valores de entre 0.3 y 0.48 en un índice entre 0 y 1). Es decir, es difícil caminar porque los andenes son estrechos y están deteriorados, las losas están levantadas y hay huecos. Hay poca gente caminando y hay pocas actividades.',
};

const objPeatonesPositivo = {
  titulo: 'Flujo de peatones',
  texto:
    'En este punto hay un alto número de peatones movilizándose por los andenes de la carrera Séptima (promedio en cada punto de entre 2.000 y 3.600 peatones en la hora pico).',
};

const objFlujoVehicularNegativo = {
  titulo: 'Intersecciones con mayor flujo vehicular',
  texto:
    'En este punto hay un alto flujo vehicular (promedio en cada punto de aproximadamente 7.800 vehículos movilizándose en la hora pico). En estos puntos la congestión puede aumentar los tiempos de viaje en hasta 80%.',
};

const objDelitosNegativo = {
  titulo: 'Delitos contra personas',
  texto: 'En este punto hay un alto número de delitos contra personas (entre 1.490 y 1.690 delitos en el 2019).',
};

export const textos: { [slug: string]: { textos: Texto[] } } = {
  'calle-19': {
    textos: [objCaminabilidadPositivo, objPeatonesPositivo],
  },
  'calle-26': {
    textos: [objHabitabilidadPositivo],
  },
  'calle-32': {
    textos: [objHabitabilidadPositivo, objFlujoVehicularNegativo],
  },
  'calle-36': {
    textos: [objHabitabilidadPositivo, objCaminabilidadPositivo],
  },
  'diagonal-40a': {
    textos: [objHabitabilidadPositivo, objCaminabilidadPositivo],
  },

  'calle-53': {
    textos: [objDelitosNegativo],
  },

  'calle-56': {
    textos: [objDelitosNegativo],
  },

  'calle-60': {
    textos: [objDelitosNegativo],
  },

  'calle-67': {
    textos: [objHabitabilidadPositivo],
  },

  'calle-70': {
    textos: [objCaminabilidadPositivo],
  },

  'calle-72': {
    textos: [objHabitabilidadPositivo, objCaminabilidadPositivo, objPeatonesPositivo, objFlujoVehicularNegativo],
  },

  'calle-74': {
    textos: [objHabitabilidadPositivo, objCaminabilidadPositivo],
  },

  'calle-76': {
    textos: [objAireNegativo, objCaminabilidadPositivo],
  },

  'calle-84': {
    textos: [objAireNegativo],
  },

  'calle-100': {
    textos: [objFlujoVehicularNegativo],
  },

  'calle-116': {
    textos: [objCaminabilidadPositivo, objPeatonesPositivo],
  },

  'calle-134': {
    textos: [objCaminabilidadPositivo],
  },

  'calle-140': {
    textos: [objCaminabilidadPositivo],
  },

  'calle-147': {
    textos: [objCaminabilidadPositivo],
  },

  'calle-151': {
    textos: [],
  },

  'calle-153': {
    textos: [objCaminabilidadPositivo],
  },

  'calle-160': {
    textos: [objHabitabilidadNegativo, objCaminabilidadPositivo],
  },

  'calle-164': {
    textos: [objHabitabilidadNegativo, objCaminabilidadPositivo],
  },

  'calle-165': {
    textos: [objHabitabilidadNegativo],
  },

  'calle-170': {
    textos: [objHabitabilidadNegativo, objAireNegativo, objCaminabilidadNegativo, objFlujoVehicularNegativo],
  },
  'calle-175': {
    textos: [objHabitabilidadNegativo, objCaminabilidadNegativo],
  },
  'calle-180': {
    textos: [objHabitabilidadNegativo, objAireNegativo],
  },
  'calle-183': {
    textos: [objHabitabilidadNegativo],
  },
  'calle-189': {
    textos: [objHabitabilidadNegativo, objAireNegativo],
  },
  'calle-192': {
    textos: [objHabitabilidadNegativo, objCaminabilidadNegativo],
  },
  'calle-193': {
    textos: [objHabitabilidadNegativo, objCaminabilidadNegativo],
  },
  'calle-200': {
    textos: [objHabitabilidadNegativo, objCaminabilidadNegativo],
  },
  'calle-220': {
    textos: [objCaminabilidadNegativo],
  },
};
