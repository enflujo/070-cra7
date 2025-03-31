<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const visible = ref(true);

const eventoPosicionX = () => {
  if (window.scrollX > 100) {
    visible.value = false;
  } else {
    visible.value = true;
  }
};

onMounted(() => {
  window.addEventListener('scroll', eventoPosicionX);
});

onUnmounted(() => {
  window.removeEventListener('scroll', eventoPosicionX);
});
</script>

<template>
  <div id="contenedorGesto" :class="{ visible }">
    <div class="raton ayuda">
      <svg class="iconoGesto" xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 25">
        <title>Ícono que indica que el movimiento en la página es horizontal</title>
        <path class="derecha" d="M30,3.5,26.56,7l-.81-.82,2.06-2.1H22V2.92h5.81L25.74.82,26.55,0Z" />
        <path class="izquierda" d="M8,4.08H2.19l2.06,2.1L3.44,7,0,3.5,3.45,0l.81.82L2.19,2.92H8Z" />
      </svg>
    </div>

    <div class="mano ayuda">
      <svg class="iconoGesto" xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 25">
        <title>Mover hacia la derecha</title>
        <path class="derecha" d="M30,3.5,26.56,7l-.81-.82,2.06-2.1H22V2.92h5.81L25.74.82,26.55,0Z" />
        <path class="izquierda" d="M8,4.08H2.19l2.06,2.1L3.44,7,0,3.5,3.45,0l.81.82L2.19,2.92H8Z" />
        <path
          id="mano"
          d="M25.41,11.18l-5.08-3A2.32,2.32,0,0,0,19,7.74a2.37,2.37,0,0,0-1.72.75v-5a2.46,2.46,0,0,0-.71-1.74A2.38,2.38,0,0,0,14.84,1h0a2.44,2.44,0,0,0-2.41,2.46V14.6l-.69-.7a4.7,4.7,0,0,0-3.36-1.42A4.75,4.75,0,0,0,6.32,13a1.26,1.26,0,0,0-.69.92A1.32,1.32,0,0,0,6,15l7.69,7.83A7.59,7.59,0,0,0,19,25a7.73,7.73,0,0,0,7.65-7.79V13.29A2.42,2.42,0,0,0,25.41,11.18Zm0,6A6.46,6.46,0,0,1,19,23.73h0a6.31,6.31,0,0,1-4.41-1.8L6.87,14.1a3.37,3.37,0,0,1,1.5-.35h0a3.42,3.42,0,0,1,2.47,1.05l1.53,1.55a.52.52,0,0,0,.36.16l.19,0a1.18,1.18,0,0,0,.75-1.1V3.46a1.17,1.17,0,0,1,1.16-1.19h0A1.18,1.18,0,0,1,16,3.46v6.91a.6.6,0,0,0,.39.56l.2,0a.58.58,0,0,0,.45-.22l1-1.3A1.16,1.16,0,0,1,19,9a1.12,1.12,0,0,1,.68.23l5.12,3a1.18,1.18,0,0,1,.59,1Z"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#contenedorGesto {
  opacity: 0;
  z-index: 20;
  transition: opacity 1s;
  position: fixed;
  pointer-events: none;
  bottom: 10px;
  left: 50%;

  &.visible {
    opacity: 1;
  }
}
.ayuda {
  scale: 0.8;
}

.raton {
  display: none;
}

.mano {
  display: block;
  transform: translate(-50%, -50%);
}

.iconoGesto {
  width: 72px;
  height: 35px;

  #mano {
    fill: var(--piel);
    transform-origin: 50% 100%;
    animation: gestoMano 3.5s infinite ease;
  }

  .izquierda,
  .derecha {
    fill: var(--piel);
    opacity: 0;
  }

  .derecha {
    animation: flechaDerecha 1.5s infinite ease;
  }

  .izquierda {
    animation: flechaIzquierda 1.5s infinite ease;
  }
}

@keyframes gestoMano {
  5% {
    transform: translateX(3px) rotate(6deg);
  }

  25% {
    transform: translateX(0px) rotate(0deg);
  }

  28% {
    transform: translateX(0px) rotate(0deg);
  }

  33% {
    transform: translateX(-3px) rotate(-6deg);
  }

  53% {
    transform: translateX(0px) rotate(0deg);
  }

  100% {
    transform: translateX(0px) rotate(0deg);
  }
}

@keyframes flechaDerecha {
  0% {
    transform: translateX(0px);
    opacity: 1;
  }

  100% {
    transform: translateX(10px);
    opacity: 0;
  }
}

@keyframes flechaIzquierda {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(-10px);
    opacity: 0;
  }
}

@media only screen and (min-width: 1030px) {
  .mano {
    display: none;
  }

  .raton {
    display: block;
    width: 30px;
    height: 60px;
    margin-left: -15px;
    margin-top: -30px;
    box-shadow: inset 0 0 0 1px var(--piel);
    border-radius: 20px;

    &:before {
      content: '';
      left: 50%;
      position: absolute;
      width: 6px;
      height: 6px;
      background: var(--piel);
      margin-left: -3px;
      top: 6px;
      border-radius: 3px;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-name: scroll;
    }

    .iconoGesto {
      transform: translate(-30%, 65%);
      width: 150px;
    }
  }

  @keyframes scroll {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      transform: translateY(30px);
    }
  }

  @keyframes flechaDerecha {
    0% {
      transform: translateX(0px);
      opacity: 1;
    }

    100% {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes flechaIzquierda {
    0% {
      transform: translateX(-20px);
      opacity: 1;
    }

    100% {
      transform: translateX(-30px);
      opacity: 0;
    }
  }
}
</style>
