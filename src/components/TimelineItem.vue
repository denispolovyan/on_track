<script setup>
import { ref } from 'vue'

import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import BaseButton from './BaseButton.vue'

import { isTimelineValid } from '../validators.js'

import { MinusCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
   timelineItem: {
      type: Object,
      required: true,
      validator(timelineItem) {
         return isTimelineValid(timelineItem)
      }
   },
   activities: {
      type: Array,
      required: false
   },
   id: {
      type: Number,
      required: true
   }
})

let placeholder = 'Rest'
let selected = ref(0)

const hourItemClasses = [
   props.timelineItem.hour == new Date().getHours() ? 'bg-slate-300' : 'bg-slate-100'
]
</script>

<template>
   <li class="flex flex-col" :id="id">
      <div class="text-center mb-8 relative">
         <timeline-hour
            :hour="timelineItem.hour"
            class="items-center px-2 py-1 rounded-md bg-stone-200 border"
            :class="hourItemClasses"
         />
         <div class="border-b -mt-3"></div>
      </div>
      <div class="border flex items-center justify-between rounded-md bg-zinc-100">
         <base-select
            class="border-r"
            :optionsList="activities"
            :placeholder="placeholder"
            :selected="selected"
            @select="selected = $event"
         />
         <base-button
            :background="'text-white bg-red-500 hover:bg-red-700 duration-500'"
            @clickButton="selected = 0"
            ><MinusCircleIcon class="w-12"
         /></base-button>
      </div>
   </li>
</template>
