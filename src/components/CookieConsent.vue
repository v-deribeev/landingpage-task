<template>
  <transition name="cookie-slide">
    <div v-if="showConsent" class="cookie-consent-banner">
      <p class="consent-text">
        We use cookies to enhance your browsing experience and analyze our
        traffic. By clicking "Accept", you consent to our use of cookies.
      </p>
      <div class="consent-actions">
        <button @click="acceptCookies" class="accept-button">Accept</button>
        <button @click="declineCookies" class="close-button">×</button>
        <!-- Using a simple 'times' for close, can be an icon too -->
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from "vue";

const COOKIE_CONSENT_KEY = "hantec_cookie_consent";
const showConsent = ref(false);

onMounted(() => {
  const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!consentGiven) {
    // Delay showing slightly so it doesn't jump in immediately on load
    setTimeout(() => {
      showConsent.value = true;
    }, 500);
  }
});

const setConsent = (status) => {
  localStorage.setItem(COOKIE_CONSENT_KEY, status); // 'accepted' or 'declined'
  showConsent.value = false;
  // Here you would typically initialize analytics or other cookie-dependent scripts
  // if status === 'accepted'. For this example, we're just hiding the banner.
  console.log(`Cookie consent: ${status}`);
};

const acceptCookies = () => {
  setConsent("accepted");
};

const declineCookies = () => {
  // In a real scenario, declining might mean disabling certain non-essential cookies.
  // For this example, we'll just hide the banner as if they acknowledged it.
  // Or, you could choose to not set a localStorage item and show it again next visit
  // until they explicitly accept. For simplicity, we'll treat "close" as "declined for this session".
  setConsent("declined_session");
  showConsent.value = false; // Just hide for now
};
</script>

<style lang="sass" scoped>
@use 'sass:color'

.cookie-consent-banner
  position: fixed
  bottom: 0
  left: 0
  right: 0
  background-color: rgba($color-dark-accent, 0.95) // Slightly transparent dark background
  backdrop-filter: blur(5px) // Subtle blur for modern browsers
  color: $color-text-light
  padding: 15px 25px
  display: flex
  justify-content: space-between
  align-items: center
  z-index: 1000 // Ensure it's on top
  box-shadow: 0 -2px 10px rgba(0,0,0,0.2)
  gap: 20px // Gap between text and buttons

.consent-text
  margin: 0
  font-size: 14px
  line-height: 1.5
  flex-grow: 1 // Allow text to take available space

.consent-actions
  display: flex
  align-items: center
  gap: 15px

button
  background-color: transparent
  color: $color-text-light
  border: none
  padding: 8px 12px
  font-size: 14px
  font-weight: 500
  border-radius: 4px
  cursor: pointer
  transition: background-color 0.2s ease, color 0.2s ease

  &.accept-button
    background-color: $color-primary-blue
    &:hover
      background-color: color.adjust($color-primary-blue, $lightness: -10%)

  &.close-button
    font-size: 24px // Larger for the 'times' character
    padding: 0px 8px // Adjust padding for the X
    line-height: 1
    color: $color-text-muted
    &:hover
      color: $color-text-light


// Transition for the banner sliding up
.cookie-slide-enter-active,
.cookie-slide-leave-active
  transition: transform 0.5s ease-in-out

.cookie-slide-enter-from,
.cookie-slide-leave-to
  transform: translateY(100%)

@media (max-width: 767px)
  .cookie-consent-banner
    flex-direction: column
    padding: 20px
    text-align: center

  .consent-text
    margin-bottom: 15px

  .consent-actions
    width: 100%
    justify-content: center // Center buttons on mobile
    button.accept-button
      flex-grow: 1 // Make accept button wider on mobile
</style>
