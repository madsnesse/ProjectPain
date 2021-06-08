<template>
    <b-container class="registry-container">
        <b-row align-h="center" >
            <b-col v-for="col in columns" :key="col[0].name" >
                <b-button 
                    v-for="type in col"
                    :key="type.index"
                    size="sm"
                    class="w-100 my-1 buttons"
                    :variant='type.enabled?"secondary":"outline-secondary"'
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
                {index:0, name:'Temporal',enabled:false, value:0, labels: ["Flickering", "Quivering", "Pulsing", "Throbbing", "Beating", "Pounding"]},
                {index:1, name:'Spatial',enabled:false, value:0, labels: ["Jumping", "Flashing", "Shooting"]},
                {index:2, name:'Thermal',enabled:false, value:0, labels: ["Hot", "Boring", "Scalding", "Searing"]},
                {index:3, name:'Brightness',enabled:false, value:0, labels: ["Tingling", "Itchy", "Smarting", "Stinging"]},
                {index:4, name:'Dullness',enabled:false, value:0, labels: ["Dull", "Sore", "Hurting","Aching", "Heavy"]},
                {index:5, name:'Sensory',enabled:false, value:0, labels: ["Cool","Cold","Freezing"]},
                {index:6, name:'Tension',enabled:false, value:0, labels: ["Tiring", "Exhausting"]},
                {index:7, name:'Autonomic',enabled:false, value:0, labels: ["Sickening", "Suffocating"]},
                {index:8, name:'Punishment',enabled:false, value:0, labels: ["Punishing", "Gruelling", "Cruel", "Vicious", "Killing"]},
                {index:9, name:'Fear',enabled:false, value:0, labels: ["Fearful", "Frightful", "Terrifying"]}
            ],
            indxOld: -1,
            label:"",
            sliderMin: 1,
            sliderMax: 5,
            sliderDef: 1,
            typeValues: {
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
