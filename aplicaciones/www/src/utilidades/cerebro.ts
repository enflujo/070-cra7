import { defineStore } from 'pinia';
import type { Cerebro } from '../tipos';

// Guargar qué lugar está elegido para que quede disponible para todos los componentes
export const usarCerebro = defineStore('cerebro', {
  state: (): Cerebro => {
    return {
      lugarElegido: '',
      fichaVisible: false,
      infoVisible: true,
      podcastVisible: false,
      indicadoresVisible: true,
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
