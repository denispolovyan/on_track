import { HOURS_IN_DAY } from './constants.js'

// -- //

export function isNumberNull(number) {
   return number == 0
}

// -- //

export function generateTimelineList() {
   const timelineItems = []

   for (let i = 0; i < HOURS_IN_DAY; i++) {
      timelineItems.push({ hour: i, activity: 0 })
   }

   return timelineItems
}
