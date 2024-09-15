import { getXlsxStream } from 'xlstream';
import { estructuras } from './aplicacion';
import { esNumero, guardarJSON, mensajes } from './utilidades/ayudas';
import slugificar from 'slug';
import type { LlavesDatosPunto, Punto } from '@/tipos/compartidos';
import type { Errata } from './tipos';

export default async (): Promise<Punto[]> => {
  const { datosA } = estructuras;
  const ruta = `./datos/${datosA.archivo}.xlsx`;
  const flujo = await getXlsxStream({
    filePath: ruta,
    sheet: datosA.nombreHoja,
    withHeader: false,
    ignoreEmpty: false,
  });

  let numeroFila = 0;

  return new Promise((resolver) => {
    const errata: Errata[] = [];
    /** Acá guardamos los datos para cada punto */
    const puntos: Punto[] = [];
    /** Un objeto de ayuda para guardar slugs y nombre de columna. Como los datos están por columna toca buscar datos a partir del nombre de la columna que es texto y no un número / índice */
    const estructuraDatosColumnas: { [slug: string]: string } = {};
    let primeraFilaProcesada = false;

    function procesarCeldaTipoA(llave: LlavesDatosPunto, fila: { obj: { [llave: string]: string }; arr: string[] }) {
      for (const nombrePunto in estructuraDatosColumnas) {
        const columna = estructuraDatosColumnas[nombrePunto];
        const valorCrudo = fila.obj[columna];

        if (valorCrudo) {
          if (esNumero(valorCrudo)) {
            const punto = puntos.find((punto) => punto.slug === nombrePunto);

            if (punto) {
              punto[llave] = +valorCrudo;
            } else {
              errata.push({
                fila: numeroFila,
                error: `No hay punto con slug ${nombrePunto} para guardar datos de ${llave}.`,
              });
            }
          } else {
            const partes = valorCrudo.includes('valor de ')
              ? valorCrudo.split('valor de ')
              : valorCrudo.split('valor ');

            if (partes.length && partes.length === 2) {
              const [valor] = partes[1].split(' ');

              if (esNumero(valor)) {
                const punto = puntos.find((punto) => punto.slug === nombrePunto);

                if (punto) {
                  punto[llave] = +valor.replace(',', '.');
                } else {
                  errata.push({
                    fila: numeroFila,
                    error: `No hay punto con slug ${nombrePunto} para guardar datos de ${llave}.`,
                  });
                }
              } else {
                errata.push({
                  fila: numeroFila,
                  error: `No se puede extraer el valor de ${llave}, revisar estructura del texto: ${valorCrudo}.`,
                });
              }
            }
          }
        } else {
          errata.push({
            fila: numeroFila,
            error: `No hay valor de ${llave} para el punto ${nombrePunto} en columna ${columna}.`,
          });
        }
      }
    }

    flujo.on('data', async (obj) => {
      const fila = obj.raw.arr;

      if (!primeraFilaProcesada) {
        /**
         * En esta fila están los puntos como nombres de las columnas
         */
        if (numeroFila === 1) {
          const slugPrimerPunto = slugificar('Plaza de Bolivar');
          let guardandoPuntos = false;
          let id = 0;

          fila.forEach((llave: string, i: number) => {
            const slug = slugificar(llave);

            if (slug === slugPrimerPunto) {
              guardandoPuntos = true;
            }

            if (guardandoPuntos) {
              puntos.push({
                id: `${id}`,
                slug,
                nombre: llave.trim(),
              });
              // Extraer el nombre de la columna para buscar valores por nombre de la columna más adelante.
              const columna = Object.keys(obj.raw.obj).find((k) => obj.raw.obj[k] === llave) || '';
              estructuraDatosColumnas[slug] = columna;
              id++;
            }
          });

          primeraFilaProcesada = true;
        }
      } else {
        switch (fila[1]) {
          // case 'Habitabilidad':
          //   procesarCeldaTipoA('habitabilidad', obj.raw);
          //   break;

          // case 'Ambiente':
          //   procesarCeldaTipoA('ambiente', obj.raw);
          //   break;

          // case 'Infraestructura pública y social':
          //   procesarCeldaTipoA('infraestructura', obj.raw);
          //   break;

          // case 'Movilidad':
          //   procesarCeldaTipoA('movilidad', obj.raw);
          //   break;

          case 'Seguridad':
            procesarCeldaTipoA('seguridad', obj.raw);
            break;

          case 'Caminabilidad':
            procesarCeldaTipoA('caminabilidad', obj.raw);
            break;

          default:
            break;
        }
      }

      numeroFila++;
    });

    flujo.on('close', async () => {
      if (errata.length) guardarJSON(errata, 'errataDatosA');

      mensajes.exito('Datos de Puntos procesados');
      resolver(puntos);
    });

    flujo.on('error', (error) => {
      throw new Error(JSON.stringify(error, null, 2));
    });
  });
};
