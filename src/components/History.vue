<template>
    <b-container id="main">
        <b-breadcrumb>
            <b-breadcrumb-item :to="'/home'">
                <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                Home
            </b-breadcrumb-item>
            <b-breadcrumb-item :to="'/profile'">
                Profile
            </b-breadcrumb-item>
            <b-breadcrumb-item active>
                History
            </b-breadcrumb-item>
        </b-breadcrumb>

        <b-row align-h="center" class="my-5"><h1 id="welcome">History</h1></b-row>
        <PainVisMin :values="this.example.values" :entries="this.example.values.length"/>
        <b-row align-h="center" class="mt-2 mb-4">
          <Slider
          :values='["Last week", "Yesterday", "Today", "Tomorrow", "Next week"]'
          :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef"
          @updateValue= "update(0,$event)"
          :labels="['Old','New']" />
        </b-row>
        <b-row align-h="center">
            <b-col>
                <b-button class="buttons w-100" variant="outline-secondary" to="/Profile">Return to Profile</b-button>
            </b-col>
<!--            <b-col>-->
<!--                <b-button class="buttons w-100" variant="outline-secondary" to="/Profile">kcab oG</b-button>-->
<!--            </b-col>-->
        </b-row>
    </b-container>
</template>

<script>
import Slider from './Slider.vue'

import PainVisMin from './PainVisMin.vue'
export default {
  components:{
        Slider,
        PainVisMin
    },
  name: "Settings",
  data() {
    return {
      sliderMin: 1,
      sliderMax: 5,
      sliderDef:1,
      example:{"_id":"1623063378926","values":[{"x":47.517045454545446,"y":19.171138942315423,"r":15,"depth":0,"painstrength":0,"painType":{"Temporal":1,"Spatial":0,"Thermal":0,"Brightness":0,"Dullness":0,"Sensory":0,"Tension":0,"Autonomic":0,"Punishment":0,"Fear":0},"painChange":{"change":0,"increase":[],"decrease":[]}},{"x":40.24431818181818,"y":60.88131961410978,"r":15,"depth":0,"painstrength":0,"painType":{"Temporal":0,"Spatial":0,"Thermal":4,"Brightness":0,"Dullness":0,"Sensory":0,"Tension":0,"Autonomic":0,"Punishment":0,"Fear":0},"painChange":{"change":0,"increase":[],"decrease":[]}}]}
    };
  },
};
</script>

<style scoped>
    #welcome {
        font-size: 200%;
        text-align: center;
    }

</style>
