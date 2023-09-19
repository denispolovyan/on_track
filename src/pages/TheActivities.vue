<script setup>
import ActivityItem from '../components/ActivityItem.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseHorizontalButton from '../components/BaseHorizontalButton.vue'

import { PlusCircleIcon } from '@heroicons/vue/24/outline'

import { DEFAULT_TASKS_QUANTITY } from '../constants.js'

import { ref } from 'vue'

defineProps({
   userActivities: {
      type: Array,
      required: false
   },
   tasks: {
      type: Array,
      required: false
   }
})

defineEmits({
   deleteActivity: {
      type: String,
      required: true
   },
   addActivity: {
      type: String
   }
})

const tasksQuantity = ref(DEFAULT_TASKS_QUANTITY)

function changeTasksQuantity() {
	console.log(1)
   tasksQuantity.value = tasksQuantity.value + 1
}
</script>

<template>
   <div>
      <div class="flex flex-col gap-2">
         <base-input
            @addNewValue="$emit('addActivity', $event)"
            :placeholder="'Create new activity'"
            ><PlusCircleIcon class="w-12"
         /></base-input>
         <base-horizontal-button
            :text="'add new task'"
            :color="'text-black hover:text-white hover:bg-green-500  bg-stone-100'"
            @clickButton="changeTasksQuantity()"
         />
      </div>
      <ul class="flex flex-col">
         <activity-item
            v-for="num in tasks || tasksQuantity"
            :key="num"
            :activities="userActivities"
            @deleteActivity="$emit('deleteActivity', $event)"
         />
      </ul>
   </div>
</template>
