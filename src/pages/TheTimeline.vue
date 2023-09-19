<script setup>
import TimelineItem from '../components/TimelineItem.vue'

import { generateTimelineItems } from '../functions.js'

defineProps({
	activities: {
		type: Array,
		required: false
	}
})
</script>

<template>
   <div>
      <ul>
         <timeline-item
            v-for="timelineItem in generateTimelineItems()"
            :key="timelineItem.hour"
            :timelineItem="timelineItem"
				:activities="activities"
         />
      </ul>
   </div>
</template>
