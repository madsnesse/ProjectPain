<template>
  <b-container id="main">
    <b-row align-h="center" class="my-5"><h1 id="welcome">It's ya boy, Settings page here</h1></b-row>

    <b-row align-h="center" class="my-5">
      Not ready yet
      <router-link tag="b-button" class="buttons" to="/home">Change Password</router-link>
    </b-row>

    <b-row>
      <b-button v-b-toggle.accordion-2>Accordion 2</b-button>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          {{ text }}
        </b-card-body>
      </b-collapse>
    </b-row>

    <b-row align-h="center" class="my-5">
      <router-link tag="b-button" class="buttons" to="/home">Go back</router-link>
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
        `
      }
    }
  }
</script>