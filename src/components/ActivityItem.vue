<script setup>
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import BaseHorizontalButton from './BaseHorizontalButton.vue'

import { MinusIcon, TrashIcon } from '@heroicons/vue/24/outline'

import { TIME_LIST } from '../constants.js'

import { ref } from 'vue'
import { isNumberNull } from '../functions'

defineProps({
   activities: {
      type: Array,
      required: true
   },
   task: {
      type: Object,
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
   },
   deleteTask: {
      type: Number,
      required: true
   }
})

const secondsToComplete = ref(0)
const selectedActivity = ref(0)

function setSelectedActivity(activity) {
   selectedActivity.value = activity
}
</script>

<template>
   <li class="flex flex-col gap-2 border-b border-slate-200 py-6">
      <div class="flex justify-between items-center border rounded-md bg-stone-100">
         <base-select
            :placeholder="'Rest'"
            :optionsList="activities"
            :selected="task.activity"
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
            :optionsList="TIME_LIST"
            :selected="task.time"
            @select="secondsToComplete = $event"
            class="border-r"
         />
         <base-button @click="secondsToComplete = 0" :background="'text-yellow-600'"
            ><MinusIcon class="border-l h-12"
         /></base-button>
      </div>
      <BaseHorizontalButton
         @clickButton="$emit('deleteTask', task.id)"
         :text="'delete task'"
         :color="'text-black hover:text-white hover:bg-red-500  bg-stone-100'"
      />
   </li>
</template>
