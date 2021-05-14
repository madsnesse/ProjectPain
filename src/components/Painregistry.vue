<template>
    <b-container id = "main">
        <b-row><b-container class="m-5"><h1 id="welcome">Pain registry</h1></b-container></b-row>
        
        <PainVisualizer :hidden="toggleVis" :valuesFromForm="values" @newForm="addForm(i)" />
        <Form :hidden="toggleVis" />
        
            

        <b-row align-h="between">
            <b-col class="text-center my-5"><b-button variant='primary' class="w-100" to="/home">Back</b-button></b-col>
            <b-col class="text-center my-5"><b-button variant='primary' @click="save" class="w-100" to="/home">Register</b-button></b-col>
        </b-row>
    </b-container>
</template> 


<script>
import saveToDB from '../main.js' 
export default {
    props: {
    },
    name: "Painregistry",
    data: function(){
        return {
            visible: [false, false, false],
            toggleVis: false,
            visIndex: 0,
            forms: [],
            values: {
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
    },
    methods: {
        toggle: function() {
            this.toggleVis = !this.toggleVis
        },
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
            console.log(this.values.painType);
            if (valueToChange == "painType"){
                this.values.painType = event
            }
            else if(valueToChange == "painstrength"){
                this.values.painstrength = event

            }else if (valueToChange == "painChange"){
                this.values.painChange = event
            }
        },
        addForm: function(i) {
            console.log("buttons: " + i)
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