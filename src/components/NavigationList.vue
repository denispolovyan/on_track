<script setup>
import NavItem from './NavItem.vue'

//////// VUE

import { watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

//////// CONSTANTS

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '../constants.js'

//////// ICONS

import { ClockIcon } from '@heroicons/vue/24/outline'
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'
import { ForwardIcon } from '@heroicons/vue/24/outline'

//////// PAGE FOR ICONS

const navItems = {
   [PAGE_TIMELINE]: ClockIcon,
   [PAGE_ACTIVITIES]: ForwardIcon,
   [PAGE_PROGRESS]: ClipboardDocumentListIcon
}

//////// ROUTER

const router = useRouter()
const route = useRoute()

////////

function normalizePageHash(newUrl) {
   if (!newUrl) {
      router.push('#' + PAGE_ACTIVITIES)
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
   if (!Object.keys(navItems).includes(window.location.hash.slice(1))) {
      router.push('#' + PAGE_ACTIVITIES)
   }
})
</script>

<template>
   <nav class="sticky bottom-0 z-20 border-t bg-white">
      <ul class="divide-x flex items-center justify-around">
         <nav-item
            v-for="(icon, title) in navItems"
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
