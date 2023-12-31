<script setup>
import HeaderPanel from '../components/HeaderPanel.vue'
import NavigationListVue from '../components/NavigationList.vue'
import TheTimeline from '../pages/TheTimeline.vue'
import TheProgress from '../pages/TheProgress.vue'
import TheActivities from '../pages/TheActivities.vue'
import NotFound from '../pages/NotFound.vue'

import {
   PAGE_TIMELINE,
   PAGE_ACTIVITIES,
   PAGE_PROGRESS,
   ACTIVITIES_LIST,
   SECONDS_QUANTITY_ARRAY
} from '../constants.js'

import { generateTimelineList } from '../functions.js'

import { ref, onMounted, provide, watch } from 'vue'

const widthStyles = 'mx-auto start:w-full lg:w-2/3 xl:w-1/2 2xl:w-2/5 3xl:w-1/3'

let activities = ref(ACTIVITIES_LIST)
let timelineList = ref(generateTimelineList())
let tasks = ref([])
let secondsValue = ref([])

let progress = ref(0)
let progressStyle = ref()

provide('setSecondsToComplete', setSecondsToComplete)
provide('deleteTask', deleteTask)
provide('setSelectedActivity', setSelectedActivity)
provide('deleteActivity', deleteActivity)
provide('setSelectedTimelineActivity', setSelectedTimelineActivity)
provide('setSeconds', setSeconds)

function addTask() {
   const id = tasks.value.length + 1
   const taskToAdd = { activity: 0, time: 0, id: id, done: false }
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

   if (secondsValue.value.length) {
      secondsValue.value = secondsValue.value.filter((t) => t.id != id)
   }
   localStorage.setItem('seconds-list', JSON.stringify(secondsValue.value))
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

   // change task deleted activity
   tasks.value.forEach((task) => {
      if (task.activity == activityToDelete) {
         task.activity = 0
         task.time = 0
      }
   })

   // change timeline deleted activity
   timelineList.value.forEach((el) => {
      if (el.activity == activityToDelete) {
         el.activity = 0
      }
   })

   // delete seconds list item
   secondsValue.value.forEach((el) => {
      if (el.activity == activityToDelete) {
         el.activity = 0
         el.time = 0
         el.timeValue = 0
      }
   })

   localStorage.setItem('tasks-list', JSON.stringify(tasks.value))
   localStorage.setItem('activity-list', JSON.stringify(activities.value))
   localStorage.setItem('timeline-list', JSON.stringify(timelineList.value))
   localStorage.setItem('seconds-list', JSON.stringify(secondsValue.value))
}

function setSelectedActivity(activity) {
   tasks.value.filter((t) => t.id == activity.id)[0].activity = activity.value
   localStorage.setItem('tasks-list', JSON.stringify(tasks.value))
   if (secondsValue.value.length) {
      const selectedTime = secondsValue.value.filter((t) => t.id == activity.id)[0]
      if (selectedTime) {
         selectedTime.activity = activity.value
      }
   }

   secondsValue.value.forEach((el) => {
      el.process = 0
   })

   localStorage.setItem('seconds-list', JSON.stringify(secondsValue.value))
}

function setSelectedTimelineActivity({ hour, activity }) {
   timelineList.value.forEach((el) => {
      if (el.hour == hour) {
         el.activity = activity
      }
   })
   localStorage.setItem('timeline-list', JSON.stringify(timelineList.value))
}

function setSecondsToComplete(seconds) {
   tasks.value.filter((t) => t.id == seconds.id)[0].time = seconds.value
   localStorage.setItem('tasks-list', JSON.stringify(tasks.value))
   let checkbox = false

   secondsValue.value.forEach((el) => {
      if (el.id == seconds.id || el.activity == seconds.activity) {
         checkbox = true
      }
   })

   if (secondsValue.value.length && checkbox) {
      const coincidence = secondsValue.value.filter((t) => t.timeValue == seconds.value)

      if (!coincidence[0]) {
         secondsValue.value.filter((t) => t.id == seconds.id)[0].time =
            SECONDS_QUANTITY_ARRAY[seconds.value - 1]

         secondsValue.value.filter((t) => t.id == seconds.id)[0].timeValue = seconds.value
      }
   }

   if (!seconds.value && secondsValue.value.length && checkbox) {
      secondsValue.value.filter((t) => t.id == seconds.id)[0].time = 0
   }

   localStorage.setItem('seconds-list', JSON.stringify(secondsValue.value))
}

function setSeconds(data) {
   secondsValue.value = secondsValue.value.filter((t) => t.id != data.id)
   secondsValue.value.push(data)
   localStorage.setItem('seconds-list', JSON.stringify(secondsValue.value))
   if (!data.time) {
      tasks.value.forEach((task) => {
         if (task.id == data.id) {
            task.time = 0
				task.done = true
            localStorage.setItem('tasks-list', JSON.stringify(tasks.value))
         }
      })
      setProgress()
   }
}

function setProgress() {
   let doneTasks = []
   tasks.value.forEach((task) => {
      if (task.done == true ) {
         doneTasks.push(task)
      }
   })
   if (tasks.value.length) {
      progress.value = (doneTasks.length / tasks.value.length) * 100
   } else {
      progress.value = 100
   }

   if (progress.value < 26) {
      progressStyle.value = 'bg-red-500'
   } else if (progress.value < 51) {
      progressStyle.value = 'bg-orange-500'
   } else if (progress.value < 76) {
      progressStyle.value = 'bg-yellow-500'
   } else {
      progressStyle.value = 'bg-green-500'
   }
}

onMounted(() => {
   progress.value = 100

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

   const secondsValueList = localStorage.getItem('seconds-list')
   if (JSON.parse(secondsValueList)) {
      secondsValue.value = JSON.parse(secondsValueList)
   }
})

watch(
   () => tasks.value,
   () => {
      setProgress()
   },
   { deep: true }
)
</script>

<template>
   <header-panel :class="widthStyles" :progress="progress" :progressStyle="progressStyle" />
   <main class="px-2 flex flex-col flex-grow" :class="widthStyles">
      <the-timeline
         :activities="activities"
         :timelineList="timelineList"
         :tasks="tasks"
         :secondsValue="secondsValue"
         v-if="$route['fullPath'].slice(2) == PAGE_TIMELINE"
      />
      <the-progress v-else-if="$route['fullPath'].slice(2) == PAGE_PROGRESS" />
      <the-activities
         @addActivity="addActivity($event)"
         @addTask="addTask()"
         :userActivities="activities"
         :tasks="tasks"
         v-else-if="$route['fullPath'].slice(2) == PAGE_ACTIVITIES"
      />
      <not-found v-else :class="widthStyles" />
   </main>
   <navigation-list-vue :class="widthStyles" />
</template>
