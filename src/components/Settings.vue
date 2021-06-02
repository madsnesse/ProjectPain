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
        Settings
      </b-breadcrumb-item>
    </b-breadcrumb>


    <b-row align-h="center" class="my-5"
      ><h1 id="welcome">Settings</h1></b-row
    >
    <b-row align-h="center" class="my-5">
      <b-button v-b-toggle.accordion-3 class="buttons" variant="outline-secondary">Change Avatar</b-button>
      <b-collapse class="w-100" id="accordion-3" accordion="my-accordion" role="tabpanel">
        
        <!-- Only visible on x-small and small -->
        <!-- class="d-block d-md-none" -->
        <b-row class="d-flex d-md-none">
          <b-col cols=1></b-col>
          <b-col cols=9>
            <b-card class="mt-2 ml-3">
              <img :src="require(`@/assets/${pictures[currentPict]}`)" class="picture"/>
            </b-card>
          </b-col>
          <b-col cols=2></b-col>
        </b-row>

        <b-row class="d-flex d-md-none">
          <b-col cols=1></b-col>
          <b-col cols=5>
            <b-button class="mt-1" @click="updatePict(0)" variant="secondary">Male L</b-button>
            <b-button class="mt-1" @click="updatePict(1)" variant="secondary">Male M</b-button>
            <b-button class="mt-1" @click="updatePict(2)" variant="secondary">Male S</b-button>
          </b-col>
          <b-col cols=5>
            <b-button class="mt-1" @click="updatePict(3)" variant="secondary">Female L</b-button>
            <b-button class="mt-1" @click="updatePict(4)" variant="secondary">Female M</b-button>
            <b-button class="mt-1" @click="updatePict(5)" variant="secondary">Female S</b-button>
          </b-col>
          <b-col cols=1></b-col>
        </b-row>

        <!-- Only visible on medium and up -->
        <b-row class="d-none d-md-flex">
        <b-card class="mt-2 ml-5" cols="7">
          <img :src="require(`@/assets/${pictures[currentPict]}`)" class="picture"/>
        </b-card>
        <b-col class="my-3 ml-5" cols="5">
          <b-button class="mt-1" @click="updatePict(0)" variant="secondary">Male L</b-button>
          <b-button class="mt-1" @click="updatePict(1)" variant="secondary">Male M</b-button>
          <b-button class="mt-1" @click="updatePict(2)" variant="secondary">Male S</b-button>
          <b-button class="mt-1" @click="updatePict(3)" variant="secondary">Female L</b-button>
          <b-button class="mt-1" @click="updatePict(4)" variant="secondary">Female M</b-button>
          <b-button class="mt-1" @click="updatePict(5)" variant="secondary">Female S</b-button>
        </b-col>
        </b-row>
      </b-collapse>
    </b-row>
    

    <b-row align-h="center">
      <b-button v-b-toggle.accordion-1 class="buttons" variant="outline-secondary">Change Password</b-button>
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

        <label class="mt-3" for="NewPassAgain">Repeat New Password:</label>
        <b-form-input
          id="NewPassAgain"
          type="password"
          v-model="NewPassTwo"
          placeholder="Repeat New Password"
        ></b-form-input>
      </b-collapse>
    </b-row>

    <b-row align-h="center" class="my-5">
      <b-button v-b-toggle.accordion-2 class="buttons" variant="outline-secondary">Calibrate Pain Levels</b-button>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">

        <b-row class="mt-3 ml-2 mr-2">How bad is the worst headache you ever had?</b-row>
        <b-row align-h="center">
          <Slider
          :values='["Mild", "Discomforting", "Distressing", "Horrible", "Excruciating"]'
          :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef"
          @updateValue= "update(0,$event)"
          :labels="['Weak','Strong']" />
        </b-row>

        <b-row class="mt-2 ml-2 mr-2">How bad is the worst headache you ever had</b-row>
        <b-row align-h="center">
          <Slider
          :values='["Mild", "Discomforting", "Distressing", "Horrible", "Excruciating"]'
          :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef"
          @updateValue= "update(0,$event)"
          :labels="['Weak','Strong']" />
        </b-row>

        <b-row class="mt-2 ml-2 mr-2">How bad is the worst stomach ache you ever had</b-row>
        <b-row align-h="center">
          <Slider
          :values='["Mild", "Discomforting", "Distressing", "Horrible", "Excruciating"]'
          :minimum="sliderMin" :maximum="sliderMax" :default="sliderDef"
          @updateValue= "update(0,$event)"
          :labels="['Weak','Strong']" />
        </b-row>
      </b-collapse>
    </b-row>

    <b-row align-h="center" class="my-5">
      <b-button  class="buttons" variant="secondary" to="/profile"
        >Return to Profile</b-button
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
      pictures: ["man-large-front.png", "man-med-front.png", "man-sm-front.png", "woman-large-front.png", "woman-med-front.png", "woman-sm-front.png"],
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
