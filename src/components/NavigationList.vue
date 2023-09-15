<script setup>
import NavItem from './NavItem.vue'

import { ref } from 'vue'

import { ClockIcon } from '@heroicons/vue/24/outline'
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'
import { ForwardIcon } from '@heroicons/vue/24/outline'

const navItems = {
   timeline: ClockIcon,
   progress: ForwardIcon,
   activities: ClipboardDocumentListIcon
}

let currentPage = ref('timeline')
</script>

<template>
   <nav class="sticky bottom-0 z-20 border-t bg-white">
      <ul class="divide-x flex items-center justify-around ">
         <nav-item
            v-for="(icon, title) in navItems"
            :key="title"
            @click="currentPage = title"
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
