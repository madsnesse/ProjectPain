<template>
    <b-container id = "main">
        <b-row align-h="center" class="my-5"><h1 id="welcome">Welcome!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-button class="w-50" variant="primary" to="/painregistry">Registrer smerte</b-button></b-row>
        <b-row align-h="center" class="my-5"><b-button class="w-50" variant="primary" to ="/profile">Profil</b-button></b-row>
        
    </b-container>
</template> 

<script>
export default {
    name: "Home",
    components: {
    
    }
}   



</script>

<style scoped>
    #welcome{
        font-size: 200%;
        text-align: center;
    }
</style>