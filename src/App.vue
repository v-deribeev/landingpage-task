<template>
  <a href="#main-content" class="skip-link">{{ $t("general.skipContent") }}</a>
  <main id="main-content">
    <GlobalHeader />
    <div v-if="isLoading" class="loading-screen">
      <p>{{ $t("general.loading") }}</p>
    </div>
    <div v-else-if="isAccessAllowed">
      <LandingPage />
    </div>
    <div v-else class="access-denied-message">
      <p>{{ $t("general.accessDenied") }}</p>
    </div>
  </main>
  <CookieConsent v-if="!isLoading" />
  <!-- <GlobalFooter /> -->
</template>

<script setup>
import GlobalHeader from "./components/layout/GlobalHeader.vue";
import LandingPage from "./components/LandingPage.vue";
import CookieConsent from "./components/CookieConsent.vue";
import { useLocationAccess } from "./composables/useLocationAccess.js";

// const TARGET_COUNTRY_TO_BLOCK = "BG"; UNCOMMENT to block from BG
const TARGET_COUNTRY_TO_BLOCK = "DE";

const { isAccessAllowed, isLoading } = useLocationAccess(
  TARGET_COUNTRY_TO_BLOCK
);
</script>

<style lang="sass">
body
  margin: 0
  font-family: 'Poppins', sans-serif
  background-color: $color-dark-bg
  color: $color-text-light

#app-container
  min-height: 100vh
  display: flex
  flex-direction: column

.loading-screen,
.access-denied-message
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  text-align: center
  padding: 20px
  font-size: 18px
  color: $color-text-light
  background-color: $color-dark-bg

.skip-link
  position: absolute
  top: -40px
  left: 0
  background: $color-primary-blue
  color: $color-text-light
  padding: 8px 15px
  z-index: 9999
  text-decoration: none
  font-weight: 500
  border-radius: 0 0 4px 4px

  &:focus
    top: 0
</style>
