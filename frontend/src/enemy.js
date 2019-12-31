const ASSET_ROOT = "../characterImages/enemy"
 function createEnemy(){
const image = document.createElement('img')
image.src = `${ASSET_ROOT}/enemy.gif`
document.body.append(image)
image.style.height = "250px"
image.style.width = "250px"
image.style.position = 'absolute';
image.style.bottom = '0px'
image.style.left = '0px'

let bottom = 0;
let left = 0;
let direction = null;
const bounceRight = function(){
     direction = 'right'

}
const bounceUp = function(){
     direction = 'up'
}

const bounceDown = function(){
     direction = 'down'
}
const bounceLeft = function(){
    direction = 'left'
}
const stop = function (){
    let direction = null
}
const move = function(){
    if(direction == 'right'){
        left = left + 1;
        image.style.left = `${left}px`
        
    }
    if(direction == 'left'){
        left = left - 1;
        image.style.left = `${left}px`
        
        }
    if(direction == 'up'){
        bottom = bottom + 1;
        image.style.bottom = `${bottom}px`
      
        }
    if(direction == 'down'){
        bottom = bottom - 1;
        image.style.bottom = `${bottom}px`
        
        }
}

setInterval(move, 60/1000)
}














