<script setup>
import { computed } from 'vue'

const timelineHour = defineProps({
   hour: {
      type: Number,
      required: true
   }
})

const formatedHour = computed(() => {

	return (timelineHour.hour >= 10) ? `${timelineHour.hour}:00` : `0${timelineHour.hour}:00`
})
</script>

<template>
   <a>{{ formatedHour }}</a>
</template>
