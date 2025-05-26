<template>
  <div class="market-bg">
    <div
      v-for="(candle, index) in candles"
      :key="index"
      class="candle"
      :class="{ spacer: candle.height === 0 }"
      :style="{
        height: candle.height + 'px',
        top: candle.top + 'px',
        left: candle.left + 'px',
      }"
    ></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const candles = ref([]);

const generateCandles = () => {
  const viewWidth = window.innerWidth;
  const candleWidth = 17;
  const step = candleWidth;
  const count = Math.floor(viewWidth / step);
  const totalWidth = count * step;
  const offsetX = (viewWidth - totalWidth) / 2;

  const result = [];

  for (let i = 0; i < count; i++) {
    const isSpacer = i % 2 !== 0;
    const height = isSpacer ? 0 : Math.floor(Math.random() * 120) + 40;
    const top = isSpacer ? 0 : Math.floor(Math.random() * 100) + 130;
    const left = offsetX + i * step;

    result.push({ height, top, left });
  }

  candles.value = result;
};

onMounted(() => {
  generateCandles();
  window.addEventListener("resize", generateCandles);
});
</script>

<style lang="sass" scoped>
.market-bg
  position: absolute
  top: 15%
  left: 0
  width: 100%
  height: 100%
  z-index: 0
  pointer-events: none
  overflow: hidden

.candle
  position: absolute
  width: 17px
  filter: blur(2px)
  border-radius: 2px
  background-color: #080808
</style>
