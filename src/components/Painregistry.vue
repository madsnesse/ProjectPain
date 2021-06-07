<template>
    <b-container>
        <b-breadcrumb>
            <b-breadcrumb-item :to="'/home'">
                <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                Home
            </b-breadcrumb-item>
            <b-breadcrumb-item active>
                Pain Registry
            </b-breadcrumb-item>
        </b-breadcrumb>
        
        <b-row><b-container class=""><h1 id="welcome">Pain Registry</h1></b-container></b-row>
        <b-row><b-container class="mb-1"><h1 id="subtitle">{{this.subtitles[this.currentSubtitle]}}</h1></b-container></b-row>

        <PainVisualizer v-on:newCircle="newCircle($event)" @tog="toggle" v-if="!visualizerVis" :values="forms.values" :currentEntry="currentEntry" :entries="forms.values.length" />
        <Skincube v-if="!skincubeVis" @updateDepth="updateDepth($event)" />
        <Form v-if="!formVis" :values="getCurrentForm()" :key="currentEntry" />

        <b-row>
            <b-col><b-button v-if="!skincubeVis" variant="secondary" @click="toggle()">Next</b-button></b-col>
        </b-row>
        <b-row>
            <b-col><b-button v-if="!formVis" variant="secondary" @click="toggle()" class="mt-5" >See Result</b-button></b-col>
        </b-row>
         <b-row align-h="between">
<!--            <b-col class="text-center my-5"><b-button variant='secondary' class="w-100" to="/home">Home</b-button></b-col>-->
            <!-- <b-col class="text-center my-5"><b-button variant='outline-secondary'  class="w-100" >Describe Pain</b-button></b-col> -->
            <b-col class="text-center my-5"><b-button v-if="currentEntry !=-1" variant='secondary' @click="save" class="w-100" to="/home">Register Pain</b-button></b-col>
        </b-row> 
    </b-container>
</template>
    

<script>
import PainVisualizer from './PainVisualizer.vue'
import Form from './Form.vue'
import Skincube from './Skincube.vue'

import '../main.js'
import * as PoucheDB from '../database'

export default {
    props: {
    },
    name: "Painregistry",
    data: function(){
        return {
            subtitles: ["Select location of pain", "Choose depth of pain", ""],
            currentSubtitle: 0,
            formVis: true,
            skincubeVis: true,
            visualizerVis: false,
            visIndex: 0,
            forms:{_id:"",values:[]},
            entries:0,
            currentEntry:-1,
            formTemplate: {
                x:0,
                y:0,
                r:0,
                depth:0,
                painstrength:0,
                painType:{
                    Temporal:0,
                    Spatial:0,
                    Thermal:0,
                    Brightness:0,
                    Dullness:0,
                    Sensory:0,
                    Tension:0,
                    Autonomic:0,
                    Punishment:0,
                    Fear:0,
                    Constrictive_Pressure:0,
                    Punctate_Pressure:0,
                },
                painChange:{
                    change:0,
                    increase:[],
                    decrease:[]
                }
            }
        }
    },
    components:{
        PainVisualizer,
        Form,
        Skincube
    },
    methods: {
        toggle: function() {
            //if in the visualizer step:
            if (!this.visualizerVis){
                this.visualizerVis = true
                this.skincubeVis = false
                this.currentSubtitle = 1;
            }
            else if (!this.skincubeVis){
                this.formVis = false
                this.skincubeVis = true
                this.currentSubtitle = 2;
            }else{
                this.visualizerVis = false
                this.skincubeVis = true
                this.formVis = true
                this.currentSubtitle = 0;
            }
            console.log(this.currentSubtitle)

        },  
        getCurrentForm: function(){
            return this.forms.values[this.currentEntry]
        },
        save: function() {
                this.forms._id = (new Date().getTime()).toString();
                console.log("saving to json");
                PoucheDB.saveToDB(JSON.stringify(this.forms));
                //console.log("Data From  DB")
                //PoucheDB.getAllDataFromDB();

        },
        updateDepth: function(event) {
            this.forms.values[this.currentEntry].depth = parseInt(event)
            console.log(event)
        },
        newCircle: function(event) {
            console.log(event)
            this.currentEntry += 1
            this.entries += 1
            let tempForm = JSON.parse(JSON.stringify(this.formTemplate))
            tempForm.x = event.x
            tempForm.y = event.y
            tempForm.r = event.r
            this.$set(this.forms.values, this.currentEntry, tempForm)
            console.log(tempForm)
        }

    }

}

</script>

<style scoped>
    #welcome{
        font-size: 150%;
        text-align: center;
    }
    #subtitle{
        font-size: 110%;
        text-align: center;
    }
</style>
