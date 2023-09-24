import { HOURS_IN_DAY, SECONDS_QUANTITY_ARRAY } from './constants.js'

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

// -- //

export function normalizeTime(seconds) {
   if (seconds < 3600) {
      let minutes = Math.floor(seconds / 60)
      let normalizedSeconds = seconds - minutes * 60

      minutes = minutes < 10 ? `0${minutes}` : minutes
      normalizedSeconds = normalizedSeconds < 10 ? `0${normalizedSeconds}` : normalizedSeconds

      return `00:${minutes}:${normalizedSeconds}`
   } else if (seconds <= 86400) {
      let hours = Math.floor(seconds / 3600)
      let minutes = Math.floor(seconds / 60) - hours * 60
      let normalizedSeconds = seconds - hours * 3600 - minutes * 60

      hours = hours < 10 ? `0${hours}` : hours
      minutes = minutes < 10 ? `0${minutes}` : minutes
      normalizedSeconds = normalizedSeconds < 10 ? `0${normalizedSeconds}` : normalizedSeconds

      return `${hours}:${minutes}:${normalizedSeconds}`
   }
   return '--:--:--'
}

// -- //

export function generateActivityTimes() {
   let activityTimes = []

   SECONDS_QUANTITY_ARRAY.forEach((seconds) => {
      activityTimes.push({ value: activityTimes.length + 1, name: normalizeTime(seconds) })
   })

   return activityTimes
}
