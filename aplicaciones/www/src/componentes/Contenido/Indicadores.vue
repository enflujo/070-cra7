<template>
  <div id="etiquetas">
    <h2>Conceptos - definiciones</h2>

    <h3>Habitabilidad</h3>

    <p class="infoIndicador">
      Un lugar habitable debería ser seguro, sin contaminación, con espacios públicos abiertos, transporte y vivienda
      asequible, y donde se pueda caminar y andar en bicicleta agradablemente y sin peligro. Además, debería estar cerca
      de servicios básicos como salud, educación, cultura, recreación y comercio.
    </p>

    <p>
      Nuestro indicador de <span class="resaltar subrayar">habitabilidad</span> se mide en una escala de
      <span class="punto puntoNegativo">0</span> a <span class="punto puntoPositivo">1</span>, donde 1 representa la
      mejor habitabilidad. Está compuesto por cinco dominios, desde qué tan sencillo es moverse, hasta la facilidad de
      acceso a infraestructura o empleo. Cada dominio también se mide en una escala de 0 a 1.
    </p>

    <div id="escalaColores">
      <span class="positivo">0</span><span>0.25</span><span>0.50</span><span>0.75</span>
      <span class="positivo">1</span>
    </div>

    <p class="infoIndicador">
      <span id="etiqAmbiente" class="etiquetaDatos">Ambiente:</span> Un lugar habitable debe tener poca o ninguna
      contaminación del aire, con espacios de encuentro, zonas verdes, parques, y plazoletas con muchos árboles.
    </p>

    <p class="infoIndicador">
      <span id="etiqMovilidad" class="etiquetaDatos">Movilidad:</span> Un lugar habitable debe permitir desplazamientos
      seguros, asequibles y eficientes, reduciendo siniestros y congestión. Fortalecer el transporte público mejora el
      acceso a oportunidades y servicios ofrecidos por la ciudad, promoviendo la equidad social.
    </p>

    <p class="infoIndicador">
      <span id="etiqAccesibilidad" class="etiquetaDatos">Vivienda y empleo:</span> Un lugar habitable debe garantizar el
      acceso a vivienda y empleo. Esto incluye reducir el déficit de servicios públicos y considerar el valor del suelo,
      la educación de la población y la relación en la zona entre la densidad poblacional y la oferta laboral.
    </p>

    <p class="infoIndicador">
      <span id="etiqSeguridad" class="etiquetaDatos">Seguridad:</span>Un lugar habitable debe asegurar espacios públicos
      seguros para todos, sin importar edad, género o condición social. Esto implica reducir el número de delitos, y
      contar con CAIs, cámaras y buena iluminación.
    </p>

    <p class="infoIndicador">
      <span id="etiqInfraestructura" class="etiquetaDatos">Infraestructura:</span> Un lugar habitable debe contar con
      infraestructura de calidad que promueva el acceso cercano a oportunidades y servicios básicos. Además, debe
      incentivar la caminata y el uso de la bicicleta.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.tituloContenido {
  display: inline-flex;
  align-items: center;

  .iconoFicha {
    margin-right: 1em;
    background: transparent;
  }
}

#etiquetas {
  display: flex;
  flex-direction: column;
}

.etiquetaDatos {
  margin: 0;
  font-weight: bold;
}

.punto {
  &::before {
    content: ' ';
    display: inline-block;
    vertical-align: center;
    width: 0.85em;
    height: 0.85em;
    margin-right: 2px;
  }

  &.puntoPositivo {
    &::before {
      background-color: var(--verde);
    }
  }
  &.puntoNegativo {
    &::before {
      background-color: var(--rojo);
    }
  }
}

#escalaColores {
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0;
  background: rgb(0, 255, 0);
  background: linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(0, 255, 0, 1) 100%);
  font-size: 0.75em;

  span {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 2px;
  }
}
</style>
