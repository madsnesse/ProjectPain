<template>
    <div id="parent">
        <div id="canvas"></div>

        <!-- RADIUS -->
        <div>
            <label for="radiusSlider">Radius: {{ radius }}</label>
            <b-form-input id="radiusSlider" v-model="radius" type="range" min="1" max="100"></b-form-input>
            
        </div>

        <!-- POP LAST PAIN CIRCLE -->
        <b-button variant="primary" id="finishPlacingCircle" class="w-100 mt-2">Finish Placement</b-button>

        <!-- RESET
        <b-button variant="primary" id="resetButton" class="w-100 mt-2">Reset</b-button>

        SET PAIN
        <b-button-group class="w-100 mt-2">
            <b-button variant="success" id="temporalButton">Temporal</b-button>
            <b-button variant="success" id="thermalButton">Thermal</b-button>
            <b-button variant="success" id="sensoryButton">Sensory</b-button>
        </b-button-group> -->
    </div>
</template>

<script>
// thanks to https://medium.com/js-dojo/experiment-with-p5-js-on-vue-7ebc05030d33
// for general setup of p5 + vue
const p5_lib = require('p5');
export default {
    name: "PainVisualizer",
    props:{
      values:Array,
      entries: Number,
      currentEntry:Number
    }
    ,
      
    data() {
        return {
            radius: 25,
            animationValues: []
        }
    },methods: {
      toggle: function(){
        this.$emit('tog')
      },
      
      updateNumber: function(){
        this.numberOfButtons +=1
        console.log("HEY!")
      },
      newCircle: function(x,y,r){
        this.$emit('newCircle',{x:x,y:y,r:r});
            
      },
      pushCircle: function(circle){
          this.newCircle(circle.x,circle.y,circle.r)
      },
      getCircleValues: function(i){
        return this.values[i];
      },
      getAnimationValue: function(i){
          
          return this.animationValues[i];
      }
    },
    created() {
        for (let i = 0; i < this.entries; i++){
            this.$set(this.animationValues, i,{
                anchored: true,
                sinus_arg: 0
            })
        }
    },
    mounted() {
        let vm = this
        const pain_visualize = p5 => {

            // Constants
            const aspectImage = 1876/3646;
            const aspectSkincube = 4688/6526;
            const aspectCanvas = 5/7;

            // p5 background & misc.
            var figureImg;    // reference to body image
            var skincubeImg;  // reference to skincube image
            var canvas;       // reference to the p5 canvas

            /* Save each pain circle as an object.
             * x          =  value from 0 to 100 (% of width)
             * y          =  value from 0 to 100 (% of height)
             * r          =  value from 0 to 100 (% of width)
             * anchored   =  if true, the x/y values should not be updated on mouse pos.
             * pain_types =  array of pain-type objects
             *               (see 'circleFactory()' / 'addPainToCircle()' for more)
            */
            // var circles = [];
            
            var radius;  // reusable variable
            var current_circle = {
                x:p5.mouseX,
                y:p5.mouseY,
                r:vm.radius,
                anchored: false
            };
            // Size and positional variables
            let width_div;  // width of parent div
            let w, h;       // width and height of canvas DOM
            let rx;         // 1/100 of width  ==usage==> 75*rx (75% of width)
            let ry;         // 1/100 of height ==usage==> 25*ry (25% of height)

            // UI
            var parent;
            // var radiusSlider;
            var finishPlacingCircleButton;
            //var resetButton;
            var temporalButton, thermalButton, sensoryButton;

            ////////////////////////////////////////////////////
            //// p5-FUNCTIONS BELOW                        ////
            //////////////////////////////////////////////////
            p5.preload = function() {
                let bodyImgRef = require("@/assets/woman-large-front.png");  // thanks to https://stackoverflow.com/a/65872755
                let skincubeImgRef = require("@/assets/skin-cube.png");
                
                figureImg = p5.loadImage(bodyImgRef);
                skincubeImg = p5.loadImage(skincubeImgRef);
            }

            p5.setup = function() {
                // get width of parent div
                parent = document.getElementById("parent");

                // Create canvas
                canvas = p5.createCanvas(parent.offsetWidth, parent.offsetWidth/aspectCanvas);
                canvas.elt.style.border = "solid 1px black";
                canvas.elt.style.background = "#ffffff";
                canvas.parent("canvas");    // Attach to <div>

                // Fetching canvas properties
                let canvas_rect = canvas.elt.getBoundingClientRect();
                w = canvas_rect.width, h = canvas_rect.height;
                rx = w/100;  // normalize to 0 to 100 scale
                ry = h/100;  // normalize to 0 to 100  scale

                // Get UI elements
                // radiusSlider = document.getElementById("radiusSlider");

                finishPlacingCircleButton = document.getElementById("finishPlacingCircle");
                finishPlacingCircleButton.onclick = function() {finishPlacingCircle();};

                temporalButton = document.getElementById("temporalButton");
                temporalButton.onclick = function() {addPainToCircle(current_circle, "temporal")};

                thermalButton = document.getElementById("thermalButton");
                thermalButton.onclick = function() {addPainToCircle(current_circle, "thermal")};

                sensoryButton = document.getElementById("sensoryButton");
                sensoryButton.onclick = function() {addPainToCircle(current_circle, "sensory")};

                //resetButton = document.getElementById("resetButton");
                //resetButton.onclick = function(){circles = [];};    // Empty circles

                // p5-settings
                p5.blendMode(p5.MULTIPLY);
                p5.noStroke();
            }

            p5.draw = function() {
                updateValues();

                // Clear & render background
                p5.clear();

                // body figure
                let widthImageDraw = h*aspectImage;
                let heightImageDraw = h;
                let x = (w - widthImageDraw) / 2;
                p5.image(figureImg, x, 1*ry, widthImageDraw, heightImageDraw);

                // skincube
                widthImageDraw = 40*ry*aspectSkincube;
                p5.image(skincubeImg, 60*rx, 0, widthImageDraw, widthImageDraw / aspectSkincube);

                // draw each saved circle
                for (let i = 0; i < vm.entries; i++){
                    drawCircle(i)
                }

                // draw overlaying circle if within bounds
                if (0 <= current_circle.x && current_circle.x <= 100 && 0 <= current_circle.y && current_circle.y <= 100) {
                    drawCurrentCircle(current_circle);
                }
            }

            ////////////////////////////////////////////////////
            //// CUSTOM FUNCTIONS (NON-p5) BELOW           ////
            //////////////////////////////////////////////////
            /* Saves the circle if within bounds */
            function finishPlacingCircle() {
                let x_ = current_circle.x;
                let y_ = current_circle.y;
                if (0 <= x_ && x_ <= 100 && 0 <= y_ && y_ <= 100) {  // bounds check
                    // Push circle to array
                    //circles.push(Object.assign({}, current_circle));
                    vm.pushCircle(current_circle)
                    vm.toggle();
                    current_circle = circleFactory("empty");    // reset
                }
            }

            /* Updates values before rendering every frame. */
            function updateValues() {
                // width of parent div
                current_circle.r = vm.radius;

                if (!current_circle.anchored) {
                        current_circle.x = 100*(p5.mouseX/w);
                        current_circle.y = 100*(p5.mouseY/h);
                }
                if (vm.currentEntry > -1){
                    //let circle_values = vm.getCircleValues(vm.currentEntry);
                    
                    try {
                        width_div = document.getElementById("canvas").offsetWidth;
                    } catch (error) {
                        console.log("[  P5  ] User exited -> destroying canvas.");
                        p5.remove();
                    }

                    // Updated scaling variables
                    let canvas_rect = canvas.elt.getBoundingClientRect();
                    w = canvas_rect.width, h = canvas_rect.height;

                    // Update current_circle
                    
                    // Update radius after check
                    if (vm.radius < 0 || vm.radius > 100) {
                        console.error("Slider for radius should only have values between 0 to 100.");
                    } else {
                            current_circle.r = vm.radius;
                    }

                    // Update relative variables
                    rx = w/100;
                    ry = h/100;
                }
            }
            function drawCurrentCircle(circle){
                p5.noFill();
                p5.strokeWeight(1);
                p5.stroke(0, 0, 0, 100);
                p5.circle(circle.x*rx, circle.y*ry, circle.r*rx);
                p5.noStroke();
            }
            /* Renders a circle based on type of pain. */
            function drawCircle(i) {
                let circle = vm.getCircleValues(i)
                if (vm.animationValues.length != vm.entries){
                    for (let i = 0; i < vm.entries; i++){
                        vm.$set(vm.animationValues, i,{
                            anchored: true,
                            sinus_arg: 0
                        })
                    }
                }
                let animation = vm.getAnimationValue(i)
                // Draw border
                
                if (circle != undefined){
                  

                  if (circle.painType.thermal > 0){
                      p5.fill(200, 0, 0, 150*circle.painType.thermal/5);
                      p5.circle(circle.x*rx, circle.y*ry, circle.r*rx);
                      

                  }
                  if (circle.painType.temporal > 0){
                      animation.sinus_arg += circle.painType.temporal*0.01;
                      animation.sinus_arg %= Math.PI;

                      // Inner circle
                      p5.noFill();
                      p5.strokeWeight(2);
                      radius = (circle.r*rx)*p5.sin(animation.sinus_arg);
                      p5.stroke(50, 50, 50, 50);
                      p5.circle(circle.x*rx, circle.y*ry, radius);
                      p5.noStroke();
                      
                  }
                  if (circle.painType.sensory > 0){
                    // Outer circle
                      p5.fill(0, 0, 255, 85);
                      p5.circle(circle.x*rx, circle.y*ry, circle.r*rx);
                      

                  }
                }
                // for (let i = 0; i < circle.pain_types.length; i++) {    // render attached pain types of a circle
                //     switch (circle.pain_types[i].name) {    // pain name
                //         case "thermal":
                            

                //         case "temporal":
                            

                //         case "sensory":
                //             // Outer circle
                //             p5.fill(0, 0, 255, 85);
                //             p5.circle(circle.x*rx, circle.y*ry, circle.r*rx);
                //             break;

                //         default:
                //             console.error("Non-valid render type \"" + circle.name + "\"");
                //     }
                
            }

            /* Creates a new circle based on the type of pain */
            function circleFactory() {
                let c = {x:p5.mouseX, y:p5.mouseY, r:vm.radius, anchored:false};

                return c
            }

            /* Adds pain to a circle */
            function addPainToCircle(circle, pain_type) {
                switch (pain_type) {
                    case "thermal":
                        circle.pain_types.push({name:"thermal"});
                        break;

                    case "temporal":
                        circle.pain_types.push({name:"temporal", sinus_arg: 0, speed: 0.01});
                        break;

                    case "sensory":
                        circle.pain_types.push({name:"sensory"});
                        break;

                    default:
                        console.error("Non-valid pain type \"" + pain_type + "\"");
                }
            }

            ////////////////////////////////////////////////////
            //// EVENTS BELOW                              ////
            //////////////////////////////////////////////////
            /* Update pos. of circle if within bounds */
            p5.touchEnded = function() {
                let tx = 100*(p5.mouseX / w);  // rel. mouse pos., 0 to 100
                let ty = 100*(p5.mouseY / h);
                if (0 <= tx && tx <= 100 && 0 <= ty && ty <= 100) {  // bounds check
                    console.log("touch event @ ("+Math.round(p5.mouseX)+", "+Math.round(p5.mouseY)+")");

                    // update pos.
                    current_circle.x = tx;
                    current_circle.y = ty;
                    current_circle.anchored = true;
                }
            }

            /* Update pos. of circle if within bounds */
            p5.mouseReleased = function() {
                // Save circle if within bounds
                let mx = 100*(p5.mouseX / w);  // rel. mouse pos., 0 to 100
                let my = 100*(p5.mouseY / h);
                if (0 <= mx && mx <= 100 && 0 <= my && my <= 100) {  // bounds check
                    console.log("mouse event @ ("+Math.round(p5.mouseX)+", "+Math.round(p5.mouseY)+")");

                    current_circle.x = mx;
                    current_circle.y = my;
                    current_circle.anchored = true;
                    
                }
            }

            p5.windowResized = function() {
                updateValues();

                // Resize canvas and background_canvas
                p5.resizeCanvas(width_div, width_div/aspectCanvas);
                console.log("Resized canvas to (" + width_div + ", " + width_div/aspectCanvas + ")");
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
