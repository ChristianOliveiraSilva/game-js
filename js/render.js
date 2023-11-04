


const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cameraOffsetX = canvas.width / 2
    const cameraOffsetY = canvas.height / 2

    // floor
    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let indexY = -player.y; indexY < player.y + canvas.height; indexY += 50)
        for (let indexX = -player.x; indexX < player.x + canvas.width; indexX += 50) {
            ctx.drawImage(images[FLOOR_INDEX], indexX, indexY, 50, 50);
        }

    const displayableObjects = [...objs, ...mobs, ...items, player]

    // objs
    displayableObjects.sort((a, b) => a.y - b.y).forEach(obj => {
        const offsetX = obj.x - obj.width / 2 + (cameraOffsetX - player.x)
        const offsetY = obj.y - obj.height + (cameraOffsetY - player.y)
        
        ctx.fillStyle = "black";
        ctx.fillText(`${obj.x}/${obj.y}`, offsetX, offsetY);

        ctx.drawImage(images[obj.imgIndex],
            obj.sx, obj.sy, obj.width, obj.height,
            offsetX, offsetY, obj.width, obj.height)
    })


    //efeitos?
    ctx.fillStyle = "red";
    for (let index = 0; index < 1e3; index++) {
        ctx.fillRect(
            (cameraOffsetX - player.x) + generateRandomNumber(-index / 10, index / 10),
            (cameraOffsetY - player.y) + generateRandomNumber(-index / 10, index / 10),
            1,
            1
        );
    }

    // HUD
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Hello World", 10, 50);
}