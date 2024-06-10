
import Img from '/js/modules/resources/img.mjs';
import Mob from '/js/modules/mobs/mob.mjs';

export default class Player extends Mob {
    img = new Img('/media/img/chao.png', 11, 17)
    x = 200
    y = 200

    update(world, controls) {
        const { keys, mouse } = controls

        if (keys.KeyQ) {
        }
        
        if (keys.KeyW) {
        }

        if (keys.KeyE) {
        }
        
        if (keys.KeyR) {
        }

        if (mouse.click) {
            const {x, y} = mouse
            mouse.click = false

            this.x = x
            this.y = y
        }
    }
}