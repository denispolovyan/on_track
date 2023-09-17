<script setup>
import NavItem from './NavItem.vue'

//////// VUE

import { watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

//////// CONSTANTS

import {PAGE_ACTIVITIES} from '../constants.js'
import {NAV_ITEMS} from '../constants.js'

//////// ROUTER

const router = useRouter()
const route = useRoute()

////////

function normalizePageHash(newUrl = '') {
   if (!newUrl) {
      router.push('#' + PAGE_ACTIVITIES)
		return;
   }

   router.push(newUrl.slice(1))
}

watch(
   () => route['fullPath'],
   (newPage) => {
      normalizePageHash(newPage)
   }
)

onMounted(() => {
   normalizePageHash()
})
</script>

<template>
   <nav class="sticky bottom-0 z-20 border-t bg-white">
      <ul class="divide-x flex items-center justify-around">
         <nav-item
            v-for="(icon, title) in NAV_ITEMS"
            :key="title"
            @click="normalizePageHash()"
            :href="`#${title}`"
            :class="{
               ' bg-gray-200 pointer-events-none': $route['fullPath'].slice(2) == title
            }"
         >
            <p class="capitalize">{{ title }}</p>
            <component :is="icon" class="w-8 pt-1" />
         </nav-item>
      </ul>
   </nav>
</template>
