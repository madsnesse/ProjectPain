<template>
    <b-container class="my-buttons">
        <b-row align-h="center" >
            <b-col v-for="col in columns" :key="col[0].name" >
                <b-button 
                    v-for="type in col"
                    :key="type.index"
                    size="sm"
                    class="w-100 my-1 buttons"
                    variant="primary"
                    @click="toggleBtn(type.index)"
                >
                    {{type.name}}
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <Slider 
            :hidden="currentActive == -1" 
            :values="getLabels()"
            :labels="[getLabels()[0],getLabels()[getLabels().length-1]]"
            :minimum="1"
            :maximum="getLabels().length"
            :default="0"
            @updateValue= "update(currentActive,$event)"
            />
        </b-row>
        <b-row align-h="center" v-if="currentActive != -1">{{ this.label }}</b-row>
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
            btnNames:2, 
            btnVal: "",
            currentActive:-1,
            paintypes: [
                {index:0, name:'temporal',enabled:false, value:0, labels: ["flickering", "quivering", "pulsing", "throbbing", "beating", "pounding"]},
                {index:1, name:'spatial',enabled:false, value:0, labels: ["jumping", "flashing", "shooting"]},
                {index:2, name:'thermal',enabled:false, value:0, labels: ["hot", "boring", "scalding", "searing"]},
                {index:3, name:'brightness',enabled:false, value:0, labels: ["tingling", "itchy", "smarting", "stinging"]},
                {index:4, name:'dullness',enabled:false, value:0, labels: ["dull", "sore", "hurting","aching", "heavy"]},
                {index:5, name:'sensory',enabled:false, value:0, labels: ["cool","cold","freezing"]},
                {index:6, name:'Button7',enabled:false, value:0, labels: ["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]},
                {index:7, name:'Button8',enabled:false, value:0, labels: ["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]},
                {index:8, name:'Button9',enabled:false, value:0, labels: ["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]},
                {index:9, name:'Button10',enabled:false, value:0, labels: ["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]}
            ],
            indxOld: -1,
            label:"",
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
            
            indx = parseInt(indx)
            this.currentActive = -1
            for (let i = 0; i < this.paintypes.length; i++){
                if (i == indx){
                    this.paintypes[indx].enabled = !this.paintypes[indx].enabled
                    if (this.paintypes[indx].enabled){
                        this.currentActive = indx
                    }
                }
                else{
                    this.paintypes[i].enabled = false;
        
                }
            }
            this.label =  this.paintypes[indx].value > 0 ? this.paintypes[indx].labels[this.paintypes[indx].value] : ""
        },
        getLabels: function() {
            return this.currentActive != -1 ? this.paintypes[this.currentActive].labels: []
        },
        getLabel: function() {
            return this.currentActive != -1 ? this.paintypes[this.currentActive].labels[this.paintypes[this.currentActive].value]: [] 
        }
        ,
        update: function(i, event) {
            var id = this.paintypes[i].name 
            console.log(event)
            this.typeValues[id] =  parseInt(event)
            this.paintypes[i].value = parseInt(event)
            console.log(this.typeValues)
            this.$emit('update', this.typeValues)

            this.label = this.paintypes[i].labels[this.paintypes[i].value-1]
        }
    },
    computed: {
        columns: function(){
            var col1 = []
            var col2 = []
            for (var col = 0; col < this.paintypes.length; col++){
                if (col < this.paintypes.length/2){
                    col1.push(this.paintypes[col])
                }
                else{
                    col2.push(this.paintypes[col])
                }

            }
            return [col1,col2]
        }
    }
}
</script>

<style scoped>
    .buttons{
        min-width: 100px;
    }
</style>