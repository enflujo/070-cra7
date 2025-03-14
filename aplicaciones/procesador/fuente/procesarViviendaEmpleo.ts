import { getXlsxStream } from 'xlstream';
import { estructuras } from './aplicacion';
import slugificar from 'slug';
import type { Punto } from '@/tipos/compartidos';
import type { Errata } from './tipos';
import { guardarJSON, mensajes, redondearDecimal } from './utilidades/ayudas';

export default async (puntos: Punto[]): Promise<Punto[]> => {
  const { viviendaEmpleo } = estructuras;
  const ruta = `./datos/${viviendaEmpleo.archivo}.xlsx`;
  const flujo = await getXlsxStream({
    filePath: ruta,
    sheet: viviendaEmpleo.nombreHoja,
    withHeader: true,
    ignoreEmpty: true,
  });

  let numeroFila = 2;

  return new Promise((resolver) => {
    const errata: Errata[] = [];

    flujo.on('data', async (obj) => {
      const [_id, nombre, _lat, _lon, valor] = obj.formatted.arr;

      const slug = slugificar(nombre);
      const punto = puntos.find((punto) => punto.slug == slug);

      if (punto) {
        punto.indices.push({ indicador: 'viviendaEmpleo', valor: redondearDecimal(valor) });
      } else {
        errata.push({ fila: numeroFila, error: `No hay punto con slug: ${slug} para guardar datos` });
      }

      numeroFila++;
    });

    flujo.on('close', () => {
      if (errata.length) guardarJSON(errata, 'errataViviendaEmpleo');

      mensajes.exito('Datos de Vivienda y Empleo procesados');
      resolver(puntos);
    });

    flujo.on('error', (error) => {
      throw new Error(JSON.stringify(error, null, 2));
    });
  });
};
