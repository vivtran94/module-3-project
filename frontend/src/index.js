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
        
        document.body.append(welcome,formDiv)
        formDiv.append(div)
        div.append(loginForm)
        register.append(createAccount)
        loginForm.append(input,playButton,register)
        
        playButton.addEventListener("click", function(){
            console.log("Click")
        
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
            document.body.append(createUserDiv)
            createUserDiv.append(createUserForm)
            createUserForm.append(inputTag, playButton_1)
            
            createUserForm.addEventListener("submit", function(e){
                e.preventDefault()
                console.log(inputTag.value)
                fetch('http://localhost:3000/user', {
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

