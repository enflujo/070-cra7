export type Medicion = number | null;

export type Ruido = [
  /** fecha y hora de la medición de niveles de ruido. */
  hora: string | null,
  /** Leq-1: contiene los niveles intermedios de ruido en esos 10 segundos de medición. Con este dato la experta menciona se puede comparar con la normativa de un máximo de 80db. En promedio se observó que los niveles de ruido son cercanos a 80db pero no superaron la normativa nacional.  */
  leq1: Medicion,
  /** Lmax: contiene los niveles máximos de ruido captados en esos 10 segundos de medición. */
  lmax1: Medicion,
];

export interface DatosRuido {
  [
    /** indica el número de paradero en el cual se tomó la información. */
    punto: string
  ]: {
    promedio: [
      /** Promedio calculado: suma de todas las mediciones en Leq1 / total de mediciones en este punto */
      promedio: number,
      /** Suma de todas las mediciones Leq1 en este punto */
      total: number,
      /** Total de mediciones hechas en este punto (cada 10 segundos) */
      mediciones: number,
    ];
    mediciones: Ruido[];
    paradero: number;
  };
}

export interface Texto {
  titulo: string;
  texto: string;
}

export interface Punto {
  id: string;
  nombre: string;
  slug: string;
  lat?: number;
  lon?: number;
  ancho?: number;
  idRuido?: string;
  idAire?: string;
  txtPajaros?: string;
  ilustraciones?: string[];
  podcast?: string;
  perfil?: Perfil;
  ubicacionX?: number;
  indices: { indicador: LlavesIndices; valor: number }[];
  habitabilidad: number;
  vegetacion?: string[];
  pajaros?: string[];
  malAire?: string[];
  textos?: Texto[];
}

export type LlavesIndices = 'ambiente' | 'infraestructura' | 'movilidad' | 'seguridad' | 'viviendaEmpleo';

export type LlavesZats = 'habitabilidad' | 'ambiente' | 'infraestructura' | 'movilidad';

export type LlavesAire = 'pm25' | 'ebc' | 'npNs';

export type ValoresMedicionAire = [pm25: Medicion, ebc: Medicion, npNs: Medicion];

export type MedicionAire = [fecha: string, ValoresMedicionAire];

export interface Aire {
  [nombre: string]: {
    promedios: { [llave in LlavesAire]: number };
    mediciones: MedicionAire[];
  };
}

export interface Perfil {
  id: string;
  nombre: string;
  descripcion: string;
  slug: string;
  video: string;
}
