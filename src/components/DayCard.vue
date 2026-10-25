<script setup>
  import { computed } from 'vue'

  import IconCloud from './icons/IconCloud.vue'
  import IconRain from './icons/IconRain.vue'
  import IconSun from './icons/IconSun.vue'

  const props = defineProps({ day: Object, date: String, activeDay: Number, index: Number })

  const weekday = computed(() =>
    new Date(props.date).toLocaleDateString('en', { weekday: 'short', timeZone: 'UTC' }),
  )
  const isActive = computed(() => props.index === props.activeDay)
  const iconColor = computed(() => (isActive.value ? '#000000' : undefined))
</script>

<template>
  <button class="day-card" :class="{ 'day-card__isActive': isActive }">
    <IconSun v-if="props.day.condition.code <= 1003" size="54" :color="iconColor" />
    <IconRain
      v-if="props.day.condition.code > 1003 && props.day.condition.code <= 1063"
      size="54"
      :color="iconColor"
    />
    <IconCloud v-if="props.day.condition.code > 1063" size="54" :color="iconColor" />
    <div class="day-card__date">{{ weekday }}</div>
    <div class="day-card__temp">{{ props.day.avgtemp_c }} °C</div>
  </button>
</template>

<style lang="scss" scoped>
  .day-card {
    color: var(--primary-inverted-color);
    background-color: var(--card-bg-color);
    border-radius: 10px;
    box-shadow: 1px 2px 4px 0px #222831;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #3a434f;
      transform: scale(1.1);
      transition: all 0.2s ease-in-out;
    }
    &__isActive {
      background-color: var(--primary-color);
    }
    &__isActive:hover {
      background-color: var(--primary-color);
    }
    &__date {
      font-family: Montserrat;
      font-weight: 400;
      font-style: Regular;
      font-size: 20px;
      leading-trim: NONE;
      line-height: 100%;
      letter-spacing: 0%;
      text-align: center;
    }
    &__temp {
      font-family: Montserrat;
      font-weight: 700;
      font-style: Bold;
      font-size: 20px;
      leading-trim: NONE;
      line-height: 100%;
      letter-spacing: 0%;
      text-align: right;
    }
  }
</style>
