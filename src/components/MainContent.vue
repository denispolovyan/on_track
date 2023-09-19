<script setup>
import TheTimeline from '../pages/TheTimeline.vue'
import TheProgress from '../pages/TheProgress.vue'
import TheActivities from '../pages/TheActivities.vue'
import NotFound from '../pages/NotFound.vue'

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '../constants.js'

import { ref } from 'vue'

let activities = ref([
   { value: 1, name: 'Coding' },
   { value: 2, name: 'Reading' },
   { value: 3, name: 'Training' }
])

defineProps({
   userActivities: {
      type: Array
   }
})

function deleteActivity(activityToDelete) {
   const filteredActivities = []
   activities.value.forEach((el) => {
      if (el.value != activityToDelete) {
         filteredActivities.push(el)
      }
   })
   activities.value = filteredActivities
}

function addActivity(activity) {
   const length = activities.value.length + 1
   activities.value.push({ value: length, name: activity })
}
</script>

<template>
   <main class="px-2 flex flex-col flex-grow">
      <the-timeline :activities="activities" v-if="$route['fullPath'].slice(2) == PAGE_TIMELINE" />
      <the-progress v-else-if="$route['fullPath'].slice(2) == PAGE_PROGRESS" />
      <the-activities
         @addActivity="addActivity($event)"
         @deleteActivity="deleteActivity($event)"
         :userActivities="activities"
         v-else-if="$route['fullPath'].slice(2) == PAGE_ACTIVITIES"
      />
      <not-found v-else />
   </main>
</template>
