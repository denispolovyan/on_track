import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
// import TheActivities from '../views/TheActivities.vue'
// import TheTimeline from '../views/TheTimeline.vue'
// import TheProgress from '../views/TheProgress.vue'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: App
      },
      // {
      //    path: '/progress',
      //    name: 'progress',
      //    component: TheProgress
      // },
      // {
      //    path: '/activities',
      //    name: 'activities',
      //    component: TheActivities
      // },
      // {
      //    path: '/timeline',
      //    name: 'timeline',
      //    component: TheTimeline
      // }
   ]
})

export default router
