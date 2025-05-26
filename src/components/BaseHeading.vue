<template>
  <component :is="props.tag" :class="['custom-heading']">
    <slot></slot>
  </component>
</template>

<script setup>
const props = defineProps({
  tag: {
    type: String,
    required: true,
    validator(val) {
      return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(val);
    },
  },
});
</script>

<style lang="sass" scoped>
.custom-heading
  color: $color-text-light
  margin-top: 1em
  margin-bottom: 0.5em
  line-height: 1.2
</style>
