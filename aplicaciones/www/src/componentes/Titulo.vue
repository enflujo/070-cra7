<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';

const contenedorTitulo: Ref<HTMLDivElement | undefined> = ref();

onMounted(async () => {
  if (!contenedorTitulo.value) return;

  await document.fonts.ready;

  const texto = new Blotter.Text('SIETE', {
    family: 'Rubik Bubbles',
    size: screen.width > 767 ? screen.width * 0.12 : screen.width * 0.27,
    fill: '#F3D78E',
  });

  const punto = new Blotter.Text('.', {
    family: 'Rubik Bubbles',
    size: screen.width * 0.1,
    fill: '#F3D78E',
  });

  const globo = new Blotter.Text('°', {
    family: 'Rubik Bubbles',
    size: screen.width * 0.1,
    fill: '#F3D78E',
  });

  const material = new Blotter.LiquidDistortMaterial();
  material.uniforms.uSpeed.value = 0.5;
  material.uniforms.uVolatility.value = 0.03;

  const textico = new Blotter(material, { texts: texto });
  const objeto = textico.forText(texto);

  const texticoP = new Blotter(material, { texts: punto });
  const objetoP = texticoP.forText(punto);

  const texticoG = new Blotter(material, { texts: globo });
  const objetoG = texticoG.forText(globo);

  objeto.domElement.className = 'enflujito';
  objetoP.domElement.className = 'enflujito';
  objetoG.domElement.className = 'enflujito';

  objeto.appendTo(contenedorTitulo.value);
  objetoP.appendTo(contenedorTitulo.value);
  objetoG.appendTo(contenedorTitulo.value);
});
</script>

<template>
  <div id="contenedorTitulo" class="sinEventos" ref="contenedorTitulo">
    <span class="texto">VEINTICUATRO</span>
  </div>
</template>

<style lang="scss" scoped>
@use '../scss/constantes' as *;

body {
  background-color: #7acf9c;
}

#contenedorTitulo {
  display: block;
  margin-left: 1vw;
  position: absolute;
  text-align: center;
  top: 0;
  z-index: 9;
  width: 100vw;
}

.texto {
  font-family: 'Rubik Bubbles', system-ui;
  font-weight: 370;
  font-style: normal;
  font-size: 11vw;
  display: block;
  text-align: center;
  color: #f3d78e;
  line-height: 0em;
  margin-top: 1.5em;
  text-shadow: 2px 2px 4px #111111;
}

.enflujito {
  height: 200px;
  position: fixed;
  pointer-events: none;
}

canvas {
  margin: 0 auto;
}

@media screen and (min-width: $minTablet) {
  #contenedorTitulo {
    margin-left: 0vw;
  }
  .texto {
    font-size: 110px;
    margin-top: 0.8em;
  }
}
</style>
