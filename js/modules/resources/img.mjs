

export default class Img {
    imgObject = new Image()

    constructor (path, sx, sy) {
        this.sx = sx
        this.sy = sy
        this.imgObject.src = path
    }

    isLoaded() {
        return this.imgObject.complete
    }

    getImage() {
        return this.imgObject
    }

    render(ctx, mob) {
        const { x, y, width, height } = mob
        const { sx, sy } = this

        ctx.drawImage(this.imgObject, sx, sy, width, height, x, y, width, height)
    }
}