import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router.js'
import VueRouter from 'vue-router'
//import PouchVue from "pouch-vue";
import PouchDB from "pouchdb-browser";
/*
import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find'
import PouchLiveFind from 'pouchdb-live-find'
import PouchVue from 'pouch-vue'
*/
//PouchDB.plugin(PouchFind);
//PouchDB.plugin(PouchLiveFind);
PouchDB.plugin(require('pouchdb-authentication'));



Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

/*
Vue.use(PouchVue,{
  pouch: PouchDB,
  defaultDB: 'defaultDB',
  optionsDB: {},
  debug: '*'
});

 */

/*
const db = new PouchDB('http://localhost:5984/_utils/my_database');


Vue.use(PouchVue,{
  pouch: PouchDB,
  defaultDB: 'http://localhost:5984/_utils/my_database',
  optionsDB: {},
  debug: '*'
});


export default function saveToDB(json){
  this.$pouch.put(JSON.parse(json), function (err){
    if (err){
      return console.log(err)
    }else{
      console.log("Document saved Successfuly")
    }
  });
  console.log(json)
}

this.$pouch.info(function (err,info) {
  if (err) {
    return console.log(err)
  } else {
    console.log(info)
  }
})


 */


