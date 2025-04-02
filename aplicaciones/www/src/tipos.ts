import type { Perfil } from '@/tipos/compartidos';

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
export type TiposContenido = 'sobre' | 'perfil' | 'podcast' | 'indicadores';
export interface Cerebro {
  lugarElegido: string | null;
  fichaVisible: boolean;
  tipoContenido: TiposContenido;
  podcastActual: ElementoPaisaje | null;
  perfilActual: Perfil | null;
}
