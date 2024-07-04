
export default class MenuRender {
    constructor (world, canvas, ctx) {
        this.world = world
        this.canvas = canvas
        this.ctx = ctx
    }

    drawBackground() {
        this.ctx.fillStyle = "green"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    run() {
        const { world, canvas, ctx } = this

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.drawBackground()
    }
}