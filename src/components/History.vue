<template>
    <b-container id="main">
        <h1 v-if="!valuesfromdb.length > 0">No entries in the database</h1>
        <h5 align="center" v-if="valuesfromdb.length > 0">Drag the slider to select which entry to see</h5>
        <b-row align-h="center" class="mt-2 mb-4">
            <b-form-input type="range" :min="0" :max="valuesfromdb.length-1" v-model="currentEntry"></b-form-input>
        </b-row>
        <b-row v-if="currentEntry >-1">{{getLabel()}}</b-row>
        <PainVisMin v-if="currentEntry > -1" :values="currentEntryArray.values" :entries="currentEntryArray.values.length"/>
    </b-container>
</template>

<script>
import PainVisMin from './PainVisMin.vue'
export default {
  components:{
        PainVisMin
    },
    props: {
        valuesfromdb: Array
    },
  name: "Settings",
  data() {
    return {
        currentEntry:-1,
        currentEntryArray:{},
        example:{"_id":"1623063378926","values":[{"x":47.517045454545446,"y":19.171138942315423,"r":15,"depth":0,"painstrength":0,"painType":{"Temporal":1,"Spatial":0,"Thermal":0,"Brightness":0,"Dullness":0,"Sensory":0,"Tension":0,"Autonomic":0,"Punishment":0,"Fear":0},"painChange":{"change":0,"increase":[],"decrease":[]}},{"x":40.24431818181818,"y":60.88131961410978,"r":15,"depth":0,"painstrength":0,"painType":{"Temporal":0,"Spatial":0,"Thermal":4,"Brightness":0,"Dullness":0,"Sensory":0,"Tension":0,"Autonomic":0,"Punishment":0,"Fear":0},"painChange":{"change":0,"increase":[],"decrease":[]}}]}

    };
  },
    methods: {
      getCurrentVal(){
          console.log(this.valuesfromdb)
          if (this.valuesfromdb != undefined){
              return this.valuesfromdb[this.currentEntry].doc.values;
          }
          else{
              return this.example.values
          }
      },
        getLabel(){
          return new Date(parseInt(this.currentEntryArray._id));
        }
    },
    watch: {
      currentEntry :{
          handler (){
              this.currentEntry = parseInt(this.currentEntry)
              this.currentEntryArray = this.valuesfromdb[this.currentEntry].doc;
          }
      }
    }
};
</script>

<style scoped>
    #welcome {
        font-size: 200%;
        text-align: center;
    }

</style>
