<template>
    <b-container id="main">
        <b-row align-h="center" class="border-bottom">
                <b-button squared v-b-toggle.paintype class="d-flex justify-content-center text-left" size="lg"  @click="toggleVisible(0)" variant='secondary'>
                    <b-container class="w-100">Type of pain</b-container>
                    <b-icon :hidden = "!visible[0]" icon="chevron-up" scale="1"></b-icon>
                    <b-icon :hidden = "visible[0]" icon="chevron-down" scale="1"></b-icon>
                </b-button>
            </b-row>
            <b-collapse id="paintype" accordion="accordion-group">
                <Paintype v-on:update= "update('painType',$event)" class="mb-3"/>
            </b-collapse>

            <b-row align-h="center" class="border-bottom">
                <b-button squared v-b-toggle.painchange class="d-flex justify-content-center text-left" size="lg"  @click="toggleVisible(1)" variant='secondary'>
                    <b-container class="w-100">Change of pain</b-container>
                    <b-icon :hidden = "!visible[1]" icon="chevron-up" scale="1"></b-icon>
                    <b-icon :hidden = "visible[1]" icon="chevron-down" scale="1"></b-icon>
                </b-button></b-row>
            <b-row>

                <b-collapse id="painchange" accordion="accordion-group" class="m-0 p-0 w-100">
                    <Painchange v-on:update= "update('painChange', $event)" />
                </b-collapse>

            </b-row>
            <b-row align-h="center" class=""><b-button squared v-b-toggle.painstrength class="d-flex justify-content-center text-left" size="lg"  @click="toggleVisible(2)" variant='secondary'>
                <b-container class="w-100">Strength of pain</b-container>
                    <b-icon :hidden = "!visible[2]" icon="chevron-up" scale="1"></b-icon>
                    <b-icon :hidden = "visible[2]" icon="chevron-down" scale="1"></b-icon>
                </b-button></b-row>
            <b-collapse id = "painstrength" accordion="accordion-group">
                <b-row>Which word describes the pain right now?</b-row>
                <Slider  
                    :minimum="1" 
                    :maximum="5"
                    :default="0"
                    v-on:updateValue= "update('strengthnow',$event)"
                    :labels="['Weak','Strong']" 
                />
                <b-row v-if="strengthnow != 0">{{strengthlabels[strengthnow-1]}}</b-row>
                <b-row>Which word describes the pain at its worst?</b-row>
                <Slider 
                    :minimum="1" 
                    :maximum="5"
                    :default="0"
                    v-on:updateValue= "update('strengthworst',$event)"
                    :labels="['Weak','Strong']" 
                />
                
                <b-row v-if="strengthworst != 0">{{strengthlabels[strengthworst-1]}}</b-row>
                <b-row>Which word describes the pain at its least?</b-row>
                <Slider 
                    :values = '["mild", "discomforting", "distressing", "horrible", "excruciating"]' 
                    :minimum="1" 
                    :maximum="5"
                    :default="0"
                    v-on:updateValue= "update('strengthleast',$event)"
                    :labels="['Weak','Strong']" 
                />
                
                <b-row v-if="strengthleast != 0">{{strengthlabels[strengthleast-1]}}</b-row>
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
    },
    props:{
        values:Object
    },
    data: function(){
        return{
            strengthlabels: ["mild", "discomforting", "distressing", "horrible", "excruciating"],
            strengthnow:0,
            strengthworst:0,
            strengthleast:0,
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
            console.log(this.values);
            if (valueToChange == "painType"){
                this.values.painType = event
            }
            else if(valueToChange == "strengthnow"){
                this.values.strengthnow = parseInt(event)
                this.strengthnow = parseInt(event)
            }
            else if(valueToChange == "strengthworst"){
                this.values.strengthworst = parseInt(event)
                this.strengthworst = parseInt(event)

            }else if(valueToChange == "strengthleast"){
                this.values.strengthleast = parseInt(event)
                this.strengthleast = parseInt(event)

            }else if (valueToChange == "painChange"){
                this.values.painChange = event
            }
        }
    }
}
</script>
