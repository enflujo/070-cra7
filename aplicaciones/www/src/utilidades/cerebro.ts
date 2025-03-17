import { defineStore } from 'pinia';
import type { Cerebro, ElementoPaisaje, Perfil } from '../tipos';

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
