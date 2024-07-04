
export default class LoadingRender {
    constructor (world, canvas, ctx) {
        this.world = world
        this.canvas = canvas
        this.ctx = ctx
    }

    drawBackground() {
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    run() {
        const { canvas, ctx } = this

        const offsetX = 100
        const loadingTime = (Date.now() - this.world.worldData.startTime) / 10
        const maxBarWidth = canvas.width - offsetX * 2
        const barWidth = loadingTime > maxBarWidth ? maxBarWidth : loadingTime

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.drawBackground()
        
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(offsetX, canvas.height * 0.8, barWidth, canvas.height * 0.05)
    }
}