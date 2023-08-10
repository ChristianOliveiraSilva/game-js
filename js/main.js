
window.onload = () => {
    startGame()
}

const resize = () => {
    canvas.width = window.innerWidth >= GAME_SIZE ? GAME_SIZE :  window.innerWidth * 0.8
    canvas.height = window.innerHeight >= GAME_SIZE / 2 ? GAME_SIZE / 2 :  window.innerHeight * 0.8    
}

window.onresize = resize

const startGame = () => {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')

    resize()

    images = imagesSrc.map(e => {
        const img = new Image()
        img.src = e
        img.onload = (e) => {
            imgLoaded++
        }

        return img
    })
    
    setEvents()
    runGame()
}

const runGame = () => {
    if (end) {
        return
    }
    
    if (imgLoaded == images.length) {
        update()
        render()
    }

    requestAnimationFrame(runGame)
}