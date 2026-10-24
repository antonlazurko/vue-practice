<script setup>
import { ref } from 'vue'

import Stat from './components/Stat.vue'
import LocationChanger from './components/LocationChanger.vue'

const data = { label: 'Humidity', stat: '90%' }
const location = ref('')
const changeLocation = (value = '') => (location.value = value.trim())
</script>

<template>
  <span>{{ location }}</span>
  <Stat v-bind="data" />
  <Stat v-bind="data" />
  <Stat v-bind="data" />
  <Stat />
  <main class="main">
    <LocationChanger @change-location="changeLocation" />
  </main>
</template>

<style scoped>
.main {
  background-color: var(--main-bg-color);
  padding: 60px 50px;
  border-radius: 25px;
}
</style>
