import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import JobDetails from '../views/JobDetails.vue'
import EditJob from '../views/EditJob.vue'
import AddJob from '../views/Addjob.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/JobDetails/:id',
    name: 'JobDetails',
    component: JobDetails
  },
  {
    path: '/EditJob/:id',
    name: 'EditJob',
    component: EditJob
  }, 
  {
    path: '/AddJob',
    name: 'AddJob',
    component: AddJob
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
