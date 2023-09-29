<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

import { useRouter } from 'vue-router'
import { isNumber, isString } from '../validators';

const router = useRouter()

const props = defineProps({
	progress: {
		type: Number,
		required: true,
		default(){
			return 0;
		},
		validator(value){
			return isNumber(value)
		}
	}, 
	progressStyle: {
		type: String,
		required: true,
		default(){
			return 'bg-red-500'
		},
		validator(value){
			return isString(value)
		}
	}
})

function setCurrentPage(location) {
   router.push('#' + location)
}
</script>

<template>
   <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-2 py-5">
      <img @click="setCurrentPage('activities')" class="h-14 cursor-pointer" src="../assets/images//Logo.png" alt="Logo" />
      <div class="flex gap-1 items-center font-semibold cursor-pointer" v-if="false">
         <a @click="setCurrentPage('timeline')" class="">All done</a>
         <CheckCircleIcon class="w-5" />
      </div>
      <div class="flex gap-1 items-center font-semibold cursor-pointer" v-else>
         <a @click="setCurrentPage('progress')" class="">Progress</a>
         <p>{{ Math.round(props.progress) }} %</p>
         <p class="w-4 h-4 rounded-full" :class="progressStyle"></p>
      </div>
   </header>
</template>
