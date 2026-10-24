<script setup>
defineOptions({ inheritAttrs: false })
const props = defineProps({ onClick: Function })
</script>

<template>
  <button
    class="button"
    v-bind="$attrs"
    :class="$attrs.disabled ? 'disabled' : ''"
    @click="props.onClick"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  background: var(--gradient-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: var(--font-family);
}
.button:hover {
  background: var(--gradient-inverted-color);
}
.button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
