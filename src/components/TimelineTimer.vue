<script setup>
import { StopCircleIcon, ArrowPathIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

import BaseButton from './BaseButton.vue'

import { isNumber } from '../validators.js'

import { normalizeTime } from '../functions'

import { ref } from 'vue'

const props = defineProps({
   seconds: {
      type: Number,
      required: false,
      default() {
         return 0
      },
      validator(value) {
         return isNumber(value)
      }
   }
})

let time = ref(props.seconds)
const isRunning = ref(false)

function start() {
   if (time.value) {
      isRunning.value = setInterval(() => {
         time.value = time.value - 1
      }, 1000)
   }
}

function stop() {
   clearInterval(isRunning.value)
   isRunning.value = false
}

function reset() {
   clearInterval(isRunning.value)
   isRunning.value = false
   time.value = 0
}
</script>

<template>
   <div class="flex items-center justify-between">
      <div class="flex gap-2">
         <BaseButton
            v-if="isRunning"
            @click="stop()"
            :background="'text-white bg-red-500 hover:bg-red-700 duration-500 rounded-md'"
         >
            <StopCircleIcon class="w-12"
         /></BaseButton>
         <BaseButton
            v-else
            @click="start()"
            :background="`duration-500 text-white rounded-md ${!time ? 'bg-green-200 cursor-auto' :'bg-green-500 hover:bg-green-700' }`"
         >
            <ChevronRightIcon class="w-12"
         /></BaseButton>
         <BaseButton
            @click="reset()"
            :background="`text-white duration-500 rounded-md ${
               !time ? 'bg-yellow-200 cursor-auto' : 'bg-yellow-500 hover:bg-yellow-600'
            }`"
         >
            <ArrowPathIcon class="w-12"
         /></BaseButton>
      </div>
      <div class="font-mono text-3xl p-2.5 rounded-md bg-cyan-600 text-white">
         {{ normalizeTime(time) }}
      </div>
   </div>
</template>
