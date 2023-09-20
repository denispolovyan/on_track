<script setup>
import TheTimeline from '../pages/TheTimeline.vue'
import TheProgress from '../pages/TheProgress.vue'
import TheActivities from '../pages/TheActivities.vue'
import NotFound from '../pages/NotFound.vue'

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS, ACTIVITIES_LIST } from '../constants.js'

import { ref } from 'vue'

let activities = ref(ACTIVITIES_LIST)

let tasks = ref([])

function addTask() {
   const id = tasks.value.length + 1
   const taskToAdd = { activity: 0, time: 0, id: id }
   tasks.value.unshift(taskToAdd)
}

function deleteTask(id) {
   const filteredTasks = []
   tasks.value.forEach((el) => {
      if (el.id != id) {
         filteredTasks.push(el)
      }
   })
   tasks.value = filteredTasks
}

function addActivity(activity) {
   const length = activities.value.length + 1
   activities.value.push({ value: length, name: activity })
}

function deleteActivity(activityToDelete) {
   const filteredActivities = []
   activities.value.forEach((el) => {
      if (el.value != activityToDelete) {
         filteredActivities.push(el)
      }
   })
   activities.value = filteredActivities
}

function setSelectedActivity(activity) {
   tasks.value.filter((t) => t.id == activity.id)[0].activity = activity.value

}

function setSecondsToComplete(seconds) {
   tasks.value.filter((t) => t.id == seconds.id)[0].time = seconds.value

}
</script>

<template>
   <main class="px-2 flex flex-col flex-grow">
      <the-timeline :activities="activities" v-if="$route['fullPath'].slice(2) == PAGE_TIMELINE" />
      <the-progress v-else-if="$route['fullPath'].slice(2) == PAGE_PROGRESS" />
      <the-activities
         @addActivity="addActivity($event)"
         @deleteActivity="deleteActivity($event)"
         @addTask="addTask()"
         @deleteTask="deleteTask($event)"
         @setSelectedActivity="setSelectedActivity($event)"
         @setSecondsToComplete="setSecondsToComplete($event)"
         :userActivities="activities"
         :tasks="tasks"
         v-else-if="$route['fullPath'].slice(2) == PAGE_ACTIVITIES"
      />
      <not-found v-else />
   </main>
</template>
