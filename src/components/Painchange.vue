<template>
  <b-container>
    <b-row align-h="center" class="my-3">
      <b-col>
        <b-button @click="toggleOne" :variant="!one ? 'info' : 'success'">
          Continous
        </b-button>
      </b-col>
      <b-col>
        <b-button @click="toggleTwo" :variant="!two ? 'info' : 'success'">
          Rhytmic
        </b-button>
      </b-col>
      <b-col>
        <b-button @click="toggleThree" :variant="!three ? 'info' : 'success'">
          Brief
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
export default {
  data: function () {
    return {
      one: false,
      two: false,
      three: false,
    };
  },
  methods: {
    toggleOne: function () {
      this.one = !this.one;
      this.two = false;
      this.three = false;
    },
    toggleTwo: function () {
      this.two = !this.two;
      this.one = false;
      this.three = false;
    },
    toggleThree: function () {
      this.three = !this.three;
      this.one = false;
      this.two = false;
    },
  },
};
</script>