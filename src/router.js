import Welcome from './components/Welcome.vue'
import Login from './components/Login.vue'

import VueRouter from 'vue-router'

const routes = [
  { path: '*', redirect: "/welcome" },
  { path: '/welcome', component: Welcome },
  {path: '/login', component: Login}
  
]

const router = new VueRouter({
  routes
})

export default router