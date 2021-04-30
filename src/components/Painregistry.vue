<template>
    <b-container id = "main">
        <b-row align-h="center" class="m-5"><h1 id="welcome">pain registry!</h1></b-row>

        <b-row align-h="center" class="border-bottom">
            <b-button squared v-b-toggle.paintype class="d-flex justify-content-center text-left" size="lg"  @click="toggleVisible(0)" variant='primary'>
                <b-container class="w-100">Type of pain</b-container>
                <b-icon :hidden = "!visible[0]" icon="dash" scale="1"></b-icon> 
                <b-icon :hidden = "visible[0]" icon="plus" scale="1"></b-icon>
            </b-button>
        </b-row>
        <b-collapse id="paintype" accordion="accordion-group">
            <Paintype v-on:update= "update('painType',$event)" class="mb-3"/>
        </b-collapse>

        <b-row align-h="center" class="border-bottom">
            <b-button squared v-b-toggle.painchange class="d-flex justify-content-center text-left" size="lg"  @click="toggleVisible(1)" variant='primary'>
                <b-container class="w-100">Change of pain</b-container>
                <b-icon :hidden = "!visible[1]" icon="dash" scale="1"></b-icon> 
                <b-icon :hidden = "visible[1]" icon="plus" scale="1"></b-icon>
            </b-button></b-row>
        <b-row>
       
            <b-collapse id="painchange" accordion="accordion-group" class="m-0 p-0 w-100">
                <Painchange v-on:update= "update('painChange', $event)" />
            </b-collapse>

        </b-row>
        <b-row align-h="center" class=""><b-button squared v-b-toggle.painstrength class="d-flex justify-content-center text-left" size="lg"  @click="toggleVisible(2)" variant='primary'>
            <b-container class="w-100">Strength of pain</b-container>
                <b-icon :hidden = "!visible[2]" icon="dash" scale="1"></b-icon> 
                <b-icon :hidden = "visible[2]" icon="plus" scale="1"></b-icon>
            </b-button></b-row>
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
            <b-col class="text-center my-5"><b-button variant='primary' class="w-100" to="/home">Back</b-button></b-col>
            <b-col class="text-center my-5"><b-button variant='primary' @click="save" class="w-100" to="/home">Register</b-button></b-col>
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
                painType:[],
                painChange:{
                    change:0,
                    increase:[], 
                    decrease:[]
                }
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
                console.log(this.values);
                saveToDB(JSON.stringify(this.values));
        },

        update: function(valueToChange,event) {
            console.log(event);
            if (valueToChange == "painType"){
                this.values.painType = event
            }
            else if(valueToChange == "painstrength"){
                this.values.painstrength = event

            }else if (valueToChange == "painChange"){
                this.values.painChange = event
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
</style>