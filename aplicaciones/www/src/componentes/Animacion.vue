<script setup lang="ts">
import { base } from '@/utilidades/ayudas';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  ruta: string;
  puntoA: number;
  puntoB: number;
  y: number;
  alto: number;
  sentido: 'derecha' | 'izquierda';
  invertir: boolean;
  velocidad: number;
}>();

const animacion = ref<HTMLImageElement | null>(null);

// Función para generar nombres únicos de animación
const nombreAnimacion = (ruta: string) => `animacion-${ruta.replace(/\W/g, '')}`;

const aplicarAnimacion = () => {
  const estilos = document.createElement('style');
  document.head.appendChild(estilos);

  const nombre = nombreAnimacion(props.ruta);

  const secuencia = `
    @keyframes ${nombre} {
      from { left: ${props.puntoA}px; }
      to { left: ${props.puntoB}px; }
    }
  `;
  estilos.sheet?.insertRule(secuencia, estilos.sheet.cssRules.length);

  if (animacion.value) {
    animacion.value.style.animation = `${nombre} ${props.velocidad}s linear infinite`;
  }
};

onMounted(() => aplicarAnimacion);
watch(() => props.ruta, aplicarAnimacion);
watch(() => props.puntoA, aplicarAnimacion);
watch(() => props.puntoB, aplicarAnimacion);
</script>

<template>
  <div class="animacion">
    <img
      ref="animacion"
      class="imagenAnimable"
      :key="ruta"
      :src="`${base}imagenes/animables/${ruta}`"
      :style="{
        left: `${puntoA}px`,
        top: `${y}px`,
        height: `${alto}px`,
        transform: `scale(${invertir ? -1 : 1}, 1)`,
      }"
    />
  </div>
</template>

<style lang="scss">
.imagenAnimable {
  display: block;
  position: absolute;
  z-index: 99;
}
</style>
