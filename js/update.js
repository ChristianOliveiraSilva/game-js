
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

    mobs = mobs.map(e => {


        const mobOffensive = mobs.find(m => calcDistance(e.x, e.y, m.x, m.y) < 10)
        const damage = mobOffensive ? mobOffensive.attack : 0

        return {
            ...e,
            x: e.x + e.speed,
            y: e.y + e.speed,
            hp: damage ? e.hp - (damage - e.defense) : e.hp,
        }
    }).filter(e => e.hp > 0);
}