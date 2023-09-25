<script setup>
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import BaseButton from './BaseButton.vue'
import TimelineTimer from './TimelineTimer.vue'

import { isNumber, isOptionListValid, isTasksValid } from '../validators.js'

import { MinusCircleIcon } from '@heroicons/vue/24/outline'

import { ref, watch, onMounted } from 'vue'

const emit = defineEmits({
   setSelectedActivity: {
      type: Number,
      required: true
   }
})

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
   }
})

function setSelectedActivity(activity) {
   if (isNumber(activity)) {
      emit('setSelectedActivity', { activity: activity, hour: props.timelineItem.hour })
      selectedActivity.value = activity
   }
}

const hourItemClasses = [
   props.timelineItem.hour == new Date().getHours() ? 'bg-slate-300' : 'bg-slate-100'
]

let placeholder = 'Rest'

let selectedActivity = ref()

function setProperTime() {
   let selectedTask = props.tasks.filter((t) => t.activity == selectedActivity.value)[0]
   let taskTime = 0
   for (let el in selectedTask) {
      if (el == 'time') {
         taskTime = selectedTask[el]
      }
   }
   return taskTime
}

watch(
   () => selectedActivity.value,
   () => {
      setProperTime()
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
            <base-button
               :background="'text-white bg-red-500 hover:bg-red-700 duration-500'"
               @clickButton="setSelectedActivity(0)"
               ><MinusCircleIcon class="w-12"
            /></base-button>
         </div>
         <timeline-timer :seconds="setProperTime()" />
      </div>
   </li>
</template>
