<template>
    <b-container fluid id="app" >
      <b-row align-h="center">
        <b-col md = "4" cols = "12" id = "test">    
          <Welcome/>
        </b-col>
        
      </b-row>
    </b-container>
    
</template>

<script>
import Welcome from './components/Welcome.vue'


export default{
  name: 'App',
  components: {
    Welcome
  }
}
</script>
<style scoped>
  #test{
        background-color: rgb(57, 88, 10);
    }
    #test1{
        background-color: rgb(128, 78, 245);
    }
  #app{
    background-color: cornflowerblue;
  }
</style>
