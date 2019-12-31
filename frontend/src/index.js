const renderLogin = function(){
    let welcome = document.createElement("h1")
        welcome.innerText = "Welcome"
    let formDiv = document.createElement("div")
        formDiv.setAttribute("class", "login-page")
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

        
    document.body.append(welcome, formDiv)
    formDiv.append(div)
    div.append(logMessage, loginForm)
    loginForm.append(input,playButton)

    loginForm.addEventListener("submit", function(e){
        e.preventDefault()
        console.log(input.value)
        fetch('http://localhost:3000/user', {
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
            playWasClicked()
        })
    })

    let instructionButton = document.createElement("button") 
        instructionButton.innerText = "Intructions"
        
    div.append(instructionButton,register)
    register.append(createAccount)   
    
        instructionButton.addEventListener("click", function(){
            loginForm = document.querySelector(".form")
            loginForm.remove()
            let instructionTag = document.createElement("li")
            instructionTag.innerText = "Collect the item in the middle to increase your strength."
            let instructionTag1 = document.createElement("li")
            instructionTag1.innerText = "Move with the arrow keys and avoid the enemys untill you are strong enough to kill them."
            let instructionTag2 = document.createElement("li")
            instructionTag2.innerText = "You will gain size as your strength increases."
            let instructionTag3 = document.createElement("li")
            instructionTag3.innerText = "Most importantly have fun :)"
            let a = document.createElement("br")
            let b = document.createElement("br")
            let c = document.createElement("br")
            let d = document.createElement("br")
            let backButton = document.createElement("button")
            backButton.innerText = "Go Back"
            let instructionDiv = document.createElement("div")
            instructionDiv.setAttribute("class","form")
        
            backButton.addEventListener("click", function(){
                console.log("Back button clicked")
            })
            document.body.append(instructionDiv)
            instructionDiv.append(instructionTag,a,instructionTag1,b,instructionTag2,c,instructionTag3,d,backButton)
        })

        createAccount.addEventListener("click", function(){
            loginForm = document.querySelector(".form")
            loginForm.remove()
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
}

const playWasClicked = function() {
    const formDiv = document.querySelector(".login-page")
    formDiv.remove()
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
}

document.addEventListener("DOMContentLoaded",function(){
    renderLogin()
})












