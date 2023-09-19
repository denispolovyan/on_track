<script setup>
import ActivityItem from '../components/ActivityItem.vue'
import BaseInput from '../components/BaseInput.vue'


import { PlusCircleIcon } from '@heroicons/vue/24/outline'

import { DEFAULT_TASKS_QUANTITY } from '../constants.js'

defineProps({
   userActivities: {
      type: Array,
      required: false
   }
})

defineEmits({
   deleteActivity: {
      type: String,
      required: true,
   },
   addActivity: {
      type: String
   }
})
</script>

<template>
   <div>
      <base-input @addNewValue="$emit('addActivity', $event)" :placeholder="'Create new activity'"
         ><PlusCircleIcon class="w-12"
      /></base-input>
      <ul class="flex flex-col">
         <activity-item
            v-for="num in DEFAULT_TASKS_QUANTITY"
            :key="num"
            :activities="userActivities"
            @deleteActivity="$emit('deleteActivity', $event)"
         />

      </ul>
   </div>
</template>
