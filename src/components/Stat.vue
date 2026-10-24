<script setup>
  const { label = 'N/A', stat = 'No data' } = defineProps({ label: String, stat: String })
</script>

<template>
  <div class="stat">
    <div class="stat-name">{{ label }}</div>
    <div class="stat-value">{{ stat }}</div>
  </div>
</template>

<style lang="scss" scoped>
  .stat {
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin: 8px 0;
    &-name {
      font-weight: 700;
    }
    &-value {
      font-weight: 500;
    }
  }
</style>
