import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router.js'
import VueRouter from 'vue-router'
import {BootstrapVue, VBTogglePlugin, IconsPlugin} from 'bootstrap-vue'

Vue.config.productionTip = false;


Vue.config.productionTip = false

Vue.use(VueRouter,BootstrapVue, VBTogglePlugin)

Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


