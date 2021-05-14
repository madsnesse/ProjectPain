<template>
    <b-container id = "main">
        <b-row><b-container class="m-5"><h1 id="welcome">Pain registry</h1></b-container></b-row>
        
        <PainVisualizer v-on:newCircle= "newCircle($event)" :hidden="toggleVis" :values="forms" :entries="entries"  />
        <Form :hidden="!toggleVis" :values="forms[currentEntry]" :key="currentEntry" />
        
            

        <b-row align-h="between">
            <b-col class="text-center my-5"><b-button variant='primary' class="w-100" to="/home">Back</b-button></b-col>
            <b-col class="text-center my-5"><b-button variant='primary' @click="toggleVis = !toggleVis" class="w-100" >Show</b-button></b-col>
            
            <b-col class="text-center my-5"><b-button variant='primary' @click="save" class="w-100" to="/home">Register</b-button></b-col>
        </b-row>
    </b-container>
</template> 


<script>
import saveToDB from '../main.js' 
import PainVisualizer from './PainVisualizer.vue'
import Form from './Form.vue'
export default {
    props: {
    },
    name: "Painregistry",
    data: function(){
        return {
            toggleVis: false,
            visIndex: 0,
            forms: [],
            entries:0,
            currentEntry:0,
            formTemplate: {
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
        
        save: function() {
                console.log("saving to json");
                console.log(this.values);
                saveToDB(JSON.stringify(this.values));
        },

        newCircle: function(event) {
            console.log(event)
            this.currentEntry += 1
            this.entries += 1
            this.$set(this.forms, this.currentEntry, JSON.parse(JSON.stringify(this.formTemplate)))
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