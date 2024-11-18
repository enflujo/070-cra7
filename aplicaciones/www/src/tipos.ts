// Los elementos son: podcast, personaje y texto
export interface ElementoPaisaje {
  id?: string;
  nombre: string;
  descripcion?: string;
  ruta?: string;
}

export interface FichaIndicador {
  nombre: string;
  descripcion: string;
  unidadMedida: string;
}

export interface Cerebro {
  lugarElegido: string | null;
  fichaVisible: boolean;
  infoVisible: boolean;
}
