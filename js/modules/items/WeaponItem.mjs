import Item from "/js/modules/items/Item.mjs"

export default class WeaponItem extends Item {
    attack = 0

    use(world, mob) {
        mob.toAttack(world, this)
    }
}