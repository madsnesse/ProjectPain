<template>
    <b-container id="app" >
      <b-row align-h="center">
        <b-col md = "4" cols = "12" id = "test">
          <router-view></router-view>
        </b-col>
        
      </b-row>
    </b-container>
    
</template>

<script>


export default{
  name: 'App'
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
    min-height: 100vh;
    min-width: 100%;
  }
</style>
