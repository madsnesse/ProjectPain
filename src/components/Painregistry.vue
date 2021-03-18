<template>
    <b-container id = "main">
        <b-row align-h="center" class="my-5"><h1 id="welcome">pain registry!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-button v-on:click="toggleType" class="buttons">Type of pain</b-button></b-row>
        <b-row align-h="center" v-show="type">
            <paintype ligma="balls"></paintype>
        </b-row>

        <b-row align-h="center" class="my-5"><b-button v-on:click="toggleChange" class="buttons">Change of pain</b-button></b-row>
        <b-row align-h="center" v-show="change">
            <painchange></painchange>
        </b-row>

        <b-row align-h="center" class="my-5"><b-button v-on:click="toggleStrength" class="buttons">Pain strength</b-button></b-row>
        <b-row align-h="center" v-show="strength">
            <painstrength ></painstrength>
        </b-row>
        <b-row align-h="between">
            <b-col class="text-center my-5"><router-link tag="b-button" class="buttons" to="/home">Back</router-link></b-col>
            <b-col class="text-center my-5"><router-link tag="b-button" class="buttons" to="/home">Register</router-link></b-col>
        </b-row>
    </b-container>
</template> 


<script>
import Painstrength from './Painstrength.vue'
import Paintype from './Paintype.vue'
import Painchange from './Painchange.vue'

export default {
    name: "Painregistry",

    data: function(){
        return {
            strength: false,
            change: false,
            type: false
        }
    },
    components:{
        Painstrength,
        Paintype,
        Painchange
    },
    methods: {
        toggleStrength: function () {
            this.strength = !this.strength
            this.type = false
            this.change = false
        },
        toggleChange: function () {
            this.change = !this.change
            this.strength = false
            this.type = false
        },
        toggleType: function () {
            this.type = !this.type
            this.strength = false
            this.change = false
        }
    }
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