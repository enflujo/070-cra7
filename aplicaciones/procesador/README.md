# Procesador de datos

Esta aplicación se encarga de procesar los datos y exporta archivos `.json` a la aplicación **www**

## Indicadores

Hay dos tipos, unos generales que se pueden observar a lo largo de la séptima como índices: escala 0-1, y otros que se muestran en algunos puntos de la ciudad.

### Generales / por índices

- [x] Ambiente (fuente: ZAT)
- [x] Habitabilidad (fuente: ZAT)
- [x] Infraestructura pública y social (fuente: ZAT)
- [x] Movilidad (fuente: ZAT)
- [x] Proximidad (fuente: ZAT)
- [ ] Caminabilidad
- [x] Seguridad (fuente: Datos A)
- [ ] PD
- [ ] Salud

### Por puntos

Estos tienen estructuras diferentes entre sí.

Hay también datos 💬 Cualitativos y 📈 Cuantitativos

- [x] 📈 Ruido (fuente: Ruido)
- [ ] 📈 Calidad aire
- [ ] 💬 Calidad aire
- [ ] 💬 Pájaros
- [ ] 💬 Basuras
- [ ] 📈 Ciudad 15 minutos
- [ ] 💬 Flujo de peatones
- [ ] 💬 Salud

## Fuentes

Estas son las fuentes de datos que se usan y que se exporta de cada una, están ubicadas en archivos `.xlsx` en la carpeta `./datos`:

### Ruido

Todas las muestras de ruido que se tomaron.

Archivo: **Ruido_10 sec.xlsx**

Exporta `ruido.json`

### Datos A

Archivo: **Mapa 7ma - Datos CEPER puntos primera capa.xlsx**

Exporta `puntos.json`

### ZAT

Archivo: **Calles ZAT 7ma v3.xlsx**

Exporta `puntos.json`
