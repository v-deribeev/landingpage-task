<template>
  <div class="landing-page">
    <section class="hero-section">
      <MarketCandleBackground />
      <div class="hero-content">
        <p class="hero-perks">{{ $t("landingPage.hero.perks") }}</p>
        <BaseHeading tag="h1" class="hero-title">
          {{ $t("landingPage.hero.titleMain") }}
          <span class="highlight-blue">{{
            $t("landingPage.hero.titleHighlight")
          }}</span
          ><br />{{ $t("landingPage.hero.titleCommission") }}
        </BaseHeading>
        <p class="hero-subtitle">
          {{ $t("landingPage.hero.subtitleLine1") }}<br />{{
            $t("landingPage.hero.subtitleLine2")
          }}
        </p>
        <BaseButton variant="primary" class="custom-width">{{
          $t("landingPage.hero.ctaButton")
        }}</BaseButton>
      </div>
    </section>

    <BaseBanner
      class="bg-gradient-dark-accent"
      :mainText="$t('landingPage.banner1.mainText')"
      :highlightedText="$t('landingPage.banner1.highlightedText')"
      highlightPosition="end"
      highlightVariant="blue"
    />

    <CardGrid :items="benefits" />

    <BaseBanner class="bg-dark-accent">
      <p>
        {{ $t("landingPage.banner2.mainTextPart1") }}
        <span class="text-gold font-bold">{{
          $t("landingPage.banner2.highlightedText")
        }}</span>
        {{ $t("landingPage.banner2.mainTextPart2") }}
      </p>
    </BaseBanner>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { DiamondIcon, TrophyIcon, MoneyIcon } from "@/assets/icons";
import CardGrid from "./CardGrid.vue";
import BaseBanner from "./BaseBanner.vue";
import MarketCandleBackground from "./MarketCandleBackground.vue";
import BaseButton from "./interface/BaseButton.vue";
import BaseHeading from "./BaseHeading.vue";

const { t } = useI18n();

const benefits = computed(() => [
  {
    iconComponent: MoneyIcon,
    titleLine1: t("landingPage.benefits.card1.titleLine1"),
    titleLine2: t("landingPage.benefits.card1.titleLine2"),
    text: t("landingPage.benefits.card1.text"),
  },
  {
    iconComponent: DiamondIcon,
    titleLine1: t("landingPage.benefits.card2.titleLine1"),
    titleLine2: t("landingPage.benefits.card2.titleLine2"),
    text: t("landingPage.benefits.card2.text"),
  },
  {
    iconComponent: TrophyIcon,
    titleLine1: t("landingPage.benefits.card3.titleLine1"),
    titleLine2: t("landingPage.benefits.card3.titleLine2"),
    text: t("landingPage.benefits.card3.text"),
  },
]);
</script>

<style lang="sass" scoped>
@use '@/styles/pages/landingPage.sass' as landing

.custom-width
  width: 200px
  @media (min-width: $bp-tablet)
    width: 240px
  @media (min-width: $bp-desktop)
    width: 310px
</style>
