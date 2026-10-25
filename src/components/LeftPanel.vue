<script setup>
  import { computed, inject } from 'vue'

  import { FORECAST_PROVIDE, IS_LOADING_PROVIDE } from '../constants'
  import IconLocation from './icons/IconLocation.vue'
  import WeatherIcon from './WeatherIcon.vue'

  const forecast = inject(FORECAST_PROVIDE)
  const isLoading = inject(IS_LOADING_PROVIDE)

  const localDate = computed(() => {
    const localtime = forecast.value?.location.localtime
    return localtime ? new Date(localtime.split(' ')[0]) : null
  })
  const formatDate = (options) =>
    localDate.value?.toLocaleDateString('en', { ...options, timeZone: 'UTC' })

  const weekday = computed(() => formatDate({ weekday: 'long' }))
  const date = computed(() => formatDate({ day: 'numeric', month: 'short', year: 'numeric' }))
</script>

<template>
  <aside class="left-panel">
    <template v-if="forecast">
      <div>
        <h2 class="left-panel__weekday">{{ weekday }}</h2>
        <div class="left-panel__date">{{ date }}</div>
        <div class="left-panel__location">
          <IconLocation size="18" />
          {{ forecast.location.name }}
        </div>
      </div>
      <div>
        <WeatherIcon :code="forecast.current.condition.code" size="90" />
        <div class="left-panel__temp">{{ Math.round(forecast.current.temp_c) }} °C</div>
        <div class="left-panel__condition">{{ forecast.current.condition.text }}</div>
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
  }
</style>
