
playerCoods = {
    x: null,
    y: null,
}

const update = () => {
    frames++

    if (player.x != playerCoods.x || player.y != playerCoods.y) {
        objs = getObjMap().filter(e => calcDistance(player.x, player.y, e.x, e.y) < 1e3)

        playerCoods.x = player.x
        playerCoods.y = player.y
    }


}