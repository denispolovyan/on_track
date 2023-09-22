<script setup>
import TimelineItem from '../components/TimelineItem.vue'

import { generateTimelineItems } from '../functions.js'
import { onMounted } from 'vue'

defineProps({
   activities: {
      type: Array,
      required: false
   }
})

onMounted(() => {
	const timelineItemHeight = 134
   const yCoord = (new Date().getHours()) * timelineItemHeight
   window.scrollTo({ top: yCoord, behavior: 'smooth' })
})
</script>

<template>
   <div>
      <ul class="flex flex-col gap-8 my-4">
         <timeline-item
            v-for="timelineItem in generateTimelineItems()"
            :key="timelineItem.hour"
            :timelineItem="timelineItem"
            :activities="activities"
            :id="timelineItem.hour"
         />
      </ul>
   </div>
</template>
