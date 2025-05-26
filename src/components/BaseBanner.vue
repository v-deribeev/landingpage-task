<template>
  <section :class="['custom-banner', highlightVariant]" :style="bannerStyle">
    <slot>
      <p>
        <template v-if="highlightPosition === 'start' && highlightedText">
          <span class="highlighted-text" :style="{ color: highlightColor }">{{
            highlightedText
          }}</span>
          {{ mainText }}
        </template>
        <template v-else-if="highlightPosition === 'end' && highlightedText">
          {{ mainText }}
          <span class="highlighted-text" :style="{ color: highlightColor }">{{
            highlightedText
          }}</span>
        </template>
        <template v-else>
          {{ mainText || highlightedText }}
          <!-- Show mainText or highlightedText if no position specified -->
        </template>
      </p>
    </slot>
  </section>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  mainText: {
    type: String,
    default: "",
  },
  highlightedText: {
    type: String,
    default: "",
  },
  highlightPosition: {
    // 'start', 'end', or 'none' (for slot usage or no highlight)
    type: String,
    default: "none",
    validator: (value) => ["start", "end", "none"].includes(value),
  },
  highlightColor: {
    type: String,
    default: null,
  },
  bannerStyle: {
    type: Object,
    default: () => ({}),
  },
  highlightVariant: {
    type: String,
    required: false,
    default: "",
  },
});

const highlightVariant = computed(() => {
  if (props.highlightVariant === "blue") {
    return "variant-blue";
  }
  if (props.highlightVariant === "gold") {
    return "variant-gold";
  }
  return "";
});
</script>

<style lang="sass" scoped>
.custom-banner
  color: $color-text-light
  text-align: center
  font-weight: 500
  font-size: 12px
  letter-spacing: 0.5px
  padding: 15px 20px

  p
    margin: 0
  .highlighted-text
    font-weight: 700

.variant-blue
  .highlighted-text
    color: $color-primary-blue
.variant-gold
  .highlighted-text
    color: $color-gold

@media (min-width: 481px)
  .custom-banner
    font-size: 14px
</style>
