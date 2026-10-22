<script setup>
import LeftPanel from './components/LeftPanel.vue'
</script>

<template>
  <LeftPanel />
  <main class="main"></main>
</template>

<style scoped>
.main {
  background-color: var(--main-bg-color);
  padding: 60px 50px;
  border-radius: 25px;
}
</style>
