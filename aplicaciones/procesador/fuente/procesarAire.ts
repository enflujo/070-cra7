import { esFecha, esNumero, guardarJSON, mensajes, redondearDecimal } from './utilidades/ayudas';
import { getXlsxStream } from 'xlstream';
import { estructuras } from './aplicacion';
import type { Errata } from './tipos';
import { Aire, MedicionAire } from '@/tipos/compartidos';

export default async function procesarAire(): Promise<Aire> {
  const { aire } = estructuras;
  const ruta = `./datos/${aire.archivo}.xlsx`;
  const flujo = await getXlsxStream({
    filePath: ruta,
    sheet: aire.nombreHoja,
    withHeader: true,
    ignoreEmpty: true,
  });

  let numeroFila = 2;
  let primeraFilaProcesada = false;
  const errata: Errata[] = [];
  /**
   * ID,	time,	Fecha corta,
   * pm25,	ebc	np_NS,
   * DIA, UBICACIÓN,
   * MOVIMIENTO,	HORA DESDE,	HORA HASTA,
   * AUTOS,	BUS VERDE,	BUS AZUL,	BUS NARANJA,	BUS BLANCO,	DUALES,	BUS ROJO,	BUS AMARILLO,	BUS GRIS,
   * CAMION PEQUEÑO,	CAMION GRANDE,	MOTOS,	BICICLETAS,	TOTAL MIXTOS,	TOTAL PESADOS,
   * HORA,	ID_MEDICIÓN,	Lat,	Lon
   */
  return new Promise((resolver) => {
    const datos: Aire = {};

    flujo.on('data', async (obj) => {
      if (!primeraFilaProcesada) {
        // console.log(compararListas(Object.keys(raw.obj), ruido.llaves));
        primeraFilaProcesada = true;
      }

      const [
        id,
        fechaHora,
        fecha,
        pm25,
        ebc,
        npNS,
        dia,
        ubicacion,
        mov,
        horaA,
        horaB,
        autos,
        busVerde,
        busAzul,
        busNaranja,
        busBlanco,
        duales,
        busRojo,
        busAmarillo,
        busGris,
        camionPeq,
        comionGrande,
        motos,
        bici,
        totalMixtos,
        totalPesados,
        hora,
        idMed,
        lat,
        lon,
      ] = obj.formatted.arr;

      /** Iniciar objeto para guardar datos del punto */
      if (!datos[ubicacion]) {
        datos[ubicacion] = {
          promedios: {
            pm25: 0,
            ebc: 0,
            npNs: 0,
          },
          mediciones: [],
        };
      }

      if (fechaHora && esFecha(fechaHora)) {
        const mediciones: MedicionAire = [fechaHora, [null, null, null]];

        if (pm25) {
          if (esNumero(pm25)) {
            mediciones[1][0] = +pm25;
          } else {
            errata.push({ fila: numeroFila, error: `El valor de pm25 no es un número: ${pm25}` });
          }
        }

        if (ebc) {
          if (esNumero(ebc)) {
            mediciones[1][1] = +ebc;
          } else {
            errata.push({ fila: numeroFila, error: `El valor de ebc no es un número: ${ebc}` });
          }
        }

        if (npNS) {
          if (esNumero(npNS)) {
            mediciones[1][2] = +npNS;
          } else {
            errata.push({ fila: numeroFila, error: `El valor de np_NS no es un número: ${npNS}` });
          }
        }

        datos[ubicacion].mediciones.push(mediciones);
      } else {
        errata.push({ fila: numeroFila, error: `Esta fecha no es válida: ${fechaHora}` });
      }

      numeroFila++;
    });

    flujo.on('close', () => {
      if (errata.length) guardarJSON(errata, 'errataAmbiente');

      for (const nombrePunto in datos) {
        let sumaPm25 = 0;
        let totalMedicionesPm25 = 0;
        let sumaEbc = 0;
        let totalMedicionesEbc = 0;
        let sumaNpNs = 0;
        let totalMedicionesNpNs = 0;

        datos[nombrePunto].mediciones.forEach((medicion) => {
          const [pm25, ebc, npNS] = medicion[1];

          if (pm25) {
            sumaPm25 += pm25;
            totalMedicionesPm25++;
          }

          if (ebc) {
            sumaEbc += ebc;
            totalMedicionesEbc++;
          }

          if (npNS) {
            sumaNpNs += npNS;
            totalMedicionesNpNs++;
          }
        });

        datos[nombrePunto].promedios.pm25 = redondearDecimal(sumaPm25 / totalMedicionesPm25);
        datos[nombrePunto].promedios.ebc = redondearDecimal(sumaEbc / totalMedicionesEbc);
        datos[nombrePunto].promedios.npNs = redondearDecimal(sumaNpNs / totalMedicionesNpNs);
      }

      mensajes.exito(`Datos de Ambiente procesados`);
      resolver(datos);
    });

    flujo.on('error', (error) => {
      throw new Error(JSON.stringify(error, null, 2));
    });
  });
}
