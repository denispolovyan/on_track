<script setup>
import { ref } from 'vue'

import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import BaseButton from './BaseButton.vue'

// import { optionsList } from '../constants.js'
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
   }
})

let placeholder = 'Rest'
let selected = ref(0)

const hourItemClasses = [
   'pl-4 my-4 border-b rounded-md cursor-pointer flex justify-between items-center',
   props.timelineItem.hour == new Date().getHours() ? 'bg-zinc-300' : 'bg-zinc-100'
]
</script>

<template>
   <li :class="hourItemClasses">
      <timeline-hour :hour="timelineItem.hour" class="pr-4 py-4 border-r border-slate-300" />
      <div class="flex items-center gap-4">
         <base-select
            :optionsList="activities"
            :placeholder="placeholder"
            :selected="selected"
            @select="selected = $event"
         />
         <base-button :background="'text-white bg-red-500 hover:bg-red-700 duration-500'" @clickButton="selected = 0"
            ><MinusCircleIcon class="w-12"
         /></base-button>
      </div>
   </li>
</template>
