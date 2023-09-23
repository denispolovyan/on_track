<script setup>
import ActivityItem from '../components/ActivityItem.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseHorizontalButton from '../components/BaseHorizontalButton.vue'
import NoTaskComponent from '../components/NoTaskComponent.vue'

import { PlusCircleIcon } from '@heroicons/vue/24/outline'

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
   },
   addTask: {
      required: false
   },
   deleteTask: {
      type: Number,
      required: true
   },
   setSelectedActivity: {
      type: Object,
      required: true,
   },
   setSecondsToComplete: {
      type: Object,
      required: true
   }
})
</script>

<template>
   <div>
      <div class="flex flex-col gap-2 z-20">
         <base-input
            class="w-full"
            @addNewValue="$emit('addActivity', $event)"
            :placeholder="'Create new activity'"
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
            @deleteActivity="$emit('deleteActivity', $event)"
            @deleteTask="$emit('deleteTask', $event)"
            @setSelectedActivity="$emit('setSelectedActivity', $event)"
            @setSecondsToComplete="$emit('setSecondsToComplete', $event)"
         />
      </ul>
			<no-task-component v-if="!tasks.length" />
   </div>
</template>
