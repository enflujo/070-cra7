import { getXlsxStream } from 'xlstream';
import { estructuras } from './aplicacion';
import { guardarJSON, mensajes, redondearDecimal, redondearDecimal2 } from './utilidades/ayudas';
import type { LlavesIndices, LlavesZats, Punto } from '@/tipos/compartidos';
import type { Zats } from './tipos';

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
  const errata: { fila: number; error: string }[] = [];

  return new Promise((resolver) => {
    const datosZats: Zats = {};

    flujo.on('data', async (obj) => {
      const [idZat, costado, sur, norte, movilidad, ambiente, infraestructura, habitabilidad, proximidad] =
        obj.formatted.arr;

      puntos.forEach((punto) => {
        const zatsEnPunto = zat.tramos[punto.nombre];

        if (!zatsEnPunto) {
          errata.push({
            fila: numeroFila,
            error: `El punto ${punto.nombre} no existe en la lista de ZATs en estructura.zat.tramos`,
          });
        } else {
          if (!datosZats[punto.nombre]) {
            datosZats[punto.nombre] = {
              movilidad: [],
              ambiente: [],
              infraestructura: [],
              habitabilidad: [],
              proximidad: [],
            };
          }

          if (zatsEnPunto.includes(idZat)) {
            if (ambiente) {
              datosZats[punto.nombre].ambiente.push(ambiente);
            } else {
              errata.push({ fila: numeroFila, error: `El zat ${idZat} no tiene valor para ambiente` });
            }

            if (habitabilidad) {
              datosZats[punto.nombre].habitabilidad.push(habitabilidad);
            } else {
              errata.push({ fila: numeroFila, error: `El zat ${idZat} no tiene valor para habitabilidad` });
            }

            if (infraestructura) {
              datosZats[punto.nombre].infraestructura.push(infraestructura);
            } else {
              errata.push({ fila: numeroFila, error: `El zat ${idZat} no tiene valor para infraestructura` });
            }

            if (movilidad) {
              datosZats[punto.nombre].movilidad.push(movilidad);
            } else {
              errata.push({ fila: numeroFila, error: `El zat ${idZat} no tiene valor para movilidad` });
            }

            if (proximidad) {
              datosZats[punto.nombre].proximidad.push(proximidad);
            } else {
              errata.push({ fila: numeroFila, error: `El zat ${idZat} no tiene valor para proximidad` });
            }
          }
        }
      });

      numeroFila++;
    });

    flujo.on('close', () => {
      if (errata.length) guardarJSON(errata, 'errataZat');

      for (const nombrePunto in datosZats) {
        const punto = datosZats[nombrePunto];

        for (const categoria in punto) {
          const numeroDeZats = punto[categoria as LlavesZats].length;
          const promedioZats = punto[categoria as LlavesZats].reduce((suma, valor) => suma + valor, 0) / numeroDeZats;

          const i = puntos.findIndex((punto) => punto.nombre === nombrePunto);

          if (i >= 0) {
            if (categoria === 'habitabilidad') {
              puntos[i].habitabilidad = redondearDecimal(promedioZats);
            } else {
              puntos[i].indices.push({ indicador: categoria as LlavesIndices, valor: redondearDecimal(promedioZats) });
            }

            if (redondearDecimal(promedioZats) !== redondearDecimal2(promedioZats, 2)) {
              console.log(promedioZats, redondearDecimal(promedioZats), redondearDecimal2(promedioZats, 2));
            }
          } else {
            console.error('no hay punto', nombrePunto, 'en los zats');
          }
        }
      }

      puntos.forEach((punto) => {
        punto.indices.sort((a, b) => b.valor - a.valor);
      });

      mensajes.exito('Datos de ZAT procesados');
      resolver(puntos);
    });

    flujo.on('error', (error) => {
      throw new Error(JSON.stringify(error, null, 2));
    });
  });
};
