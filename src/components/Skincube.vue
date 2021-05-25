<template>
    <b-container id="parent">
            <b-row align-h="center"><h5 id="label"></h5></b-row>
            
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
            const aspectSkincube = 643/1280;
            
            var skincubeImg;
            var canvas;
            //var parent;
            var w,h
            let skinLayer = [[8,165,322,346],[322,346,638,165]]
            let deepSkinLayer = [[10,258,322,476],[322,476,635,265]]
            let fatLayer = [[12,328,322,561],[322,561,632,323]]
            let muscleLayer = [[22,545,322,842],[322,842,621,540]]
            let boneCircle = [145, 545, 69]
            let organCircle = [380,1222, 369]
            boneCircle
            var aspWidth, aspHeight
            p5.preload = function() {
                let skincubeImgRef = require("@/assets/skin-cube-no-labels.png");
                skincubeImg = p5.loadImage(skincubeImgRef)
                
            }
            p5.setup = function() {
                let canv = document.getElementById("canvas")
                canvas = p5.createCanvas(canv.offsetWidth, canv.offsetWidth / aspectSkincube)
                canvas.parent("canvas")
               
                let canvas_rect = canvas.elt.getBoundingClientRect();
                w = canvas_rect.width, h = canvas_rect.height;
                aspWidth = w/643
                aspHeight = h/1280
                console.log("asp:" + aspWidth + ", " + aspHeight)
                let width = w
                let height = w/aspectSkincube
                
                p5.image(skincubeImg, 0,0, width, height)
                
            }
            
            p5.mouseReleased = function() {
                let mx,my
                mx = p5.mouseX/aspWidth;  
                my = p5.mouseY/aspHeight;
                if(checkifBelow(skinLayer, [mx,my])){
                    document.getElementById("label").innerHTML = "selected: skin layer"
                }else if(checkifBelow(deepSkinLayer, [mx,my])){
                    document.getElementById("label").innerHTML ="selected: deep skin layer" 
                }else if(checkifBelow(fatLayer, [mx,my])){
                    document.getElementById("label").innerHTML ="selected: fat layer" 
                }else if(checkifBelow(muscleLayer, [mx,my])){
                    
                    if (checkifInCircle(boneCircle, [mx,my])){
                        document.getElementById("label").innerHTML ="selected: bone"
                    }
                    else{
                        document.getElementById("label").innerHTML ="selected: muscles"
                    }
                }
                else if (checkifInCircle(organCircle, [mx,my])){
                    document.getElementById("label").innerHTML ="selected: organs"
                }else{
                    document.getElementById("label").innerHTML ="selected: other"
                }
            }

            function checkifBelow(func, point) {
                let f = func[0]
                let x1 = f[0], x2 = f[2]
                let y1 = f[1], y2 = f[3]
                let f_x = ((y2-y1)/(x2-x1)) * (point[0]-x1) +y1
                console.log( point[1] - f_x )
                
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
