<template>
  <div>
    <p id = "relative"></p>
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
      
      new p5_lib(pain_visualize);
    },
}
function pain_visualize(p5) {
  // Constants
  const aspectImage = 490/1280;
  const aspectCanvas = 9/14;

  // p5 variables
  let bodyImage;        // reference to body image
  let bg_canvas;        // back-most canvas, actually draw circles on this
  let usingUI = false;  // don't render while using UI
  var canvas;           // reference to the p5 canvas

  // Pain Circle
  let circleRadius = 30;  // Relative: from 0 to 100
  let pain_type = "static";

  // Size and positional variables
  let width_div;  // width of parent div
  let w, h;       // width and height of canvas DOM
  let x, y;       // x and y pos of canvas DOM

  // Relative units, each an integer from 0 to 100
  // e.g. Point(10*rx, 0) => x=1/10 of the width, y=0
  let rx;  // canvas width / 100
  let ry;  // canvas height / 100

  // UI
  var debugLabel;
  var radiusSliderLabel;
  var radiusSlider;
  var resetButton;
  p5.preload = function() {
    let img = require("@/assets/body.png")  // thanks to https://stackoverflow.com/a/65872755
    bodyImage = p5.loadImage(img);  // todo resize image - too large atm
  }

  p5.setup = function() {
    // get width of parent div
    width_div = document.getElementById("pain_visualizer").offsetWidth;

    // Create canvas
    canvas = p5.createCanvas(width_div, width_div/aspectCanvas);
    canvas.elt.style.border = "solid 1px black";
    canvas.elt.style.background = "#ffffff";
    canvas.parent("pain_visualizer");  // Attach to <div>

    // Fetching canvas properties
    let canvas_rect = canvas.elt.getBoundingClientRect();
    w = canvas_rect.width, h = canvas_rect.height;
    x = canvas_rect.x, y = canvas_rect.y;
    rx = w/100;  // normalize to 0 to 100 scale
    ry = h/100;  // normalize to 0 to 100  scale

    bg_canvas = p5.createGraphics(w, h);
    resetBackground();

    // Create UI elements
    debugLabel = p5.createP();
    // Size slider
    radiusSliderLabel = p5.createP("Size");
    radiusSlider = p5.createSlider(1, 100, circleRadius);
    radiusSlider.mouseOver(() => { usingUI = true; });
    radiusSlider.mouseOut(() => { usingUI = false; });
    // Reset button
    resetButton = p5.createButton("Reset");
    resetButton.mouseOver(() => { usingUI = true; });
    resetButton.mouseOut(() => { usingUI = false; });
    resetButton.mouseClicked(() => { resetBackground() });

    updateUI();
  }

  function resetBackground() {
    bg_canvas.clear();
    let imgWidth = 1.20*w
    bg_canvas.image(bodyImage, 26*rx, 5*ry, imgWidth*aspectImage, imgWidth);
  }

  function updateValues() {
    circleRadius = radiusSlider.value();

    // width of parent div
    width_div = document.getElementById("pain_visualizer").offsetWidth;

    // Updated scaling variables
    let canvas_rect = canvas.elt.getBoundingClientRect();
    w = canvas_rect.width, h = canvas_rect.height;
    x = canvas_rect.x, y = canvas_rect.y;

    // Update relative variables
    rx = w/100;
    ry = h/100;
  }

  /* Renders a circle based on type of pain.
   * Use this method unless saving circle on background.
   */
  function drawCircle() {
    switch (pain_type) {
      case "static":
        p5.fill(255, 0, 0, 150);
        p5.circle(p5.mouseX, p5.mouseY, circleRadius*w/200);
        break;

      default:
        console.error("Non-valid render type.");
    }
  }

  p5.draw = function() {
    updateValues();

    // Clear & render background
    p5.clear();
    p5.image(bg_canvas, 0, 0);

    // debugLabel.elt.innerHTML = "Relative: (x="+Math.round(100*(p5.mouseX / w))+", y="+Math.round(100*(p5.mouseY / h))+", r="+circleRadius+")";
    document.getElementById("relative").innerHTML = "Relative: (x="+Math.round(100*(p5.mouseX / w))+", y="+Math.round(100*(p5.mouseY / h))+", r="+circleRadius+")";
    // Render circle for top layer if not using UI
    if (!usingUI) {
      drawCircle();
    }
  }

  /* Resizes, repositions and renders UI */
  function updateUI() {
    let font_size = rx*3+"pt";
    radiusSliderLabel.position(x+(25*rx), y+(86*ry));
    radiusSliderLabel.style("font-size", font_size);

    radiusSlider.position(x+(3*rx), y+(90*ry));
    radiusSlider.style("width", 50*rx+"px");
    radiusSlider.style("height", 2*ry+"px");

    resetButton.position(x+(3*rx), y+(93*ry));
    resetButton.style("width", 50*rx+"px");
    resetButton.style("height", 5*ry+"px");
    resetButton.style("font-size", font_size);

    debugLabel.position(x+(rx), y);
    debugLabel.style("font-size", font_size);
  }

  ///////////////////////////////////////////////////
  //// EVENTS BELOW                              ////
  //////////////////////////////////////////////////
  p5.mouseClicked = function() {
    /* Saving render */
    if (!usingUI) {
      console.log("Mouse clicked at ("+Math.round(p5.mouseX)+", "+Math.round(p5.mouseY)+")");
      // Save circle to background
      bg_canvas.fill(255, 0, 0, 150);
      bg_canvas.circle(p5.mouseX, p5.mouseY, circleRadius*w/200);
    }
  }

  p5.windowResized = function() {
    updateValues();

    // Resize canvas and background_canvas
    p5.resizeCanvas(width_div, width_div/aspectCanvas);
    bg_canvas.resizeCanvas(width_div, width_div/aspectCanvas);
    resetBackground();

    updateUI();
  }
}

</script>

<style></style>
