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
    //BACKGROUND SETTINGS
    document.body.style.background = "url(../characterImages/dirt_background.jpg) center top no-repeat"
    document.body.style.backgroundSize = "cover"
    const formDiv = document.querySelector(".login-page")
    formDiv.remove()
    let usernameDisplay = document.createElement("h3")
    usernameDisplay.innerText = user.username
    let highscoreDisplay = document.createElement("h4")
    highscoreDisplay.innerText = `Highscore: ${user.highscore}`
    let scoreDisplay = document.createElement("h4")
    let scoreCounter = 0
    scoreDisplay.innerText = `Score: ${scoreCounter}`
    let strDisplay = document.createElement("h4")
    let strCounter = 0
    strDisplay.innerText = `Strength: ${strCounter}`
    document.body.append(usernameDisplay, highscoreDisplay, scoreDisplay, strDisplay)


    //MAIN CHARACTER SETTINGS
    const ASSET_ROOT = "../characterImages/worm_right.gif"
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
            image.src = "../characterImages/worm_right.gif"
            direction = "right"
        }
        if(e.key == 'ArrowLeft' && direction != 'left') {
            image.src = "../characterImages/worm_left.gif"
            direction = "left"
        }
        if(e.key == 'ArrowUp' && direction != 'up') {
            direction = "up"
        }
        if(e.key == 'ArrowDown' && direction != 'down') {
            direction = "down"
        }  
    })

    document.addEventListener('keyup', function(){
        direction = null
    })

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

    //ENEMY SETTINGS
    
    function createEnemy(enemyName, x, y, h){
        let ENEMY_ASSET_ROOT = `../characterImages/${enemyName}`
        const eImage = document.createElement('img')
        eImage.src = `${ENEMY_ASSET_ROOT}/ladybug_up.gif`
        document.body.append(eImage)
        eImage.style.height = "50px"
        eImage.style.width = "50px"
        eImage.style.position = 'absolute'
        eImage.style.bottom = `${y}px`
        eImage.style.left = `${x}px`

        let bottom = parseInt(eImage.style.bottom)
        let left = parseInt(eImage.style.left)
        let direction = null

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
            eImage,
            bounceRight: function(){
                direction = 'right'
                eImage.src = `${ENEMY_ASSET_ROOT}/walkright.gif`
            },
            bounceUp: function(){
                direction = 'up'
                eImage.src = `${ENEMY_ASSET_ROOT}/walkup.gif`
            },
            bounceDown: function(){
                direction = 'down'
                eImage.src = `${ENEMY_ASSET_ROOT}/walkdown.gif`
            },
            bounceLeft: function(){
                direction = 'left'
                eImage.src = `${ENEMY_ASSET_ROOT}/walkleft.gif`
            },
            stop: function (){
                direction = null
            }
        }
        setInterval(move, 60/1000)
        return enemyObject
    }

    

    function wait(time){
        return new Promise(function(resolve){
            setTimeout(resolve, time)
        })
    }

    const ladybug = createEnemy("ladybug", 100, 500)
    let ladybugPath = async function(){
        ladybug.bounceRight()
        await wait(1000)
        ladybug.bounceDown()
        await wait(1000)
        ladybug.bounceLeft()
        await wait(1000)
        ladybug.bounceUp()
        await wait(1000)
        ladybugPath()
    }
    ladybugPath()

    let firefly = createEnemy("firefly", 800, 800)
    let fireflyPath = async function(){
        firefly.bounceDown()
        await wait(1000)
        firefly.bounceLeft()
        await wait(1000)
        firefly.bounceDown()
        await wait(1000)
        firefly.bounceLeft()
        await wait(1000)
        firefly.bounceDown()
        await wait(1000)
        firefly.bounceLeft()
        await wait(1000)
        firefly.bounceUp()
        await wait(1000)
        firefly.bounceRight()
        await wait(1000)
        firefly.bounceUp()
        await wait(1000)
        firefly.bounceRight()
        await wait(1000)
        firefly.bounceUp()
        await wait(1000)
        firefly.bounceRight()
        await wait(1000)
        fireflyPath()
    }
    fireflyPath()

    let strider = createEnemy("strider", 400, 200)
    let striderPath = async function(){
        strider.bounceRight()
        await wait(1500)
        strider.bounceDown()
        await wait(750)
        strider.bounceLeft()
        await wait(1500)
        strider.bounceUp()
        await wait(750)
        striderPath()
    }
    striderPath()

    let slug = createEnemy("slug", 0, 200)
    let slugPath = async function(){
        slug.bounceRight()
        await wait(5000)
        slug.bounceLeft()
        await wait(5000)
        slugPath()
    }
    slugPath()

    setInterval(()=>{
        const imageLeft = parseInt(image.style.left)
        const imageBottom = parseInt(image.style.bottom)
        const imageWidth = parseInt(image.style.width)
        const imageHeight = parseInt(image.style.height)
        const eImageLeft = parseInt(slime.eImage.style.left)
        const eImageBottom = parseInt(slime.eImage.style.bottom)
        const eImageWidth = parseInt(slime.eImage.style.width)
        const eImageHeight = parseInt(slime.eImage.style.height)

        if( imageLeft + imageWidth > eImageLeft &&
            eImageLeft + eImageWidth > imageLeft &&
            imageBottom + imageHeight > eImageBottom &&
            eImageBottom + eImageHeight > imageBottom ){   
            console.log("Collision detected")
        }
    },50)



}