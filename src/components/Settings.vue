<template>
  <b-container id="main">
    <b-row align-h="center" class="my-5"
      ><h1 id="welcome">Settings</h1></b-row
    >
    <b-row align-h="center" class="mt-5 mb-5">
      <b-button v-b-toggle.accordion-3 class="buttons" variant="primary">Change gender / weight</b-button>
      <b-collapse class="w-100" id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-row>
        <b-col class="mt-2" cols="7">
          <img :src="require(`@/assets/${pictures[currentPict]}`)" class="picture"/>
        </b-col>
        <b-col class="my-2" cols="5">
          <b-button class="mt-1" @click="updatePict(0)" variant="primary">Male L</b-button>
          <b-button class="mt-1" @click="updatePict(1)" variant="primary">Male M</b-button>
          <b-button class="mt-1" @click="updatePict(1)" variant="primary">Male S</b-button>
          <b-button class="mt-1" @click="updatePict(2)" variant="primary">Female L</b-button>
          <b-button class="mt-1" @click="updatePict(3)" variant="primary">Female M</b-button>
          <b-button class="mt-1" @click="updatePict(3)" variant="primary">Female S</b-button>
        </b-col>
        </b-row>
      </b-collapse>
    </b-row>


    <b-row align-h="center">
      <b-button v-b-toggle.accordion-1 class="buttons" variant="primary">Change Password</b-button>
      <b-collapse class="w-100" id="accordion-1" accordion="my-accordion" role="tabpanel">
        <label class="mt-3" for="OldPass">Old Password:</label>
        <b-form-input
          id="OldPass"
          type="password"
          v-model="OldPassword"
          placeholder="Old Password"
        ></b-form-input>

        <label class="mt-3" for="NewPass">New Password:</label>
        <b-form-input
          id="NewPass"
          type="password"
          v-model="NewPassOne"
          placeholder="New Password"
        ></b-form-input>

        <label class="mt-3" for="NewPassAgain">New Password again:</label>
        <b-form-input
          id="NewPassAgain"
          type="password"
          v-model="NewPassTwo"
          placeholder="New Password again"
        ></b-form-input>
      </b-collapse>
    </b-row>

    <b-row align-h="center" class="my-5">
      <b-button v-b-toggle.accordion-2 class="buttons" variant="primary">Calibrate pain levels</b-button>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        
        <b-row class="mt-3 ml-2 mr-2">How bad is the worst headache you ever had?</b-row>
        <b-row align-h="center">
          <Slider 
          :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' 
          :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" 
          @updateValue= "update(0,$event)" 
          :labels="['Weak','Strong']" />
        </b-row>

        <b-row class="mt-2 ml-2 mr-2">How bad is the worst headache you ever had</b-row>
        <b-row align-h="center">
          <Slider 
          :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' 
          :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" 
          @updateValue= "update(0,$event)" 
          :labels="['Weak','Strong']" />
        </b-row>
        
        <b-row class="mt-2 ml-2 mr-2">How bad is the worst stomach ache you ever had</b-row>
        <b-row align-h="center">
          <Slider 
          :values='["Light tickle", "Kinda annoying", "this isnt good", "Ouch squared", "help"]' 
          :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef" 
          @updateValue= "update(0,$event)" 
          :labels="['Weak','Strong']" />
        </b-row>
      </b-collapse>
    </b-row>

    <b-row align-h="center" class="my-5">
      <b-button  class="buttons" variant="primary" to="/profile"
        >Go back</b-button
      >
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
      OldPassword: "",
      NewPassOne: "",
      NewPassTwo: "",
      currentPict: 0,
      pictures: ["man-front-large.svg", "man-front-med.svg", "woman-back-large.svg", "woman-back-med.svg"],
      sliderMin: 1,
      sliderMax: 5,
      sliderDef:1
    };
  },
  methods: {
    updatePict: function(n) {
      this.currentPict = n;
    }
  }
};
</script>

<style>
  #welcome {
    font-size: 200%;
    text-align: center;
  }
  .picture{
    width: 200px;
  }
  .buttons{
        width: 50%;
    }
</style>