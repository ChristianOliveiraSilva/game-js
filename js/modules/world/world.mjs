
import Mob from "/js/modules/mobs/mob.mjs"
import Player from "/js/modules/mobs/player.mjs"

export default class World {
    worldData = {}
    objs = []
    renderable = []
    updateable = []

    constructor() {
        this.initObjs()
        this.catalogObjs()
    }

    initObjs() {
        this.initPlayer()
        this.initWorld()

        // scenes
        for (let index = 0; index < 20; index++) {
            const mob = new Mob
            mob.x = Math.floor(index * 50 * Math.random())
            mob.y = Math.floor(index * 50 * Math.random())
            this.objs.push(mob)
        }
    }

    initPlayer() {
        this.objs.push(new Player)
    }

    initWorld() {
        this.worldData = {

        }
    }
    
    catalogObjs() {
        this.objs.forEach(element => {
            if (element.render) {
                this.renderable.push(element)
            }
            
            if (element.update) {
                this.updateable.push(element)
            }
        });
    }

    getTime() {
        const date = new Date('1024-06-07')

        const format = v => v < 10 ? '0' + v : v.toString()

        const minutes = format(date.getMinutes());
        const hours = format(date.getHours());
        const day = format(date.getDate());
        const month = format(date.getMonth() + 1);
        const year = format(date.getFullYear());

        const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`

        return {
            minutes,
            hours,
            day,
            month,
            year,
            date: formattedDate,
            timestamp: date.getTime()
        }
    }

    getSeason() {
        const seasons = ['primavera', 'verão', 'outono', 'inverno'];
        const month = this.getTime().month;
        return seasons[month % 4];
    }
}