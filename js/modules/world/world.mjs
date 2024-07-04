
import Mob from "/js/modules/mobs/mob.mjs"
import Player from "/js/modules/mobs/player.mjs"

export default class World {
    gui = {}
    worldData = {}
    player = null
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

        this.update()

        // scenes
        // for (let index = 0; index < 20; index++) {
        //     const mob = new Mob
        //     mob.x = Math.floor(index * 50 * Math.random())
        //     mob.y = Math.floor(index * 50 * Math.random())
        //     this.objs.push(mob)
        // }
    }

    initPlayer() {
        this.player = new Player
        this.objs.push(this.player)
    }

    initWorld() {
        this.worldData = {
            gravity: 10,
            startTime: Date.now()
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
        })
    }

    shouldFinishGame() {
        return this.player.hp <= 0
    }
    
    update() {
        this.worldData.time = this.getTime()
        this.worldData.season = this.getSeason()
        this.worldData.weather = this.getWeather()
    }
    
    getTime() {
        const date = new Date()

        const format = v => v < 10 ? '0' + v : v.toString()

        const minutes = format(date.getMinutes())
        const hours = format(date.getHours())
        const day = format(date.getDate())
        const month = format(date.getMonth() + 1)
        const year = format(date.getFullYear())

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
        const seasons = ['primavera', 'verao', 'outono', 'inverno']
        const { month } = this.worldData.time
        return seasons[month % 4]
    }

    getWeather() {
        const time = this.worldData.time
        const season = this.worldData.season

        const weathers = {
            verao: ['sol', 'sol', 'sol'],
            primavera: ['chuva', 'nublado', 'sol'],
            outono: ['chuva', 'nublado', 'sol'],
            inverno: ['neve', 'neve', 'nublado'],
        }
        const timeFunc = value => Math.floor(Math.abs(Math.sin(3 / 31 * value) * 3))
        const index = timeFunc(time.day)

        return weathers[season][index]
    }
}