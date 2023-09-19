<script setup>
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import BaseHorizontalButton from './BaseHorizontalButton.vue'

import { MinusIcon, TrashIcon } from '@heroicons/vue/24/outline'

import { timeList } from '../constants.js'

import { ref } from 'vue'

defineProps({
   activities: {
      type: Array,
      required: true
   }
})

defineEmits({
   deleteTask: {
      type: Object,
      required: false
   },
   deleteActivity: {
      type: Number,
      required: false
   }
})

const secondsToComplete = ref(0)
const selectedActivity = ref(0)

function setSelectedActivity(activity) {
   selectedActivity.value = activity
}
</script>

<template>
   <li class="flex flex-col gap-2 border-b py-4">
      <div class="flex justify-between items-center border rounded-md bg-stone-100">
         <base-select
            :placeholder="'Rest'"
            :optionsList="activities"
            :selected="selectedActivity"
            @select="setSelectedActivity($event)"
         />
         <base-button
            @click="$emit('deleteActivity', selectedActivity)"
            :background="'text-rose-800'"
            ><TrashIcon class="h-12 border-l"
         /></base-button>
      </div>
      <div class="flex justify-between items-center border rounded-md bg-stone-100">
         <base-select
            :placeholder="'h:m'"
            :optionsList="timeList"
            :selected="secondsToComplete"
            @select="secondsToComplete = $event"
            class="border-r"
         />
         <base-button @click="secondsToComplete = 0" :background="'text-yellow-600'"
            ><MinusIcon class="border-l h-12"
         /></base-button>
      </div>
      <BaseHorizontalButton
         :text="'delete task'"
         :color="'text-black hover:text-white hover:bg-red-500  bg-stone-100'"
      />
   </li>
</template>
