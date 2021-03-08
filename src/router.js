import Welcome from './components/Welcome.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import VueRouter from 'vue-router'
import Painregistry from './components/Painregistry.vue'
import Profile from './components/Profile.vue'
import Paindrawer from './components/Paindrawer.vue'


const routes = [
  { path: '', redirect: "/welcome" },
  { path: '/welcome', component: Welcome },
  { path: '/login', component: Login},
  { path: '/register', component: Register},
  { path: '/home', component: Home},
  { path: '/painregistry', component: Painregistry},
  { path: '/profile', component: Profile},
  { path: '/paindrawer', component: Paindrawer}

  
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router