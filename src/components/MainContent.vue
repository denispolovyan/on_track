<script setup>
import TheTimeline from '../pages/TheTimeline.vue'
import TheProgress from '../pages/TheProgress.vue'
import TheActivities from '../pages/TheActivities.vue'
import NotFound from '../pages/NotFound.vue'

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS, ACTIVITIES_LIST } from '../constants.js'

import { generateTimelineList } from '../functions.js'

import { ref, onMounted } from 'vue'

let activities = ref(ACTIVITIES_LIST)

let timelineList = ref(generateTimelineList())

let tasks = ref([])

function addTask() {
   const id = tasks.value.length + 1
   const taskToAdd = { activity: 0, time: 0, id: id }
   tasks.value.unshift(taskToAdd)
   localStorage.setItem('tasks-list', JSON.stringify(tasks.value))
}

function deleteTask(id) {
   const filteredTasks = []
   tasks.value.forEach((el) => {
      if (el.id != id) {
         filteredTasks.push(el)
      }
   })
   tasks.value = filteredTasks
   localStorage.setItem('tasks-list', JSON.stringify(tasks.value))
}

function addActivity(activity) {
   let length = 1

   const activitiesKeys = []
   activities.value.forEach((el) => {
      activitiesKeys.push(el.value)
   })

   while (activitiesKeys.includes(length)) {
      length++
   }

   activities.value.push({ value: length, name: activity })
   localStorage.setItem('activity-list', JSON.stringify(activities.value))
}

function deleteActivity(activityToDelete) {
   // delete activity
   const filteredActivities = []
   activities.value.forEach((el) => {
      if (el.value != activityToDelete) {
         filteredActivities.push(el)
      }
   })
   activities.value = filteredActivities

   // find existing activities
   const activitiesKeys = []
   activities.value.forEach((el) => {
      activitiesKeys.push(el.value)
   })

   // change task deleted activity
   tasks.value.forEach((task) => {
      if (task.activity == activityToDelete) {
         task.activity = activitiesKeys[0]
      }
   })

   // change timeline deleted activity
   timelineList.value.forEach((el) => {
      if (el.activity == activityToDelete) {
         el.activity = activitiesKeys[0]
      }
   })

   localStorage.setItem('tasks-list', JSON.stringify(tasks.value))
   localStorage.setItem('activity-list', JSON.stringify(activities.value))
   localStorage.setItem('timeline-list', JSON.stringify(timelineList.value))
}

function setSelectedActivity(activity) {
   tasks.value.filter((t) => t.id == activity.id)[0].activity = activity.value
   localStorage.setItem('tasks-list', JSON.stringify(tasks.value))
}

function setSecondsToComplete(seconds) {
   tasks.value.filter((t) => t.id == seconds.id)[0].time = seconds.value
   localStorage.setItem('tasks-list', JSON.stringify(tasks.value))
}

function setSelectedTimelineActivity({ hour, activity }) {
   timelineList.value.forEach((el) => {
      if (el.hour == hour) {
         el.activity = activity
      }
   })
   localStorage.setItem('timeline-list', JSON.stringify(timelineList.value))
}

onMounted(() => {
   const tasksList = localStorage.getItem('tasks-list')
   if (JSON.parse(tasksList)) {
      tasks.value = JSON.parse(tasksList)
   }

   const activityList = localStorage.getItem('activity-list')
   if (JSON.parse(activityList)) {
      activities.value = JSON.parse(activityList)
   }

   const timelineHourList = localStorage.getItem('timeline-list')
   if (JSON.parse(timelineHourList)) {
      timelineList.value = JSON.parse(timelineHourList)
   }
})
</script>

<template>
   <main class="px-2 flex flex-col flex-grow">
      <the-timeline
         :activities="activities"
         :timelineList="timelineList"
         @setSelectedActivity="setSelectedTimelineActivity($event)"
         v-if="$route['fullPath'].slice(2) == PAGE_TIMELINE"
      />
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
