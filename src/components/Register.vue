<template>
    <b-container id = "main">
        <b-row align-h="center" class="my-5"><b-header id="welcome">Register!</b-header></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="e-mail" class="inputs">e-mail</b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="passord" class="inputs" ></b-input></b-row>
        <b-row align-h="center" class="my-5"><b-input placeholder="gjenta passord" class="inputs" ></b-input></b-row>
        <b-row align-h="between">
            <b-col class="text-center my-5"><router-link tag="b-button" to="/welcome">Back</router-link></b-col>
            <b-col class="text-center my-5"><router-link tag="b-button" to="/welcome">Register</router-link></b-col>
        </b-row>
        
    </b-container>
</template> 


<script>
export default {
    name: "Register"
    
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