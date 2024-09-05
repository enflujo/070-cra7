export type Ruido = [
  /** fecha y hora de la medición de niveles de ruido. */
  hora: number | null,
  /** Leq-1: contiene los niveles intermedios de ruido en esos 10 segundos de medición. Con este dato la experta menciona se puede comparar con la normativa de un máximo de 80db. En promedio se observó que los niveles de ruido son cercanos a 80db pero no superaron la normativa nacional.  */
  leq1: number | null,
  /** Lmax: contiene los niveles máximos de ruido captados en esos 10 segundos de medición. */
  lmax1: number | null,
];

export interface DatosRuido {
  [
    /** indica el número de paradero en el cual se tomó la información. */
    punto: number
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
  };
}

export interface Punto {
  id: string;
  nombre: string;
  slug: string;
  habitabilidad?: number;
  ambiente?: number;
  infraestructura?: number;
  movilidad?: number;
  seguridad?: number;
}

export type LlavesDatosPunto = 'habitabilidad' | 'ambiente' | 'infraestructura' | 'movilidad' | 'seguridad';
