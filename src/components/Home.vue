<template>
    <b-container id = "main">
        <b-row align-h="center" class="my-5"><h1 id="welcome">Welcome!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-button class="w-50" variant="primary" to="/painvisualizer">Registrer smerte</b-button></b-row>
        <b-row align-h="center" class="my-5"><b-button class="w-50" variant="primary" to ="/profile">Profil</b-button></b-row>
        <PainVisTest />
    </b-container>
</template> 

<script>
import PainVisTest from './PainVisTest.vue'
export default {
    name: "Home",
    components: {
        PainVisTest
    }
}   



</script>

<style scoped>
    #welcome{
        font-size: 200%;
        text-align: center;
    }
</style>