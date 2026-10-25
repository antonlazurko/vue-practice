<script setup>
  import IconCloud from './icons/IconCloud.vue'
  import IconRain from './icons/IconRain.vue'
  import IconSun from './icons/IconSun.vue'

  defineProps({ code: Number, size: [Number, String], color: String })
</script>

<template>
  <IconSun v-if="code <= 1003" :size="size" :color="color" />
  <IconRain v-else-if="code <= 1063" :size="size" :color="color" />
  <IconCloud v-else :size="size" :color="color" />
</template>
