<template>
  <transition name="cookie-slide">
    <div v-if="showConsent" class="cookie-consent-banner">
      <p class="consent-text">
        {{ $t("cookiePolicy.consent") }}
      </p>
      <div class="consent-actions">
        <button @click="acceptCookies" class="accept-button">
          {{ $t("general.accept") }}
        </button>
        <button @click="declineCookies" class="close-button">x</button>
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
    setTimeout(() => {
      showConsent.value = true;
    }, 500);
  }
});

const setConsent = (status) => {
  localStorage.setItem(COOKIE_CONSENT_KEY, status);
  showConsent.value = false;
  console.log(`Cookie consent: ${status}`);
};

const acceptCookies = () => {
  setConsent("accepted");
};

const declineCookies = () => {
  // setConsent("declined_session");
  showConsent.value = false;
};
</script>

<style lang="sass" scoped>
@use 'sass:color'

.cookie-consent-banner
  position: fixed
  bottom: 0
  left: 0
  right: 0
  background-color: rgba($color-dark-accent, 0.95)
  backdrop-filter: blur(5px)
  color: $color-text-light
  padding: 15px 25px
  display: flex
  justify-content: space-between
  align-items: center
  z-index: 1000
  box-shadow: 0 -2px 10px rgba(0,0,0,0.2)
  gap: 20px

.consent-text
  margin: 0
  font-size: 14px
  line-height: 1.5
  flex-grow: 1

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
    font-size: 24px
    padding: 0px 8px
    line-height: 1
    color: $color-text-muted
    &:hover
      color: $color-text-light

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
    justify-content: center
    button.accept-button
      flex-grow: 1
</style>
