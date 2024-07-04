

export default class Item {
    name = ""
    description = ""
    img = new Img('/media/img/player.png', 11, 17)
    x = 0
    y = 0
    width = 53
    height = 65

    constructor() {
        this.lifetime = Date.now()
    }

    render(world) {
        console.log('render')
    }

    use(world, mob) {
        console.log('use')
    }
}