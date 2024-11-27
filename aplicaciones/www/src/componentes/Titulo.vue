<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';

const contenedorTitulo: Ref<HTMLDivElement | undefined> = ref();

onMounted(async () => {
  if (!contenedorTitulo.value) return;

  // let listaLaFuente = await document.fonts.ready;

  const texto = new Blotter.Text('SIETE', {
    family: 'Rubik Bubbles',
    size: 210,
    fill: '#F3D78E',
  });

  const punto = new Blotter.Text('.', {
    family: 'Rubik Bubbles',
    size: 160,
    fill: '#F3D78E',
  });

  const globo = new Blotter.Text('°', {
    family: 'Rubik Bubbles',
    size: 170,
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
  <div id="contenedorTitulo" ref="contenedorTitulo">
    <span class="texto">VEINTICUATRO</span>
  </div>
</template>

<style lang="scss" scoped>
#contenedorTitulo {
  display: block;
  margin-left: 25vw;
  position: absolute;
  text-align: center;
  top: 0;
  z-index: 9;
}
body {
  background-color: #7acf9c;
}

.texto {
  font-family: 'Rubik Bubbles', system-ui;
  font-weight: 370;
  font-style: normal;
  font-size: 110px;
  display: block;
  text-align: center;
  color: #f3d78e;
  line-height: 0em;
  margin-top: 0.8em;
}

.enflujito {
  height: 200px;
  position: fixed;
}

canvas {
  margin: 0 auto;
}
</style>
