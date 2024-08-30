// Los elementos son: podcast, personaje y texto
export interface ElementoPaisaje {
  nombre: string;
  descripcion: string;
  // POR HACER: definir formato de ubicación
  ubicacion: number;
  ruta?: string;
}

export interface FichaIndicador {
  nombre: string;
  descripcion: string;
  unidadMedida: string;
}
