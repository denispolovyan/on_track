<script setup>
import { isOptionListValid } from '../validators.js'
import { isNumberNull } from '../functions.js'

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
      required: true
   },
   selected: {
      type: Number,
      required: true
   }
})

const emit = defineEmits({
   select: {
      type: Object,
      required: false
   }
})

function setSelectedActivity(activity) {
   emit('select', activity)
}

const optionsListItem = ['w-44 h-14 px-2 bg-stone-100 truncate']
</script>

<template>
   <select :class="optionsListItem" @change="setSelectedActivity(Number($event.target.value))">
      <option :selected="isNumberNull(selected)" disabled>
         {{ placeholder }}
      </option>
      <option
         v-for="option in optionsList"
         :key="option.name"
         :value="option.value"
         :selected="option.value == selected"
      >
         {{ option.name }}
      </option>
   </select>
</template>
