import procesarAire from './procesarAire';
import procesarDatosA from './procesarDatosA';
import procesarElementosLinea from './procesarElementosLinea';
import procesarRuido from './procesarRuido';
import procesarZat from './procesarZat';
import { guardarJSON } from './utilidades/ayudas';
interface BaseEstructura {
  archivo: string;
  nombreHoja: string;
}
interface Estructuras {
  datosA: BaseEstructura;
  zat: BaseEstructura & { llaves: string[]; tramos: { [nombre: string]: number[] } };
  linea: BaseEstructura;
  aire: BaseEstructura;
  ruido: BaseEstructura & { llaves: string[] };
}
export const estructuras: Estructuras = {
  /** Esta tabla nos define:
   * - Los nombres y slugs de los puntos */
  datosA: {
    archivo: 'Mapa 7ma - Datos CEPER puntos primera capa',
    nombreHoja: 'Sheet1',
  },
  /** En los ZAT se extraen índices de: ambiente, habitabilidad, infraestructura, movilidad y proximidad */
  zat: {
    archivo: 'Calles ZAT 7ma v3',
    nombreHoja: 'Hoja1',
    llaves: [
      'ZAT',
      'Costado',
      'Calle sur',
      'Calle norte',
      'Movilidad',
      'Ambiente',
      'Infraestructura',
      'Habitabilidad',
      'Proximidad (15 min)',
    ],
    tramos: {
      'Plaza de Bolivar': [459],
      'Avenida Jiménez': [458, 457, 456, 455],
      'Calle 19': [456, 455, 354, 993],
      'Calle 26': [354, 993, 352],
      'Calle 32': [345, 351],
      'Calle 36': [342, 343],
      'Diagonal 40A': [342, 343, 271, 277],
      'Calle 45': [271, 277, 272, 726],
      'Calle 53': [272, 276, 273, 275],
      'Calle 56': [273, 275],
      'Calle 60': [275, 274],
      'Calle 67': [255, 252, 848],
      'Calle 70': [253, 848],
      'Calle 72': [848, 847, 253],
      'Calle 74': [847, 248],
      'Calle 76': [847, 248, 847],
      'Calle 84': [244, 243],
      'Calle 85': [244, 243, 263, 264],
      'Calle 92': [262, 264, 261],
      'Calle 94': [261, 265],
      'Calle 100': [265, 259, 158, 151],
      'Calle 106': [158, 151, 152],
      'Calle 116': [152, 156, 153],
      'Calle 127': [153, 154, 86],
      'Calle 134': [86, 85, 82, 83],
      'Calle 140': [82, 83, 81],
      'Calle 147': [83, 78, 77],
      'Calle 151': [83, 77],
      'Calle 153': [83, 77, 60],
      'Calle 160': [59, 854],
      'Calle 164': [56, 57],
      'Calle 165': [56, 57, 55],
      'Calle 170': [55, 20, 21],
      'Calle 175': [17, 18],
      'Calle 180': [17, 18, 14, 16],
      'Calle 183': [15, 13, 12],
      'Calle 189': [13, 12],
      'Calle 192': [13, 12],
      'Calle 193': [13, 12, 6],
      'Calle 200': [6],
      'Calle 220': [1071],
    },
  },
  linea: {
    archivo: 'Mapa 7ma - Datos',
    nombreHoja: 'Cuatro cuadras',
  },
  aire: {
    archivo: 'Puntos Fijos_5 min',
    nombreHoja: 'Sheet1',
  },
  ruido: {
    archivo: 'Ruido_10 sec',
    nombreHoja: 'Sheet1',
    llaves: [
      'ID',
      'Timestamp',
      'Leq-1',
      'Lmax-1',
      'Punto muestreado',
      'Name',
      'Jornada',
      'Date',
      'Longitud_X',
      'Latitud_Y',
    ],
  },
};

async function inicio(): Promise<void> {
  /** RUIDO */
  const datosRuido = await procesarRuido();
  // guardarJSON(datosRuido, 'ruido');

  /** Aire */
  const datosAire = await procesarAire();
  guardarJSON(datosAire, 'aire');

  const puntos = await procesarDatosA();
  await procesarZat(puntos);
  await procesarElementosLinea(puntos, datosAire);
  guardarJSON(puntos, 'puntos');
}

inicio().catch(console.error);
