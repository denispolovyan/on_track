<script setup>
import TheTimeline from '../pages/TheTimeline.vue'
import TheProgress from '../pages/TheProgress.vue'
import TheActivities from '../pages/TheActivities.vue'
import NotFound from '../pages/NotFound.vue'

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '../constants.js'

import { ref } from 'vue'

let activities = ref(['Coding', 'Reading', 'Training'])

function deleteActivity(activity) {
   activities.value = activities.value.filter((t) => t != activity)
}

function addActivity(activity) {
   activities.value.push(activity)
}
</script>

<template>
   <main class="px-2 flex flex-col flex-grow">
      <the-timeline v-if="$route['fullPath'].slice(2) == PAGE_TIMELINE" />
      <the-progress v-else-if="$route['fullPath'].slice(2) == PAGE_PROGRESS" />
      <the-activities
         @addNewValue="addActivity($event)"
         @deleteActivity="deleteActivity($event)"
         :activities="activities"
         v-else-if="$route['fullPath'].slice(2) == PAGE_ACTIVITIES"
      />
      <not-found v-else />
   </main>
</template>
