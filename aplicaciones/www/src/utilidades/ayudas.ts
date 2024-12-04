export const gradosARadianes = (grados: number) => grados * (Math.PI / 180);

/**
 * Calcula distancia en kilómetros entre dos puntos/coordenadas.
 *
 * @param lat1 Latitud del punto 1.
 * @param lon1 Longitud del punto 1.
 * @param lat2 Latitud del punto 2.
 * @param lon2 Longitud del punto 2.
 * @returns Distancia en kilómetros entre los dos puntos.
 */
export const distanciaEntreCoordenadas = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  // Radio del planeta en KM
  const radio = 6371;
  const dLat = gradosARadianes(lat2 - lat1);
  const dLon = gradosARadianes(lon2 - lon1);
  const centroLat = dLat / 2;
  const centroLon = dLon / 2;
  const a =
    Math.sin(centroLat) * Math.sin(centroLat) +
    Math.cos(gradosARadianes(lat1)) * Math.cos(gradosARadianes(lat2)) * Math.sin(centroLon) * Math.sin(centroLon);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radio * c;
};

export function convertirEscala(
  valor: number,
  escalaBaseMin: number,
  escalaBaseMax: number,
  escalaDestinoMin: number,
  escalaDestinoMax: number
): number {
  return (
    ((valor - escalaBaseMin) * (escalaDestinoMax - escalaDestinoMin)) / (escalaBaseMax - escalaBaseMin) +
    escalaDestinoMin
  );
}

export const base = import.meta.env.BASE_URL;
