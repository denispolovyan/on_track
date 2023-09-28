<script setup>
import { ArrowPathIcon, ChevronRightIcon, PauseCircleIcon } from '@heroicons/vue/24/outline'

import BaseButton from './BaseButton.vue'

import { isNumber } from '../validators.js'

import { normalizeTime } from '../functions'

import { ref, onMounted, watch } from 'vue'

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
   },
   process: {
      type: Number,
      required: true,
      validator(value) {
         return isNumber(value)
      }
   }
})

const emits = defineEmits({
   setSeconds: {
      type: Object,
      required: false
   }
})

let time = ref(props.seconds)
let isRunning = ref()

function start() {
   if (time.value) {
      isRunning.value = setInterval(() => {
         if (time.value) {
            time.value = time.value - 1
            emits('setSeconds', { seconds: time.value, checkbox: false, process: 1 })
         } else {
            stop()
         }
      }, 1000)
   }
}

function stop() {
   clearInterval(isRunning.value)
   isRunning.value = false
   emits('setSeconds', { seconds: time.value, checkbox: false, process: 0, isRunning: isRunning.value})
}

function reset() {
   clearInterval(isRunning.value)
   isRunning.value = false
   time.value = props.seconds
   emits('setSeconds', { seconds: time.value, checkbox: true, process: 0 })
}

onMounted(() => {
   setTimeout(() => {
      time.value = props.seconds
   }, 500)
})

watch(
   () => props.seconds,
   () => {
      time.value = props.seconds
   }
)

watch(
   () => props.process,
   () => {
      !props.process ? stop() : null
   }
)
</script>

<template>
   <div class="flex items-center justify-between">
      <div class="flex gap-2">
         <BaseButton
            v-if="process || isRunning"
            @click="stop()"
            :background="'text-white duration-500 rounded-md bg-red-500  hover:bg-red-700'"
         >
            <PauseCircleIcon class="w-12"
         /></BaseButton>
         <BaseButton
            v-else
            @click="start()"
            :background="`duration-500 text-white rounded-md ${
               !time ? 'bg-green-200 cursor-auto' : 'bg-green-500 hover:bg-green-700'
            }`"
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
