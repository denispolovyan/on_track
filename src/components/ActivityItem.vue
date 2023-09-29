<script setup>
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import BaseHorizontalButton from './BaseHorizontalButton.vue'

import { MinusIcon, TrashIcon, DocumentCheckIcon } from '@heroicons/vue/24/outline'

import { isNumber, isOptionListValid, isTaskValid, isTasksValid } from '../validators.js'

import { generateActivityTimes } from '../functions.js'

import { ref, inject } from 'vue'

defineProps({
   activities: {
      type: Array,
      required: true,
      validator(value) {
         return isOptionListValid(value)
      }
   },
   task: {
      type: Object,
      required: true,
      validator(value) {
         return isTaskValid(value)
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

const selectedActivity = ref(0)

const setSecondsToCompleteInject = inject('setSecondsToComplete')
const deleteTaskInject = inject('deleteTask')
const setSelectedActivityInject = inject('setSelectedActivity')
const deleteActivityInject = inject('deleteActivity')

function setSelectedActivity(activity, task) {
   selectedActivity.value = activity

   if (isNumber(activity)) {
      setSelectedActivityInject({ value: activity, id: task.id })
   }
}

function setSecondsToComplete(time, task, checkbox) {
   if (isNumber(time) && checkbox) {
      setSecondsToCompleteInject({ value: time, id: task.id })
   } else {
      setSecondsToCompleteInject({ value: 0, id: task.id })
   }
}

function deleteTask(id) {
   if (isNumber(id)) {
      deleteTaskInject(id)
   }
}
</script>

<template>
   <li class="flex flex-col gap-2 border-b border-slate-200 py-6">
      <div class="flex justify-between items-center border rounded-md bg-stone-100">
         <base-select
            :placeholder="'Rest'"
            :optionsList="activities"
            :selected="task.activity"
            :tasks="tasks"
            @select="setSelectedActivity($event, task)"
         />
         <base-button
            v-if="!task.done"
            @clickButton="deleteActivityInject(selectedActivity)"
            :background="'bg-rose-600 hover:bg-rose-800 text-white duration-500'"
            ><TrashIcon class="h-12"
         /></base-button>
			<base-button
            v-else
            :background="'bg-teal-600 hover:bg-teal-800 text-white duration-500'"
            ><DocumentCheckIcon class="h-12"
         /></base-button>
      </div>
      <div
         class="flex justify-between items-center border rounded-md bg-stone-100"
         v-if="!task.done"
      >
         <base-select
            :placeholder="'h:m:s'"
            :optionsList="generateActivityTimes()"
            :selected="task.time"
            @select="setSecondsToComplete($event, task, true)"
            class="border-r"
         />
         <base-button
            v-if="!task.done"
            @clickButton="setSecondsToComplete($event, task, false)"
            :background="'bg-yellow-500 text-white hover:bg-yellow-600 duration-500'"
            ><MinusIcon class="h-12"
         /></base-button>
      </div>
      <BaseHorizontalButton
         @clickButton="deleteTask(task.id)"
         :text="'delete task'"
         :color="'text-black hover:text-white hover:bg-red-500  bg-stone-100'"
      />
   </li>
</template>
