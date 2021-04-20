<template>
  <b-container id="main">
    <b-row align-h="center" class="my-5"
      ><h1 id="welcome">Settings</h1></b-row
    >
    <b-row class="my-5">
      <b-button v-b-toggle.accordion-3>Change gender / weight</b-button>
      <b-collapse class="w-100" id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-row>
        <b-col cols="7">
          <img :src="require(`@/assets/${pictures[currentPict]}`)" class="picture"/>
        </b-col>
        <b-col class="my-2" cols="5">
          <b-button @click="updatePict(0)">Male L</b-button>
          <b-button @click="updatePict(1)">Male M</b-button>
          <b-button @click="updatePict(1)">Male S</b-button>
          <b-button @click="updatePict(2)">Female L</b-button>
          <b-button @click="updatePict(3)">Female M</b-button>
          <b-button @click="updatePict(3)">Female S</b-button>
          <b-row>small not implemented</b-row>
        </b-col>
        </b-row>
      </b-collapse>
    </b-row>


    <b-row align-h="center">
      <b-button v-b-toggle.accordion-1>Change Password</b-button>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
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
      <b-button v-b-toggle.accordion-2>Calibrate pain levels</b-button>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        example questions
        <b-row>How bad is the worst headache you ever had?</b-row>
        <b-row>Add sliders here</b-row>
        <b-row>How bad is the worst headache you ever had</b-row>
        <b-row>Add sliders here</b-row>
        <b-row>How bad is the worst stomach ache you ever had</b-row>
        <b-row>Add sliders here</b-row>
      </b-collapse>
    </b-row>

    <b-row align-h="center" class="my-5">
      <router-link tag="b-button" class="buttons" to="/profile"
        >Go back</router-link
      >
    </b-row>
  </b-container>
</template>


<script>
export default {
  name: "Settings",
  data() {
    return {
      OldPassword: "",
      NewPassOne: "",
      NewPassTwo: "",
      currentPict: 0,
      pictures: ["man-front-large.svg", "man-front-med.svg", "woman-back-large.svg", "woman-back-med.svg"]
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
  .picture{
    width: 200px;
  }
</style>