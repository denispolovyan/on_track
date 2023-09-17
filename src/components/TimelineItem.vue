<script setup>
import BaseSelect from './BaseSelect.vue'
import { optionsList } from '../constants.js'
import { FireIcon } from '@heroicons/vue/24/outline'


const props = defineProps({
   timelineItem: {
      type: Object,
      required: true,
		validator(timelineItem){
				return typeof timelineItem.hour == 'number'
		}
   },
})

const selectInfo = {
   placeholder: 'Rest',
   selected: 1,
}

const hourItemClasses = [
   'py-3 px-4 my-4 border-b rounded-md cursor-pointer flex justify-between items-center',
   props.timelineItem.hour == new Date().getHours() ? 'bg-stone-400' : 'bg-stone-300'
]
</script>

<template>
   <li :class="hourItemClasses">
      <a href="" class="">{{ timelineItem.hour }}:00</a>
      <div class="flex gap-2 items-center">
         <base-select
            :optionsList="optionsList"
            :placeholder="selectInfo.placeholder"
            :selected="selectInfo.selected"
         />
         <FireIcon class="w-7 cursor-pointer" />
      </div>
   </li>
</template>
