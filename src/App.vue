<script setup>
const items = [
  { id: 'red', name: 'Red' },
  { id: 'green', name: 'Green' },
  { id: 'blue', name: 'Blue' },
]
</script>

<template>
  <h1>Hello, Vue!</h1>
  <div>TEST</div>
  <div v-for="item in items" :id="item.id" :key="item.id">
    {{ item.name }}
  </div>
</template>

<style scoped></style>
