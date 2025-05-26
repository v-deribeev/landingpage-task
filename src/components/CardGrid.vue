<template>
  <section class="card-grid-section">
    <slot name="header">
      <h2 v-if="sectionTitle" class="card-grid-title">{{ sectionTitle }}</h2>
    </slot>
    <div class="cards-container">
      <slot v-for="(item, index) in items" :item="item" :index="index">
        <BaseCard
          :iconComponent="item.iconComponent"
          :titleLine1="item.titleLine1"
          :titleLine2="item.titleLine2"
          :text="item.text"
        />
      </slot>
    </div>
    <slot name="footer"></slot>
  </section>
</template>

<script setup>
import BaseCard from "./BaseCard.vue";

defineProps({
  sectionTitle: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style lang="sass" scoped>
@use 'sass:color'

.card-grid-section
  background-color: $color-text-light
  overflow-x: hidden
  padding: 60px 20px
  text-align: center
  +flex-center(column)

  h2
    font-size: 24px
    font-weight: 700
    color: $color-text-dark
    margin-bottom: 50px

  .cards-container
    display: grid
    grid-template-columns: 1fr
    gap: 30px
    max-width: 1000px
    margin: 0 auto


@media (min-width: 1025px)
  .card-grid-section
    h2
      font-size: 32px
    .cards-container
      display: flex
      justify-content: center
      align-items: baseline
      gap: 40px
</style>
