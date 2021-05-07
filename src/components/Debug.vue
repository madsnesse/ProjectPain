<template>
    <b-container id = "main">
        <b-col class="text-center my-5"><b-button v-on:click="register(1)">Create entry</b-button></b-col>
        <b-col class="text-center my-5"><b-button v-on:click="get()">Get last input</b-button></b-col>
        <b-col class="text-center my-5"><b-button v-on:click="register(1)">Register</b-button></b-col>
        <b-col class="text-center my-5"><b-button v-on:click="register(1)">Register</b-button></b-col>

    </b-container>
</template>


<script>
import * as pouchDB from "../database.js"
export default {
  name: "Register",
  methods: {
    register: function(){
      pouchDB.addToDB(
        {
          "type":"temporal",
          "strength":10
        }
      );
    },
    get: function(){
      pouchDB.getAllDataFromDB();
    }
  }
}
</script>

<style scoped>
    #welcome{
        font-size: 200%;
        text-align: center;
    }
    .inputs{
        width: 50%;
    }
</style>
