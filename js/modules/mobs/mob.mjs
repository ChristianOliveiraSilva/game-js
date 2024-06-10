import Img from "/js/modules/resources/img.mjs"

export default class Mob {
    id = Symbol()
    name = ""
    img = new Img('/media/img/player.png', 11, 17)
    x = 0
    y = 0
    width = 53
    height = 65
    // tags = [tag.wolf]
    // enemies = [tag.sheep]
    hp = 100
    speed = 1
    xp = 0
    attack = 15
    defense = 15
    hunger = 100
    thirst = 100
    sleep = 100
    drops = []
    // IA = IA.predator
    items = []
    effects = []
    skills = []
    primaryItem = null

    render(world, canvas, ctx) {
        this.img.render(ctx, this)
    }

    update(world) {

    }

    onAttack(world, skill) {
        const basicDamage = skill ? skill.attack : this.attack
        const xpDamage = this.xp 
        const effectsDamage = this.effects.reduce((total, effect) => total + effect.passiveAttack ?? 0)
        const itemsDamage = this.items.reduce((total, item) => total + item.passiveAttack ?? 0)
        const skillsDamage = this.skills.reduce((total, skill) => total + skill.passiveAttack ?? 0)

        const damage = basicDamage + xpDamage + effectsDamage + itemsDamage + skillsDamage 
        const types = this.primaryItem.types

        return {
            from: this,
            skill,
            types,
            damage,
        }
    }

    onDefend(world, attack) {
        const basicDefense = this.defense
        const xpDefense = Math.round(this.xp / 2)
        const effectsDefense = this.effects.reduce((total, effect) => total + effect.passiveDefence ?? 0)
        const itemsDefense = this.items.reduce((total, item) => total + item.passiveDefence ?? 0)
        const skillsDefense = this.skills.reduce((total, skill) => total + skill.passiveDefence ?? 0)

        const defense = basicDefense + xpDefense + effectsDefense + itemsDefense + skillsDefense

        const damage = defense > attack.damage ? 0 : defense - attack.damage
        this.hp -= damage
    }
}
