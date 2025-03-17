import { defineStore } from 'pinia';
import type { Cerebro, Perfil } from '../tipos';
import { Texto } from '@/tipos/compartidos';

// Guargar qué lugar está elegido para que quede disponible para todos los componentes
export const usarCerebro = defineStore('cerebro', {
  state: (): Cerebro => {
    return {
      lugarElegido: '',
      fichaVisible: false,
      infoVisible: true,
      podcastVisible: false,
      indicadoresVisible: false,
    };
  },

  actions: {
    seleccionarPunto(lugar: string) {
      this.lugarElegido = lugar;
    },

    deseleccionarPunto() {
      this.lugarElegido = null;
    },
  },
});

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
      'Camilo Paez vive en el sector de Chapinero, cerca a la carrera Séptima y todos los días saca a pasear a su perro Rolo. Ambos tratan de evitar caminar por la Séptima, no solo por el ruido sino porque a Rolo le gusta la basura que allí abunda.',
    video: 'ep2.mp4',
  },
  {
    id: 'pe3',
    slug: 'calle-151',
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
    slug: 'calle-175',
    nombre: 'Persona con movilidad reducida ',
    descripcion:
      'Alejandro Henao piensa que la Séptima peatonalizada, ubicada en el centro de la ciudad, es una de las zonas más accesibles de esta vía para las personas con movilidad reducida. Sin embargo señala que no es así para el resto de zonas de tránsito peatonal en esta carrera.',
    video: 'ep5.mp4',
  },
  {
    id: 'pe6',
    slug: 'calle-106',
    nombre: 'Persona de la tercera edad',
    descripcion:
      'Myrian Gaona llegó a vivir cerca a la Séptima con 107 cuando la naturaleza aún la rodeaba. Aunque hoy celebra la modernización de la zona, siente que la vía hoy se piensa solo para que transiten personas jóvenes, y pone en riesgo el tránsito de personas mayores.  ',
    video: 'ep6.mp4',
  },
];

export const textos: { [slug: string]: { textos: Texto[] } } = {
  'calle-19': {
    textos: [
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad alta (valores de entre 0.57 y  0.63 en un índice de 0 a 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
      },
      {
        titulo: 'Flujo de peatones',
        texto:
          'En este punto hay un alto flujo de peatones que se mueve por los andenes de la carrera séptima con un promedio en cada punto de entre 2.000 y 3.600 peatones en la hora pico.',
      },
    ],
  },
  'calle-26': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el más habitable de la Séptima (valores entre 0.67 y 0.70 en un índice de 0 a 1). Es decir, hay buena oferta de transporte público y es fácil caminar o andar en bici. Es relativamente seguro e iluminado de noche. La gente camina en la calle regularmente, el ambiente es poco contaminado y tiene cerca múltiples servicios esenciales.',
      },
    ],
  },
  'calle-32': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el más habitable de la Séptima (valores entre 0.67 y 0.70 en un índice de 0 a 1). Es decir, hay buena oferta de transporte público y es fácil caminar o andar en bici. Es relativamente seguro e iluminado de noche. La gente camina en la calle regularmente, el ambiente es poco contaminado y tiene cerca múltiples servicios esenciales.',
      },
      {
        titulo: 'Intersecciones con mayor flujo vehicular y aumento en tiempos de viaje',
        texto:
          'Estas son las intersecciones con mayor flujo vehicular y congestión en la Carrera Séptima, con un promedio en cada punto de aproximadamente 7.800 vehículos movilizándose en la hora pico. En la calle 32 y en la calle 170 hay alta congestión, lo que aumenta los tiempos de viaje en más del 80%.',
      },
    ],
  },
  'calle-36': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el más habitable de la Séptima (valores entre 0.67 y 0.70 en un índice de 0 a 1). Es decir, hay buena oferta de transporte público y es fácil caminar o andar en bici. Es relativamente seguro e iluminado de noche. La gente camina en la calle regularmente, el ambiente es poco contaminado y tiene cerca múltiples servicios esenciales.',
      },
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad alta (valores de entre 0.57 y  0.63 en un índice de 0 a 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
      },
    ],
  },
  'diagonal-40a': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el más habitable de la Séptima (valores entre 0.67 y 0.70 en un índice de 0 a 1). Es decir, hay buena oferta de transporte público y es fácil caminar o andar en bici. Es relativamente seguro e iluminado de noche. La gente camina en la calle regularmente, el ambiente es poco contaminado y tiene cerca múltiples servicios esenciales.',
      },
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad alta (valores de entre 0.57 y  0.63 en un índice de 0 a 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
      },
    ],
  },

  'calle-53': {
    textos: [
      {
        titulo: 'Delitos contra personas',
        texto:
          'Estos son los tramos en los que hay un mayor número de delitos a personas. En cada punto se registraron en el 2019 entre 1690 y 1490 delitos.',
      },
    ],
  },

  'calle-56': {
    textos: [
      {
        titulo: 'Delitos contra personas',
        texto:
          'Estos son los tramos en los que hay un mayor número de delitos a personas. En cada punto se registraron en el 2019 entre 1690 y 1490 delitos.',
      },
    ],
  },

  'calle-60': {
    textos: [
      {
        titulo: 'Delitos contra personas',
        texto:
          'Estos son los tramos en los que hay un mayor número de delitos a personas. En cada punto se registraron en el 2019 entre 1690 y 1490 delitos.',
      },
    ],
  },

  'calle-70': {
    textos: [
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad alta (valores de entre 0.57 y  0.63 en un índice de 0 a 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
      },
    ],
  },
  'calle-72': {
    textos: [
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad alta (valores de entre 0.57 y  0.63 en un índice de 0 a 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
      },
      {
        titulo: 'Flujo de peatones',
        texto:
          'En este punto hay un alto flujo de peatones que se mueve por los andenes de la carrera séptima con un promedio en cada punto de entre 2.000 y 3.600 peatones en la hora pico.',
      },
      {
        titulo: 'Intersecciones con mayor flujo vehicular y aumento en tiempos de viaje',
        texto:
          'Estas son las intersecciones con mayor flujo vehicular y congestión en la Carrera Séptima, con un promedio en cada punto de aproximadamente 7.800 vehículos movilizándose en la hora pico. En la calle 32 y en la calle 170 hay alta congestión, lo que aumenta los tiempos de viaje en más del 80%.',
      },
    ],
  },

  'calle-74': {
    textos: [
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad alta (valores de entre 0.57 y  0.63 en un índice de 0 a 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
      },
    ],
  },

  'calle-76': {
    textos: [
      {
        titulo: 'Calidad del aire',
        texto:
          'Este tramo tiene mala calidad del aire (valores medidos entre 94 y 129 µg/m3 para peatones y ciclistas ). En este punto la concentración de material particulado PM2.5 supera el límite diario recomendado por la Organización Mundial de la Salud (15 µg/m3),  lo que puede afectar la salud de las personas.',
      },
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad alta (valores de entre 0.57 y  0.63 en un índice de 0 a 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
      },
    ],
  },

  'calle-84': {
    textos: [
      {
        titulo: 'Calidad del aire',
        texto:
          'Este tramo tiene mala calidad del aire (valores medidos entre 94 y 129 µg/m3 para peatones y ciclistas ). En este punto la concentración de material particulado PM2.5 supera el límite diario recomendado por la Organización Mundial de la Salud (15 µg/m3),  lo que puede afectar la salud de las personas.',
      },
    ],
  },

  'calle-100': {
    textos: [
      {
        titulo: 'Intersecciones con mayor flujo vehicular y aumento en tiempos de viaje',
        texto:
          'Estas son las intersecciones con mayor flujo vehicular y congestión en la Carrera Séptima, con un promedio en cada punto de aproximadamente 7.800 vehículos movilizándose en la hora pico. En la calle 32 y en la calle 170 hay alta congestión, lo que aumenta los tiempos de viaje en más del 80%.',
      },
    ],
  },

  'calle-116': {
    textos: [
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad alta (valores de entre 0.57 y  0.63 en un índice de 0 a 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
      },
      {
        titulo: 'Flujo de peatones',
        texto:
          'En este punto hay un alto flujo de peatones que se mueve por los andenes de la carrera séptima con un promedio en cada punto de entre 2.000 y 3.600 peatones en la hora pico.',
      },
    ],
  },

  'calle-134': {
    textos: [
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad alta (valores de entre 0.57 y  0.63 en un índice de 0 a 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
      },
    ],
  },

  'calle-140': {
    textos: [
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad alta (valores de entre 0.57 y  0.63 en un índice de 0 a 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
      },
    ],
  },

  'calle-147': {
    textos: [
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad alta (valores de entre 0.57 y  0.63 en un índice de 0 a 1). Es decir, es cómodo caminar por ahí: hay buena iluminación y los andenes están en condiciones aceptables.',
      },
    ],
  },

  'calle-160': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el menos habitable de la Séptima (valores de 0.42 a 0.55). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro y hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
      },
    ],
  },
  'calle-164': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el menos habitable de la Séptima (valores de 0.42 a 0.55). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro y hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
      },
    ],
  },
  'calle-165': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el menos habitable de la Séptima (valores de 0.42 a 0.55). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro y hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
      },
    ],
  },
  'calle-170': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el menos habitable de la Séptima (valores de 0.42 a 0.55). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro y hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
      },
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad baja (valores de entre 0.3 y 0.48). Es decir, es difícil caminar porque los andenes son estrechos y están deteriorados, las lozas están levantadas y hay huecos. Hay poca gente caminando y hay pocas actividades.',
      },
      {
        titulo: 'Intersecciones con mayor flujo vehicular y aumento en tiempos de viaje',
        texto:
          'Estas son las intersecciones con mayor flujo vehicular y congestión en la Carrera Séptima, con un promedio en cada punto de aproximadamente 7.800 vehículos movilizándose en la hora pico. En la calle 32 y en la calle 170 hay alta congestión, lo que aumenta los tiempos de viaje en más del 80%.',
      },
    ],
  },
  'calle-175': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el menos habitable de la Séptima (valores de 0.42 a 0.55). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro y hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
      },
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad baja (valores de entre 0.3 y 0.48). Es decir, es difícil caminar porque los andenes son estrechos y están deteriorados, las lozas están levantadas y hay huecos. Hay poca gente caminando y hay pocas actividades.',
      },
    ],
  },
  'calle-180': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el menos habitable de la Séptima (valores de 0.42 a 0.55). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro y hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
      },
    ],
  },
  'calle-183': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el menos habitable de la Séptima (valores de 0.42 a 0.55). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro y hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
      },
    ],
  },
  'calle-189': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el menos habitable de la Séptima (valores de 0.42 a 0.55). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro y hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
      },
    ],
  },
  'calle-192': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el menos habitable de la Séptima (valores de 0.42 a 0.55). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro y hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
      },
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad baja (valores de entre 0.3 y 0.48). Es decir, es difícil caminar porque los andenes son estrechos y están deteriorados, las lozas están levantadas y hay huecos. Hay poca gente caminando y hay pocas actividades.',
      },
    ],
  },
  'calle-193': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el menos habitable de la Séptima (valores de 0.42 a 0.55). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro y hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
      },
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad baja (valores de entre 0.3 y 0.48). Es decir, es difícil caminar porque los andenes son estrechos y están deteriorados, las lozas están levantadas y hay huecos. Hay poca gente caminando y hay pocas actividades.',
      },
    ],
  },
  'calle-200': {
    textos: [
      {
        titulo: 'Habitabilidad',
        texto:
          'Este tramo es el menos habitable de la Séptima (valores de 0.42 a 0.55). Es decir, hay poca oferta de transporte público, los andenes son estrechos y es difícil caminar. Es inseguro y hay mucha contaminación y no es fácil acceder a servicios como el trabajo o la educación superior.',
      },
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad baja (valores de entre 0.3 y 0.48). Es decir, es difícil caminar porque los andenes son estrechos y están deteriorados, las lozas están levantadas y hay huecos. Hay poca gente caminando y hay pocas actividades.',
      },
    ],
  },
  'calle-220': {
    textos: [
      {
        titulo: 'Caminabilidad',
        texto:
          'Este tramo tiene una caminabilidad baja (valores de entre 0.3 y 0.48). Es decir, es difícil caminar porque los andenes son estrechos y están deteriorados, las lozas están levantadas y hay huecos. Hay poca gente caminando y hay pocas actividades.',
      },
    ],
  },
};
