<script setup lang="ts">
import type { ElementoPaisaje } from '../tipos';
defineProps<ElementoPaisaje>();
</script>

<template>
  <div class="contenedorImg">
    <img :src="ruta" />
  </div>
</template>

<style lang="scss" scoped>
.contenedorImg {
  max-width: 23vw;
  padding: 0em;
  position: absolute;
  top: 178px;
  img {
    width: 20%;
  }
}
</style>
