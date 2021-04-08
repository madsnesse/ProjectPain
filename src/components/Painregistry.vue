<template>
    <b-container id = "main">
        <b-row align-h="center" class="my-5"><h1 id="welcome">pain registry!</h1></b-row>
        <b-row align-h="center" class="my-5"><b-button v-on:click="toggleVisible(0)" class="buttons">Type of pain</b-button></b-row>
        <b-row align-h="center" v-show="visible[0]">
            <Paintype v-on:update= "update('painType',$event)"/>
        </b-row>

        <b-row align-h="center" class="my-5"><b-button v-on:click="toggleVisible(1)" class="buttons">Change of pain</b-button></b-row>
        <b-row align-h="center" v-show="visible[1]">
            <Painchange/>
        </b-row>

        <b-row align-h="center" class="my-5"><b-button v-on:click="toggleVisible(2)" class="buttons">Pain strength</b-button></b-row>
        <b-row align-h="center" v-show="visible[2]">
        <Slider 
            :values = '["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' 
            :minimum="1" 
            :maximum="5"
            :default="3"
            v-on:updateValue= "update('painstrength',$event)"
            :labels="['Weak','Strong']" 
        />
        </b-row>
        <b-row align-h="between">
            <b-col class="text-center my-5"><router-link tag="b-button" class="buttons" to="/home">Back</router-link></b-col>
            <b-col class="text-center my-5"><b-button v-on:click="save" class="buttons" to="/home">Register</b-button></b-col>
        </b-row>
    </b-container>
</template> 


<script>
import Slider from './Slider.vue'
import Paintype from './Paintype.vue'
import Painchange from './Painchange.vue'
import '../main.js'
import saveToDB from "@/main";
export default {
    name: "Painregistry",
    data: function(){
        return {
            visible: [false, false, false],
            visIndex: 0,
            values: {
                painstrength:0,
                painType:[]
            }
        }
    },
    components:{
        Slider,
        Paintype,
        Painchange
    },
    methods: {
        toggleVisible: function (i) {
                if(i != this.visIndex)this.$set(this.visible,this.visIndex,false)
                this.$set(this.visible,i, !this.visible[i])
                this.visIndex = i        
        },
        save: function() {
                console.log("saving to json");
                saveToDB(JSON.stringify(this.values));
        },

        update: function(valueToChange,event) {
            if (valueToChange == "painType"){
                this.values.painType = event
            }
            else if(valueToChange == "painstrength"){
                this.values.painstrength = event
            }
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