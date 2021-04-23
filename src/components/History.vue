<template>
    <b-container>
        <b-row align-h="center" class="mt-2"><h1 id="welcome">History!</h1></b-row>
        <b-row align-h="center" class="mt-4"><img src="../assets/Placeholder.png" class="picture"/></b-row>
        <b-row align-h="center" class="mt-2 mb-4">
          <Slider 
          :values='["Last week", "Yesterday", "Today", "Tomorrow", "Next week"]' 
          :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" 
          @updateValue= "update(0,$event)" 
          :labels="['Old','New']" />
        </b-row>
        <b-row>
            <b-col>
                <router-link tag="b-button" class="buttons" to="/Profile">Go back</router-link>
            </b-col>
            <b-col>
                <router-link tag="b-button" class="buttons" to="/Profile">kcab oG</router-link>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Slider from './Slider.vue'
export default {
  components:{
        Slider
    },
  name: "Settings",
  data() {
    return {
      sliderMin: 1,
      sliderMax: 5,
      sliderDef:1
    };
  },
};
</script>
