
import World from '/js/modules/world/world.mjs'
import Render from '/js/modules/render.mjs'
import Update from '/js/modules/update.mjs'

const GameStage = {
    LOADING: 'LOADING',
    MENU: 'MENU',
    RUNNING: 'RUNNING',
    STOP: 'STOP',
};

export default class Game {
    stage = GameStage.LOADING
    assets = [];

    constructor() {
        this.startTime = Date.now()
        this.canvas = window.document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.world = new World()
        this.renderObj = new Render(this.world, this.canvas, this.ctx)
        this.updateObj = new Update(this.world, this.canvas, this.ctx)

        this.loadAssets()
        this.setEvents()

        // temporario
        setTimeout(() => {
            this.stage = GameStage.STOP
        }, 1e5)
    }

    loadAssets() {
        const intervalId = setInterval(() => {
            const loadeds = this.world.objs.map(obj => {
                return obj.img ? obj.img.isLoaded() : true
            })

            const canStart = loadeds.every(value => value === true)
            
            if (canStart) {
                console.log("debug: iniciando");
                clearInterval(intervalId)
                this.stage = GameStage.RUNNING
            }
        })
    }

    setEvents() {
        window.addEventListener('keydown', (e) => {
            if (this.updateObj.controls.keys.hasOwnProperty(e.code)) {
                this.updateObj.controls.keys[e.code] = true;
            }
        });
        
        window.addEventListener('keyup', (e) => {
            console.log('keyup: ', {code: e.code})

            if (this.updateObj.controls.keys.hasOwnProperty(e.code)) {
                this.updateObj.controls.keys[e.code] = false;
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.updateObj.controls.mouse.x = e.clientX - rect.left;
            this.updateObj.controls.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.updateObj.controls.mouse.x = e.clientX - rect.left;
            this.updateObj.controls.mouse.y = e.clientY - rect.top;
            this.updateObj.controls.mouse.click = true;
        })
    }

    run() {
        // if (!!true) {
        //     return
        // }

        if (this.stage === GameStage.LOADING) {
            console.log('debug: GameStage.LOADING');
        }

        if (this.stage === GameStage.MENU) {
            console.log('debug: GameStage.MENU');
        }

        if (this.stage === GameStage.RUNNING) {
            if (Date.now() % 39 == 0) {
                console.log('debug: rodando');
            }

            this.render()
            this.update()
        }

        if (this.stage !== GameStage.STOP) {
            requestAnimationFrame(() => this.run())
        } else {
            console.log('debug: finalizando');
        }
    }

    render() {
        this.renderObj.run()
    }

    update() {
        this.updateObj.run()
    }
}