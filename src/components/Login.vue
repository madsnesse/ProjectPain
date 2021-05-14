<template>
    <b-container id = "main">
        <b-row align-h="center" class="my-5 text-info"><h1 id="welcome">Log in!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="username" class="inputs">username</b-input></b-row>
        <b-breadcrumb>
            <b-breadcrumb-item to="/welcome">
                <b-icon icon="bookmark-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                Welcome
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Login</b-breadcrumb-item>
        </b-breadcrumb>

        <b-row align-h="center" class="my-5"><h1 id="welcome">Log in!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="e-mail" class="inputs">e-mail</b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="passord" class="inputs" >Registrer deg</b-input></b-row>
        <b-row align-h="between">
            <b-col class="text-center my-5"><b-button class="buttons" variant="primary" to="/welcome">Back</b-button></b-col>
            <b-col class="text-center my-5"><b-button class="buttons" variant="primary" to="/home">Login</b-button></b-col>
        </b-row>
        
    </b-container>
</template> 


<script>
    import * as pouchDB from "../database.js"
export default {
    name: "Login",
    methods: {
        logIn: function (i) {
            console.log(i);
            const username = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            pouchDB.logIn(username,password);
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