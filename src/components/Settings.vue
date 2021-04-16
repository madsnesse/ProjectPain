<template>
  <b-container id="main">
    <b-row align-h="center" class="my-5"><h1 id="welcome">It's ya boy, Settings page here</h1></b-row>

    <b-row align-h="center" class="my-5">
      Not ready yet
      <b-button v-b-toggle.accordion-1>Change Password</b-button>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <label class="mt-3" for="OldPass">Old Password:</label>
        <b-form-input id="OldPass" type="password" v-model="OldPassword" placeholder="Old Password"></b-form-input>

        <label class="mt-3" for="NewPass">New Password:</label>
        <b-form-input id="NewPass" type="password" v-model="NewPassOne" placeholder="New Password"></b-form-input>

        <label class="mt-3" for="NewPassAgain">New Password again:</label>
        <b-form-input id="NewPassAgain" type="password" v-model="NewPassTwo" placeholder="New Password again"></b-form-input>
      </b-collapse>
    </b-row>

    <b-row align-h="center">
      <b-button v-b-toggle.accordion-2>Calibrate pain levels</b-button>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          example questions
          <b-row>How bad is the worst toothache</b-row>
          <b-row>Add sliders here</b-row>
          <b-row>How bad is the worst pain you've felt</b-row>
          <b-row>Add sliders here</b-row>
          <b-row>How bad is stubbing your toe</b-row>
          <b-row>Add sliders here</b-row>
      </b-collapse>
    </b-row>

    <b-row align-h="center" class="my-5">
      <router-link tag="b-button" class="buttons" to="/profile">Go back</router-link>
    </b-row>

  </b-container>
</template>


<script>
  export default {
    name: "Settings",
    data() {
      return {
        text: `
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.
        `,
        OldPassword: "",
        NewPassOne: "",
        NewPassTwo: ""
      }
    }
  }
</script>