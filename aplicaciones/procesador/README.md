# Procesador de datos

Esta aplicación se encarga de procesar los datos y exporta archivos `.json` a la aplicación **www.**

## Fuentes

Estas son las fuentes de datos que se usan y que se exporta de cada una, están ubicadas en archivos `.xlsx` en la carpeta `./datos`:

### Ruido

Archivo: **Ruido_10 sec.xlsx**

### Datos A

Archivo: **Mapa 7ma - Datos CEPER puntos primera capa.xlsx**

Exporta `puntos.json`

```ts
interface Punto {
  id: string;
  nombre: string;
  slug: string;
}
```
