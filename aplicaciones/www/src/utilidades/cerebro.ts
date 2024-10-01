import { defineStore } from 'pinia';

// Guargar qué lugar está elegido para que quede disponible para todos los componentes
export const usarCerebro = defineStore('cerebro', {
  state: () => {
    return {
      lugarElegido: null as string | null,
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
