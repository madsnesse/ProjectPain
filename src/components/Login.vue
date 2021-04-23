<template>
    <b-container id = "main">
        <b-row align-h="center" class="my-5 text-info"><h1 id="welcome">Log in!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="e-mail" class="inputs">e-mail</b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="passord" class="inputs" >Registrer deg</b-input></b-row>
        <b-row align-h="between">
            <b-col class="text-center my-5"><router-link tag="b-button" to="/welcome">Back</router-link></b-col>
            <b-col class="text-center my-5"><router-link tag="b-button" to="/home">Login</router-link></b-col>
        </b-row>
        
    </b-container>
</template> 


<script>
export default {
    name: "Login"

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