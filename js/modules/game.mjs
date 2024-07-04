
import World from '/js/modules/world/world.mjs'
import GameRender from '/js/modules/renderObjs/GameRender.mjs'
import GameUpdate from '/js/modules/updateObjs/GameUpdate.mjs'
import LoadingRender from '/js/modules/renderObjs/LoadingRender.mjs'
import LoadingUpdate from '/js/modules/updateObjs/LoadingUpdate.mjs'
import MenuRender from '/js/modules/renderObjs/MenuRender.mjs'
import MenuUpdate from '/js/modules/updateObjs/MenuUpdate.mjs'

const GameStage = {
    LOADING: 'LOADING',
    MENU: 'MENU',
    RUNNING: 'RUNNING',
    STOP: 'STOP',
}

export default class Game {
    stage = GameStage.LOADING
    assets = []

    constructor() {
        this.startTime = Date.now()
        this.canvas = window.document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.world = new World()
        this.renders = {
            [GameStage.LOADING]: new LoadingRender(this.world, this.canvas, this.ctx),
            [GameStage.MENU]: new MenuRender(this.world, this.canvas, this.ctx),
            [GameStage.RUNNING]: new GameRender(this.world, this.canvas, this.ctx),
        }
        this.updaters = {
            [GameStage.LOADING]: new LoadingUpdate(this.world, this.canvas, this.ctx),
            [GameStage.MENU]: new MenuUpdate(this.world, this.canvas, this.ctx),
            [GameStage.RUNNING]: new GameUpdate(this.world, this.canvas, this.ctx),
        }

        this.loadAssets()
        this.setEvents()
    }

    loadAssets() {
        const intervalId = setInterval(() => {
            const loadeds = this.world.objs.map(obj => {
                return obj.img ? obj.img.isLoaded() : true
            })

            const canStart = loadeds.every(value => value === true)
            
            if (canStart) {
                console.log("debug: iniciando")
                clearInterval(intervalId)
                this.stage = GameStage.RUNNING
            }
        })
    }

    setEvents() {
        window.addEventListener('keydown', (e) => {
            const updateObj = this.updaters[this.stage]

            if (updateObj.controls && updateObj.controls.keys.hasOwnProperty(e.code)) {
                updateObj.controls.keys[e.code] = true
            }
        })
        
        window.addEventListener('keyup', (e) => {
            const updateObj = this.updaters[this.stage]

            if (updateObj.controls && updateObj.controls.keys.hasOwnProperty(e.code)) {
                updateObj.controls.keys[e.code] = false
            }
        })

        this.canvas.addEventListener('mousemove', (e) => {
            const updateObj = this.updaters[this.stage]

            if (updateObj.controls) {
                const rect = this.canvas.getBoundingClientRect()
                updateObj.controls.mouse.x = e.clientX - rect.left
                updateObj.controls.mouse.y = e.clientY - rect.top
            }
        })

        this.canvas.addEventListener('click', (e) => {
            const updateObj = this.updaters[this.stage]

            if (updateObj.controls) {
                const rect = this.canvas.getBoundingClientRect()
                updateObj.controls.mouse.x = e.clientX - rect.left
                updateObj.controls.mouse.y = e.clientY - rect.top
                updateObj.controls.mouse.click = true
            }
        })
    }

    run() {
        if (this.world.shouldFinishGame()) {
            this.stage = GameStage.STOP
        }

        if (this.stage !== GameStage.STOP) {
            if (Date.now() % 39 == 0) {
                console.log('debug: ' + this.stage)
            }

            this.render()
            this.update()
            
            requestAnimationFrame(() => this.run())
        } else {
            console.log('debug: finalizando')
            console.log('debug: finalizado')
        }
    }

    render() {
        this.renders[this.stage].run()
    }

    update() {
        this.updaters[this.stage].run()
    }
}