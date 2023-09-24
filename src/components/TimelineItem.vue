<script setup>
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import BaseButton from './BaseButton.vue'
import TimelineTimer from './TimelineTimer.vue'

import { isNumber, isOptionListValid } from '../validators.js'

import { MinusCircleIcon } from '@heroicons/vue/24/outline'

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
   }
})

const emit = defineEmits({
   setSelectedActivity: {
      type: Number,
      required: true
   }
})

let placeholder = 'Rest'

const hourItemClasses = [
   props.timelineItem.hour == new Date().getHours() ? 'bg-slate-300' : 'bg-slate-100'
]

function setSelectedActivity(activity) {
   if (isNumber(activity)) {
      emit('setSelectedActivity', { activity: activity, hour: props.timelineItem.hour })
   }
}
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
      <timeline-timer :seconds="600"/>
		</div>
   </li>
</template>
