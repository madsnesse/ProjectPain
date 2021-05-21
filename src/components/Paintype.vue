<template>
    <b-container class="my-buttons" style="background-color:var(--secondary)">
        <b-row align-h="center">
            <b-col class="" cols="4" xl="4">

                <b-row><b-button class="mx-1 my-1 buttons" size ="sm" @click="toggleBtn(0)" variant='secondary'>temporal</b-button></b-row>

                <b-row><b-button class="mx-1 my-1 buttons" size ="sm" @click="toggleBtn(1)" variant='secondary'>spatial</b-button></b-row>

                <b-row><b-button class="mx-1 my-1 buttons" size ="sm" @click="toggleBtn(2)" variant='secondary'>thermal</b-button></b-row>

                <b-row><b-button class="mx-1 my-1 buttons" size ="sm" @click="toggleBtn(3)" variant='secondary'>brightness</b-button></b-row>

                <b-row><b-button class="mx-1 my-1 buttons" size ="sm" @click="toggleBtn(4)" variant='secondary'>dullness</b-button></b-row>

            </b-col>

            <b-col class="" cols="4" xl="4">

                <b-row><b-button class="mx-1 my-1 buttons" size ="sm" @click="toggleBtn(5)" variant='secondary'>Sensory</b-button></b-row>

                <b-row><b-button class="mx-1 my-1 buttons" size ="sm" @click="toggleBtn(6)" variant='secondary'>Rhytmic</b-button></b-row>

                <b-row><b-button class="mx-1 my-1 buttons" size ="sm" @click="toggleBtn(7)" variant='secondary'>Rhytmic</b-button></b-row>

                <b-row><b-button class="mx-1 my-1 buttons" size ="sm" @click="toggleBtn(8)" variant='secondary'>Rhytmic</b-button></b-row>

                <b-row><b-button class="mx-1 my-1 buttons" size ="sm" @click="toggleBtn(9)" variant='secondary'>Rhytmic</b-button></b-row>


            </b-col>

        </b-row>
            <b-row align-h="center">{{ btnVal }}</b-row>
            <b-row align-h="center" v-show="btns[0]"><Slider :values='["flickering", "quivering", "pulsing", "throbbing", "beating", "pounding"]' :minimum="1" :maximum="5" :default="0" @updateValue= "update(0,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[1]"><Slider :values='["jumping", "flashing", "shooting"]' :minimum="1" :maximum="3" :default="0" @updateValue= "update(1,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[2]"><Slider :values='["hot", "boring", "scalding", "searing"]' :minimum="1" :maximum="4" :default="0" @updateValue= "update(2,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[3]"><Slider :values='["tingling", "itchy", "smarting", "stinging"]' :minimum="1" :maximum="4" :default="0" @updateValue= "update(3,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[4]"><Slider :values='["dull", "sore", "hurting","aching", "heavy"]' :minimum="1" :maximum="5" :default="0" @updateValue= "update(4,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[5]"><Slider :values='["cool","cold","freezing"]' :minimum="1" :maximum="3" :default="0" @updateValue= "update(5,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[6]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="0" @updateValue= "update(6,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[7]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="0" @updateValue= "update(7,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[8]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="0" @updateValue= "update(8,$event)" :labels="['Weak','Strong']" /></b-row>
            <b-row align-h="center" v-show="btns[9]"><Slider :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' :minimum="sliderMin" :maximum="sliderMax" :default="0" @updateValue= "update(9,$event)" :labels="['Weak','Strong']" /></b-row>
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
            btnNames: ['temporal','spatial','thermal','brightness','dullness','sensory','Button7','Button8','Button9','Button10'],
            btnVal: "",
            indxOld: -1,
            sliderMin: 1,
            sliderMax: 5,
            sliderDef: 1,
            typeValues: {
                temporal:0,
                spatial:0,
                thermal:0,
                brightness:0,
                dullness:0,
                sensory:0,
                Button7:0,
                Button8:0,
                Button9:0,
                Button10:0,

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
            var id = this.btnNames[i]
            console.log(this.typeValues[id])
            this.typeValues[id] =  parseInt(event)
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
