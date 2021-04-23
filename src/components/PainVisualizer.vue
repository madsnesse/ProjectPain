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

    <!-- SET PAIN -->
    <label for="setPainInput" id="setPainInputLabel" class="w-100 mt-4">Value</label>
    <b-form-input id="setPainInput" placeholder="Set pain"></b-form-input>
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
        const aspectCanvas = 5/7;

        // p5 variables
        let figure = "man-front-large";
        var bodyFigure;        // reference to body image
        var canvas;            // reference to the p5 canvas

        /* Save each pain circle in an array of objects.
         * x        =  value from 0 to 100 (% of width)
         * y        =  value from 0 to 100 (% of height)
         * r        =  value from 0 to 100 (% of width)
         * pain_obj =  object for rendering, see 'circleFactory()' for more
        */
        var curr_circle = {x:p5.mouseX, y:p5.mouseY, r:25, pain_obj: {type:"temporal", sinus_arg: 0, speed: 0.01}};
        var circles = [];
        var radius;  // reusable variable

        const availablePains = [
          "temporal",
          "spatial",
          "pressure",
          "thermal",
          "brightness"
        ];

        // Size and positional variables
        let width_div;  // width of parent div
        let w, h;       // width and height of canvas DOM
        let rx;         // 1/100 of width  ==usage==> 75*rx (75% of width)
        let ry;         // 1/100 of height ==usage==> 25*ry (25% of height)

        // UI
        var parent;
        var radiusSlider;
        var resetButton;
        var figureInput;
        var setPainInput;

        ////////////////////////////////////////////////////
        //// p5-FUNCTIONS BELOW                        ////
        //////////////////////////////////////////////////
        p5.preload = function() {
          let img = require("@/assets/"+figure+".png")  // thanks to https://stackoverflow.com/a/65872755
          bodyFigure = p5.loadImage(img);  // todo resize image - too large atm
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

          // Get UI elements
          radiusSlider = document.getElementById("radiusSlider");
          resetButton = document.getElementById("resetButton");
          figureInput = document.getElementById("figureInput");
          setPainInput = document.getElementById("setPainInput");
          //document.getElementById("setPainInputLabel").innerText = selectedPains;
          resetButton.onclick = function(){circles = [];};  // Empty circles

          // p5-settings
          p5.blendMode(p5.MULTIPLY);
          p5.noStroke();
        }

        p5.draw = function() {
          updateValues();

          // Clear & render background
          p5.clear();
          p5.image(bodyFigure, 19*rx, 10*ry, w*aspectImage, w);

          // Saved circles
          for (let circle of circles) {
            // relative position from 0 to 1
            let x_ = circle.x / w;
            let y_ = circle.y / h;

            if (0 <= x_ && x_ <= 1 && 0 <= y_ && y_ <= 1) {  // bounds check
              drawCircle(circle);
            }
          }

          // Overlaying circle
          drawCircle(curr_circle);
        }

        ////////////////////////////////////////////////////
        //// CUSTOM FUNCTIONS (NON-p5)                 ////
        //////////////////////////////////////////////////
        /* Tries to change background figure. */
        function changeFigure(new_figure) {
          try {
            let new_img = require("@/assets/"+new_figure+".png")  // thanks to https://stackoverflow.com/a/65872755
            bodyFigure = p5.loadImage(new_img);
            figureInput.value = "";  // reset field
            document.getElementById("figureInputLabel").innerText = new_figure;
          } catch (error) {
            console.log("Figure invalid.");
          }
        }

        /* Updates values before rendering every frame. */
        function updateValues() {
          // width of parent div
          try {
            width_div = document.getElementById("canvas").offsetWidth;
          } catch (error) {
            console.log("[  P5  ] User exited -> destroying canvas.");
            p5.remove();
          }

          // check if user sel. diff figure
          let fig = figureInput.value;
          if (fig != "") {
            changeFigure(fig);  // tries to change figure
          }

          // check if user sel. pain
          let pain = setPainInput.value;
          if (pain != "" && availablePains.includes(pain)) {
            // update label
            document.getElementById("setPainInputLabel").innerText = "Pain: " + pain;
            setPainInput.value = "";  // reset
            curr_circle = circleFactory(pain); // TODO add multiple pains
          }

          // Updated scaling variables
          let canvas_rect = canvas.elt.getBoundingClientRect();
          w = canvas_rect.width, h = canvas_rect.height;

          // Update curr_circle
          curr_circle["x"] = 100*(p5.mouseX/w);
          curr_circle["y"] = 100*(p5.mouseY/h);
          curr_circle["r"] = radiusSlider.value;

          // Update relative variables
          rx = w/100;
          ry = h/100;
        }

        /* Renders a circle based on type of pain.
         * Use this method unless saving circle on background.
         */
        function drawCircle(circle) {
          switch (circle.pain_obj.type) {
            case "thermal":
              p5.fill(200, 0, 0, 150);
              p5.circle(circle.x*rx, circle.y*ry, circle.r*rx);
              break;

            case "temporal":
              circle.pain_obj.sinus_arg += circle.pain_obj.speed;
              circle.pain_obj.sinus_arg %= Math.PI;

              // Outer circle
              p5.stroke(0);
              p5.fill(230, 0, 0, 150);
              p5.circle(circle.x*rx, circle.y*ry, circle.r*rx);

              // Inner circle
              p5.noStroke();
              p5.fill(230, 0, 0, 100);
              radius = (circle.r*rx)*p5.sin(circle.pain_obj.sinus_arg);
              p5.circle(circle.x*rx, circle.y*ry, radius);
              break;

            default:
              console.error("Non-valid render type \"" + circle.type + "\"");
          }
        }

        /* Creates a new circle based on the type of pain */
        function circleFactory(pain_type) {
          switch (pain_type) {
            case "thermal":
              return {x:p5.mouseX, y:p5.mouseY, r:25, pain_obj: {type:"thermal"}};

            case "temporal":
              return {x:p5.mouseX, y:p5.mouseY, r:radiusSlider.value, pain_obj: {type:"temporal", sinus_arg: 0, speed: 0.01}};

            default:
              console.error("Non-valid pain type \"" + pain_type + "\"");
          }
        }

        ////////////////////////////////////////////////////
        //// EVENTS BELOW                              ////
        //////////////////////////////////////////////////
        p5.touchEnded = function() {
          // Save circle if within bounds
          let tx = 100*(p5.mouseX / w);  // rel. mouse pos., 0 to 100
          let ty = 100*(p5.mouseY / h);
          if (0 <= tx && tx <= 100 && 0 <= ty && ty <= 100) {  // bounds check
            console.log("touch event @ abs("+Math.round(p5.mouseX)+", "+Math.round(p5.mouseY)+")");
            curr_circle.x = tx;
            curr_circle.y = ty;
            circles.push(Object.assign({}, curr_circle));
            curr_circle = circleFactory("thermal");  // reset
          }
        }

        p5.mouseReleased = function() {
          // Save circle if within bounds
          let mx = 100*(p5.mouseX / w);  // rel. mouse pos., 0 to 100
          let my = 100*(p5.mouseY / h);
          if (0 <= mx && mx <= 100 && 0 <= my && my <= 100) {  // bounds check
            console.log("mouse event @ abs("+Math.round(p5.mouseX)+", "+Math.round(p5.mouseY)+")");
            curr_circle.x = mx;
            curr_circle.y = my;
            circles.push(Object.assign({}, curr_circle));
            curr_circle = circleFactory("thermal");  // reset
          }
        }

        p5.windowResized = function() {
          updateValues();
          console.log("Resized to width " + parent.offsetWidth);
          // Resize canvas and background_canvas
          p5.resizeCanvas(width_div, width_div/aspectCanvas);
        }
      }

      // thanks to https://stackoverflow.com/a/61855707
      // for setting up p5 in an vue component
      new p5_lib(pain_visualize);
    }
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
