import procesarRuido from './procesarRuido';
import { guardarJSON } from './utilidades/ayudas';

export const estructuras = {
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
  const datosRuido = await procesarRuido();

  guardarJSON(datosRuido, 'ruido');
}

inicio().catch(console.error);
