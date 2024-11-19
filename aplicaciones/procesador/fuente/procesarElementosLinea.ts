import { getXlsxStream } from 'xlstream';
import { estructuras } from './aplicacion';
import slugificar from 'slug';
import type { Aire, Punto } from '@/tipos/compartidos';
import type { Errata } from './tipos';
import { esNumero, mensajes } from './utilidades/ayudas';

export default async (puntos: Punto[], aire: Aire): Promise<Punto[]> => {
  const { linea } = estructuras;
  const ruta = `./datos/${linea.archivo}.xlsx`;
  const flujo = await getXlsxStream({
    filePath: ruta,
    sheet: linea.nombreHoja,
    withHeader: true,
    ignoreEmpty: true,
  });

  let numeroFila = 2;
  let primeraFilaProcesada = false;

  return new Promise((resolver) => {
    const errata: Errata[] = [];

    flujo.on('data', async (obj) => {
      if (!primeraFilaProcesada) {
        // console.log(compararListas(Object.keys(raw.obj), ruido.llaves));
        primeraFilaProcesada = true;
      }

      const { nombre, latitud, longitud, puntoRuido, ilustracion, idAire, txtPajaros, perfil, podcast } =
        obj.formatted.obj;

      const slug = slugificar(nombre);
      const punto = puntos.find((punto) => punto.slug == slug);

      if (punto) {
        /** Registrar ID de ruido para los puntos que tienen datos. Campo relacional con ruido.json */
        if (puntoRuido && esNumero(puntoRuido)) {
          punto.idRuido = `${puntoRuido}`;
        }

        /** Referencia a las ilustraciones que van en los puntos que tienen una. */
        if (ilustracion) {
          const nombres = ilustracion.split(';');

          if (nombres.length) {
            punto.ilustraciones = nombres;
          } else {
            errata.push({ fila: numeroFila, error: `Problema con los nombres de ilustraciones, revisar esta celda` });
          }
        }

        /** Podcast */
        if (podcast) {
          punto.podcast = podcast.trim();
        }

        /** Perfil */
        if (perfil) {
          punto.perfil = perfil.trim();
        }

        if (idAire) {
          if (aire[idAire]) {
            punto.idAire = idAire;
          } else {
            errata.push({ fila: numeroFila, error: `El punto ${idAire} no existe en los datos de aire` });
          }
        }

        /** Texto sobre pájaros */
        if (txtPajaros) {
          punto.txtPajaros = txtPajaros;
        }

        /** Coordenadas de los puntos */
        if (latitud && longitud && esNumero(latitud) && esNumero(longitud)) {
          punto.lat = latitud;
          punto.lon = longitud;
        } else {
          errata.push({
            fila: numeroFila,
            error: `Problema con los valores de coordenadas, puede ser que no hay o no son números.`,
          });
        }
      } else {
        errata.push({ fila: numeroFila, error: `No hay punto con slug: ${slug} para guardar datos` });
      }

      // const fila = obj.formatted.arr;
      // const id = fila[0];
      // const ilustraciones = obj[16];
      // const podcasts = obj[14];
      // const perfiles = obj[15];
      // const textos = obj[16];

      // let filaProcesada: ElementosPorPunto = {};
      // const ilustracionesProcesadas = ilustraciones.split(';').map((ilustracion: string) => {
      //   return { ruta: ilustracion, nombre: ilustracion };
      // });
      // const podcastsProcesados = podcasts.split(';').map((podcast: string) => {
      //   return { ruta: podcast, nombre: podcast };
      // });
      // const perfilesProcesados = perfiles.split(';').map((perfil: string) => {
      //   return { ruta: perfil, nombre: perfil };
      // });
      // const textosProcesados = textos.split(';').map((texto: string) => {
      //   return { texto: texto, categoria: texto };
      // });

      // elementosProcesados[id] = {
      //   ilustraciones: ilustracionesProcesadas,
      //   podcast: podcastsProcesados,
      //   perfiles: perfilesProcesados,
      //   textos: textosProcesados,
      // };

      numeroFila++;
    });

    flujo.on('close', () => {
      /*  if (errataRuido.length) guardarJSON(errataRuido, 'errataRuido');

      for (const idPunto in ruidoProcesados) {
        ruidoProcesados[idPunto].promedio[2] = ruidoProcesados[idPunto].mediciones.length;

        const suma = ruidoProcesados[idPunto].mediciones.reduce((acumulado, actual) => {
          return actual[1] ? acumulado + actual[1] : acumulado;
        }, 0);

        ruidoProcesados[idPunto].promedio[1] = redondearDecimal(suma);
        ruidoProcesados[idPunto].promedio[0] = redondearDecimal(suma / ruidoProcesados[idPunto].promedio[2]);
      }

      // mensajes.exito(`Datos de medios procesados`);
      resolver(ruidoProcesados); */
      mensajes.exito('Datos de Linea procesados');
      resolver(puntos);
    });

    flujo.on('error', (error) => {
      throw new Error(JSON.stringify(error, null, 2));
    });
  });
};
