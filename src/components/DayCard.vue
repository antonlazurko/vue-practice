<script setup>
  import { computed } from 'vue'

  import WeatherIcon from './WeatherIcon.vue'

  const props = defineProps({ day: Object, date: String, activeDay: Number, index: Number })

  const weekday = computed(() =>
    new Date(props.date).toLocaleDateString('en', { weekday: 'short', timeZone: 'UTC' }),
  )
  const isActive = computed(() => props.index === props.activeDay)
  const iconColor = computed(() => (isActive.value ? '#000000' : undefined))
</script>

<template>
  <button class="day-card" :class="{ 'day-card__isActive': isActive }">
    <WeatherIcon :code="props.day.condition.code" size="54" :color="iconColor" />
    <div class="day-card__date">{{ weekday }}</div>
    <div class="day-card__temp">{{ props.day.avgtemp_c }} °C</div>
  </button>
</template>

<style lang="scss" scoped>
  .day-card {
    color: var(--primary-color);
    background-color: var(--card-bg-color);
    border-radius: 10px;
    box-shadow: 1px 2px 4px 0px #222831;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    border: none;
    cursor: pointer;
    // touch screens keep :hover after tap, so the zoom effect is for mice only
    @media (hover: hover) {
      &:hover {
        background-color: #3a434f;
        transform: scale(1.1);
        transition: all 0.2s ease-in-out;
      }
    }
    &__isActive {
      color: var(--primary-inverted-color);
      background-color: var(--primary-color);
    }
    &__isActive:hover {
      background-color: var(--primary-color);
    }
    &__date {
      font-weight: 400;
      font-size: 20px;
      line-height: 100%;
      text-align: center;
    }
    &__temp {
      font-weight: 700;
      font-size: 14px;
      line-height: 100%;
      text-align: right;
    }
    @media (max-width: 600px) {
      padding: 16px 20px;
      gap: 10px;

      &__date {
        font-size: 16px;
      }
    }
  }
</style>
