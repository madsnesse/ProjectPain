<template>
  <div id="app">    
    <hello-world msg="Welcome to Your Vue.js App"></hello-world>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'


export default {
  
  counter: 0,
  methods: {
    addCount: function (amount) {
      self.counter += amount
      console.log(self.counter)
    }
  },
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

