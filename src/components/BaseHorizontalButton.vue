<script setup>
import { isString } from '../validators'

defineProps({
   text: {
      type: String,
      required: true,
      validator(value) {
         return isString(value)
      }
   },
   color: {
      type: String,
      required: false,
      validator(value) {
         return isString(value)
      }
   }
})

defineEmits(['clickButton'])
</script>

<template>
   <div
      @click="$emit('clickButton')"
      class="w-full h-12 border rounded-md flex justify-center items-center duration-700 uppercase font-semibold cursor-pointer"
      :class="color"
   >
      <p>{{ text }}</p>
   </div>
</template>
