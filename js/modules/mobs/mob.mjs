import BasicAI from "./AI/basicAI.mjs"
import Img from "/js/modules/resources/img.mjs"

export default class Mob {
    id = Symbol()
    name = ""
    img = new Img('/media/img/player.png', 11, 17)
    x = 0
    y = 0
    width = 53
    height = 65
    tags = []
    enemies = []
    hp = 100
    speed = 1
    xp = 0
    attack = 15
    defense = 15
    hunger = 100
    thirst = 100
    sleep = 100
    drops = []
    IA = new BasicAI
    items = []
    effects = []
    skills = []
    primaryItem = null

    render(world, canvas, ctx) {
        this.img.render(ctx, this)
    }

    update(world) {
        this.IA.update(world, this)
    }

    toAttack(world, skill) {
        const basicDamage = skill ? skill.attack : this.attack
        const xpDamage = this.xp
        const effectsDamage = this.effects.reduce((total, effect) => total + effect.passiveAttack ?? 0, 0)
        const itemsDamage = this.items.reduce((total, item) => total + item.passiveAttack ?? 0, 0)
        const skillsDamage = this.skills.reduce((total, skill) => total + skill.passiveAttack ?? 0, 0)

        const damage = basicDamage + xpDamage + effectsDamage + itemsDamage + skillsDamage 
        const types = this.primaryItem?.types ?? []

        const attack = {
            from: this,
            skill,
            types,
            damage,
        }

        // find near mobs
        world.objs.forEach(obj => {
            if (this !== obj && obj.defend) {
                obj.defend(world, attack)
                console.log(obj.hp);
            }
        });
    }

    toDefend(world, attack) {
        const basicDefense = this.defense
        const xpDefense = Math.round(this.xp / 2)
        const effectsDefense = this.effects.reduce((total, effect) => total + effect.passiveDefence ?? 0, 0)
        const itemsDefense = this.items.reduce((total, item) => total + item.passiveDefence ?? 0, 0)
        const skillsDefense = this.skills.reduce((total, skill) => total + skill.passiveDefence ?? 0, 0)

        const defense = basicDefense + xpDefense + effectsDefense + itemsDefense + skillsDefense

        const damage = defense > attack.damage ? 0 : defense - attack.damage
        this.hp -= damage
    }
}
