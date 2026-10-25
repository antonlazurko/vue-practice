<script setup>
  const props = defineProps({ message: String })
</script>

<template>
  <div class="error-message">{{ props.message }}</div>
</template>

<style scoped>
  .error-message {
    font-size: 18px;
    padding: 15px;
    margin-bottom: 15px;
    margin-top: -60px;
    text-align: center;
    color: red;
    background-color: var(--card-bg-color);
    border-radius: 15px;
  }
  @media (max-width: 1024px) {
    .error-message {
      margin-top: 0;
    }
  }
</style>
