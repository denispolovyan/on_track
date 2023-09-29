<script setup>
import ActivityItem from '../components/ActivityItem.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseHorizontalButton from '../components/BaseHorizontalButton.vue'
import NoTaskComponent from '../components/NoTaskComponent.vue'

import { isTasksValid, isActivitiesValid } from '../validators.js'

import { PlusCircleIcon } from '@heroicons/vue/24/outline'

defineProps({
   userActivities: {
      type: Array,
      required: false,
      validator(value) {
         return isActivitiesValid(value)
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

defineEmits({
   addActivity: {
      type: String
   },
   addTask: {
      required: false
   },
})

</script>

<template>
   <div>
      <div class="flex flex-col gap-2 z-20">
         <base-input
            class="w-full"
            @addNewValue="$emit('addActivity', $event)"
            :placeholder="'Create new activity'"
				:userActivities="userActivities"
            ><PlusCircleIcon class="w-12"
         /></base-input>
         <base-horizontal-button
            :text="'add new task'"
            :color="'text-black hover:text-white hover:bg-green-500  bg-stone-100'"
            @clickButton="$emit('addTask')"
         />
      </div>
      <ul class="flex flex-col">
         <activity-item
            v-for="task in tasks"
            :key="task.id"
            :activities="userActivities"
            :task="task"
				:tasks="tasks"
         />
      </ul>
      <no-task-component v-if="!tasks.length" />
   </div>
</template>
