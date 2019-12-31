const ASSET_ROOT = "../characterImages/fish"
const image = document.createElement('img')
image.src = `${ASSET_ROOT}/fish.png`
document.body.append(image)
image.style.height = "50px"
image.style.width = "115px"
document.body.style = "background-color: blue"
image.style.position = 'absolute';
image.style.bottom = '400px'
image.style.left = '650px'
const moveBy = '2px'

document.addEventListener('keydown',function(e){
 if(e.key == 'ArrowRight') {
     left = parseInt(image.style.left) + 10
    console.log(left)
      image.style.left = `${left}px`    
 }
 if(e.key == 'ArrowLeft') {
    left = parseInt(image.style.left) - 10
     image.style.left = `${left}px`
}
if(e.key == 'ArrowUp') {
    bottom = parseInt(image.style.bottom) + 10
     image.style.bottom = `${bottom}px`   
}
if(e.key == 'ArrowDown') {
    bottom = parseInt(image.style.bottom) - 10
     image.style.bottom = `${bottom}px`    
}
})
