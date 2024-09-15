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

## Habitabilidad y sus dominios

### Calles ZAT 7ma

Contiene información sobre el índice de habitabilidad y los dominios de movilidad, ambiente e infraestructura pública y social para cada ZAT (la unidad de análisis espacial de la información).

| Columna                          | Descripción                                                           |
| -------------------------------- | --------------------------------------------------------------------- |
| ZAT                              | el número de la ZAT.                                                  |
| Longitud, latitud                | georreferenciación de la ZAT.                                         |
| Costado                          | costado de la carrera séptima en el cual se encuentra ubicada la ZAT. |
| Calle sur                        | calle que limita la ZAT en el sur del área de delimitación.           |
| Calle norte                      | calle que limita la ZAT en el norte del área de delimitación.         |
| Movilidad                        | valor del dominio de movilidad para esa ZAT.                          |
| Ambiente                         | valor del dominio de ambiente para esa ZAT.                           |
| Infraestructura pública y social | valor de este dominio para esa ZAT.                                   |
| Habitabilidad                    | valor del índice de habitabilidad para esa ZAT.                       |

## Encuesta CIVICA

- Codebook CIVICA Hogares 2024: es el diccionario de la base de datos cruda del proyecto. En este pueden observar las preguntas para las cuales se hicieron los análisis del siguiente Excel.
- CIVICA Hogares 2024 Tabla Descriptivos Población Estudio: se observan las estadísticas descriptivas para la población de la Carrera Séptima para cada una de las preguntas de la encuesta a hogares. Cada pestaña contiene información sobre un módulo para cada una de las preguntas que se encuentran en el codebook para la Carrera Séptima en general y a nivel de Tramo (Centro, Chapinero y Usaquén).

## Movilidad

- CIVICA-Movilidad: Presentación con resultados preliminares del proyecto en términos de movilidad. Experto señala que algo importante a resaltar es que hay diferencias espaciales en términos de la hora en la que se observa un máximo de conteo de aforos y que si bien pasan más autos que buses en las intersecciones aforadas, en materia de pasajeros los buses movilizan más pasajeros que los vehículos particulares.
- 070 aforos: Excel que presenta información sobre intersecciones en las que se hicieron conteos vehiculares entre semana. La descripción de la base de datos la encuentran en la pestaña descripción del archivo Excel.

## Avifauna

Base de datos avistamiento de aves: esta base contiene la información recolectada en el componente de avifauna del proyecto. Te envío un párrafo que me compartieron explicando la relevancia de este componente:

“El monitoreo de diversidad en avifauna es relevante para determinar la salud de los ecosistemas. Las aves tienen un amplio rango de distribución y la capacidad de movilización entre diferentes hábitats de un ecosistema o incluso movilización entre ecosistemas, como en el caso del bosque alto andino y el entorno urbano, esta característica funciona para los estudios ecosistémicos ya que permite relacionar la actividad urbana y la salud de ecosistemas aledaños. Las aves ocupan una amplia variedad de nichos ecológicos como la dispersión de semillas, control poblacional de pequeños invertebrados, reptiles y mamíferos e incluso son de gran importancia en la cadena trófica de diferentes ecosistemas, lo que contribuye a una dinámica ecosistémica saludable. Por esto, las aves son sensibles a los cambios en la cadena trófica y a la concentración de contaminantes ambientales, como el ruido, la polución y las especies invasoras, alterando sus hábitats, nichos y dinámicas poblacionales. Adicional son fáciles y prácticas para ser observadas en su hábitat. Las aves indican su presencia al cantar, adicionalmente los hábitos diurnos de algunas especies facilitan su observación. Además, la clasificación taxonómica y la caracterización de especies facilitan su identificación en los avistamientos; como por ejemplo patrones de plumaje, morfología del pico, canto, entre otras.”

Esta base contiene varias pestañas. Envío la descripción de cada una:

- Especies y su importancia ecológica: en este se clasifican las especies indicadoras como indicadoras de deterioro o salud ecosistémica, exóticas (fueron introducidas de otros países y lograron adaptarse, ejemplo (Columba livia=paloma común son procedentes de Europa, llegaron en los barcos españoles o los gansos introducidos a Colombia como mascotas)), o migratorias (migratorias boreales donde las aves migrantes desde estados unidos al trópico en época invernal, en búsqueda de habitats con disponibilidad de alimento). A su vez están clasificados donde se pueden encontrar fotos y su fuente y los audios del canto con su fuente. Si necesitan fotos u audios déjenmelo saber.
- Individuos: en esta pestaña, se muestran tres tablas por tramo, donde N es el número de aves observadas y spp es el número de especies por punto. El total de especies no es la sumatoria de cada punto, ya que varias aves de la misma especie se observaron en diferentes puntos, por ellos la siguiente pestaña,
- Especies: se muestran las especies observadas por tramo y el total de especies en el corredor. También el N de cada especie por tramo.
- Las pestañas de consolidados, son las mismas tablas de la pestaña Especies pero se les realizó el cálculo de abundancia relativa para saber qué porcentaje de la población estudiada ocupaba cada especie.
- La descripción de cada punto menciona las especies encontradas, cuántos individuos de cada especie, con su nombre común, familia (clasificación taxonómica) y nombres científicos. A su vez se ve el grupo etario en el que fueron observados (pichón, juvenil, adulto) el sexo en especies con dimorfismo sexual (diferencias observables entre sexos), clasificación entre migratoria, residente y exótica, clasificación por su comportamiento solitario o gregario (que andan en "manada") y por último, el lugar y hora de avistamiento.

## Calidad de aire y ruido

- 20240723_AnalisisCorredor7ma_Paper: Presentación con resultados preliminares del proyecto. Experta menciona que algunos resultados preliminares importantes a presentar son los que se encuentran en la diapositiva 12 y 15 de esta presentación.
- Móviles_156Segmentos: se hicieron recorridos en bicicleta y caminando midiendo la contaminación del aire en la Carrera Séptima. La Carrera Séptima se separó en 156 segmentos de acuerdo con las cuadras y se sacaron estadísticas descriptivas sobre las mediciones que se hicieron en los recorridos en esos segmentos. La base contiene información para cada uno de estos segmentos de:

| Columna                             | Descripción                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OBJECTID                            | señala el número del segmento.                                                                                                                                                                                                                                                                                                                                   |
| Longitud_X, Latitud_Y               | georreferenciación de los segmentos.                                                                                                                                                                                                                                                                                                                             |
| Name                                | indica la cuadra sobre la cual está la medición.                                                                                                                                                                                                                                                                                                                 |
| MIN, MAX, MEAN, MEDIAN PM2.5 BICI   | cada columna tiene una estadística descriptiva de los registros de PM2.5 para las mediciones de las personas que utilizaron bicicleta sobre la Carrera Séptima. Experta sugiere graficar la media para poder contrastar con las indicaciones de los máximos niveles recomendados por la OMS. Min-max si se quieren ver valles y picos de contaminación.          |
| MIN, MAX, MEAN, MEDIAN eBC BICI     | cada columna tiene una estadística descriptiva de los registros de Carbono Negro para las mediciones de las personas que utilizaron bicicleta sobre la Carrera Séptima. Experta sugiere graficar la media para poder contrastar con las indicaciones de los máximos niveles recomendados por la OMS. Min-max si se quieren ver valles y picos de contaminación.  |
| MIN, MAX, MEAN, MEDIAN Np BICI      | cada columna tiene una estadística descriptiva de los registros de Nanopartículas para las mediciones de las personas que utilizaron bicicleta sobre la Carrera Séptima. Experta sugiere graficar la media para poder contrastar con las indicaciones de los máximos niveles recomendados por la OMS. Min-max si se quieren ver valles y picos de contaminación. |
| MIN, MAX, MEAN, MEDIAN PM2.5 Peatón | cada columna tiene una estadística descriptiva de los registros de PM2.5 para las mediciones de las personas que caminaron sobre la Carrera Séptima. Experta sugiere graficar la media para poder contrastar con las indicaciones de los máximos niveles recomendados por la OMS. Min-max si se quieren ver valles y picos de contaminación.                     |
| MIN, MAX, MEAN, MEDIAN eBC Peatón   | cada columna tiene una estadística descriptiva de los registros de Carbono Negro para las mediciones de las personas que caminaron sobre la Carrera Séptima. Experta sugiere graficar la media para poder contrastar con las indicaciones de los máximos niveles recomendados por la OMS. Min-max si se quieren ver valles y picos de contaminación.             |
| MIN, MAX, MEAN, MEDIAN Np BICI      | cada columna tiene una estadística descriptiva de los registros de Nanopartículas para las mediciones de las personas que caminaron sobre la Carrera Séptima. Experta sugiere graficar la media para poder contrastar con las indicaciones de los máximos niveles recomendados por la OMS. Min-max si se quieren ver valles y picos de contaminación.            |

## Puntos Fijos_5 min

Se hicieron mediciones de la contaminación del aire, específicamente se envía mediciones de carbono negro dado que experta menciona que es mejor presentar esta información, en 8 paraderos de transporte público de la Carrera Séptima cada 5 minutos. Cada observación (fila de la base de datos) contiene información de:

### Hoja _Sheet1_

| Columna                                                                                                                             | Descripción                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| UBICACIÓN                                                                                                                           | la ubicación de la estación en la que se tomó la medición.                              |
| DIA                                                                                                                                 | día en el que se tomó la medición.                                                      |
| Time                                                                                                                                | fecha y hora en la que se inició la medición.                                           |
| Fecha corta                                                                                                                         | fecha en la que se tomó medición.                                                       |
| Pm2.5                                                                                                                               | medición de pm 2.5.                                                                     |
| Np_NS                                                                                                                               | medición de nanopartículas.                                                             |
| Ebc                                                                                                                                 | medición de carbono negro.                                                              |
| Autos, bus verde, bus azul, bus naranja, bus blanco, duales, bus rojos, bus grises, bus Amarillo, camión pequeño, motos, bicicletas | número de vehículos que se contaron en esos 5 minutos que atravesaron esa intersección. |
| Total mixtos, total pesados                                                                                                         | total de vehículos mixtos y pesados contados en esos 5 minutos.                         |

### Hoja _Hoja1_

Para cada uno de los 8 paraderos contiene información del promedio de pm2.5, ebc y np.

| Columna           | Descripción          |
| ----------------- | -------------------- |
| UBICACIÓN         | Nombre del paradero. |
| Promedio de pm25  | Promedio de pm2.5    |
| Promedio de ebc   | Promedio de ebc      |
| Promedio de np_NS | Promedio de np_NS    |

## Ruido_10 sec

Se hicieron mediciones de ruido en 6 paraderos de transporte público de la Carrera Séptima cada 10 segundos en dos jornadas (mañana o tarde). La base contiene información de:

### Hoja _Sheet1_

| Columna               | Descripción                                                                                                                                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                    | identificador único de cada medición: 10 segundos en fecha específica de paradero de transporte público.                                                                                                                                                                           |
| Timestamp             | fecha y hora de la medición de niveles de ruido.                                                                                                                                                                                                                                   |
| Leq-1                 | contiene los niveles intermedios de ruido en esos 10 segundos de medición. Con este dato la experta menciona se puede comparar con la normativa de un máximo de 80db. En promedio se observó que los niveles de ruido son cercanos a 80db pero no superaron la normativa nacional. |
| Lmax                  | contiene los niveles máximos de ruido captados en esos 10 segundos de medición.                                                                                                                                                                                                    |
| Punto muestreado      | indica el número de paradero en el cual se tomó la información.                                                                                                                                                                                                                    |
| Name                  | indica la dirección del paradero en el que se tomó la medición.                                                                                                                                                                                                                    |
| Jornada               | indica si la información fue captada en la mañana o en la tarde.                                                                                                                                                                                                                   |
| Date                  | indica la fecha en la que se tomó la medición.                                                                                                                                                                                                                                     |
| Longitud_X, Latitud_Y | georreferenciación de los segmentos.                                                                                                                                                                                                                                               |
|                       |                                                                                                                                                                                                                                                                                    |

### Hoja _Hoja1_

Para cada uno de los 6 paraderos contiene información del promedio de Leq-1 y Lmax ese paradero.
