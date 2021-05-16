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

        <b-row><b-container class="m-5"><h1 id="welcome">Pain registry</h1></b-container></b-row>
        
        <PainVisualizer v-on:newCircle= "newCircle($event)" @tog="toggleVis=!toggleVis" :hidden="toggleVis" :values="forms.values" :currentEntry="currentEntry"  />
        <Form :hidden="!toggleVis" :values="forms.values[currentEntry]" :key="currentEntry" />
        
            

        <b-row align-h="between">
            <b-col class="text-center my-5"><b-button variant='primary' class="w-100" to="/home">Back</b-button></b-col>
            <b-col class="text-center my-5"><b-button variant='primary' @click="toggleVis = !toggleVis" class="w-100" >Show</b-button></b-col>
            
            <b-col class="text-center my-5"><b-button variant='primary' @click="save" class="w-100" to="/home">Register</b-button></b-col>
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
                sinus_arg:0,
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
            this.$set(this.forms.values, this.currentEntry, JSON.parse(JSON.stringify(this.formTemplate)))
            this.forms.values[this.currentEntry].x = event.x
            this.forms.values[this.currentEntry].y = event.y
            this.forms.values[this.currentEntry].r = event.r

            console.log("new circle:  " + event.x + ", "+ event.y + ", "+ event.r)
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