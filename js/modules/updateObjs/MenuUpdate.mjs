

export default class MenuUpdate {
    controls = {}

    constructor (world, canvas, ctx) {
        this.world = world
        this.canvas = canvas
        this.ctx = ctx

        this.controls.keys = {
            KeyQ: false,
            KeyW: false,
            KeyE: false,
            KeyR: false,
            KeySpace: false,
        }

        this.controls.mouse = {
            x: 0,
            y: 0,
            click: false,
        }
    }

    run() {
        
    }
}
