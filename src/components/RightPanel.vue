<script setup>
  import { computed, inject } from 'vue'

  import {
    ACTIVE_DAY_PROVIDE,
    ERROR_PROVIDE,
    FORECAST_PROVIDE,
    IS_LOADING_PROVIDE,
    SELECTED_DAY_PROVIDE,
  } from '../constants'
  import DayCard from './DayCard.vue'
  import ErrorMessage from './ErrorMessage.vue'
  import LocationChanger from './LocationChanger.vue'
  import Stat from './Stat.vue'

  const error = inject(ERROR_PROVIDE)
  const forecast = inject(FORECAST_PROVIDE)
  const isLoading = inject(IS_LOADING_PROVIDE)

  const activeDay = inject(ACTIVE_DAY_PROVIDE)
  const selectedDay = inject(SELECTED_DAY_PROVIDE)

  const transformForecast = computed(() => {
    if (!selectedDay.value) return []
    const { rainChance, humidity, cloud, wind } = selectedDay.value
    return [
      {
        label: 'Chance of rain',
        stat: rainChance + ' %',
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
        stat: wind + ' km/h',
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

<style lang="scss" scoped>
  .right-panel {
    background-color: var(--main-bg-color);
    padding: 60px 50px;
    border-radius: 25px;

    @media (max-width: 1024px) {
      box-sizing: border-box;
      width: 100%;
      max-width: 520px;
      padding: 24px 20px;
    }
  }
  .list-days {
    padding: 15px 0;
    display: flex;
    gap: 8px;

    @media (max-width: 600px) {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;

      > * {
        flex: 0 0 auto;
        scroll-snap-align: start;
      }
    }
  }
</style>
