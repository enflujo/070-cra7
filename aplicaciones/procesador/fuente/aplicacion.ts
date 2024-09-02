import procesarDatosA from './procesarDatosA';
import procesarRuido from './procesarRuido';
import { guardarJSON } from './utilidades/ayudas';

export const estructuras = {
  datosA: {
    archivo: 'Mapa 7ma - Datos CEPER puntos primera capa',
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
  guardarJSON(datosRuido, 'ruido');

  const datosA = await procesarDatosA();

  guardarJSON(datosA.puntos, 'puntos');
}

inicio().catch(console.error);
