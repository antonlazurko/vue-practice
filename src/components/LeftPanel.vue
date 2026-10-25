<script setup>
  import { computed, inject } from 'vue'

  import { FORECAST_PROVIDE, IS_LOADING_PROVIDE, SELECTED_DAY_PROVIDE } from '../constants'
  import IconLocation from './icons/IconLocation.vue'
  import WeatherIcon from './WeatherIcon.vue'

  const forecast = inject(FORECAST_PROVIDE)
  const isLoading = inject(IS_LOADING_PROVIDE)
  const selectedDay = inject(SELECTED_DAY_PROVIDE)

  const formatDate = (options) =>
    selectedDay.value?.date.toLocaleDateString('en', { ...options, timeZone: 'UTC' })

  const weekday = computed(() => formatDate({ weekday: 'long' }))
  const date = computed(() => formatDate({ day: 'numeric', month: 'short', year: 'numeric' }))
</script>

<template>
  <aside class="left-panel">
    <template v-if="selectedDay">
      <div>
        <h2 class="left-panel__weekday">{{ weekday }}</h2>
        <div class="left-panel__date">{{ date }}</div>
        <div class="left-panel__location">
          <IconLocation size="18" />
          {{ forecast.location.name }}
        </div>
      </div>
      <div>
        <WeatherIcon :code="selectedDay.condition.code" size="90" />
        <div class="left-panel__temp">{{ Math.round(selectedDay.temp) }} °C</div>
        <div class="left-panel__condition">{{ selectedDay.condition.text }}</div>
      </div>
    </template>
    <h3 v-else-if="isLoading">Loading...</h3>
    <h3 v-else>No data</h3>
  </aside>
</template>

<style lang="scss" scoped>
  .left-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    width: 410px;
    aspect-ratio: 493 / 666;
    padding: 40px 36px 48px;
    margin-left: 50px;
    border-radius: 30px;
    background-image: url('../assets/left-panel-bg-img.png');
    background-size: cover;
    background-position: center;

    &__weekday {
      margin: 0 0 8px;
      font-size: 32px;
      font-weight: 700;
    }
    &__date {
      font-size: 18px;
      font-weight: 400;
    }
    &__location {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 24px;
      font-size: 18px;
      font-weight: 600;
    }
    &__temp {
      margin-top: 16px;
      font-size: 48px;
      font-weight: 700;
    }
    &__condition {
      margin-top: 16px;
      font-size: 28px;
      font-weight: 700;
    }

    @media (max-width: 1024px) {
      width: 100%;
      max-width: 520px;
      margin-left: 0;
      aspect-ratio: auto;
      min-height: 420px;
      gap: 24px;
    }
    @media (max-width: 600px) {
      min-height: 360px;
      padding: 28px 24px 32px;
      border-radius: 24px;

      &__weekday {
        font-size: 28px;
      }
      &__date,
      &__location {
        font-size: 16px;
      }
      &__temp {
        font-size: 40px;
      }
      &__condition {
        font-size: 22px;
      }
    }
  }
</style>
