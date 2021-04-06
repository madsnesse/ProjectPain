import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router.js'
import VueRouter from 'vue-router'

export default function saveToDB(json){
  console.log(json)
}


Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
