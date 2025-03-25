<script setup lang="ts">
import Animacion from '@/componentes/Animacion.vue';
import { Punto } from '@/tipos/compartidos';
import { computed } from 'vue';

const props = defineProps<{
  puntos: Punto[];
  anchoContenedor: number;
  dims: { calle: number; fondo: number };
}>();

const xMinCarros = computed(() =>
  props.puntos.length ? ((props.puntos[2].ubicacionX || 0) / 100) * props.anchoContenedor : 0
);
</script>

<template>
  <div id="animacionesCalle" :style="{ top: `${dims.fondo}px` }">
    <Animacion
      ruta="septimazo-bici2.webp"
      idAnim="bici1"
      :puntoA="0"
      :puntoB="anchoContenedor"
      :y="-20"
      :alto="50"
      sentido="izquierda"
      :invertir="true"
      :velocidad="1500"
    />

    <Animacion
      ruta="septimazo-bici.webp"
      idAnim="bici2"
      :puntoA="0"
      :puntoB="anchoContenedor"
      :y="dims.calle - 90"
      :alto="70"
      sentido="derecha"
      :invertir="false"
      :velocidad="1000"
    />

    <Animacion
      ruta="septimazo-ambulancia.webp"
      idAnim="ambulancia"
      :puntoA="anchoContenedor - 300"
      :puntoB="xMinCarros"
      :y="dims.calle - 100"
      :alto="50"
      sentido="izquierda"
      :invertir="false"
      :velocidad="300"
    />

    <Animacion
      ruta="septimazo-basura.webp"
      idAnim="basura"
      :puntoA="anchoContenedor - 300"
      :puntoB="xMinCarros"
      :y="dims.calle - 150"
      :alto="100"
      sentido="izquierda"
      :invertir="false"
      :velocidad="500"
    />

    <Animacion
      ruta="septimazo-bus1.webp"
      idAnim="bus1"
      :puntoA="anchoContenedor - 100"
      :puntoB="xMinCarros"
      :y="dims.calle - 180"
      :alto="150"
      sentido="izquierda"
      :invertir="false"
      :velocidad="400"
    />

    <Animacion
      ruta="septimazo-bus2.webp"
      idAnim="bus2"
      :puntoA="xMinCarros"
      :puntoB="anchoContenedor - 100"
      :y="dims.calle - 150"
      :alto="150"
      sentido="izquierda"
      :invertir="true"
      :velocidad="400"
    />

    <Animacion
      ruta="septimazo-bus3.webp"
      idAnim="bus3"
      :puntoA="xMinCarros * 2"
      :puntoB="anchoContenedor - 100"
      :y="dims.calle - 150"
      :alto="150"
      sentido="izquierda"
      :invertir="true"
      :velocidad="300"
    />
  </div>
</template>
