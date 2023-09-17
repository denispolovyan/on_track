<script setup>
import TimelineItem from '../components/TimelineItem.vue'

import { generateTimelineItems } from '../functions.js'
</script>

<template>
   <div>
      <ul>
         <timeline-item
            v-for="timelineItem in generateTimelineItems()"
            :key="timelineItem.hour"
            :timelineItem="timelineItem"
         />
      </ul>
   </div>
</template>
