<template>
    <b-container id = "main">
        <b-breadcrumb>
            <b-breadcrumb-item to="/welcome">
                <b-icon icon="bookmark-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                Welcome
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Login</b-breadcrumb-item>
        </b-breadcrumb>
        <b-row align-h="center" class="my-5"><h1 id="welcome">Log in</h1></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="e-mail" class="inputs" id= "email" v-model="email">e-mail</b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="pasword" type="password" class="inputs" id="passord" v-model="password">Register</b-input></b-row>
        <b-row align-h="between">
            <b-col class="text-center my-5"><b-button class="buttons" variant="outline-secondary" to="/welcome">Go Back</b-button></b-col>
            <b-col class="text-center my-5"><b-button class="buttons" variant="secondary" @click="logIn()" to="/home">Log in</b-button></b-col>
        </b-row>

    </b-container>
</template>


<script>
    import * as pouchDB from "../database.js"
export default {
    name: "Login",
    data(){
        return{
            email:"",
            password:"",
        }
    },
    methods: {
        logIn: function (i) {
            console.log(i);
            pouchDB.logIn(this.email,this.password);
            pouchDB.hasAccess(this.email);
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
