import procesarDatosA from './procesarDatosA';
import procesarRuido from './procesarRuido';
import procesarZat from './procesarZat';
import { guardarJSON } from './utilidades/ayudas';

export const estructuras = {
  /** Esta tabla nos define:
   * - Los nombres y slugs de los puntos */
  datosA: {
    archivo: 'Mapa 7ma - Datos CEPER puntos primera capa',
    nombreHoja: 'Sheet1',
  },
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
      'Plaza Bolivar': [459],
      'Avenida Jiménez': [458, 457],
      'Calle 19': [456, 455],
      'Calle 26': [354, 993],
      'Calle 32': [],
      'Calle 36': [],
      'Diagonal 40A': [],
      'Calle 45': [],
      'Calle 53': [],
      'Calle 56': [],
      'Calle 60': [],
      'Calle 67': [],
      'Calle 70': [],
      'Calle 72': [],
      'Calle 74': [],
      'Calle 76': [],
      'Calle 84A': [],
      'Calle 85': [],
      'Calle 92': [],
      'Calle 94': [],
      'Calle 100': [],
      'Calle 106': [],
      'Calle 116': [],
      'Calle 127': [],
      'Calle 134': [],
      'Calle 140': [],
      'Calle 147': [],
      'Calle 151': [],
      'Calle 153': [],
      'Calle 160': [],
      'Calle 164': [],
      'Calle 165': [],
      'Calle 170': [],
      'Calle 175': [],
      'Calle 180': [],
      'Calle 183': [],
      'Calle 189': [],
      'Calle 192': [],
      'Calle 193': [],
      'Calle 200': [],
      'Calle 220': [],
    },
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
  guardarJSON(datosRuido, 'ruido');

  const puntos = await procesarDatosA();
  guardarJSON(puntos, 'puntos');

  const datosZat = await procesarZat();
}

inicio().catch(console.error);
