<script setup>
defineProps({
   optionsList: {
      type: Array,
      required: true,
		validator(optionsList){
			return optionsList.every(({value, name}) => typeof value === 'number' && typeof name === 'string')
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

const optionsListItem = ['w-44 h-9 rounded-md px-1 bg-stone-100 truncate']
</script>

<template>
   <select :class="optionsListItem" name="" id="">
      <option selected disabled value="">
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
