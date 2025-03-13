<script setup lang="ts">
import { onMounted, onUnmounted, type Ref, ref } from 'vue';

const contenedorTitulo: Ref<HTMLDivElement | undefined> = ref();
const tituloVisible = ref(true);
const animaciones: any[] = []; // Blotter no tiene tipos.
let reproduciendo = true;

const eventoPosicionX = () => {
  if (window.scrollX > 100) {
    tituloVisible.value = false;
    animaciones.forEach((animacion) => animacion.stop());
    reproduciendo = false;
  } else {
    if (reproduciendo) return;
    tituloVisible.value = true;
    animaciones.forEach((animacion) => animacion.start());
  }
};

onMounted(async () => {
  if (!contenedorTitulo.value) return;

  await document.fonts.ready;

  const configuracion = {
    family: 'Rubik Bubbles',
    size: screen.width * 0.1,
    fill: '#F3D78E',
  };

  const material = new Blotter.LiquidDistortMaterial();
  material.uniforms.uSpeed.value = 0.5;
  material.uniforms.uVolatility.value = 0.03;

  const sieteTexto = new Blotter.Text('SIETE', {
    ...configuracion,
    size: screen.width > 767 ? screen.width * 0.12 : screen.width * 0.27,
  });
  const siete = new Blotter(material, { texts: sieteTexto });
  const sieteObj = siete.forText(sieteTexto);

  const puntoTexto = new Blotter.Text('.', configuracion);
  const punto = new Blotter(material, { texts: puntoTexto });
  const puntoObj = punto.forText(puntoTexto);

  const burbujaTexto = new Blotter.Text('°', configuracion);
  const burbuja = new Blotter(material, { texts: burbujaTexto });
  const burbujaObj = burbuja.forText(burbujaTexto);

  sieteObj.domElement.className = 'enflujito';
  puntoObj.domElement.className = 'enflujito';
  burbujaObj.domElement.className = 'enflujito';

  sieteObj.appendTo(contenedorTitulo.value);
  puntoObj.appendTo(contenedorTitulo.value);
  burbujaObj.appendTo(contenedorTitulo.value);

  animaciones.push(siete, punto, burbuja);

  window.addEventListener('scroll', eventoPosicionX);
});

onUnmounted(() => {
  window.removeEventListener('scroll', eventoPosicionX);
});
</script>

<template>
  <div ref="contenedorTitulo" id="contenedorTitulo" :class="{ visible: tituloVisible, sinEvento: true }">
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
  pointer-events: none;

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
