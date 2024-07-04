import Item from "/js/modules/items/Item.mjs"

export default class ConsumeItem extends Item {
    hp = 0
    xp = 0

    use(world, mob) {
        mob.hp = this.hp
        mob.xp = this.xp
    }
}