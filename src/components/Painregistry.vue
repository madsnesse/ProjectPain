<template>
    <b-container id = "main">
        <b-row align-h="center" class="mb-3"><h1 id="welcome">pain registry!</h1></b-row>

        <b-row align-h="center" class="border-bottom"><b-button squared v-b-toggle.paintype class="buttons"  @click="toggleVisible(0)" :variant="visible[0]?'success':'secondary'">Type of pain</b-button></b-row>
             <b-collapse id="paintype" accordion="accordion-group">
                    <Paintype v-on:update= "update('painType',$event)" class="mb-3"/>
            </b-collapse>

        <b-row align-h="center" class="border-bottom"><b-button squared v-b-toggle.painchange class="buttons"  @click="toggleVisible(1)" :variant="visible[1]?'success':'secondary'">Change of pain</b-button></b-row>
        <b-row>
       
            <b-collapse id="painchange" accordion="accordion-group" class="m-0 p-0 w-100">
                <Painchange v-on:update= "update('painChange', $event)" />
            </b-collapse>

        </b-row>
        <b-row align-h="center" class=""><b-button squared v-b-toggle.painstrength class="buttons"  @click="toggleVisible(2)" :variant="visible[2]?'success':'secondary'">Pain strength</b-button></b-row>
        <b-collapse id = "painstrength" accordion="accordion-group">
        <Slider 
            :values = '["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' 
            :minimum="1" 
            :maximum="5"
            :default="3"
            v-on:updateValue= "update('painstrength',$event)"
            :labels="['Weak','Strong']" 
        />
        </b-collapse>
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
import saveToDB from '../main.js' 
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
        },
        getVariant: function(i) {
            return this.visible[i] ? "success" : "secondary"
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
        height: 50px;
        width: 100%;
        text-align: center;
    }
</style>