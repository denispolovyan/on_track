<script setup>
import TimelineItem from '../components/TimelineItem.vue'

// import { generateTimelineItems } from '../functions.js'
import { isTimelineListValid, isSelectedActivityValid } from '../validators.js'
import { onMounted } from 'vue'

defineProps({
   activities: {
      type: Array,
      required: false
   },
   timelineList: {
      type: Array,
      required: true,
      validator(value) {
         return isTimelineListValid(value)
      }
   }
})

const emit = defineEmits({
   setSelectedActivity: {
      type: Object,
      required: true
   }
})

onMounted(() => {
   const timelineItemHeight = 134
   const yCoord = new Date().getHours() * timelineItemHeight
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
      <ul class="flex flex-col gap-8 my-4">
         <timeline-item
            v-for="timelineItem in timelineList"
            @setSelectedActivity="setSelectedActivity($event)"
            :key="timelineItem.hour"
            :timelineItem="timelineItem"
            :activities="activities"
            :id="timelineItem.hour"
         />
      </ul>
   </div>
</template>
