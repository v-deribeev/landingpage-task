<!-- BenefitCard.vue -->
<template>
  <div class="benefit-card">
    <slot name="icon">
      <component
        v-if="iconComponent"
        :is="iconComponent"
        class="benefit-icon-svg"
        role="img"
        aria-hidden="true"
      />
    </slot>
    <slot name="title">
      <h3 v-if="titleLine1 || titleLine2">
        {{ titleLine1 }}
        <br v-if="titleLine1 && titleLine2" />
        <span v-if="titleLine2" class="second-title-line">{{
          titleLine2
        }}</span>
      </h3>
    </slot>
    <slot name="text">
      <p v-if="text">{{ text }}</p>
    </slot>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  iconComponent: {
    type: [Object, String],
    default: null,
  },
  titleLine1: {
    type: String,
    default: "",
  },
  titleLine2: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
});
</script>

<style lang="sass" scoped>
.benefit-card
  +flex-center(column)
h2
  font-size: 24px
  font-weight: 700
  color: $color-text-dark
  margin-bottom: 50px

h3
  font-size: 20px
  font-weight: 600
  color: $color-primary-blue
  margin-bottom: 10px
  line-height: 1.3

.second-title-line
  color: $color-pure-black

p
  font-size: 14px
  color: $color-text-muted
  line-height: 1.6
  max-width: 280px

@media (min-width: 1025px)
  .benefit-card
    +flex-center(column)
</style>
