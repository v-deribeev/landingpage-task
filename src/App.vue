<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <main id="main-content">
    <GlobalHeader />
    <div v-if="isLoading" class="loading-screen">
      <p>Loading...</p>
    </div>
    <div v-else-if="isAccessAllowed">
      <LandingPage />
      <!--   <router-view /> -->
    </div>
    <div v-else class="access-denied-message">
      <p>We're sorry, but this content is not available in your region.</p>
    </div>
  </main>
  <CookieConsent v-if="!isLoading" />
  <!-- <GlobalFooter /> -->
</template>

<script setup>
import GlobalHeader from "./components/layout/GlobalHeader.vue";
import LandingPage from "./components/LandingPage.vue";
import CookieConsent from "./components/CookieConsent.vue";
import { ref, onMounted } from "vue";

const isLoading = ref(true);
const isAccessAllowed = ref(false);
// const targetCountryCode = "BG";
const targetCountryCode = "DE";

onMounted(async () => {
  try {
    // Fetching only the countryCode for efficiency
    const response = await fetch(
      "http://ip-api.com/json/?fields=status,countryCode"
    );
    if (!response.ok) {
      throw new Error(
        `Geolocation API request failed with status: ${response.status}`
      );
    }
    const data = await response.json();

    if (data.status === "success") {
      if (
        data.countryCode &&
        data.countryCode.toUpperCase() === targetCountryCode
      ) {
        isAccessAllowed.value = false;
        console.log(`Access denied: User is in ${data.countryCode}`);
      } else {
        isAccessAllowed.value = true;
        console.log(
          `Access granted: User is in ${
            data.countryCode || "Unknown (country not BG)"
          }`
        );
      }
    } else {
      // API call was successful but didn't return a success status (e.g., private IP)
      console.warn(
        "Geolocation check failed or IP is private. Allowing access by default."
      );
      isAccessAllowed.value = true; // Fallback: Allow access if geolocation fails
    }
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    // Fallback behavior: If the API call fails entirely, decide whether to allow or deny.
    // Allowing access is often a safer default for user experience.
    isAccessAllowed.value = true;
    console.warn("Allowing access due to geolocation API error.");
  } finally {
    isLoading.value = false;
  }
});
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
  flex-direction: column // If needed for layout

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
