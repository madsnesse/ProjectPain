<template>
    <b-container id="main">
        <b-breadcrumb>
            <b-breadcrumb-item :to="'/home'">
                <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                Home
            </b-breadcrumb-item>
            <b-breadcrumb-item active>
                Pain Registry
            </b-breadcrumb-item>
        </b-breadcrumb>

        <b-row><b-container class="m-5"><h1 id="welcome">Pain registry</h1></b-container></b-row>

        <PainVisualizer v-on:newCircle= "newCircle($event)" @tog="toggleVis=!toggleVis" :hidden="toggleVis" :values="forms.values" :currentEntry="currentEntry" :entries="forms.values.length" />
        <Form :hidden="!toggleVis" :values="getCurrentForm()" :key="currentEntry" />

        <b-row align-h="between">
            <b-col class="text-center my-5"><b-button variant='secondary' class="w-100" to="/home">Back</b-button></b-col>
            <b-col class="text-center my-5"><b-button variant='secondary' @click="toggleVis = !toggleVis" class="w-100" >Show</b-button></b-col>
            <b-col class="text-center my-5"><b-button variant='secondary' @click="save" class="w-100" to="/home">Register</b-button></b-col>
        </b-row>
    </b-container>
</template>


<script>
import PainVisualizer from './PainVisualizer.vue'
import Form from './Form.vue'

import '../main.js'
import * as PoucheDB from '../database'
export default {
    props: {
    },
    name: "Painregistry",
    data: function(){
        return {
            toggleVis: false,
            visIndex: 0,
            forms:{_id:"",values:[]},
            entries:0,
            currentEntry:-1,
            formTemplate: {
                x:0,
                y:0,
                r:0,
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
        Form
    },
    methods: {
        toggle: function() {
            this.toggleVis = !this.toggleVis
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
        font-size: 200%;
        text-align: center;
    }
</style>
