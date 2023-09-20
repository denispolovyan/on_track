<script setup>
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import BaseHorizontalButton from './BaseHorizontalButton.vue'

import { MinusIcon, TrashIcon } from '@heroicons/vue/24/outline'

import { TIME_LIST } from '../constants.js'

import { ref } from 'vue'

const props = defineProps({
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
   setSelectedActivity: {
      type: Object,
      required: true
   },
   setSecondsToComplete: {
      type: Object,
      required: true
   }
})

// const secondsToComplete = ref(props.task.time && 0)
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
            @select="
               $emit('setSelectedActivity', { value: $event, id: task.id }),
                  setSelectedActivity($event)
            "
         />
         <base-button
            @clickButton="$emit('deleteActivity', selectedActivity)"
            :background="'text-rose-800'"
            ><TrashIcon class="h-12 border-l"
         /></base-button>
      </div>
      <div class="flex justify-between items-center border rounded-md bg-stone-100">
         <base-select
            :placeholder="'h:m'"
            :optionsList="TIME_LIST"
            :selected="task.time"
            @select="$emit('setSecondsToComplete', { value: $event, id: task.id })"
            class="border-r"
         />
         <base-button
            @clickButton="$emit('setSecondsToComplete', { value: 0, id: task.id })"
            :background="'text-yellow-600'"
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
