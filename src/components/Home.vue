<template>
    <b-container id = "main">
        <b-row align-h="center" class="my-5"><h1 id="Home">Home!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-button class="w-50" variant="primary" to="/paindrawer">Registrer smerte</b-button></b-row>
        <b-row align-h="center" class="my-5"><b-button class="w-50" variant="primary" to ="/profile">Profil</b-button></b-row>
        
    </b-container>
</template> 


<script>
export default {
    name: "Home"
}
</script>

<style scoped>
    #welcome{
        font-size: 200%;
        text-align: center;
    }
</style>