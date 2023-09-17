export function generateTimelineItems() {
   const HOURS_IN_DAY = 24
   const timelineItems = []

   for (let i = 0; i < HOURS_IN_DAY; i++) {
      timelineItems.push({ hour: i })
   }

   return timelineItems
}
