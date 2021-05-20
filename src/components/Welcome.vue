<template>
    <b-container id = "main">
        <b-breadcrumb>
            <b-breadcrumb-item active>
                <b-icon icon="bookmark-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                Welcome
            </b-breadcrumb-item>
        </b-breadcrumb>

        <b-row align-h="center" class="my-5"><h1 id="welcome">Welcome!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-button class="buttons" variant="secondary" to="/login">Logg inn</b-button></b-row>
        <b-row align-h="center" class="my-5"><b-button class="buttons" variant="secondary" to ="/register">Registrer deg</b-button></b-row>

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
