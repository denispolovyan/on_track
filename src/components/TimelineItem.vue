<script setup>
import TimelineTimer from './TimelineTimer.vue'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import BaseButton from './BaseButton.vue'

import { isNumber, isOptionListValid, isTasksValid, isActivityTimesValid } from '../validators.js'

import { SECONDS_QUANTITY_ARRAY } from '../constants.js'

import { MinusCircleIcon } from '@heroicons/vue/24/outline'

import { ref, watch, inject } from 'vue'


const setSelectedActivityInject = inject('setSelectedTimelineActivity')
const setSecondsInject = inject('setSeconds')


const props = defineProps({
   timelineItem: {
      type: Object,
      required: true,
      validator(value) {
         return isNumber(value.hour)
      }
   },
   activities: {
      type: Array,
      required: false,
      validator(value) {
         return isOptionListValid(value)
      }
   },
   id: {
      type: Number,
      required: true,
      validator(value) {
         return isNumber(value)
      }
   },
   tasks: {
      type: Array,
      required: false,
      validator(value) {
         return isTasksValid(value)
      }
   },
   activityTimes: {
      type: Array,
      required: true,
      validator(value) {
         return isActivityTimesValid(value)
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

const hourItemClasses = [
   props.timelineItem.hour == new Date().getHours() ? 'bg-slate-300' : 'bg-slate-100'
]

let placeholder = 'Rest'

let selectedActivity = ref()

let process = ref(0)

function setSelectedActivity(activity) {
   if (isNumber(activity)) {
		setSelectedActivityInject({ activity: activity, hour: props.timelineItem.hour })
      selectedActivity.value = activity
   }
}

function setProperTime() {
   let selectedTask = props.tasks.filter((t) => t.activity == selectedActivity.value)[0]
   let currentTime = props.secondsValue.filter((t) => t.activity == selectedActivity.value)[0]
   const currentProcess = props.secondsValue.filter((t) => t.activity == selectedActivity.value)[0]
   let taskTime = 0

   if (selectedTask) {
      for (let el in currentTime) {
         if (el == 'time') {
            currentTime = currentTime[el]
         }
      }

      for (let el in currentProcess) {
         if (el == 'process') {
            process.value = currentProcess[el]
         }
      }

      for (let el in selectedTask) {
         if (el == 'time') {
            taskTime = selectedTask[el]
         }
      }

      props.activityTimes.forEach((el) => {
         if (el.value == taskTime) {
            taskTime = SECONDS_QUANTITY_ARRAY[el.value - 1]
         }
      })
   }

   if (currentTime) {
      return currentTime
   } else {
      return taskTime
   }
}

function setSeconds({ seconds, checkbox, process, isRunning }) {
   let activity = props.timelineItem.activity
   let id = 0
   let timeValue = 0
	let processValue = process
	if(isRunning) {
		processValue = 0
	}

   props.tasks.forEach((el) => {
      if (el.activity == activity) {
         id = el.id
         timeValue = el.time
      }
   })

   if (checkbox) {
      seconds = SECONDS_QUANTITY_ARRAY[timeValue - 1]
   }

   const data = {
      activity: activity,
      id: id,
      time: seconds,
      timeValue: timeValue,
      process: processValue
   }
   if (id) {
		setSecondsInject(data)
   }
}

watch(
   () => selectedActivity.value,
   () => {
      setProperTime()
      if (selectedActivity.value == 0) {
         process.value = 0
      }
   }
)
</script>

<template>
   <li class="flex flex-col" :id="id">
      <div class="text-center mb-6 relative">
         <timeline-hour
            :hour="timelineItem.hour"
            class="items-center px-2 py-1 rounded-md border"
            :class="hourItemClasses"
         />
         <div class="border-b -mt-3"></div>
      </div>
      <div class="flex flex-col gap-2">
         <div class="border flex items-center justify-between rounded-md bg-zinc-100">
            <base-select
               class="border-r"
               :optionsList="activities"
               :placeholder="placeholder"
               :selected="timelineItem.activity"
               @select="setSelectedActivity($event)"
            />
            <base-button v-if="!process"
               :background="'text-white bg-red-500 hover:bg-red-700 duration-500'"
               @clickButton="setSelectedActivity(0)"
               ><MinusCircleIcon class="w-12"
            /></base-button>
         </div>
         <timeline-timer
            :seconds="setProperTime()"
            :process="process"
            @setSeconds="setSeconds($event)"
         />
      </div>
   </li>
</template>
