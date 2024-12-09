import { esFecha, esNumero, guardarJSON, mensajes, redondearDecimal } from './utilidades/ayudas';
import { getXlsxStream } from 'xlstream';
import type { DatosRuido, Ruido } from '@/tipos/compartidos';
import { estructuras } from './aplicacion';

type Fila = [
  id: number,
  hora: string,
  leq1: number,
  lmax1: number,
  punto: number,
  nombre: string,
  jornada: string,
  fecha: string,
  longitud: number,
  latitud: number,
];

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

      const [id, hora, leq1, lmax1, punto, nombre, jornada, lon, lat] = obj.formatted.arr as Fila;
      const filaProcesada: Ruido = [null, null, null];

      if (nombre) {
        if (!ruidoProcesados[nombre]) {
          ruidoProcesados[nombre] = { promedio: [0, 0, 0], mediciones: [], paradero: 0 };
        }

        if (esNumero(punto)) {
          ruidoProcesados[nombre].paradero = punto;
        } else {
          errataRuido.push({ fila: numeroFila, error: `Punto muestreado no es número, su valor es: ${punto}` });
        }

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

        ruidoProcesados[nombre].mediciones.push(filaProcesada);
      } else {
        errataRuido.push({ fila: numeroFila, error: `No hay nombre del lugar: ${nombre}` });
      }

      numeroFila++;
    });

    flujo.on('close', () => {
      if (errataRuido.length) guardarJSON(errataRuido, 'errataRuido');

      for (const nombrePunto in ruidoProcesados) {
        ruidoProcesados[nombrePunto].promedio[2] = ruidoProcesados[nombrePunto].mediciones.length;

        const suma = ruidoProcesados[nombrePunto].mediciones.reduce((acumulado, actual) => {
          return actual[1] ? acumulado + actual[1] : acumulado;
        }, 0);

        ruidoProcesados[nombrePunto].promedio[1] = redondearDecimal(suma);
        ruidoProcesados[nombrePunto].promedio[0] = redondearDecimal(suma / ruidoProcesados[nombrePunto].promedio[2]);
      }

      mensajes.exito(`Datos de Ruido procesados`);
      resolver(ruidoProcesados);
    });

    flujo.on('error', (error) => {
      throw new Error(JSON.stringify(error, null, 2));
    });
  });
}
