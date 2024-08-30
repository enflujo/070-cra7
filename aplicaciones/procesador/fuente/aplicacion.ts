import { esFecha, esNumero, guardarJSON, mensajes } from './utilidades/ayudas';
import { getXlsxStream } from 'xlstream';
type Ruido = [
  hora: number | null,
  /** indica el número de paradero en el cual se tomó la información. */
  punto: number | null,
  /** Leq-1: contiene los niveles intermedios de ruido en esos 10 segundos de medición. Con este dato la experta menciona se puede comparar con la normativa de un máximo de 80db. En promedio se observó que los niveles de ruido son cercanos a 80db pero no superaron la normativa nacional.  */
  leq1: number | null,
  /** Lmax: contiene los niveles máximos de ruido captados en esos 10 segundos de medición. */
  lmax1: number | null,
];
const estructuras = {
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
  const { ruido } = estructuras;
  const ruta = `./datos/${ruido.archivo}.xlsx`;
  const flujo = await getXlsxStream({
    filePath: ruta,
    sheet: ruido.nombreHoja,
    withHeader: true,
    ignoreEmpty: true,
  });

  let numeroFila = 2;
  let primeraFilaProcesada = false;
  const errataRuido: { fila: number; error: string }[] = [];
  const ruidoProcesados: Ruido[] = [];

  return new Promise((resolver) => {
    flujo.on('data', async (obj) => {
      if (!primeraFilaProcesada) {
        // console.log(compararListas(Object.keys(raw.obj), ruido.llaves));
        primeraFilaProcesada = true;
      }

      const [id, hora, leq1, lmax1, punto, nombre, jornada, lon, lat] = obj.formatted.arr;
      const filaProcesada: Ruido = [null, null, null, null];

      if (esFecha(hora)) {
        filaProcesada[0] = hora;
      } else {
        errataRuido.push({ fila: numeroFila, error: `Timestamp no es número, su valor es: ${hora}` });
      }

      if (esNumero(punto)) {
        filaProcesada[1] = punto;
      } else {
        errataRuido.push({ fila: numeroFila, error: `Punto muestreado no es número, su valor es: ${leq1}` });
      }

      if (esNumero(leq1)) {
        filaProcesada[2] = leq1;
      } else {
        errataRuido.push({ fila: numeroFila, error: `Leq-1 no es número, su valor es: ${leq1}` });
      }

      if (esNumero(lmax1)) {
        filaProcesada[3] = lmax1;
      } else {
        errataRuido.push({ fila: numeroFila, error: `Lmax-1 no es número, su valor es: ${lmax1}` });
      }

      ruidoProcesados.push(filaProcesada);
      numeroFila++;
    });

    flujo.on('close', () => {
      mensajes.exito('FIN');

      if (errataRuido.length) guardarJSON(errataRuido, 'errataRuido');
      if (ruidoProcesados.length) {
        guardarJSON(ruidoProcesados, 'ruido');
      }

      resolver();
    });

    flujo.on('error', (error) => {
      throw new Error(JSON.stringify(error, null, 2));
    });
  });
}

inicio().catch(console.error);
