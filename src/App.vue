<script setup>
  import { computed, onMounted, provide, ref, watch } from 'vue'

  import { getForecast } from './api'
  import LeftPanel from './components/LeftPanel.vue'
  import RightPanel from './components/RightPanel.vue'
  import {
    ACTIVE_DAY_PROVIDE,
    CHANGE_LOCATION_PROVIDE,
    DEFAULT_LOCATION,
    ERROR_PROVIDE,
    FORECAST_PROVIDE,
    IS_LOADING_PROVIDE,
    SELECTED_DAY_PROVIDE,
  } from './constants'

  const forecast = ref(null)
  const error = ref(null)
  const isLoading = ref(false)
  const activeDay = ref(0)
  const location = ref(DEFAULT_LOCATION)
  const changeLocation = (value = '') => (location.value = value.trim())

  const getData = async (value) => {
    isLoading.value = true
    getForecast(value)
      .then((res) => {
        forecast.value = res
        error.value = null
        activeDay.value = 0
      })
      .catch((err) => {
        forecast.value = null
        error.value = err
      })
      .finally(() => (isLoading.value = false))
  }

  const selectedDay = computed(() => {
    const forecastDay = forecast.value?.forecast.forecastday[activeDay.value]
    if (!forecastDay) return null
    const { day, hour } = forecastDay
    const current = forecast.value.current
    const isToday = activeDay.value === 0
    const avgCloud = hour.reduce((sum, h) => sum + h.cloud, 0) / hour.length
    return {
      date: new Date(forecastDay.date),
      temp: isToday ? current.temp_c : day.avgtemp_c,
      humidity: isToday ? current.humidity : day.avghumidity,
      cloud: isToday ? current.cloud : Math.round(avgCloud),
      wind: isToday ? current.wind_kph : day.maxwind_kph,
      condition: isToday ? current.condition : day.condition,
      rainChance: day.daily_chance_of_rain,
    }
  })

  onMounted(() => getData(location.value))
  watch(location, getData)

  provide(FORECAST_PROVIDE, forecast)
  provide(ERROR_PROVIDE, error)
  provide(IS_LOADING_PROVIDE, isLoading)
  provide(CHANGE_LOCATION_PROVIDE, changeLocation)
  provide(ACTIVE_DAY_PROVIDE, activeDay)
  provide(SELECTED_DAY_PROVIDE, selectedDay)
</script>

<template>
  <main class="main">
    <LeftPanel />
    <RightPanel />
  </main>
</template>

<style scoped>
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
</style>
