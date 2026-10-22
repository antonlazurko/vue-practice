<script setup></script>

<template>
  <button class="button">
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
</style>
