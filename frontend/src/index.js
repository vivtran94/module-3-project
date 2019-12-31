
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

document.addEventListener("DOMContentLoaded",function(){
    let welcome = document.createElement("h1")
        welcome.innerText = "Welcome"
    let formDiv = document.createElement("div")
        formDiv.setAttribute("class","login-page")
    let div = document.createElement("div")
        div.setAttribute("class","form")
    let loginForm = document.createElement("form")
        loginForm.setAttribute("class","login-form")
    let input = document.createElement("input")
        input.type = "text"
        input.placeholder = "User Name"
    let playButton = document.createElement("button")
        playButton.innerText = "Play"
        playButton.id = "play"
    let register = document.createElement("p")
        register.setAttribute("class", "message")
        register.innerText = "Not Registered ?"
    let createAccount = document.createElement("a")
        createAccount.setAttribute("id", "create")
        createAccount.innerText = "  Create Account" 
        createAccount.href = "#"  
    let logMessage = document.createElement("h2")
        logMessage.innerText = "Log in to play"
    let instructionButton = document.createElement("button")
        instructionButton.innerText = "Intructions"
instructionButton.addEventListener("click", function(){
    loginForm = document.querySelector(".form")
    loginForm.remove()
        console.log("I was clicked")


})        
    let breakLine = document.createElement("p")
        breakLine.innerText = ""    

        
        document.body.append(welcome,formDiv)
        formDiv.append(div)
        div.append(logMessage)
        div.append(loginForm,breakLine,instructionButton,register)
        loginForm.append(input,playButton)
        register.append(createAccount)
        
        loginForm.addEventListener("submit", function(e){
            e.preventDefault()
            console.log(input.value)
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: input.value
                })
            })
            .then(function(response){
                return response.json()
            })
            .then(function(response){
                console.log(response)
            })
        })
        
        createAccount.addEventListener("click", function(){
            loginForm = document.querySelector(".form")
            loginForm.remove()
            // document.body.innerText = ""
            let createUserDiv = document.createElement("div")
            createUserDiv.setAttribute("class", "form")
            let createUserForm = document.createElement("form")
            createUserForm.setAttribute("class", "login-form")
            let inputTag = document.createElement("input")
            inputTag.type = "text"
            inputTag.placeholder = "User Name"
            let playButton_1 = document.createElement("button")
            playButton_1.setAttribute("id","play1")
            playButton_1.innerText = "Play"
            let createMessage = document.createElement("h2")
            createMessage.innerText = "Create account to play"

            createUserDiv.append(createMessage)
            document.body.append(createUserDiv)
            createUserDiv.append(createUserForm)
            createUserForm.append(inputTag, playButton_1)
            
            
            createUserForm.addEventListener("submit", function(e){
                e.preventDefault()
                console.log(inputTag.value)
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: inputTag.value
                    })
                })
                .then(function(response){
                    return response.json()
                })
                .then(function(response){
                    console.log(response)
                })
            })
            
        })
        
    



})


