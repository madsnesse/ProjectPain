<template>
    <b-container id = "main">
        <b-breadcrumb>
            <b-breadcrumb-item to="/welcome">
                <b-icon icon="bookmark-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                Welcome
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Register</b-breadcrumb-item>
        </b-breadcrumb>

        <b-row align-h="center" class="my-5"><h1 id="welcome">Register!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="username" class="inputs" id= "username">e-mail</b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="e-mail" class="inputs" id= "email">e-mail</b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="passord" class="inputs" id = "password"></b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="gjenta passord" class="inputs" id ="reppass"></b-input></b-row>
        <b-row align-h="between">
            <b-col class="text-center my-5"><b-button class="buttons" variant="secondary" to="/welcome">Back</b-button>
            </b-col>
            <b-col class="text-center my-5"><b-button class="buttons" variant="secondary" tag="b-button" to="/home">Register</b-button>
            </b-col>
        </b-row>

    </b-container>
</template>


<script>
    import * as pouchDB from "../database.js"
export default {

    name: "Register",
    methods: {
        register: function(i){
            console.log(i);
            //var username = document.getElementById("username").value;
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            var secondpassword = document.getElementById("reppass").value;
            console.log(email + " " + password + " " + secondpassword);
            pouchDB.createUser(email,password);
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
