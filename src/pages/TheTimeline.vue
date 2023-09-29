<script setup>
import TimelineItem from '../components/TimelineItem.vue'

import { generateActivityTimes } from '../functions.js'
import {
   isTimelineListValid,
   isTasksValid,
   isActivitiesValid,
} from '../validators.js'
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
   },
   secondsValue: {
      type: Array,
      required: false,
      validator(value) {
         return isTasksValid(value)
      }
   }
})

defineEmits({
   setSeconds: {
      type: Object,
      required: false
   }
})

const activityTimes = generateActivityTimes()

onMounted(() => {
   const timelineItemHeight = 198
   const yCoord = new Date().getHours() * timelineItemHeight
   window.scrollTo({ top: yCoord, behavior: 'smooth' })
})

</script>

<template>
   <div>
      <ul class="flex flex-col gap-10 my-4">
         <timeline-item
            v-for="timelineItem in timelineList"
            @setSeconds="$emit('setSeconds', $event)"
            :activityTimes="activityTimes"
            :key="timelineItem.hour"
            :timelineItem="timelineItem"
            :activities="activities"
            :id="timelineItem.hour"
            :tasks="tasks"
            :secondsValue="secondsValue"
         />
      </ul>
   </div>
</template>
