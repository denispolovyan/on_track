<script setup>
import TimelineItem from '../components/TimelineItem.vue'

import { generateActivityTimes } from '../functions.js'
import { isTimelineListValid, isSelectedActivityValid, isTasksValid, isActivitiesValid } from '../validators.js'
import { onMounted } from 'vue'

defineProps({
   activities: {
      type: Array,
      required: true,
		validator(value) {
         return isActivitiesValid(value)
      }
   },
   timelineList: {
      type: Array,
      required: true,
      validator(value) {
         return isTimelineListValid(value)
      }
   },
	tasks: {
		type: Array,
		required: false,
		validator(value) {
         return isTasksValid(value)
      }
	}
})

const emit = defineEmits({
   setSelectedActivity: {
      type: Object,
      required: true
   }
})

const activityTimes = generateActivityTimes()

onMounted(() => {
   const timelineItemHeight = 198
   const yCoord = (new Date().getHours()) * timelineItemHeight
   window.scrollTo({ top: yCoord, behavior: 'smooth' })
})

function setSelectedActivity(activity) {
   if (isSelectedActivityValid(activity)) {
		emit('setSelectedActivity', activity)
   }
}
</script>

<template>
   <div>
      <ul class="flex flex-col gap-10 my-4">
         <timeline-item
            v-for="timelineItem in timelineList"
            @setSelectedActivity="setSelectedActivity($event)"
				:activityTimes="activityTimes"
            :key="timelineItem.hour"
            :timelineItem="timelineItem"
            :activities="activities"
            :id="timelineItem.hour"
				:tasks="tasks"
         />
      </ul>
   </div>
</template>
