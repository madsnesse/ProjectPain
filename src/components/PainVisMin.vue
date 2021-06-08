<template>
    <div id="parent">
        <div id="canvas"></div>
    </div>
</template>

<script>
// thanks to https://medium.com/js-dojo/experiment-with-p5-js-on-vue-7ebc05030d33
// for general setup of p5 + vue
const p5_lib = require('p5');
export default {
    name: "PainVisMin",
    props:{
      values:Array,
      entries: Number
    },
    data() {
        return {
            radius: 15,
            animationValues: []
        }
    },
    methods:{
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

            // p5 background & misc.
            var figureImg;    // reference to body image
                              // TOOD: resize when loading new image
            var canvas;       // reference to the p5 canvas

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

            ////////////////////////////////////////////////////
            //// p5-FUNCTIONS BELOW                        ////
            //////////////////////////////////////////////////
            p5.preload = function() {
                let bodyImgRef = require("@/assets/woman-large-front.png");  // thanks to https://stackoverflow.com/a/65872755
                figureImg = p5.loadImage(bodyImgRef);
            }

            p5.setup = function() {
                // resize img
                figureImg.resize(400, 0);

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

                // draw each saved circle
                for (let i = 0; i < vm.entries; i++){
                    drawCircle(i)
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
            
            /* Renders a circle based on type of pain. */
            function drawCircle(i) {
                let circle = vm.getCircleValues(i)
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
                  p5.circle(circle.x*rx, circle.y*ry, circle.r*rx)
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
