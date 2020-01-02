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
        instructionButton.innerText = "Instructions"
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
    const worm = document.createElement('img')
    worm.src = ASSET_ROOT
    document.body.append(worm)
    wormSize = 4
    worm.style.height = `${(wormSize/100) * parseInt(window.innerHeight)}px`
    worm.style.width = `${(wormSize/100) * parseInt(window.innerWidth)}px`
    worm.style.position = 'absolute';
    worm.style.bottom = '100px'
    worm.style.left = '100px'
    worm.style.margin = '0'
  
    let direction = null;
    let left = 100;
    let bottom = 100;
    let speed = 2;

    incrementWormSize = () => {
        wormSize++
        worm.style.height = `${(wormSize/100) * parseInt(window.innerHeight)}px`
        worm.style.width = `${(wormSize/100) * parseInt(window.innerWidth)}px`
    }

    document.addEventListener('keydown',function(e){
        if(e.key == 'ArrowRight' && direction != 'right'){
            worm.src = "../characterImages/worm_right.gif"
            direction = "right"
        }
        if(e.key == 'ArrowLeft' && direction != 'left') {
            worm.src = "../characterImages/worm_left.gif"
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
            if(left + parseInt(worm.style.width) < window.innerWidth){ 
                worm.style.left = `${left}px`
            } 
            else {
                left = window.innerWidth - parseInt(worm.style.width)
            }
        }
        if(direction == 'left'){
            left = left - speed;
            if(left > 0){
                worm.style.left = `${left}px`
            }
            else {
                left = 0
            }
        }
        if(direction == 'up'){
            bottom = bottom + speed;
            if(bottom + parseInt(worm.style.height) < window.innerHeight){
                worm.style.bottom = `${bottom}px`
            }
            else {
                bottom = window.innerHeight - parseInt(worm.style.height)
            }
         }
        if(direction == 'down'){
            
            bottom = bottom - speed;
            if(bottom > 0){
                worm.style.bottom = `${bottom}px`
            }
            else { 
                bottom = 0
            }
        }
    }
    
    setInterval(move, 60/1000)

    //ENEMY SETTINGS
    
    function createEnemy(enemyName, x, y, height, width){
        let ENEMY_ASSET_ROOT = `../characterImages/${enemyName}`
        const eImage = document.createElement('img')
        eImage.src = `${ENEMY_ASSET_ROOT}/${enemyName}.gif`
        document.body.append(eImage)
        eImage.style.height = `${(height/100) * parseInt(window.innerHeight)}px`
        eImage.style.width = `${(width/100) * parseInt(window.innerWidth)}px`
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

    const ladybug = createEnemy("ladybug", 100, 500, 8, 8)
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

    let firefly = createEnemy("firefly", 800, 800, 8, 8)
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

    let strider = createEnemy("strider", 700, 200, 12, 12)
    let striderPath = async function(){
        strider.bounceLeft()
        await wait(2000)
        strider.bounceDown()
        await wait(750)
        strider.bounceRight()
        await wait(2000)
        strider.bounceUp()
        await wait(750)
        striderPath()
    }
    striderPath()

    let slug = createEnemy("slug", 0, 200, 6, 6)
    let slugPath = async function(){
        slug.bounceRight()
        await wait(5000)
        slug.bounceLeft()
        await wait(5000)
        slugPath()
    }
    slugPath()

    //APPLE SPAWN
    let apple = createEnemy("apple", 400, 400, 4, 4)
    const appleX = window.innerWidth
    const appleY = window.innerHeight

    function appleMove(){
        apple.eImage.style.bottom = Math.round(Math.random() * appleX) + 'px'
        apple.eImage.style.left = Math.round(Math.random() * appleY) + 'px'
    }
    setInterval(appleMove,3500)

    //ENEMY COLLISION

    let isHungry = true
    let collisionInterval = setInterval(()=>{
        if (isColliding(worm,ladybug) || isColliding(worm,firefly) || isColliding(worm,strider) || isColliding(worm,slug)){
            console.log("Collided")
            console.log(user)
            clearInterval(collisionInterval)
            if (user.highscore < scoreCounter) {
                fetch('http://localhost:3000/user', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: user.username,
                        highscore: scoreCounter
                    })
                })
            }
            alert("Game Over")
            document.body.innerText = ""
            document.body.style.background = "#6cb7f5"
            renderLogin()
        }
        if (isColliding(worm, apple)){
            console.log("found the apple!!")
            if (isHungry){
                isHungry = false
                const APPLESOUND = "../characterImages/applebiteog.mp3"
                const bite = document.createElement('audio')
                document.body.append(bite)
                bite.src = APPLESOUND
                bite.play()
                setTimeout(()=>{isHungry = true},2000)
            }

            scoreCounter = scoreCounter + 50
            strCounter = strCounter + 1
            scoreDisplay.innerText = `Score: ${scoreCounter}`    
            strDisplay.innerText = `Strength: ${strCounter}`
            if (strCounter == 5){
                console.log("worm is growing")
                incrementWormSize()
                
            }
        }
        
    },50)

    const isColliding = (img1, img2) => {
        const imageLeft = parseInt(img1.style.left)
        const imageBottom = parseInt(img1.style.bottom)
        const imageWidth = parseInt(img1.style.width)
        const imageHeight = parseInt(img1.style.height)
        const eImageLeft = parseInt(img2.eImage.style.left)
        const eImageBottom = parseInt(img2.eImage.style.bottom)
        const eImageWidth = parseInt(img2.eImage.style.width)
        const eImageHeight = parseInt(img2.eImage.style.height)
        

        if( imageLeft + imageWidth > eImageLeft &&
            eImageLeft + eImageWidth > imageLeft &&
            imageBottom + imageHeight > eImageBottom &&
            eImageBottom + eImageHeight > imageBottom ){   
            return true
        } else {
            return false
        }
    }
}