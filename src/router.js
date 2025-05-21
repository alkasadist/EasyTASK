import { createRouter, createWebHistory } from 'vue-router'
import Index from './views/Index.vue'
import Features from './views/Features.vue'
import Faq from './views/Faq.vue'
import Login from './views/Login.vue'
import Registration from './views/Registration.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/features', component: Features },
  { path: '/faq', component: Faq },
  { path: '/login', component: Login },
  { path: '/registration', component: Registration },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
