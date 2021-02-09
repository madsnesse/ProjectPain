<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    
    <hello-world msg="Welcome to Your Vue.js App"></hello-world>
    <hello-world msg="Welcome to Your Vue.js App"></hello-world>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

