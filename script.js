
const init = (canvasId, imgSrc) => {
    const canvas = document.getElementById(canvasId)
    let ctx = canvas.getContext('2d')

    const img = new Image()
    img.src = imgSrc

    let gameState = false

    const speed = 0
    const gravity = .5
    // State Fly, Jump
    let flight,
        flyHeight = 0

    //Taille du canard [Height, Width]
    let bodySize = [10, 10]

    let index = 0
    bestScore = 0,
    score = 0,
    pipes


    const setup = () => {
        flight = "fly"

        flyHeight = (canvas / 2) - (bodySize[0] /2)

        pipes = Array(3).fill().map((a, i) => {
            //Génération des pipe
        })
    }
    
    const render = () => {
        index++


        //Background
        ctx.drawImage(img, 0, 0, canvasId.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);
    
        //pipes
        if(gameState){
            
        }
    }

}