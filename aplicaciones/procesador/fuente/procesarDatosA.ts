import { getXlsxStream } from 'xlstream';
import { estructuras } from './aplicacion';
import { guardarJSON, mensajes } from './utilidades/ayudas';
import slugificar from 'slug';

export default async (): Promise<{ puntos: string[] }> => {
  const { datosA } = estructuras;
  const ruta = `./datos/${datosA.archivo}.xlsx`;
  const flujo = await getXlsxStream({
    filePath: ruta,
    sheet: datosA.nombreHoja,
    withHeader: false,
    ignoreEmpty: true,
  });

  let numeroFila = 0;
  let primeraFilaProcesada = false;
  const errata: { fila: number; error: string }[] = [];

  return new Promise((resolver) => {
    /** Acá guardamos los nombres de los puntos */
    const puntos: string[] = [];

    flujo.on('data', async (obj) => {
      if (!primeraFilaProcesada) {
        /**
         * En esta fila están los puntos como nombres de las columnas
         */
        if (numeroFila === 1) {
          const llaves = obj.formatted.arr;
          const nombrePrimerPunto = slugificar('Plaza Bolivar');
          let guardandoPuntos = false;

          llaves.forEach((llave: string) => {
            const nombre = slugificar(llave);

            if (nombre === nombrePrimerPunto) {
              guardandoPuntos = true;
            }

            if (guardandoPuntos) {
              puntos.push(nombre);
            }
          });

          primeraFilaProcesada = true;
        }
      } else {
      }

      numeroFila++;
    });

    flujo.on('close', () => {
      if (errata.length) guardarJSON(errata, 'errataDatosA');

      console.log(puntos, puntos.length);
      mensajes.exito('Datos generales A procesados');
      resolver({ puntos });
    });

    flujo.on('error', (error) => {
      throw new Error(JSON.stringify(error, null, 2));
    });
  });
};
