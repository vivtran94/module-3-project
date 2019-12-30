let play = document.querySelector(`#Play`)
let create = document.querySelector(`#Create`)


play.addEventListener("click", function(){
    console.log("Click")
    document.body.innerText = ""
    let createUser = document.createElement("form")
    createUser.innerText = "User-Name"
    let inputTag = document.createElement("input")
    document.body.setAttribute("id","name")
    let playButton = document.createElement("button")
    playButton.setAttribute("id","Play1")
    playButton.innerText = "Play"
    document.body.append(createUser)
    createUser.append(inputTag,playButton)

    let playButton1 = document.querySelector(`#Play1`)
    playButton1.addEventListener("click", function(e){
        e.preventDefault()
        console.log("I was clicked")

    })
})

