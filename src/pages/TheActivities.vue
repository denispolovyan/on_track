<script setup>
import ActivityItem from '../components/ActivityItem.vue'
import BaseInput from '../components/BaseInput.vue'

import { PlusCircleIcon } from '@heroicons/vue/24/outline'

import { isActivityValid, isInputValueValid } from '../validators.js'

defineProps({
   activities: {
      type: Array,
      required: false
   }
})

defineEmits({
   deleteActivity: {
      type: String,
      required: true,
      validator: isActivityValid
   },
   addNewValue: {
      type: String,
      validator: isInputValueValid
   }
})
</script>

<template>
   <div>
      <base-input @addNewValue="$emit('addNewValue', $event)" :placeholder="'Create new activity'"
         ><PlusCircleIcon class="w-12"
      /></base-input>
      <ul class="flex flex-col">
         <activity-item
            v-for="activity in activities"
            :key="activity"
            :activity="activity"
            @deleteActivity="$emit('deleteActivity', $event)"
         />
      </ul>
   </div>
</template>
