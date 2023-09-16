<script setup>
import NavItem from './NavItem.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '../constants.js'

import { ClockIcon } from '@heroicons/vue/24/outline'
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'
import { ForwardIcon } from '@heroicons/vue/24/outline'


const navItems = {
   [PAGE_TIMELINE]: ClockIcon,
   [PAGE_ACTIVITIES]: ForwardIcon,
   [PAGE_PROGRESS]: ClipboardDocumentListIcon
}

const router = useRouter()
let currentPage = ref(normalizePageHash())

function normalizePageHash() {
   console.log(window.location.hash)

   const hash = window.location.hash.slice(1)

   if (Object.keys(navItems).includes(hash)) {
      return hash
   }

   router.push('#' + PAGE_ACTIVITIES)
   return PAGE_ACTIVITIES
}
</script>

<template>
   <nav class="sticky bottom-0 z-20 border-t bg-white">
      <ul class="divide-x flex items-center justify-around">
         <nav-item
            v-for="(icon, title) in navItems"
            :key="title"
            @click="(currentPage = title), normalizePageHash()"
            :href="`#${title}`"
            :class="{
               ' bg-gray-200 pointer-events-none': currentPage == title
            }"
         >
            <p class="capitalize">{{ title }}</p>
            <component :is="icon" class="w-8 pt-1" />
         </nav-item>
      </ul>
   </nav>
</template>
