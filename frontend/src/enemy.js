const ENEMY_ASSET_ROOT = "../characterImages/enemy"
 function createEnemy(){
const eImage = document.createElement('img')
eImage.src = `${ENEMY_ASSET_ROOT}/enemy.gif`
document.body.append(eImage)
eImage.style.height = "150px"
eImage.style.width = "150px"
eImage.style.position = 'absolute';
eImage.style.bottom = '470px'
eImage.style.left = '1300px'

let bottom = parseInt(eImage.style.bottom);
let left = parseInt(eImage.style.left);
let direction = null;

const move = function(){
    if(direction == 'right'){
        left = left + 1;
        eImage.style.left = `${left}px`
        
    }
    if(direction == 'left'){
        left = left - 1;
        eImage.style.left = `${left}px`
        
        }
    if(direction == 'up'){
        bottom = bottom + 1;
        eImage.style.bottom = `${bottom}px`
      
        }
    if(direction == 'down'){
        bottom = bottom - 1;
        eImage.style.bottom = `${bottom}px`
        
        }
}

const enemyObject = {
    enemyImage: eImage,
    bounceRight: function(){
        direction = 'right'
   
   },
    bounceUp: function(){
        direction = 'up'
   },
   
    bounceDown: function(){
        direction = 'down'
   },
    bounceLeft: function(){
       direction = 'left'
   },
    stop: function (){
       direction = null;
   }
}
setInterval(move, 60/1000)
return enemyObject
}














