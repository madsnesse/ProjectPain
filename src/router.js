import Welcome from './components/Welcome.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import VueRouter from 'vue-router'
import Painregistry from './components/Painregistry.vue'
import Painstrength from './components/Painstrength.vue'

const routes = [
  { path: '*', redirect: "/home" },
  { path: '/welcome', component: Welcome },
  { path: '/login', component: Login},
  { path: '/register', component: Register},
  { path: '/home', component: Home},
  { path: '/painregistry', component: Painregistry,
    children: [
      {path: '/painstrength', component: Painstrength}
    ]}
  
]

const router = new VueRouter({
  routes
})

export default router