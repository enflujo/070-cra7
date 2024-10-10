<script setup lang="ts">
import type { ElementoPaisaje } from '../tipos';
defineProps<ElementoPaisaje>();
</script>

<template>
  <div class="contenedorImg">
    <img :src="ruta" />

    <!--  <h2>{{ nombre }}</h2>
    <p>{{ descripcion }}</p> -->
  </div>
</template>

<style lang="scss" scoped>
.contenedorImg {
  max-width: 25vw;
  padding: 0em;
  position: absolute;
  top: 178px;
  img {
    width: 15%;
  }
}
</style>
