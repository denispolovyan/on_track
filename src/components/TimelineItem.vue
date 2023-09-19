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
   props.timelineItem.hour == new Date().getHours() ? 'bg-stone-400' : 'bg-stone-200'
]
</script>

<template>
   <li :class="hourItemClasses">
      <timeline-hour :hour="timelineItem.hour" class="pr-2 py-4 border-r border-slate-300" />
      <div class="flex gap-2 items-center">
         <base-select
            :optionsList="activities"
            :placeholder="placeholder"
            :selected="selected"
            @select="selected = $event"
         />
         <base-button :background="'text-rose-600'" @click="selected = 0"
            ><MinusCircleIcon class="w-12"
         /></base-button>
      </div>
   </li>
</template>
