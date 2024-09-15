import type { LlavesZats } from '@/tipos/compartidos';

export interface Errata {
  fila: number;
  error: string;
}

export interface Zats {
  [nombrePunto: string]: { [llave in LlavesZats]: number[] };
}
