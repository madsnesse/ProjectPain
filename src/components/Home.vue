<template>
    <b-container id = "main">
        <b-breadcrumb>
            <b-breadcrumb-item active>
                <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                Home
            </b-breadcrumb-item>
        </b-breadcrumb>


        <b-row align-h="center" class="my-5"><h1 id="welcome">Home!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-button class="w-50" variant="secondary" to="/painregistry">Register Pain</b-button></b-row>
        <b-row align-h="center" class="my-5"><b-button class="w-50" variant="outline-secondary" to ="/profile">Profile</b-button></b-row>
        <b-row align-h="center" class="my-5"><b-button class="buttons" variant="outline-secondary" tag="b-button" @click="adios()" to="/welcome">Logout</b-button></b-row>
    </b-container>
</template>

<script>
    import * as pouchDB from "../database.js"
export default {
    name: "Home",
    components: {

    },
    methods: {
        adios: async function (i) {
            console.log(i)
            await pouchDB.logOut();
        }
    }
}



</script>

<style scoped>
    #welcome{
        font-size: 200%;
        text-align: center;
    }
</style>
