<script setup>
  import { computed, onMounted, ref, watch } from 'vue'

  import { getForecast } from './api'
  import Error from './components/Error.vue'
  import LocationChanger from './components/LocationChanger.vue'
  import Stat from './components/Stat.vue'
  import { DEFAULT_LOCATION } from './constants'

  const forecast = ref(null)
  const error = ref(null)
  const isLoading = ref(false)
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
</script>

<template>
  <span id="span" :class="!location && 'no-location'">{{ location || 'No location' }}</span>
  <main class="main">
    <p v-if="isLoading">Loading...</p>
    <div v-else>
      <Error v-if="error" :message="error.message"></Error>
      <Stat v-for="item in transformForecast" :key="item.label" v-bind="item" />
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
</style>
