<template>
  <div class="landing-page">
    <section class="hero-section">
      <div class="hero-content">
        <p class="hero-perks">EXCLUSIVE PARTNER PERKS</p>
        <h1 class="hero-title">
          EARN <span class="highlight-blue">20%</span><br />COMMISSION
        </h1>
        <p class="hero-subtitle">
          Don’t miss this limited-time promotion<br />designed exclusively for
          AW Asia attendees.
        </p>
        <button class="hero-cta">GET STARTED NOW</button>
      </div>
    </section>

    <section class="availability-banner">
      <p>AVAILABLE UNTIL <span class="highlight-date">JANUARY 2025!</span></p>
    </section>

    <section class="why-partner-section">
      <h2>Why Partner with Hantec Trader?</h2>
      <div class="benefits-grid">
        <div
          class="benefit-card"
          v-for="(benefit, index) in benefits"
          :key="index"
        >
          <component
            :is="benefit.iconComponent"
            class="benefit-icon-svg"
            role="img"
            aria-hidden="true"
          />
          <h3>
            {{ benefit.titleLine1 }}<br /><span
              class="benefit-second-title-line"
              >{{ benefit.titleLine2 }}</span
            >
          </h3>
          <p>{{ benefit.text }}</p>
        </div>
      </div>
    </section>

    <footer class="bottom-banner">
      <p>
        INSTANT <span class="highlight-gold">GOLD</span> TIER UPGRADE! EARN
        12.5% COMMISSION PER REFERRAL RIGHT FROM THE START.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Logo2024, DiamondIcon, TrophyIcon, MoneyIcon } from "@/assets/icons";

// If you were using the icons in the benefit cards:
const benefits = ref([
  {
    iconComponent: MoneyIcon, // Store the component itself
    titleLine1: "Automatic",
    titleLine2: "Enrollment",
    text: "Trades are executed by Hantec Markets, a global broker with 30 years of group experience.",
  },
  {
    iconComponent: DiamondIcon,
    titleLine1: "Point-Based",
    titleLine2: "Rewards",
    text: "Your trades are executed in live markets, and not in virtual or demo environments.",
  },
  {
    iconComponent: TrophyIcon,
    titleLine1: "Multi-Level",
    titleLine2: "Prizes",
    text: "Customise your prop trading experience with our selection of Challenges and add-ons.",
  },
]);
</script>

<style lang="sass" scoped>
@use '@/styles/pages/landingPage.sass' as landing
</style>
