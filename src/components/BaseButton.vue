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
   <span class="p-1 rounded-md cursor-pointer"
	:class="background">
      <slot></slot>
   </span>
</template>
