<template>
  <b-container id="main">
    <b-row align-h="center" class="my-5"><h1 id="welcome">Profile!</h1></b-row>
    <b-row align-h="center" class="my-5"
      ><b-button class="buttons" variant="primary" to="/history">history</b-button>
      </b-row
    >
    <b-row align-h="center" class="my-5"
      ><b-button class="buttons" variant="primary" to="/settings">settings</b-button>
      </b-row>

    <b-row align-h="center" class="my-5"
      ><b-button class="buttons" variant="primary" to="/home">Go back</b-button>
      </b-row>
  </b-container>
</template> 


<script>
export default {
  name: "Home",
};
</script>

<style scoped>
#welcome {
  font-size: 200%;
  text-align: center;
}
.buttons {
  width: 50%;
}
</style>