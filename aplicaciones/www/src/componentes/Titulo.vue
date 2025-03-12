<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';

const contenedorTitulo: Ref<HTMLDivElement | undefined> = ref();

onMounted(async () => {
  if (!contenedorTitulo.value) return;

  await document.fonts.ready;
  const configuracion = {
    family: 'Rubik Bubbles',
    size: screen.width * 0.1,
    fill: '#F3D78E',
  };

  const texto = new Blotter.Text('SIETE', {
    ...configuracion,
    size: screen.width > 767 ? screen.width * 0.12 : screen.width * 0.27,
  });

  const punto = new Blotter.Text('.', configuracion);
  const globo = new Blotter.Text('°', configuracion);

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
  <div ref="contenedorTitulo" id="contenedorTitulo" class="sinEventos">
    <span class="texto">VEINTICUATRO</span>
  </div>
</template>

<style lang="scss" scoped>
@use '../scss/constantes' as *;

#contenedorTitulo {
  display: block;
  position: absolute;
  text-align: center;
  top: 0;
  z-index: 9;
  width: 100vw;
  transition: all 0.5s;
  opacity: 0;

  &.visible {
    opacity: 1;
  }
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
