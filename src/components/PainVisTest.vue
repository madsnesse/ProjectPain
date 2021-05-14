<template>
  <div id="parent">
        
    <div id="canvas"></div>
    
    <!-- RADIUS -->
    <div>
      <label for="radiusSlider">Radius: {{ radius }}</label>
      <b-form-input id="radiusSlider" v-model="radius" type="range" min="1" max="100"></b-form-input>
    </div>
    <vue-p5 
        @preload="preload"
        @setup="setup"
        @draw="draw"
        @mouseReleased="mouseReleased"
        @touchEnded="touchEnded"
        @windowResized ="windowResized"
        :additional-events="['fill', 'noFill','stroke']"

    ></vue-p5>

    <!-- POP LAST PAIN CIRCLE -->
    <b-button variant="info" id="undoLastDraw" class="w-100 mt-2">Undo Last Draw</b-button>

    <!-- RESET -->
    <b-button variant="primary" id="resetButton" class="w-100 mt-2">Reset</b-button>

    <!-- SET PAIN -->
    <b-button-group class="w-100 mt-2">
      <b-button variant="success" id="temporalButton">Temporal</b-button>
      <b-button variant="success" id="thermalButton">Thermal</b-button>
      <b-button variant="success" id="sensoryButton">Sensory</b-button>
    </b-button-group>

    <!-- FIGURE -->
    <label for="figureInput" id="figureInputLabel" class="w-100 mt-3">Value</label>
    <b-form-input id="figureInput" placeholder="Set figure"></b-form-input>
  </div>
</template>


<script>
// thanks to https://medium.com/js-dojo/experiment-with-p5-js-on-vue-7ebc05030d33
// for general setup of p5 + vue

import VueP5 from "vue-p5";
export default {
    name: "PainVisualizer",
    props:{
      valuesFromForm:Object
    },
      
    data() {
      return {
            radius: 25,
            values: this.valuesFromForm,
            numberOfButtons: 69,
            // Constants
            aspectImage: (437/853),
            aspectCanvas:(5/7),
            // p5 background & misc.
            figure : "man-front-large",
            figureInput: "BRUH",
            bodyFigure:0,        // reference to body image
            canvas:0,            // reference to the p5 canvas

            /* Save each pain circle in an array of objects.
            * x          =  value from 0 to 100 (% of width)
            * y          =  value from 0 to 100 (% of height)
            * r          =  value from 0 to 100 (% of width)
            * pain_types =  array of pain types for rendering, see 'circleFactory()' / 'addPainToCircle()' for more
            */
            current_circle : {x:0, y:0, r:25, pain_types: [
                            {name:"temporal", sinus_arg: 0, speed: 0.1},
                            {name:"thermal"}
                            ]},
            circles : [],
            // Size and positional variables
            width_div:0,  // width of parent div
            w:0,
            h:0,       // width and height of canvas DOM
            rx:0,         // 1/100 of width  ==usage==> 75*rx (75% of width)
            ry:0,         // 1/100 of height ==usage==> 25*ry (25% of height)

            // UI
            parent:0,
            radiusSlider:0,
            undoLastDrawButton:0
      }
    },
    components:{
        "vue-p5":VueP5,
        
    },
    methods: {
      updateNumber: function(){
        this.numberOfButtons +=1
      },
      changeFigure(p5, new_figure){
          try {
            let new_img = require("@/assets/"+new_figure+".png")  // thanks to https://stackoverflow.com/a/65872755
            this.bodyFigure = p5.loadImage(new_img);
            this.figureInput.value = "";  // reset field
            document.getElementById("figureInputLabel").innerText = new_figure;
          } catch (error) {
            console.log("Figure invalid.");
          }
      },
      drawCircle(p5, circle){
          // Draw border
          p5.circle(circle.x*this.rx, circle.y*this.ry, circle.r*this.rx);
       

          for (let i = 0; i < circle.pain_types.length; i++) {  // render attached pain types of a circle
            switch (circle.pain_types[i].name) {  // pain name
              case "thermal":
                p5.fill(200, 0, 0, 150);
                p5.circle(circle.x*this.rx, circle.y*this.ry, circle.r*this.rx);
                break;

              case "temporal":
                circle.pain_types[i].sinus_arg += circle.pain_types[i].speed;
                circle.pain_types[i].sinus_arg %= Math.PI;

                // Inner circle
                
                this.radius = (circle.r*this.rx)*p5.sin(circle.pain_types[i].sinus_arg);
                
                p5.circle(circle.x*this.rx, circle.y*this.ry, this.radius);
               
                break;

              case "sensory":
                // Outer circle
                p5.fill(0, 0, 255, 85);
                p5.circle(circle.x*this.rx, circle.y*this.ry, circle.r*this.rx);
                break;

              default:
                console.error("Non-valid render type \"" + circle.name + "\"");
            }
          }
      },
      updateValues(p5){
          // width of parent div
          try {
            this.width_div = document.getElementById("canvas").offsetWidth;
          } catch (error) {
            console.log("[  P5  ] User exited -> destroying canvas.");
            p5.remove();
          }

          // check if user sel. diff figure
          let fig = this.figureInput.value;
          if (fig != "") {
            this.changeFigure(p5, fig);  // tries to change figure
          }

          // Updated scaling variables
          let canvas_rect = p5.canvas.elt.getBoundingClientRect();
          this.w = canvas_rect.width, this.h = canvas_rect.height;

          // Update current_circle
          this.current_circle.x = 100*(p5.mouseX/this.w);
          this.current_circle.y = 100*(p5.mouseY/this.h);

          // Update radius after check
          if (this.radiusSlider.value < 0 || this.radiusSlider > 100) {
            console.error("Slider for radius should only have values between 0 to 100.");
          } else {
              this.current_circle.r = this.radiusSlider.value;
          }

          // Update relative variables
          this.rx = this.w/100;
          this.ry = this.h/100;
      },
        circleFactory(p5, pain_type="thermal") {
            let c = {x:p5.mouseX, y:p5.mouseY, r:this.radiusSlider.value, pain_types: []};
            
            if (pain_type === "empty") {
            return c;
            } else {
            this.addPainToCircle(c, pain_type);
            return c;
            }
        },
        addPainToCircle(circle, pain_type) {
            switch (pain_type) {
            case "thermal":
                circle.pain_types.push({name:"thermal"});
                break;

            case "temporal":
                circle.pain_types.push({name:"temporal", sinus_arg: 0, speed: 0.1});
                break;

            case "sensory":
                circle.pain_types.push({name:"sensory"});
                break;

            default:
                console.error("Non-valid pain type \"" + pain_type + "\"");
            }
        },
      preload(p5){
          let img = require("@/assets/"+this.figure+".png")  // thanks to https://stackoverflow.com/a/65872755
          this.bodyFigure = p5.loadImage(img);  // todo resize image - too large atm
          p5.image(this.bodyFigure)
      },
      setup(p5){
          // get width of parent div
          this.parent = document.getElementById("parent");

          // Create canvas
          p5.createCanvas(parent.offsetWidth, parent.offsetWidth/this.aspectCanvas);
        
          p5.canvas.elt.style.border = "solid 1px black";
          p5.canvas.elt.style.background = "#ffffff";
          p5.canvas.parent("canvas");  // Attach to <div>

          // Fetching canvas properties
          let canvas_rect = p5.canvas.elt.getBoundingClientRect();
          this.w = canvas_rect.width, this.h = canvas_rect.height;
          this.rx = this.w/100;  // normalize to 0 to 100 scale
          this.ry = this.h/100;  // normalize to 0 to 100  scale
    
          // Get UI elements
          this.radiusSlider = document.getElementById("radiusSlider");

          this.undoLastDrawButton = document.getElementById("undoLastDraw");
          this.undoLastDrawButton.onclick = function() {this.circles.pop();};

          this.temporalButton = document.getElementById("temporalButton");
          this.temporalButton.onclick = function() {this.addPainToCircle(this.current_circle, "temporal")};

          this.thermalButton = document.getElementById("thermalButton");
          this.thermalButton.onclick = function() {this.addPainToCircle(this.current_circle, "thermal")};

          this.sensoryButton = document.getElementById("sensoryButton");
          this.sensoryButton.onclick = function() {this.addPainToCircle(this.current_circle, "sensory")};

          this.resetButton = document.getElementById("resetButton");
          this.resetButton.onclick = function(){this.circles = [];};  // Empty circles

          this.figureInput = document.getElementById("figureInput");
          

          // p5-settings
          p5.blendMode(p5.MULTIPLY);
          p5.noStroke();
      },
      draw(p5){
          this.updateValues(p5);
          // Clear & render background
          p5.clear();
          p5.image(this.bodyFigure, 19*this.rx, 10*this.ry, this.w*this.aspectImage, this.w);

          // draw each saved circle
          for (let circle of this.circles) {
            this.drawCircle(p5, circle);
          }

          // draw overlaying circle if within bounds
          if (0 <= this.current_circle.x && this.current_circle.x <= 100 && 0 <= this.current_circle.y && this.current_circle.y <= 100) {
            this.drawCircle(this.current_circle);
          }
      },
      touchEnded(p5) {
          // Save circle if within bounds
          let tx = 100*(p5.mouseX / this.w);  // rel. mouse pos., 0 to 100
          let ty = 100*(p5.mouseY / this.h);
          if (0 <= tx && tx <= 100 && 0 <= ty && ty <= 100) {  // bounds check
            console.log("touch event @ ("+Math.round(p5.mouseX)+", "+Math.round(p5.mouseY)+")");

            // Push circle to array
            this.current_circle.x = tx;
            this.current_circle.y = ty;
            this.circles.push(Object.assign({}, this.current_circle));

            this.current_circle = this.circleFactory("empty");  // reset
          }
        },

        mouseReleased(p5) {
          // Save circle if within bounds
          let mx = 100*(p5.mouseX / this.w);  // rel. mouse pos., 0 to 100
          let my = 100*(p5.mouseY / this.h);
          if (0 <= mx && mx <= 100 && 0 <= my && my <= 100) {  // bounds check
            console.log("mouse event @ ("+Math.round(p5.mouseX)+", "+Math.round(p5.mouseY)+")");

            // Push circle to array
            this.current_circle.x = mx;
            this.current_circle.y = my;
            this.circles.push(Object.assign({}, this.current_circle));
            this.updateNumber()
            this.current_circle = this.circleFactory("empty");  // reset
          }
        },
        windowResized(p5) {
          this.updateValues();

          // Resize canvas and background_canvas
          p5.resizeCanvas(this.width_div, this.width_div/this.aspectCanvas);
          console.log("Resized canvas to (" + this.width_div + ", " + this.width_div/this.aspectCanvas + ")");
        }

    },
    mounted() {
      
      
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
