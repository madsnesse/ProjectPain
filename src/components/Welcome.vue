<template>
    <b-container id = "main">
        <b-row align-h="center"><b-header id="welcome">Welcome Cunt!</b-header></b-row>
        <b-row align-h="center"><b-button class="buttons">Logg inn</b-button></b-row>
        <b-row align-h="center"><b-button class="buttons">Registrer deg</b-button></b-row>
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