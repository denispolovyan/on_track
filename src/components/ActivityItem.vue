<script setup>
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'

import { MinusIcon, TrashIcon } from '@heroicons/vue/24/outline'

import { timeList } from '../constants.js'

import { isActivityValid } from '../validators.js'

import { ref } from 'vue'

defineProps({
   activity: {
      type: String,
      required: true,
      validator: isActivityValid
   }
})

defineEmits({
   deleteActivity: {
      type: String,
      validator: isActivityValid
   }
})

const secondsToComplete = ref(0)
</script>

<template>
   <li class="flex flex-col gap-2 border-b py-4">
      <div class="flex justify-between items-center border rounded-md ps-2 bg-stone-100">
         <span>{{ activity }}</span>
         <base-button @click="$emit('deleteActivity', activity)" :background="'text-rose-800'"
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
   </li>
</template>
