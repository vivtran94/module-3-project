const ASSET_ROOT = "../characterImages/enemy"
const image = document.createElement('img')
image.src = `${ASSET_ROOT}/enemy.gif`
document.body.append(image)
image.style.height = "250px"
image.style.width = "250px"
image.style.position = 'absolute';
image.style.bottom = '0px'
image.style.left = '0px'


let left = 0;
const bounceRight = function(){
    setInterval(moveRight, 60/1000)
}

const moveRight = function(){
    left = left + 1;
    image.style.left = `${left}px`
}

bounceRight()












