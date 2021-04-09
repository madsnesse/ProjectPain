<template>
  <b-container id="main">
    <b-row align-h="center" class="my-5"
      ><h1 id="welcome">It's ya boy, Settings page here</h1></b-row
    >
    <b-row align-h="center" class="my-5">
      Not ready yet
      <router-link tag="b-button" class="buttons" to="/home"
        >Change Password</router-link
      >
    </b-row>
    <b-row align-h="center" class="my-5">
      <router-link tag="b-button" class="buttons" to="/home"
        >Recalibrate</router-link
      >
    </b-row>
    <b-row align-h="center" class="my-5">
      <router-link tag="b-button" class="buttons" to="/home"
        >Go back</router-link
      >
    </b-row>
  </b-container>
</template>


<script>
export default {
  name: "Settings",
};
</script>