
class World {
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

const GameStage = {
    LOADING: 'LOADING',
    MENU: 'MENU',
    RUNNING: 'RUNNING',
    STOP: 'STOP',
};

class Game {
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
            console.log(e)

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
        console.log(this.world.getSeason());
        if (!!true) {
            return
        }

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

class Render {
    constructor (world, canvas, ctx) {
        this.world = world
        this.canvas = canvas
        this.ctx = ctx
    }

    drawBackground() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    run() {
        const { world, canvas, ctx } = this

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBackground()

        world.renderable.forEach(element => {
            element.render(world, canvas, ctx)
        });
    }
}

class Update {
    controls = {}

    constructor (world, canvas, ctx) {
        this.world = world
        this.canvas = canvas
        this.ctx = ctx

        this.controls.keys = {
            KeyQ: false,
            KeyW: false,
            KeyE: false,
            KeyR: false,
        }

        this.controls.mouse = {
            x: 0,
            y: 0,
            click: false,
        };
    }

    run() {
        this.world.updateable.forEach(element => {
            element.update(this.world, this.controls)
        });
    }
}

class Mob {
    img = new Img('/media/img/player.png', 11, 17)
    x = 0
    y = 0
    width = 53
    height = 65
    // tags = [tag.wolf]
    // enemies = [tag.sheep]
    hp = 100
    speed = 1
    attack = 15
    defense = 15
    hunger = 100
    thirst = 100
    sleep = 100
    drop = [
        {
            sx: 0,
            sy: 0,
        }
    ]
    IA = {
        // type: IA.predator,
    }

    render(world, canvas, ctx) {
        this.img.render(ctx, this)
    }

    update(world) {
        this.x++
        this.y++
    }
}

class Player extends Mob {
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

class Img {
    imgObject = new Image()

    constructor (path, sx, sy) {
        this.sx = sx
        this.sy = sy
        this.imgObject.src = path
    }

    isLoaded() {
        return this.imgObject.complete
    }

    getImage() {
        return this.imgObject
    }

    render(ctx, mob) {
        const { x, y, width, height } = mob
        const { sx, sy } = this

        ctx.drawImage(this.imgObject, sx, sy, width, height, x, y, width, height)
    }
}

class Item {
    render(world) {
        console.log('render')
    }

    update(world) {
        console.log('update')
    }    
}

class Effect {
    render(world) {
        console.log('render')
    }

    update(world) {
        console.log('update')
    }
}

window.onload = () => {
    const game = new Game()
    game.run()
}

