<template>
  <b-container id="main">
    <b-row align-h="center" class="my-5"
      ><h1 id="welcome">It's ya boy, Settings page here</h1></b-row
    >
    <b-row class="my-5">
      <b-button v-b-toggle.accordion-3>Change gender / weight</b-button>
      <b-collapse class="w-100" id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-row>
        <b-col cols="5">
          <b-button @click="updatePict(0)">button 1</b-button>
          <b-button @click="updatePict(1)">button 2</b-button>
          <b-button @click="updatePict(2)">button 1</b-button>
          <b-button @click="updatePict(3)">button 2</b-button>

        </b-col>
        <b-col cols="7">
          <img :src="require(`@/assets/${pictures[currentPict]}`)" class="picture"/>
        </b-col>
        </b-row>
        <!-- <b-row>
          <b-button v-b-toggle.accordion-4>show</b-button>
          <b-button @click="updatePict(0)">button 1</b-button>
          <b-button @click="updatePict(1)">button 2</b-button>
            <b-collapse id="accordion-4" accordion="my-accordion-2" role="tabpanel">
              <b-row>
                <img :src="require(`@/assets/${pictures[currentPict]}`)" class="picture"/>
              </b-row>
            </b-collapse>
        </b-row> -->
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
        <b-row>How bad is the worst toothache</b-row>
        <b-row>Add sliders here</b-row>
        <b-row>How bad is the worst pain you've felt</b-row>
        <b-row>Add sliders here</b-row>
        <b-row>How bad is stubbing your toe</b-row>
        <b-row>Add sliders here</b-row>
        <b-row>How bad was The Rise of Skywalker</b-row>
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