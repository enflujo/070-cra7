<script setup lang="ts">
import { base } from '@/utilidades/ayudas';
import { onMounted } from 'vue';

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

// Función para generar nombres únicos de animación
const nombreAnimacion = (ruta: string) => `animacion-${ruta.replace(/\W/g, '')}`;

onMounted(() => {
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
});
</script>

<template>
  <div class="animacion">
    <img
      class="imagenAnimable"
      :key="ruta"
      :src="`${base}imagenes/animables/${ruta}`"
      :style="{
        left: `${puntoA}px`,
        top: `${y}px`,
        height: `${alto}px`,
        transform: `scale(${invertir ? -1 : 1}, 1)`,
        animation: `${nombreAnimacion(ruta)} ${velocidad}s linear infinite`,
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
