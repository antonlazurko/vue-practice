<script setup>
  const props = defineProps({ placeholder: String, value: String, onChange: Function })
</script>
<template>
  <input
    type="text"
    :placeholder="props.placeholder"
    :value="props.value"
    @input="props.onChange($event.target.value)"
  />
</template>
<style scoped>
  input {
    width: 100%;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: var(--card-bg-color);
    color: var(--primary-color);
  }
  input::placeholder {
    color: var(--secondary-color);
  }
</style>
