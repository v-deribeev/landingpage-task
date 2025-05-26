<template>
  <header class="site-header">
    <nav aria-label="Primary navigation" class="navigation-container">
      <div class="logo-area">
        <a href="/" aria-label="Homepage">
          <Logo2024
            class="site-logo-svg"
            role="img"
            :aria-label="$t('general.logoAlt')"
          />
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { Logo2024 } from "@/assets/icons";
</script>

<style lang="sass" scoped>
.site-header
  background-color: transparent
  padding: 15px 20px
  position: absolute
  top: 0
  left: 0
  z-index: 500

.navigation-container
  display: flex
  justify-content: space-between
  align-items: center
  margin: 0 auto

.logo-area
  display: flex
  align-items: center
  a
    display: inline-block
    text-decoration: none

.site-logo-svg
  display: block
  height: 28px

.site-name
  font-size: 18px
  font-weight: 600
  color: $color-text-light
  margin-left: 10px

@media (min-width: $bp-tablet)
  .site-header
    padding: 20px 40px
  .site-logo-svg
    height: 36px

@media (min-width: $bp-desktop)
  .site-logo-svg
    height: 50px
</style>
