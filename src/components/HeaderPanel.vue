<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['goToActivities'])

function setCurrentPage(location) {
   router.push('#' + location)
}
</script>

<template>
   <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-10 py-5">
      <img @click="setCurrentPage('activities')" class="h-14" src="../assets/Logo.png" alt="Logo" />
      <div class="flex gap-1 items-center font-semibold" v-if="false">
         <a @click="setCurrentPage('timeline')" class="">All done</a>
         <CheckCircleIcon class="w-5" />
      </div>
      <div class="flex gap-1 items-center font-semibold" v-else>
         <a @click="setCurrentPage('progress')" class="">Progress</a>
         <p>20%</p>
         <p class="w-4 h-4 bg-red-600 rounded-full"></p>
      </div>
   </header>
</template>
