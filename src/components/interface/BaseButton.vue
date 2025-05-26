<template>
  <component
    :is="tag"
    :type="buttonType"
    class="custom-button"
    :class="[
      `variant-${variant}`,
      {
        'is-rounded': rounded,
        'is-disabled': actualDisabled,
      },
    ]"
    :disabled="actualDisabled && tag === 'button'"
    :href="actualDisabled ? undefined : href"
    :to="actualDisabled ? undefined : to"
    :aria-disabled="actualDisabled ? 'true' : undefined"
    @click="handleClick"
  >
    <slot>Button</slot>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "outline", "text"].includes(value),
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: null,
  },
  to: {
    type: [String, Object],
    default: null,
  },
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
});

const emit = defineEmits(["click"]);

const tag = computed(() => {
  if (props.to) return "router-link";
  if (props.href) return "a";
  return "button";
});

const buttonType = computed(() => {
  return tag.value === "button" ? props.type : null;
});

const actualDisabled = computed(() => props.disabled);

function handleClick(event) {
  if (actualDisabled.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  emit("click", event);
}
</script>

<style lang="sass" scoped>
@use 'sass:color'

.custom-button
  display: inline-flex
  align-items: center
  justify-content: center
  text-align: center
  vertical-align: middle
  text-decoration: none
  cursor: pointer
  user-select: none
  border: 1px solid transparent
  transition: background-color 0.3s ease

  &:focus-visible
    outline: 2px solid $color-old-blue
    outline-offset: 2px

  &.variant-primary
    background-color: $color-old-blue
    color: $color-text-light
    border: none
    padding: 10px 20px
    font-size: 14px
    font-weight: 600
    text-transform: uppercase
    border-radius: 4px

    &:hover:not(.is-disabled)
      background-color: color.adjust($color-button-blue, $lightness: -10%)


    @media (min-width: $bp-tablet)
      padding: 12px 30px
      font-size: 16px

  &.is-rounded
    border-radius: 9999px


  &.is-disabled
    opacity: 0.65
    cursor: not-allowed
    pointer-events: none
</style>
