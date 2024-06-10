

export default class Update {
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
        }

        this.controls.mouse = {
            x: 0,
            y: 0,
            click: false,
        };
    }

    run() {
        this.world.updateable.forEach(element => {
            element.update(this.world, this.controls)
        });
    }
}
