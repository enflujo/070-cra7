import { getXlsxStream } from 'xlstream';
import { estructuras } from './aplicacion';
import { guardarJSON, mensajes } from './utilidades/ayudas';
import slugificar from 'slug';
import { Punto } from '@/tipos/compartidos';

export default async (puntos: Punto[]): Promise<Punto[]> => {
  const { zat } = estructuras;
  const ruta = `./datos/${zat.archivo}.xlsx`;
  const flujo = await getXlsxStream({
    filePath: ruta,
    sheet: zat.nombreHoja,
    withHeader: true,
    ignoreEmpty: true,
  });

  let numeroFila = 2;
  let primeraFilaProcesada = false;
  const errata: { fila: number; error: string }[] = [];

  return new Promise((resolver) => {
    console.log(puntos);

    flujo.on('data', async (obj) => {
      if (!primeraFilaProcesada) {
        if (numeroFila === 2) {
          primeraFilaProcesada = true;
        }
      }

      const [zat, costado, sur, norte, movilidad, ambiente, infraestructura, habitabilidad, proximidad] =
        obj.formatted.arr;

      puntos.forEach((punto) => {});

      numeroFila++;
    });

    flujo.on('close', () => {
      if (errata.length) guardarJSON(errata, 'errataDatosA');

      mensajes.exito('Datos ZAT procesados');
      resolver(puntos);
    });

    flujo.on('error', (error) => {
      throw new Error(JSON.stringify(error, null, 2));
    });
  });
};
