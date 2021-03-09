<template>
  <div>
    <div id="pain_visualizer"></div>

    <h3>Thanks to</h3>
    <a href="https://www.freepik.com/vectors/education">Education vector created by brgfx - www.freepik.com</a>
  </div>
</template>


<script>
// thanks to https://medium.com/js-dojo/experiment-with-p5-js-on-vue-7ebc05030d33
// for general setup of p5 + vue
export default {
    name: "PainVisualizer",
    mounted() {
      const p5_lib = require('p5');
      var visualizer = require('@/javascript/pain_visualizer.js');

      new p5_lib(visualizer.pain_visualize);
    }
}
</script>

<style></style>
