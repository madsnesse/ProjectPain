<template>
    <b-container id = "main">
        <b-row align-h="center" class="my-5"><h1 id="welcome">Profile!</h1></b-row>
        <b-row align-h="center" class="my-5"><router-link tag="b-button" class="buttons" to="/home">history</router-link></b-row>
        <b-row align-h="center" class="my-5"><router-link tag="b-button" class="buttons" to ="/home">settings</router-link></b-row>
        
        <b-row align-h="center" class="my-5"><router-link tag="b-button" class="buttons" to ="/home">back</router-link></b-row>
        
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
    .buttons{
        width: 50%;
    }
</style>