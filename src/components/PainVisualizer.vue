<template>
  <div id="parent">
    <div id="canvas"></div>

    <!-- RADIUS -->
    <div>
      <label for="radiusSlider">Radius: {{ radius }}</label>
      <b-form-input id="radiusSlider" v-model="radius" type="range" min="1" max="100"></b-form-input>
    </div>

    <!-- RESET -->
    <b-button variant="primary" id="resetButton" class="w-100 mt-2">Reset</b-button>

    <!-- FIGURE -->
    <label for="figureInput" id="figureInputLabel" class="w-100 mt-3">Value</label>
    <b-form-input id="figureInput" placeholder="Set figure"></b-form-input>

    <!-- ADD PAIN -->
    <label for="addPainInput" id="addPainInputLabel" class="w-100 mt-4">Value</label>
    <b-form-input id="addPainInput" placeholder="Add pain"></b-form-input>

    <!-- REMOVE PAIN -->
    <b-form-input id="removePainInput" placeholder="Remove pain" class="w-100 mt-1"></b-form-input>
  </div>
</template>


<script>
// thanks to https://medium.com/js-dojo/experiment-with-p5-js-on-vue-7ebc05030d33
// for general setup of p5 + vue
const p5_lib = require('p5');

export default {
    name: "PainVisualizer",
    data() {
      return {
          radius: 25
      }
    },
    created() {
      const pain_visualize = p5 => {
        // Constants
        const aspectImage = 437/853;
        const aspectCanvas = 9/14;

        // p5 variables
        var bodyImage;        // reference to body image
        var bg_canvas;        // back-most canvas, actually draw circles on this
        var canvas;           // reference to the p5 canvas

        // Pain Circle
        let circleRadius = 30;  // Relative: from 0 to 100
        let innerCircleR = 0;   // Used for pulsating circle
        let figure = "man-front-large";
        let availablePains = [
          "temporal",
          "spatial",
          "pressure",
          "thermal",
          "brightness"
        ];
        let selectedPains = ["thermal"];  // actually renders

        // Size and positional variables
        let width_div;  // width of parent div
        let w, h;       // width and height of canvas DOM

        // Relative units
        let rx;  // canvas width / 100
        let ry;  // canvas height / 100

        // UI
        var parent;
        var radiusSlider;
        var resetButton;
        var figureInput;
        var addPainInput;
        var removePainInput;  // TODO: better name, "remove" & "input" can be confusing

        ////////////////////////////////////////////////////
        //// p5-FUNCTIONS BELOW                        ////
        //////////////////////////////////////////////////
        p5.preload = function() {
          let img = require("@/assets/"+figure+".png")  // thanks to https://stackoverflow.com/a/65872755
          bodyImage = p5.loadImage(img);  // todo resize image - too large atm
          document.getElementById("figureInputLabel").innerText = figure;
        }

        p5.setup = function() {
          // get width of parent div
          parent = document.getElementById("parent");

          // Create canvas
          canvas = p5.createCanvas(parent.offsetWidth, parent.offsetWidth/aspectCanvas);
          canvas.elt.style.border = "solid 1px black";
          canvas.elt.style.background = "#ffffff";
          canvas.parent("canvas");  // Attach to <div>

          // Fetching canvas properties
          let canvas_rect = canvas.elt.getBoundingClientRect();
          w = canvas_rect.width, h = canvas_rect.height;
          rx = w/100;  // normalize to 0 to 100 scale
          ry = h/100;  // normalize to 0 to 100  scale

          bg_canvas = p5.createGraphics(w, h);
          resetBackground();

          // Get UI elements
          radiusSlider = document.getElementById("radiusSlider");
          resetButton = document.getElementById("resetButton");
          figureInput = document.getElementById("figureInput");
          addPainInput = document.getElementById("addPainInput");
          document.getElementById("addPainInputLabel").innerText = selectedPains;
          removePainInput = document.getElementById("removePainInput");
          resetButton.onclick = function(){resetBackground()};

          // BLENDMODE
          p5.blendMode(p5.MULTIPLY);
        }

        p5.draw = function() {
          updateValues();

          // Clear & render background
          p5.clear();
          p5.image(bg_canvas, 0, 0);

          let mx = p5.mouseX / w;  // rel. mouse pos., 0 to 1
          let my = p5.mouseY / h;

          if (0 <= mx && mx <= 1 && 0 <= my && my <= 1) {  // bounds check
            selectedPains.forEach(drawCircle);
          }
        }

        ////////////////////////////////////////////////////
        //// CUSTOM FUNCTIONS (NON-p5)                 ////
        //////////////////////////////////////////////////
        /* Re-draws bg. */
        function resetBackground() {
          bg_canvas.clear();
          let imgWidth = 1.20*w

          bg_canvas.image(bodyImage, 19*rx, 10*ry, imgWidth*aspectImage, imgWidth);
        }

        /* Tries to change background figure -> resets bg if changed. */
        function changeFigure(new_figure) {
          try {
            let new_img = require("@/assets/"+new_figure+".png")  // thanks to https://stackoverflow.com/a/65872755
            bodyImage = p5.loadImage(new_img, resetBackground);  // callback to resetBackground
            figureInput.value = "";  // reset field
            document.getElementById("figureInputLabel").innerText = new_figure;
          } catch (error) {
            console.log("Figure invalid.");
          }
        }

        /* Tries to add pain for rendering. */
        function addPain(pain) {
          if (availablePains.includes(pain)) {
            if (selectedPains.includes(pain)) {
              console.warn("Pain already selected, skipping.");
            } else {
              selectedPains.push(pain);
              // update label
              document.getElementById("addPainInputLabel").innerText = selectedPains;
            }
            addPainInput.value = "";  // reset
          }
        }

        /* Tries to remove pain for rendering. */
        function removePain(pain) {
          try {
            let i = selectedPains.indexOf(pain);
            selectedPains.splice(i, i+1); // remove element
            // update label
            document.getElementById("addPainInputLabel").innerHtml = selectedPains;
            removePainInput.value = "";  // reset
          } catch (error) {
            console.warn("Could not remove pain.");
          }
        }

        /* Updates values before rendering every frame. */
        function updateValues() {
          // width of parent div
          try {
            width_div = document.getElementById("canvas").offsetWidth;
          } catch (error) {
            console.log("[  P5  ] User exited -> canvas destroyed.");
            p5.remove();
          }

          // check if user sel. diff figure
          let fig = figureInput.value;
          if (fig != "") {
            changeFigure(fig);  // tries to change figure
          }

          // check if user sel. pain
          let pain = addPainInput.value;
          if (pain != "") {
            addPain(pain);  // tries to add pain
          }

          // check if user rem. pain
          pain = removePainInput.value;
          if (pain != "") {
            removePain(pain);  // tries to remove pain
          }

          circleRadius = radiusSlider.value;

          // Updated scaling variables
          let canvas_rect = canvas.elt.getBoundingClientRect();
          w = canvas_rect.width, h = canvas_rect.height;

          // Update relative variables
          rx = w/100;
          ry = h/100;
        }

        /* Renders a circle based on type of pain.
         * Use this method unless saving circle on background.
         */
        function drawCircle(pain_type) {
          switch (pain_type) {
            case "static":
              p5.fill(255, 0, 0, 150);
              p5.circle(p5.mouseX, p5.mouseY, circleRadius*w/200);
              break;

            case "thermal":
              p5.fill(255, 0, 0, 150);
              p5.circle(p5.mouseX, p5.mouseY, circleRadius*w/200);
              break;

            case "sensory":
              p5.textSize(27);
              p5.fill(255, 255, 255);
              p5.text("🥶", p5.mouseX-30 - (circleRadius*w/200)/4, p5.mouseY-30- (circleRadius*w/200)/4);
              p5.fill(0, 0, 255, 150);
              p5.circle(p5.mouseX, p5.mouseY, circleRadius*w/200);
              break;

            case "temporal":
              if (innerCircleR > circleRadius) {
                innerCircleR = 0;
              } else {
                innerCircleR++;
              }
              p5.fill(255, 0, 0, 120);
              p5.circle(p5.mouseX, p5.mouseY, circleRadius*w/200);

              // inner circle
              p5.fill(255, 0, 0, 50);
              p5.circle(p5.mouseX, p5.mouseY, innerCircleR*w/200);
              break;

            case "spatial":
              if (innerCircleR > circleRadius) {
                innerCircleR = 0;
              } else {
                innerCircleR += 2;
              }
              p5.fill(255, 0, 0, 120);
              p5.circle(p5.mouseX, p5.mouseY, circleRadius*w/200);

              // inner circle
              p5.fill(255, 0, 0, 50);
              p5.circle(p5.mouseX, p5.mouseY, innerCircleR*w/200);
              break;

            default:
              console.error("Non-valid render type \"" + pain_type + "\"");
          }
        }

        ////////////////////////////////////////////////////
        //// EVENTS BELOW                              ////
        //////////////////////////////////////////////////
        p5.touchEnded = function() {
          console.log("touch event @ abs("+Math.round(p5.mouseX)+", "+Math.round(p5.mouseY)+") rel(x="+Math.round(100*(p5.mouseX / w))+", y="+Math.round(100*(p5.mouseY / h))+", r="+circleRadius+")");

          // Save circle to background
          let tx = p5.mouseX / w;  // rel. mouse pos., 0 to 1
          let ty = p5.mouseY / h;

          if (0 <= tx && tx <= 1 && 0 <= ty && ty <= 1) {  // bounds check
            bg_canvas.fill(255, 0, 0, 150);
            bg_canvas.circle(p5.mouseX, p5.mouseY, circleRadius*w/200);
          }
        }

        p5.mouseReleased = function() {
          // Save circle to background
          let mx = p5.mouseX / w;  // rel. mouse pos., 0 to 1
          let my = p5.mouseY / h;
          if (0 <= mx && mx <= 1 && 0 <= my && my <= 1) {  // bounds check
            bg_canvas.fill(255, 0, 0, 150);
            bg_canvas.circle(p5.mouseX, p5.mouseY, circleRadius*w/200);
            console.log("mouse event @ abs("+Math.round(p5.mouseX)+", "+Math.round(p5.mouseY)+") rel(x="+Math.round(100*(p5.mouseX / w))+", y="+Math.round(100*(p5.mouseY / h))+", r="+circleRadius+")");
          }
        }

        p5.windowResized = function() {
          updateValues();
          console.log("Resized to width " + parent.offsetWidth);
          // Resize canvas and background_canvas
          p5.resizeCanvas(width_div, width_div/aspectCanvas);
          bg_canvas.resizeCanvas(width_div, width_div/aspectCanvas);
          resetBackground();
        }
      }

      // thanks to https://stackoverflow.com/a/61855707
      // for setting up p5 in an vue component
      new p5_lib(pain_visualize);
    },
}
</script>

<style>
p, input, button {
  width: 100%;
}
p {
  margin-left: 45%;
  margin-right:auto;
}
#parent {
  width: 100%;
}
</style>
