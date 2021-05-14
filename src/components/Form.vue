<template>
    <b-container>
        <b-row align-h="center" class="border-bottom">
                <b-button squared v-b-toggle.paintype class="d-flex justify-content-center text-left" size="lg"  @click="toggleVisible(0)" variant='primary'>
                    <b-container class="w-100">Type of pain</b-container>
                    <b-icon :hidden = "!visible[0]" icon="chevron-up" scale="1"></b-icon> 
                    <b-icon :hidden = "visible[0]" icon="chevron-down" scale="1"></b-icon>
                </b-button>
            </b-row>
            <b-collapse id="paintype" accordion="accordion-group">
                <Paintype v-on:update= "update('painType',$event)" class="mb-3"/>
            </b-collapse>

            <b-row align-h="center" class="border-bottom">
                <b-button squared v-b-toggle.painchange class="d-flex justify-content-center text-left" size="lg"  @click="toggleVisible(1)" variant='primary'>
                    <b-container class="w-100">Change of pain</b-container>
                    <b-icon :hidden = "!visible[1]" icon="chevron-up" scale="1"></b-icon> 
                    <b-icon :hidden = "visible[1]" icon="chevron-down" scale="1"></b-icon>
                </b-button></b-row>
            <b-row>
        
                <b-collapse id="painchange" accordion="accordion-group" class="m-0 p-0 w-100">
                    <Painchange v-on:update= "update('painChange', $event)" />
                </b-collapse>

            </b-row>
            <b-row align-h="center" class=""><b-button squared v-b-toggle.painstrength class="d-flex justify-content-center text-left" size="lg"  @click="toggleVisible(2)" variant='primary'>
                <b-container class="w-100">Strength of pain</b-container>
                    <b-icon :hidden = "!visible[2]" icon="chevron-up" scale="1"></b-icon> 
                    <b-icon :hidden = "visible[2]" icon="chevron-down" scale="1"></b-icon>
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
        </b-container>
</template>

<script>

import Slider from './Slider.vue'
import Paintype from './Paintype.vue'
import Painchange from './Painchange.vue'

export default {
    components: {
        Slider, 
        Painchange,
        Paintype
    },props:{
        values:Object
    },
    data: function(){
        return{
            
            visible: [false, false, false]
        }
            
    },
    methods:{
        toggleVisible: function (i) {
                if(i != this.visIndex)this.$set(this.visible,this.visIndex,false)
                this.$set(this.visible,i, !this.visible[i])
                this.visIndex = i        
        },
        update: function(valueToChange,event) {
            console.log(this.values.painType);
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