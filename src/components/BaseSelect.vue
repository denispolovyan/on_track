<script setup>
import { isOptionListValid, isPlaceholderValid } from '../validators.js'

import { isNumberNull } from '../functions.js'
import {  isNumber } from '../validators.js'


defineProps({
   optionsList: {
      type: Array,
      required: true,
      validator(optionsList) {
         return isOptionListValid(optionsList)
      }
   },
   placeholder: {
      type: String,
		required: true,
      validator(value) {
         return isPlaceholderValid(value)
      }
   },
   selected: {
      type: Number,
      required: true,
		validator(value){
			return isNumber(value)
		}
   }
})

const emit = defineEmits({
   select: {
      type: Number,
      required: true,
   }
})

function setSelectedActivity(activity) {
   if(isNumber(activity)){
		emit('select', activity)
	}

}
</script>

<template>
   <select class="w-44 h-14 px-2 bg-stone-100 truncate" @change="setSelectedActivity(Number($event.target.value))">
      <option :selected="isNumberNull(selected)" disabled>
         {{ placeholder }}
      </option>
      <option
         v-for="option in optionsList"
         :key="option.name"
         :value="option.value"
         :selected="option.value == selected"
         class="capitalize"
      >
         {{ option.name }}
      </option>
   </select>
</template>
