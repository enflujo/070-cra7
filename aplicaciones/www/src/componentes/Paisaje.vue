<script setup lang="ts">
import { base, numeroAleatorio } from '@/utilidades/ayudas';
import { type Ref, ref } from 'vue';
import slugificar from 'slug';
import type { Punto } from '@/tipos/compartidos';
import { usarCerebro } from '@/utilidades/cerebro';

defineProps<{
  puntos: Punto[];
  anchoContenedor: number;
  dims: { calle: number; fondo: number };
}>();

const cerebro = usarCerebro();

const etiquetaIlustracion: Ref<HTMLElement | null> = ref(null);

// Mostrar los nombres de los lugares ilustrados cuando el ratón está encima
const mostrarEtiquetaLugar = (nombre: string) => {
  if (!etiquetaIlustracion.value) return;
  etiquetaIlustracion.value.innerText = nombre;
  etiquetaIlustracion.value.classList.add('visible');
};

const ocultarEtiquetaLugar = () => {
  if (!etiquetaIlustracion.value) return;
  etiquetaIlustracion.value.innerText = '';
  etiquetaIlustracion.value.classList.remove('visible');
};

const actualizarPosicionEtiqueta = (evento: MouseEvent) => {
  if (!etiquetaIlustracion.value) return;
  etiquetaIlustracion.value.style.left = `${evento.clientX + window.scrollX}px`;
  etiquetaIlustracion.value.style.top = `${evento.clientY}px`;
};
</script>

<template>
  <div
    id="paisaje"
    :style="{
      width: `${anchoContenedor}px`,
      height: `${dims.fondo}px`,
      backgroundSize: `${dims.fondo * 1.8}px`,
    }"
  >
    <div
      class="elementosPunto"
      v-for="punto in puntos"
      :key="punto.slug"
      :style="{ left: `${punto.ubicacionX}%`, width: `${punto.ancho}%` }"
    >
      <img
        v-if="punto.ilustraciones && punto.ilustraciones.length"
        @mouseenter="mostrarEtiquetaLugar(punto.ilustraciones[0])"
        @mouseleave="ocultarEtiquetaLugar"
        @mousemove="actualizarPosicionEtiqueta"
        class="ilustracion"
        :class="slugificar(punto.ilustraciones[0])"
        :src="`${base}/imagenes/lugares/${punto.ilustraciones}.webp`"
        :alt="`Ilustración de ${punto.ilustraciones}`"
      />

      <div class="perfil" v-if="punto.perfil" @click="cerebro.elegirPerfil(punto.perfil, $event)">
        <img class="iconoPerfil" :src="`${base}/imagenes/icono_perfil.png`" alt="ícono abrir perfil" />
        <p>{{ punto.perfil.nombre }}</p>
      </div>

      <div class="vegetacion">
        <img
          v-for="arbol in punto.vegetacion"
          class="arbol sinEventos"
          :src="arbol"
          alt="árbol"
          :style="{
            left: `${numeroAleatorio(100)}%`,
            bottom: `${Math.random() * 5}%`,
            scale: `${0.3 + (1.5 - 0.3) * Math.random()}`,
          }"
        />

        <img
          v-if="punto.pajaros"
          v-for="pajaro in punto.pajaros"
          class="icono iconoPajaro"
          :src="pajaro"
          alt="pájaro"
          :style="{
            left: `${numeroAleatorio(100)}%`,
            top: `${Math.random() * 20}%`,
            scale: `${1 + (1.5 - 1) * Math.random()}`,
            transform: `scale(${numeroAleatorio(2) === 1 ? -1 : 1}, 1)`,
          }"
        />
      </div>

      <div v-if="punto.malAire" class="malAire">
        <img
          v-for="humo in punto.malAire"
          class="humo"
          :src="humo"
          alt="Humo que representa contaminación del aire"
          :style="{
            left: `${numeroAleatorio(100)}%`,
            top: `${Math.random() * 10}%`,
            scale: `${0.2 + (1 - 0.2) * Math.random()}`,
            transform: `scale(${numeroAleatorio(2) === 1 ? -1 : 1}, 1)`,
          }"
        />
      </div>
    </div>

    <div ref="etiquetaIlustracion" class="etiqueta etiquetaIlustracion sinEventos"></div>
  </div>
</template>
