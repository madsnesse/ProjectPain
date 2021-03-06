<template>
    <div id="parent">
        <div id="canvas"></div>
        
        <b-button variant="outline-secondary"
         squared 
         v-b-tooltip="bodyFlipped?'Flip the body to face the front':'Flip the body to face the back'" 
         @click="bodyFlipped = !bodyFlipped">
         Flip
        </b-button>
        <!-- RADIUS -->
        <div>
            <b-form-input id="radiusSlider" v-b-tooltip="'Radius: ' + this.radius" v-model="radius" type="range" min="1" max="30"></b-form-input>
            
            <!-- <label for="radiusSlider">Radius of circle: {{ radius }}</label> -->
        </div>

        <!-- POP LAST PAIN CIRCLE -->
        <b-row>
            <b-col><b-button variant="outline-secondary" class="w-100" to="/home" 
         v-b-tooltip.hover title="Cancel pain registration">Back</b-button></b-col>
            <b-col><b-button variant="secondary" id="finishPlacingCircle" class="w-100" v-b-tooltip.hover title="Finish placing the circle and move on to the next page">Next</b-button></b-col>
        </b-row>
        
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
    },
    data() {
        return {
            bodyFlipped: false,
            radius: 15,
            animationValues: []
        }
    },
    methods: {
      toggle: function(){
        this.$emit('tog')
      },
      updateNumber: function(){
        this.numberOfButtons +=1
      },
      newCircle: function(x,y,r){
        this.$emit('newCircle',{x:x,y:y,r:r,facing:this.bodyFlipped?'back':'front'});
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
            const aspectCanvas = 5/7;

            // Resources
            var figureImg, figureImgBack;    // reference to body image
            var spiralImg;

            // p5 canvas 
            var canvas;       // reference to the p5 canvas
            
            // circle
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
            var finishPlacingCircleButton;

            ////////////////////////////////////////////////////
            //// p5-FUNCTIONS BELOW                        ////
            //////////////////////////////////////////////////
            p5.preload = function() {
                let bodyImgRef = require("@/assets/woman-large-front.png");  // thanks to https://stackoverflow.com/a/65872755
                let bodyImgRefBack = require("@/assets/woman-large-back.png");  // thanks to https://stackoverflow.com/a/65872755
                figureImg = p5.loadImage(bodyImgRef);
                figureImgBack = p5.loadImage(bodyImgRefBack);


                let spiralImgRef = require("@/assets/spiral.png");
                spiralImg = p5.loadImage(spiralImgRef);
            }

            p5.setup = function() {
                // resize img
                figureImg.resize(600, 0);

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
                finishPlacingCircleButton = document.getElementById("finishPlacingCircle");
                finishPlacingCircleButton.onclick = function() {finishPlacingCircle();};

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
                p5.image(vm.bodyFlipped?figureImgBack:figureImg, x, 0, widthImageDraw, heightImageDraw);

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
                    vm.pushCircle(current_circle)
                    vm.toggle();
                    current_circle = circleFactory("empty");    // reset
                }
            }

            /* Updates values before rendering every frame. */
            function updateValues() {
                // Updated scaling variables
                let canvas_rect = canvas.elt.getBoundingClientRect();
                w = canvas_rect.width, h = canvas_rect.height;

                try {
                    width_div = document.getElementById("canvas").offsetWidth;
                } catch (error) {
                    console.log("[  P5  ] User exited -> destroying canvas.");
                    p5.remove();
                }

                // width of parent div
                current_circle.r = vm.radius;
                if (!current_circle.anchored) {
                        current_circle.x = 100*(p5.mouseX/w);
                        current_circle.y = 100*(p5.mouseY/h);
                }
                if (vm.currentEntry > -1){
                    // Update radius after check
                    if (vm.radius < 1 || vm.radius > 30) {
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
                p5.noFill()
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

                if (circle.painType.Thermal > 0){
                    p5.fill(200, 0,0, 150*circle.painType.Thermal/5);
                    p5.circle(circle.x*rx, circle.y*ry, circle.r*rx);
                    
                }
                if (circle.painType.Temporal > 0){
                    animation.sinus_arg += circle.painType.Temporal*0.01;
                    animation.sinus_arg %= Math.PI;

                    // Inner circle
                    p5.noFill();
                    p5.strokeWeight(2);
                    radius = (circle.r*rx)*p5.sin(animation.sinus_arg);
                    p5.stroke(50, 50, 50, 50);
                    p5.circle(circle.x*rx, circle.y*ry, radius);
                    p5.noStroke();
                }
                if (circle.painType.Sensory > 0){
                    // Outer circle
                    p5.fill(0,0, 255*circle.painType.Sensory/3, 85);
                    p5.circle(circle.x*rx, circle.y*ry, circle.r*rx);
                }
                if (circle.painType.Fear > 0) {
                    p5.stroke(0);
                    p5.fill(0);
                    p5.ellipse(circle.x*rx, circle.y*ry-0.15*circle.r*rx, circle.r*rx*(0.12), circle.r*rx*(0.5));
                    p5.ellipse(circle.x*rx, circle.y*ry+0.3*circle.r*rx, circle.r*rx*(0.12), circle.r*rx*(0.12));
                }
                if (circle.painType.Punctate  > 0) {
                    animation.sinus_arg += 1.3*(circle.painType.Punctate/100);
                    animation.sinus_arg %= 2*Math.PI;

                    p5.push();
                    p5.imageMode(p5.CENTER)
                    p5.translate(circle.x*rx, circle.y*ry+0.8*ry);
                    p5.rotate(-animation.sinus_arg);
                    p5.image(spiralImg, 0, 0, circle.r*rx*0.95, circle.r*rx*0.95);
                    p5.pop();
                }
                if (circle.painType.Constrictive > 0) {
                    p5.noFill();
                    p5.stroke(20);
                    animation.sinus_arg += 0.02;
                    animation.sinus_arg %= Math.PI;

                    let w = 0.55*circle.r*rx+0.45*circle.r*rx*p5.sin(animation.sinus_arg);
                    p5.ellipse(circle.x*rx, circle.y*ry, w, circle.r*rx);
                } else {
                    p5.noFill();
                    p5.stroke(20);
                    p5.circle(circle.x*rx, circle.y*ry, circle.r*rx);
                }
            }
            /* Creates a new circle based on the type of pain */
            function circleFactory() {
                return {x:p5.mouseX, y:p5.mouseY, r:vm.radius, anchored:false};
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
b-form-input 
p {
    margin-left: 45%;
    margin-right:auto;
}
#parent {
    width: 100%;
}
</style>
