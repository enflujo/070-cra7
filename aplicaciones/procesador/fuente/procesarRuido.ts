import { esFecha, esNumero, guardarJSON, mensajes, redondearDecimal } from './utilidades/ayudas';
import { getXlsxStream } from 'xlstream';
import type { DatosRuido, Ruido } from '@/tipos/compartidos';
import { estructuras } from './aplicacion';

export default async function procesarRuido(): Promise<DatosRuido> {
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

  return new Promise((resolver) => {
    const ruidoProcesados: DatosRuido = {};

    flujo.on('data', async (obj) => {
      if (!primeraFilaProcesada) {
        // console.log(compararListas(Object.keys(raw.obj), ruido.llaves));
        primeraFilaProcesada = true;
      }

      const [id, hora, leq1, lmax1, punto, nombre, jornada, lon, lat] = obj.formatted.arr;
      const filaProcesada: Ruido = [null, null, null];

      if (esNumero(punto)) {
        if (!ruidoProcesados[punto]) ruidoProcesados[punto] = { promedio: [0, 0, 0], mediciones: [] };

        if (esFecha(hora)) {
          filaProcesada[0] = hora;
        } else {
          errataRuido.push({ fila: numeroFila, error: `Timestamp no es número, su valor es: ${hora}` });
        }

        if (esNumero(leq1)) {
          filaProcesada[1] = leq1;
        } else {
          errataRuido.push({ fila: numeroFila, error: `Leq-1 no es número, su valor es: ${leq1}` });
        }

        if (esNumero(lmax1)) {
          filaProcesada[2] = lmax1;
        } else {
          errataRuido.push({ fila: numeroFila, error: `Lmax-1 no es número, su valor es: ${lmax1}` });
        }

        ruidoProcesados[punto].mediciones.push(filaProcesada);
      } else {
        errataRuido.push({ fila: numeroFila, error: `Punto muestreado no es número, su valor es: ${leq1}` });
      }

      numeroFila++;
    });

    flujo.on('close', () => {
      if (errataRuido.length) guardarJSON(errataRuido, 'errataRuido');

      for (const idPunto in ruidoProcesados) {
        ruidoProcesados[idPunto].promedio[2] = ruidoProcesados[idPunto].mediciones.length;

        const suma = ruidoProcesados[idPunto].mediciones.reduce((acumulado, actual) => {
          return actual[1] ? acumulado + actual[1] : acumulado;
        }, 0);

        ruidoProcesados[idPunto].promedio[1] = redondearDecimal(suma);
        ruidoProcesados[idPunto].promedio[0] = redondearDecimal(suma / ruidoProcesados[idPunto].promedio[2]);
      }

      mensajes.exito(`Datos de Ruido procesados`);
      resolver(ruidoProcesados);
    });

    flujo.on('error', (error) => {
      throw new Error(JSON.stringify(error, null, 2));
    });
  });
}
