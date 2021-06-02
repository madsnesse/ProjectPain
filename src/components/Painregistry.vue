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
        
        <b-row><b-container class="m-5"><h1 id="welcome">Pain Registry</h1></b-container></b-row>

        <PainVisualizer v-on:newCircle="newCircle($event)" @tog="toggle" :hidden="visualizerVis" :values="forms.values" :currentEntry="currentEntry" :entries="forms.values.length" />
        <Skincube v-if="!skincubeVis" @updateDepth="updateDepth($event)" />
        <Form :hidden="formVis" :values="getCurrentForm()" :key="currentEntry" />

        <b-row align-h="between">
<!--            <b-col class="text-center my-5"><b-button variant='secondary' class="w-100" to="/home">Home</b-button></b-col>-->
            <b-col class="text-center my-5"><b-button variant='outline-secondary' @click="toggle" class="w-100" >Describe Pain</b-button></b-col>
            <b-col class="text-center my-5"><b-button variant='secondary' @click="save" class="w-100" to="/home">Register Pain</b-button></b-col>
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
                    temporal:0,
                    spatial:0,
                    thermal:0,
                    brightness:0,
                    dullness:0,
                    Button6:0,
                    Button7:0,
                    Button8:0,
                    Button9:0,
                    Button10:0,

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
            }
            else if (!this.skincubeVis){
                this.formVis = false
                this.skincubeVis = true
            }else{
                this.visualizerVis = false
                this.skincubeVis = true
                this.formVis = true
            }
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
            //this.forms.values[this.currentEntry].depth = parseInt(event)
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
</style>
