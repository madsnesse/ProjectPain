<template>
    <b-container id="parent">
            <b-row align-h="center"><h5 id="label"></h5></b-row>
            <div id="skincanvas" class="text-center"></div>
    </b-container>
</template>
<script>
const p5_lib = require('p5')

export default {
    name:"Skincube",
    props: {
        visible: Boolean
    },
    mounted(){
        let vm = this;
        const skincuber = p5 => {
            const aspectSkincube = 643/1280;
            
            var skincubeImg;
            var skinCanvas;
            var w,h
            let label = document.getElementById("label")
            let skinLayer = [[8,165,322,346],[322,346,638,165]]
            let deepSkinLayer = [[10,258,322,476],[322,476,635,265]]
            let fatLayer = [[12,328,322,561],[322,561,632,323]]
            let muscleLayer = [[22,545,322,842],[322,842,621,540]]
            let boneCircle = [145, 545, 69]
            let organCircle = [380,1222, 369]
            var aspWidth, aspHeight
            var width,height
            p5.preload = function() {
                let skincubeImgRef = require("@/assets/skin-cube.png");
                skincubeImg = p5.loadImage(skincubeImgRef)
            }
            p5.setup = function() {
                let canv = document.getElementById("skincanvas")
                let canWidth = canv.offsetWidth * 3/4
                skinCanvas = p5.createCanvas(canWidth, canWidth / aspectSkincube)
                skinCanvas.parent("skincanvas")
               
                let canvas_rect = skinCanvas.elt.getBoundingClientRect();
                w = canvas_rect.width, h = canvas_rect.height;
                aspWidth = w/643
                aspHeight = h/1280
                width = w
                height = w/aspectSkincube
                console.log(canWidth/2 - width/2)
                p5.image(skincubeImg, canWidth/2 - width/2,0, width, height)
                
            }
            
            p5.mouseReleased = function() {
                let mx,my
                mx = p5.mouseX/aspWidth;  
                my = p5.mouseY/aspHeight;
                if(checkifBelow(skinLayer, [mx,my])){
                    label.innerHTML = "selected layer: skin"
                    vm.$emit('updateDepth', 1)
                }else if(checkifBelow(deepSkinLayer, [mx,my])){
                    
                    label.innerHTML = "selected layer: deep skin"
                    vm.$emit('updateDepth', 2)
                }else if(checkifBelow(fatLayer, [mx,my])){
                    
                    label.innerHTML = "selected layer: fat"
                    vm.$emit('updateDepth', 3 )
                }else if(checkifBelow(muscleLayer, [mx,my])){
                    
                    if (checkifInCircle(boneCircle, [mx,my])){
                        
                        label.innerHTML = "selected layer: bone"
                        vm.$emit('updateDepth', 4)
                    }
                    else{
                        
                        label.innerHTML = "selected layer: muscle"
                        vm.$emit('updateDepth', 5)
                    }
                }
                else if (checkifInCircle(organCircle, [mx,my])){
                    
                    label.innerHTML = "selected layer: organ"
                    vm.$emit('updateDepth', 6)
                }else{
                    
                    label.innerHTML = "selected layer: organ"
                    vm.$emit('updateDepth', 7)
                }
            }
            p5.windowResized = function() { 
                let canv = document.getElementById("skincanvas")
                let canWidth = canv.offsetWidth * 3/4
                let width_div = canv.offsetWidth;
                let canvas_rect = skinCanvas.elt.getBoundingClientRect();
                w = canvas_rect.width, h = canvas_rect.height;
                aspWidth = w/643
                aspHeight = h/1280
                width = w
                height = w/aspectSkincube
                console.log(canWidth/2 - width/2)
                p5.image(skincubeImg, canWidth/2 - width/2,0, width, height)
                // Resize canvas and background_canvas
                p5.resizeCanvas(canWidth, width_div/aspWidth);
                console.log("Resized canvas to (" + width_div + ", " + width_div/aspWidth + ")");
            }

            function checkifBelow(func, point) {
                let f = func[0]
                let x1 = f[0], x2 = f[2]
                let y1 = f[1], y2 = f[3]
                let f_x = ((y2-y1)/(x2-x1)) * (point[0]-x1) +y1
                
                let g = func[1]
                x1 = g[0], x2 = g[2]
                y1 = g[1], y2 = g[3]
                let g_x = ((y2-y1)/(x2-x1)) * (point[0]-x1) +y1
                
                if (point[1] < f_x && point[1] < g_x){
                    return true
                }
                return false
            }
            function checkifInCircle(circle, point) {
                circle
                let x = circle[0], y=circle[1],r=circle[2]
                let x_ = point[0],y_ = point[1]
                
                return Math.sqrt((y_-y)**2 + (x_-x)**2) <= r
            }
        }
        new p5_lib(skincuber)
    }
}
</script>
