<template>
    <b-container id="parent">
        
            <div id="canvas">

            </div>
    </b-container>
</template>
<script>
const p5_lib = require('p5')
export default {
    name:"Skincube",
    mounted(){
        const skincuber = p5 => {
            const aspectSkincube = 4688/6526;
            var skincubeImg;
            var canvas;
            //var parent;
            var w,h, rx, ry;
            let skinLayer = [[181,316,167618],[-181,322,53130]]


            p5.preload = function() {
                let skincubeImgRef = require("@/assets/skin-cube-no-labels.png");
                skincubeImg = p5.loadImage(skincubeImgRef)
                
            }
            p5.setup = function() {
                let canv = document.getElementById("canvas")
                canvas = p5.createCanvas(canv.offsetWidth, canv.offsetWidth * 7/5)
                canvas.parent("canvas")
                canvas.elt.style.border = "solid 1px black";
                canvas.elt.style.background = "#ffffff";
               
                let canvas_rect = canvas.elt.getBoundingClientRect();
                w = canvas_rect.width, h = canvas_rect.height;
                rx = w/100;  // normalize to 0 to 100 scale
                ry = h/100;
                
            }
            p5.draw = function() {
                let width = h * aspectSkincube
                let height = h
                p5.image(skincubeImg, 0,0, width, height)
                
            }
            p5.mouseReleased = function() {
                let mx = p5.mouseX
                let my = p5.mouseY
                checkifBelow(skinLayer,[mx,my])
                console.log(rx*mx + ", " + ry*my )
            }

            function checkifBelow(func, point) {
                let f_x = (func[2]-(func[0]*point[0]))/func[1]

                if (point[1] < f_x){
                    console.log("THERES A FIRE IN LEGO CITY")
                }
            }
        }
        new p5_lib(skincuber)
    }
}
</script>
