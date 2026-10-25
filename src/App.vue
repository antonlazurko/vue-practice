<script setup>
  import { computed, onMounted, ref, watch } from 'vue'

  import { getForecast } from './api'
  import DayCard from './components/DayCard.vue'
  import Error from './components/Error.vue'
  import LocationChanger from './components/LocationChanger.vue'
  import Stat from './components/Stat.vue'
  import { DEFAULT_LOCATION } from './constants'

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
      })
      .catch((err) => {
        forecast.value = null
        error.value = err
      })
      .finally(() => (isLoading.value = false))
  }

  onMounted(() => getData(location.value))
  watch(location, getData)

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
  <span id="span" :class="!location && 'no-location'">{{ location || 'No location' }}</span>
  <main class="main">
    <p v-if="isLoading">Loading...</p>
    <div v-else>
      <Error v-if="error" :message="error.message"></Error>
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

    <LocationChanger @change-location="changeLocation" />
  </main>
</template>

<style scoped>
  .main {
    background-color: var(--main-bg-color);
    padding: 60px 50px;
    border-radius: 25px;
  }
  .no-location {
    opacity: 0.5;
  }
  .list-days {
    padding: 15px 0;
    display: flex;
    gap: 8px;
  }
</style>
