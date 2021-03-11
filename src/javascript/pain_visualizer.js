// thanks to https://medium.com/js-dojo/experiment-with-p5-js-on-vue-7ebc05030d33
// for general setup of p5 + vue

class PainCircle {
  /* For rendering circles corresponding to user's pain. */

  constructor(p5, painType, radius) {
    this.p5 = p5;
    this.painType = painType;
    this.radius = radius;
  }

  /* Renders a circle based on type of pain.
   * Use this method unless saving circle on background.
   */
  render() {
    switch (this.painType) {
      case "static":
        this.p5.fill(255, 0, 0, 150);
        this.p5.circle(this.p5.mouseX, this.p5.mouseY, this.radius);
        break;

      default:
        console.error("Non-valid render type.");
    }
  }

  /* Use when saving circle render -> renders to background. */
  saveCircle(backgroundObj) {
    backgroundObj.fill(255, 0, 0, 150);
    backgroundObj.circle(this.p5.mouseX, this.p5.mouseY, this.radius);
  }

  updateRadius(radius) { this.radius = radius; }
}

export function pain_visualize(p5) {
  let bodyImage;        // reference to body image
  const imgRatio = 490/1280;
  let painCircle;       // used for rendering pain circle(s)
  let bg_canvas;        // back-most canvas, actually draw circles on this
  let usingUI = false;  // don't render while using UI
  let aspect = 9/14;    // aspect ratio, should have two - one for desktop, one for mobile
  var canvas;           // reference to the p5 canvas

  // Scaling variables
  let width_div;  // width of parent div
  let w, h;  // width and height of canvas DOM
  let x, y;  // x and y pos of canvas DOM

  // Debug
  var relativeLabel;
  let relativeX = 0;  // From 0 to 100 %
  let relativeY = 0;  // From 0 to 100 %
  let relativeR = 0;  // From 0 to 100 % - radius

  // UI
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
    canvas = p5.createCanvas(width_div, width_div/aspect);
    canvas.elt.style.border = "solid 1px black";
    canvas.elt.style.background = "#ffffff";
    canvas.parent("pain_visualizer");  // Attach to <div>

    // Fetching canvas properties
    let canvas_rect = canvas.elt.getBoundingClientRect();
    w = canvas_rect.width, h = canvas_rect.height;
    x = canvas_rect.x, y = canvas_rect.y;

    bg_canvas = p5.createGraphics(w, h);
    resetBackground();

    // Create UI elements
    relativeLabel = p5.createP();
    // Size slider
    radiusSliderLabel = p5.createP("Size");
    radiusSlider = p5.createSlider(0, 125, 40);
    radiusSlider.mouseOver(() => { usingUI = true; });
    radiusSlider.mouseOut(() => { usingUI = false; });
    // Reset button
    resetButton = p5.createButton("Reset");
    resetButton.mouseOver(() => { usingUI = true; });
    resetButton.mouseOut(() => { usingUI = false; });
    resetButton.mouseClicked(() => { resetBackground() });

    updateUI();

    // Creating pain circle obj.
    painCircle = new PainCircle(p5, "static", 60);
  }

  function resetBackground() {
    bg_canvas.clear();
    let imgWidth = 1.20*w
    bg_canvas.image(bodyImage, w/3.8, h/15, imgWidth*imgRatio, imgWidth);
  }

  function updateValues() {
    // width of parent div
    width_div = document.getElementById("pain_visualizer").offsetWidth;

    // Updated scaling variables
    let canvas_rect = canvas.elt.getBoundingClientRect();
    w = canvas_rect.width, h = canvas_rect.height;
    x = canvas_rect.x, y = canvas_rect.y;

    relativeX = Math.round(100*(p5.mouseX / w));  // normalize to 0 to 100 %  scale
    relativeY = Math.round(100*(p5.mouseY / h));  // normalize to 0 to 100 %  scale
    relativeR = Math.round(100*(radiusSlider.value() / 125));  // normalize to 0 to 100 %  scale

    // Update values from UI
    painCircle.updateRadius(radiusSlider.value());
  }

  p5.draw = function() {
    updateValues();

    // Clear & render background
    p5.clear();
    p5.image(bg_canvas, 0, 0);

    relativeLabel.elt.innerHTML = "Relative: (x="+relativeX+", y="+relativeY+", r="+relativeR+")";

    // Render circle for top layer if not using UI
    if (!usingUI) {
      painCircle.render();
    }
  }

  /* Resizes, repositions and renders UI */
  function updateUI() {
    let font_size = w/35+"pt";
    radiusSliderLabel.position(x+2.5*w/10, y+h-(1.6*h/10), 70);
    radiusSliderLabel.style("font-size", font_size);

    radiusSlider.position(x+0.3*w/10, y+h-(1.3*h/10), 70);
    radiusSlider.style("width", w/1.8+"px");
    radiusSlider.style("height", h/20+"px");

    resetButton.position(x+0.3*w/10, y+h-(0.7*h/10), 70);
    resetButton.style("width", w/1.8+"px");
    resetButton.style("height", h/20+"px");
    resetButton.style("font-size", font_size);

    relativeLabel.position(x+w/100, y+h/100, 70);
    relativeLabel.style("font-size", font_size);
  }

  ///////////////////////////////////////////////////
  //// EVENTS BELOW                              ////
  //////////////////////////////////////////////////
  p5.mouseClicked = function() {
    /* Saving render */
    if (!usingUI) {
      console.log("Mouse clicked at ("+Math.round(p5.mouseX)+", "+Math.round(p5.mouseY)+")");
      painCircle.saveCircle(bg_canvas);
    }
  }

  p5.windowResized = function() {
    updateValues();

    // Resize canvas and background_canvas
    p5.resizeCanvas(width_div, width_div/aspect);
    bg_canvas.resizeCanvas(width_div, width_div/aspect);
    resetBackground();

    updateUI();
  }
}
