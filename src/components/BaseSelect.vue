<script setup>
import { isOptionListValid, isPlaceholderValid } from '../validators.js'

import { isNumberNull } from '../functions.js'

import { isNumber, isTasksValid } from '../validators.js'

import { onMounted, ref, watch } from 'vue'

const prop = defineProps({
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
      validator(value) {
         return isNumber(value)
      }
   },
   tasks: {
      type: Array,
      required: false,
      validator(value) {
         return isTasksValid(value)
      }
   }
})

const emit = defineEmits({
   select: {
      type: Number,
      required: true
   }
})

const disabledActivities = ref([])

function setSelectedActivity(activity) {
   if (prop.tasks) {
		disabledActivities.value = []
      prop.tasks.forEach((task) => {
			if(task.activity != activity) {
				disabledActivities.value.push(task.activity)
         }
      })
   }

   if (isNumber(activity)) {
      emit('select', activity)
   }
}

onMounted(() => {
   setSelectedActivity(prop.selected)
})

watch(
   () => prop.tasks,
   () => {
      setSelectedActivity()
   },
	{deep: true}
)
</script>

<template>
   <select
      class="w-44 h-14 px-2 bg-stone-100 truncate"
      @change="setSelectedActivity(Number($event.target.value))"
   >
      <option :selected="isNumberNull(selected)" disabled>
         {{ placeholder }}
      </option>
      <option
         v-for="option in optionsList"
         :key="option.name"
         :value="option.value"
         :selected="option.value == selected"
         :disabled="disabledActivities.includes(option.value)"
         class="capitalize"
      >
         {{ option.name }}
      </option>
   </select>
</template>
