<script setup>
import { isBackgroundClassValid } from '../validators.js'

defineProps({
   background: {
      type: String,
      required: true,
      validator: isBackgroundClassValid
   }
})
</script>

<template>
   <span class="p-1 rounded-r-md cursor-pointer" :class="background" @click="$emit('clickButton')">
      <slot></slot>
   </span>
</template>
