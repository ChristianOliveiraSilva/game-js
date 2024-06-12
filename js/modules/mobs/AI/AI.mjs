
export default class AI {
    targetX = 0
    targetY = 0

    update(world, mob) {
        this.updateCoords(world, mob)
    }

    updateCoords(world, mob) {
        if (this.targetX < mob.x) {
            mob.x -= mob.speed
        } else if (this.targetX > mob.x) {
            mob.x += mob.speed
        }

        if (this.targetY < mob.y) {
            mob.y -= mob.speed
        } else if (this.targetY > mob.y) {
            mob.y += mob.speed
        }
    }
}