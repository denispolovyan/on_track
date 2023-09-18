<script setup>
import ActivityItem from '../components/ActivityItem.vue'

import { isActivityValid } from '../validators.js'

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
   }
})
</script>

<template>
   <div>
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
