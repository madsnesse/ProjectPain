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
        <b-row align-h="center" class="my-5"><b-input placeholder="e-mail" class="inputs" id= "email" v-model="email">e-mail</b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="passord" class="inputs" id = "password" v-model="password"></b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="gjenta passord" class="inputs" id ="reppass" v-model="reppass"></b-input></b-row>
        <b-row align-h="between">
            <b-col class="text-center my-5"><b-button class="buttons" variant="secondary" to="/welcome">Back</b-button>
            </b-col>
            <b-col class="text-center my-5"><b-button class="buttons" variant="secondary" tag="b-button" @click="register()" to="/home">Register</b-button>
            </b-col>
        </b-row>

    </b-container>
</template>


<script>
    import * as pouchDB from "../database.js"
export default {

    name: "Register",
    data(){
        return{
            email:"",
            password:"",
            reppass:""
        }
    },
    methods: {
        register: function(i){
            console.log(i);
            
            
            console.log(this.username + " " + this.email + " " + this.password + " " + this.reppass);
            pouchDB.createUser(this.email,this.password);
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
