document.addEventListener("DOMContentLoaded",function(){
    renderLogin()
})


const renderLogin = function(){
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
        register.innerText = "Not Registered?"
    let createAccount = document.createElement("a")
        createAccount.setAttribute("id", "create")
        createAccount.innerText = "  Create Account" 
        createAccount.href = "#"  
    let logMessage = document.createElement("h2")
        logMessage.innerText = "Log in to play"
    let instructionButton = document.createElement("button") 
        instructionButton.innerText = "Intructions"
    let lineBreak = document.createElement("p")

  
    document.body.append(formDiv)
    formDiv.append(div)
    div.append(logMessage, loginForm, lineBreak, instructionButton, register)
    loginForm.append(input, playButton)
    register.append(createAccount)

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
        .then(function(user){
            playWasClicked(user)
        })
    })

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
            instructionDiv.remove()
            renderLogin()
            
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
            .then(function(user){
                playWasClicked(user)
                createUserDiv.remove()
            })
        })
    })
}

const playWasClicked = function(user) {
    document.body.style.background = "url(../characterImages/dirt_background.jpg) center top no-repeat"
    document.body.style.backgroundSize = "cover"
    const formDiv = document.querySelector(".login-page")
    formDiv.remove()
    let usernameDisplay = document.createElement("h3")
    usernameDisplay.innerText = user.username
    let highscoreDisplay = document.createElement("h4")
    highscoreDisplay.innerText = `Highscore: ${user.highscore}`
    let currentscoreDisplay = document.createElement("h4")
    let counter = 0
    currentscoreDisplay.innerText = `Current score: ${counter}`
    document.body.append(usernameDisplay, highscoreDisplay, currentscoreDisplay)

    const ASSET_ROOT = "../characterImages/animated_worm_right.gif"
    const image = document.createElement('img')
    image.src = ASSET_ROOT
    document.body.append(image)
    image.style.height = "100px"
    image.style.width = "100px"
    image.style.position = 'absolute';
    image.style.bottom = '100px'
    image.style.left = '100px'

    let direction = null;
    let left = 100;
    let bottom = 100;
    let speed = 0.5;

    document.addEventListener('keydown',function(e){
        if(e.key == 'ArrowRight' && direction != 'right'){
            image.src = ASSET_ROOT
            direction = "right"
        }
        if(e.key == 'ArrowLeft' && direction != 'left') {
            image.src = "../characterImages/animated_worm_left.gif"
            direction = "left"
        }
        if(e.key == 'ArrowUp' && direction != 'up') {
            direction = "up"
        }
        if(e.key == 'ArrowDown' && direction != 'down') {
            direction = "down"
        }  
    })

    // document.addEventListener('keyup', function(){
    //     direction = null
    // })

    const move = function(){
        if(direction == 'right'){
            left = left + speed;
            image.style.left = `${left}px`
        }
        if(direction == 'left'){
            left = left - speed;
            image.style.left = `${left}px`
        }
        if(direction == 'up'){
            bottom = bottom + speed;
            image.style.bottom = `${bottom}px`
        }
        if(direction == 'down'){
            bottom = bottom - speed;
            image.style.bottom = `${bottom}px`
        }
    }
    
    setInterval(move, 60/1000)
    
}















