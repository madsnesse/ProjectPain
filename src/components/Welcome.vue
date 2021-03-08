<template>
    <b-container id = "main">
        <b-row align-h="center" class="my-5"><h1 id="welcome">Welcome!</h1></b-row>
        <b-row align-h="center" class="my-5"><router-link tag="b-button" class="buttons" to="/login">Logg inn</router-link></b-row>
        <b-row align-h="center" class="my-5"><router-link tag="b-button" class="buttons" to ="/register">Registrer deg</router-link></b-row>
        
    </b-container>
</template> 


<script>
export default {
    name: "Welcome"
}
</script>

<style scoped>
    #welcome{
        font-size: 200%;
        text-align: center;
    }
    .buttons{
        width: 50%;
    }
</style>