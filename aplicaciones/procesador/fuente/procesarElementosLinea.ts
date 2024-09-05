import { getXlsxStream } from 'xlstream';
import { estructuras } from './aplicacion';
import { guardarJSON, mensajes } from './utilidades/ayudas';
import slugificar from 'slug';
import { ElementosPorPunto } from '@/tipos/compartidos';

export default async (): Promise<{ puntos: string[] }> => {
  const ruta = `./datos/datos_elementos_linea.xlsx`;
  const flujo = await getXlsxStream({
    filePath: ruta,
    sheet: 'cuatro Cuadras',
    withHeader: false,
    ignoreEmpty: true,
  });

  let numeroFila = 2;
  let primeraFilaProcesada = false;

  return new Promise((resolver) => {
    const elementosProcesados: ElementosPorPunto = {};

    flujo.on('data', async (obj) => {
      if (!primeraFilaProcesada) {
        // console.log(compararListas(Object.keys(raw.obj), ruido.llaves));
        primeraFilaProcesada = true;
      }

      const fila = obj.formatted.arr;
      const id = fila[0];
      const ilustraciones = obj[16];
      const podcasts = obj[14];
      const perfiles = obj[15];
      const textos = obj[16];

      let filaProcesada: ElementosPorPunto = {};
      const ilustracionesProcesadas = ilustraciones.split(';').map((ilustracion: string) => {
        return { ruta: ilustracion, nombre: ilustracion };
      });
      const podcastsProcesados = podcasts.split(';').map((podcast: string) => {
        return { ruta: podcast, nombre: podcast };
      });
      const perfilesProcesados = perfiles.split(';').map((perfil: string) => {
        return { ruta: perfil, nombre: perfil };
      });
      const textosProcesados = textos.split(';').map((texto: string) => {
        return { texto: texto, categoria: texto };
      });

      elementosProcesados[id] = {
        ilustraciones: ilustracionesProcesadas,
        podcast: podcastsProcesados,
        perfiles: perfilesProcesados,
        textos: textosProcesados,
      };

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

      mensajes.exito(`Datos de medios procesados`);
      resolver(ruidoProcesados); */
    });

    flujo.on('error', (error) => {
      throw new Error(JSON.stringify(error, null, 2));
    });
  });
};
