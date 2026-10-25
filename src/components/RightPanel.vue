<script setup>
  import { computed, inject, ref } from 'vue'

  import { ERROR_PROVIDE, FORECAST_PROVIDE, IS_LOADING_PROVIDE } from '../constants'
  import DayCard from './DayCard.vue'
  import ErrorMessage from './ErrorMessage.vue'
  import LocationChanger from './LocationChanger.vue'
  import Stat from './Stat.vue'

  const error = inject(ERROR_PROVIDE)
  const forecast = inject(FORECAST_PROVIDE)
  const isLoading = inject(IS_LOADING_PROVIDE)

  const activeDay = ref(0)

  const transformForecast = computed(() => {
    if (!forecast.value) return []
    const { temp_c, humidity, cloud, wind_kph } = forecast.value.current
    return [
      {
        label: 'Temperature',
        stat: temp_c === 0 ? temp_c : temp_c + ' °C',
      },
      {
        label: 'Humidity',
        stat: humidity + ' %',
      },
      {
        label: 'Cloud',
        stat: cloud + ' %',
      },
      {
        label: 'Wind',
        stat: wind_kph + ' km/h',
      },
    ]
  })
  const days = computed(() => forecast.value?.forecast.forecastday ?? [])

  const setActiveDay = (index) => (activeDay.value = index)
</script>

<template>
  <section class="right-panel">
    <p v-if="isLoading">Loading...</p>
    <div v-else>
      <ErrorMessage v-if="error" :message="error.message" />
      <Stat v-for="item in transformForecast" :key="item.label" v-bind="item" />
    </div>
    <div v-if="days.length" class="list-days">
      <DayCard
        v-for="(day, index) in days"
        :key="day.date"
        :day="day.day"
        :date="day.date"
        :active-day="activeDay"
        :index="index"
        @click="setActiveDay(index)"
      />
    </div>
    <LocationChanger />
  </section>
</template>

<style scoped>
  .right-panel {
    background-color: var(--main-bg-color);
    padding: 60px 50px;
    border-radius: 25px;
  }
  .list-days {
    padding: 15px 0;
    display: flex;
    gap: 8px;
  }
</style>
