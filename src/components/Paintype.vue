<template>
    <b-container class="my-buttons" style="background-color:var(--secondary)">
        <b-row align-h="center">
            <b-col class="" cols="4" xl="4">
                
                <b-row><b-button class="mx-1 my-1 buttons" @click="toggleBtn(0)" variant='info'>temporal</b-button></b-row>
            
                <b-row><b-button class="mx-1 my-1 buttons" @click="toggleBtn(1)" variant='info'>spatial</b-button></b-row>
            
                <b-row><b-button class="mx-1 my-1 buttons" @click="toggleBtn(2)" variant='info'>thermal</b-button></b-row>
            
                <b-row><b-button class="mx-1 my-1 buttons" @click="toggleBtn(3)" variant='info'>brightness</b-button></b-row>
            
                <b-row><b-button class="mx-1 my-1 buttons" @click="toggleBtn(4)" variant='info'>dullness</b-button></b-row>
                
            </b-col>

            <b-col class="" cols="4" xl="4">
                
                <b-row><b-button class="mx-1 my-1 buttons" @click="toggleBtn(5)" variant='info'>TestButton</b-button></b-row>
            
                <b-row><b-button class="mx-1 my-1 buttons" @click="toggleBtn(6)" variant='info'>Rhytmic</b-button></b-row>
            
                <b-row><b-button class="mx-1 my-1 buttons" @click="toggleBtn(7)" variant='info'>Rhytmic</b-button></b-row>
            
                <b-row><b-button class="mx-1 my-1 buttons" @click="toggleBtn(8)" variant='info'>Rhytmic</b-button></b-row>
            
                <b-row><b-button class="mx-1 my-1 buttons" @click="toggleBtn(9)" variant='info'>Rhytmic</b-button></b-row>
            
            
            </b-col>
            
        </b-row>
            <b-row align-h="center">{{ btnVal }}</b-row>
            <b-row align-h="center" v-show="btns[0]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" @updateValue= "update(0,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[1]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" @updateValue= "update(1,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[2]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" @updateValue= "update(2,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[3]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" @updateValue= "update(3,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[4]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" @updateValue= "update(4,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[5]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" @updateValue= "update(5,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[6]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" @updateValue= "update(6,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[7]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" @updateValue= "update(7,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[8]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" @updateValue= "update(8,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[9]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" @updateValue= "update(9,$event)" :labels="['Weak','Strong']" /></b-row>
    </b-container>
</template>


<script>
import Slider from './Slider.vue'
export default {
    components:{
        Slider
    },
    data() {
        return {
            btns: [false, false, false, false, false, false, false, false, false, false],
            btnNames: ['temporal','spatial','thermal','brightness','dullness','Button6','Button7','Button8','Button9','Button10'],
            btnVal: "",
            indxOld: -1,
            sliderMin: 1,
            sliderMax: 5,
            sliderDef: 1,
            typeValues: {
                vals:[0,0,0,0,0,0,0,0,0,0]
            }
        };
    },
    methods: {
        toggleBtn: function(indx) {
            this.btnVal = this.btnNames[indx]
            if (indx != this.indxOld) {
                this.$set(this.btns, this.indxOld, false)
            }
            else this.btnVal = ""
            this.$set(this.btns, indx, !this.btns[indx])
            this.indxOld = indx
            
        },
        update: function(i, event) {
            this.$set(this.typeValues.vals,i,parseInt(event))
            console.log(this.typeValues)
            this.$emit('update', this.typeValues)
        }
    }
}
</script>

<style scoped>
    .buttons{
        min-width: 100px;
    }
</style>