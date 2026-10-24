<script setup>
import Stat from './components/Stat.vue'
import IconLocation from './components/icons/IconLocation.vue'
const data = { label: 'Humidity', stat: '90%' }
</script>

<template>
  <Stat v-bind="data" />
  <Stat v-bind="data" />
  <Stat v-bind="data" />
  <Stat />
  <main class="main">
    <IconLocation :style="{ opacity: 0.5 }" />
    <img src="./assets/Location.svg" alt="location" />
  </main>
</template>

<style scoped>
.main {
  background-color: var(--main-bg-color);
  padding: 60px 50px;
  border-radius: 25px;
}
</style>
