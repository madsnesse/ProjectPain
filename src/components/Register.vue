<template>
    <b-container id = "main">
        <b-row align-h="center" class="my-5"><h1 id="welcome">Register!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="username" class="inputs" id= "username">e-mail</b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="e-mail" class="inputs" id= "email">e-mail</b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="passord" class="inputs" id = "password"></b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="gjenta passord" class="inputs" id ="reppass"></b-input></b-row>
        <b-row align-h="between">
            <b-col class="text-center my-5"><router-link tag="b-button" to="/welcome">Back</router-link></b-col>
            <b-col class="text-center my-5"><b-button v-on:click="register(1)">Register</b-button></b-col>
        </b-row>
        
    </b-container>
</template> 


<script>
    import * as pouchDB from "../database.js"
export default {

    name: "Register",
    methods: {
        register: function(i){
            console.log(i)
            var username = document.getElementById("username").innerText;
            var email = document.getElementById("email").innerText;
            var password = document.getElementById("password").innerText;
            var secondpassword = document.getElementById("reppass").innerText;
            console.log(email + " " + password + " " + secondpassword);
            //pouchDB.createUser(username,password,email);
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