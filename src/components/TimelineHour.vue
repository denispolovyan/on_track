<script setup>
import { computed } from 'vue'


const timelineHour = defineProps({
   hour: {
      type: Number,
      required: true,
   }
})

const formattedHourString =
   timelineHour.hour >= 10 ? `${timelineHour.hour}:00` : `0${timelineHour.hour}:00`

const formatedHour = computed(() => {
   return typeof timelineHour.hour == 'number' ? formattedHourString : '--:--' 
})
</script>

<template>
   <a>{{ formatedHour }}</a>
</template>
