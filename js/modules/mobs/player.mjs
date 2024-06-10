
import Img from '/js/modules/resources/img.mjs';
import Mob from '/js/modules/mobs/mob.mjs';

export default class Player extends Mob {
    img = new Img('/media/img/chao.png', 11, 17)
    x = 200
    y = 200

    update(world, controls) {
        const { keys, mouse } = controls

        if (this.skills) {
            if (keys.KeyQ && this.skills[0]) {
                this.attack(world, this.skills[0])
            }
            
            if (keys.KeyW && this.skills[1]) {
                this.attack(world, this.skills[1])
            }

            if (keys.KeyE && this.skills[2]) {
                this.attack(world, this.skills[2])
            }
            
            if (keys.KeyR && this.skills[3]) {
                this.attack(world, this.skills[3])
            }
        }

        if (mouse.click) {
            const {x, y} = mouse
            mouse.click = false

            this.attack(world, null)

            this.x = x
            this.y = y
        }
    }
}