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
  let painCircle;       // used for rendering pain circle(s)
  let backgroundLayer;  // back-most layer, actually draw circles on this
  let usingUI = false;  // don't render while using UI
  let aspect = 14/9;    // aspect ratio
  var canvas;           // reference to the p5 canvas

  // Debug
  var relativeLabel;
  let relativeX = 0;  // From 0 to 100 %
  let relativeY = 0;  // From 0 to 100 %
  let relativeR = 0;  // From 0 to 100 % - radius

  // UI
  var radiusSliderLabel;
  var radiusSlider;
  var resetButton;

  function canvProp() {  // get canvas properties
    let canvas_rect = canvas.elt.getBoundingClientRect();
    return {w:canvas_rect.width,h:canvas_rect.height, x:canvas_rect.x, y:canvas_rect.y};
  }

  p5.preload = function() {
    const img = require("@/assets/body.png")  // thanks to https://stackoverflow.com/a/65872755
    bodyImage = p5.loadImage(img);  // todo resize image - too large atm
    console.log("Image \"@/assets/body.png\" loaded. ("+bodyImage.width+"x"+bodyImage.height+")");
  }

  p5.setup = function() {
    // get width of parent div
    let width = document.getElementById("pain_visualizer").offsetWidth;

    canvas = p5.createCanvas(width, width*aspect);
    canvas.elt.style.border = "solid 2px black";
    canvas.parent("pain_visualizer");  // Attach to <div>

    createBackground();

    // Fetching canvas properties
    let prop = canvProp();
    let w = prop.w, h = prop.h, x = prop.x, y = prop.y;

    // Debug
    relativeLabel = p5.createP("Relative: (x, y)");
    relativeLabel.style("font-size", "10pt");
    relativeLabel.position(x+w/100, y+h/100, 70);

    // Size slider
    radiusSliderLabel = p5.createP("Size");
    radiusSliderLabel.position(x+2.3*w/10, y+h-(1.6*h/10), 70);
    radiusSlider = p5.createSlider(0, 125, 40);
    radiusSlider.style("width", "200px");
    radiusSlider.style("height", "40px");
    radiusSlider.position(x+0.3*w/10, y+h-(1.3*h/10), 70);
    radiusSlider.mouseOver(() => { usingUI = true; });
    radiusSlider.mouseOut(() => { usingUI = false; });

    // Reset button
    resetButton = p5.createButton("Reset");
    resetButton.style("width", "200px");
    resetButton.style("height", "30px");
    resetButton.position(x+0.3*w/10, y+h-(0.7*h/10), 70);
    resetButton.mouseOver(() => { usingUI = true; });
    resetButton.mouseOut(() => { usingUI = false; });
    resetButton.mouseClicked(() => { reset() });

    // Creating pain circle obj.
    painCircle = new PainCircle(p5, "static", 60);
  }

  function createBackground() {
    // Fetching canvas properties
    let prop = canvProp();
    let w = prop.w, h = prop.h;
    backgroundLayer = p5.createGraphics(w, h);
    backgroundLayer.background(240);
    backgroundLayer.image(bodyImage, w/3.8, h/40, w-w/1.8, (w-w/1.8)*3);
  }

  p5.mouseClicked = function() {
    /* Saving render */
    if (!usingUI) {
      console.log("Mouse clicked at ("+p5.mouseX+", "+p5.mouseY+")");
      painCircle.saveCircle(backgroundLayer);
    }
  }

  function reset() {
    backgroundLayer.clear();
    createBackground();
  }

  p5.draw = function() {
      // Update values from UI
      painCircle.updateRadius(radiusSlider.value());

      // Fetching canvas properties
      let prop = canvProp();
      let w = prop.w, h = prop.h;

      // Debug
      relativeX = Math.round(100*(p5.mouseX / w));  // normalize to 0 to 100 %  scale
      relativeY = Math.round(100*(p5.mouseY / h));  // normalize to 0 to 100 %  scale
      relativeR = Math.round(100*(radiusSlider.value() / 125));  // normalize to 0 to 100 %  scale
      relativeLabel.elt.innerHTML = "Relative: (x="+relativeX+", y="+relativeY+", r="+relativeR+")";

      // Clear & render background
      p5.clear();
      p5.image(backgroundLayer, 0, 0);

      // Render circle for top layer if not using UI
      if (!usingUI) {
        painCircle.render();
      }
  }

  p5.windowResized = function() {
    console.log("Window resized.");
    let width = document.getElementById("pain_visualizer").offsetWidth;
    p5.resizeCanvas(width, width*aspect);
    backgroundLayer.resizeCanvas(w, w*aspect);
    createBackground();

    // Fetching canvas properties
    let prop = canvProp();
    let w = prop.w, h = prop.h, x = prop.x, y = prop.y;

    radiusSliderLabel.position(x+2.3*w/10, y+h-(1.6*h/10), 70);
    radiusSlider.position(x+0.3*w/10, y+h-(1.3*h/10), 70);
    resetButton.position(x+0.3*w/10, y+h-(0.7*h/10), 70);
    relativeLabel.position(x+w/100, y+h/100, 70);
  }
}
