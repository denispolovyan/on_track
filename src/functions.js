import {HOURS_IN_DAY} from './constants.js'

// -- //

export function generateTimelineItems() {
   const timelineItems = []

   for (let i = 0; i < HOURS_IN_DAY; i++) {
      timelineItems.push({ hour: i })
   }

   return timelineItems
}

// -- //

export function isNumberNull(number) {
   return number == 0
}