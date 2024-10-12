import type { Cerebro } from '@/tipos';
import { defineStore } from 'pinia';

// Guargar qué lugar está elegido para que quede disponible para todos los componentes
export const usarCerebro = defineStore('cerebro', {
  state: (): Cerebro => {
    return {
      lugarElegido: '',
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
