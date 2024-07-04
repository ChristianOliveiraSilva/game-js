import { ActionType } from "/js/modules/mobs/AI/ActionType.js"

export default class AI {
    targetX = 0
    targetY = 0
    action = {
        type: ActionType.IDLE,
        progress: 0,
    }
    attacked = {
        by: null,
        time: null,
    }

    update(world, mob) {
        this.checkAction(world, mob)
        this.doAction(world, mob)
        this.updateCoords(world, mob)
    }

    checkAction(world, mob) {
        const checklistFunctions = [
            this.checkIfShouldRun,
            this.checkIfAttacked,
            this.checkNeeds,
            this.checkIfCanAttack,
        ]
        
        const action = checklistFunctions.some(func => func && func.call(this, world, mob));

        if (!action) {
            this.action = {
                type: ActionType.IDLE,
                progress: 0,
            }
        }
    }
    
    checkNeeds(world, mob) {
        if (mob.thirst <= 0) {
            this.action = {
                type: ActionType.THIRST,
                progress: 0,
            }

            return true
        } 
        
        if (mob.hunger <= 0) {
            this.action = {
                type: ActionType.HUNGER,
                progress: 0,
            }

            return true
        }
    }

    checkIfShouldRun(world, mob) {
        return false
    }

    checkIfAttacked(world, mob) {
        if (this.attacked.by) {
            this.action = {
                type: ActionType.DEFENDING,
                progress: 0,
            }

            if (Date.now() - this.attacked.time > 1e4) {
                this.attacked = {
                    by: null,
                    time: null,
                }
            }

            return true
        }
    }

    checkIfCanAttack(world, mob) {
        return false        
    }

    doIdle(world, mob) {
    
    }

    doAction(world, mob) {
        const actions = {
            PLAYING: this.doPlaying,
            ATTACKING: this.doAttacking,
            DEFENDING: this.doDefending,
            HUNGER: this.doHunger,
            THIRST: this.doThirst,
            IDLE: this.doIdle,
            INTERACTING: this.doInteracting,
        }

        const action = actions[this.action.type]

        if (action) {
            action.call(this, world, mob);
        }
    }

    updateCoords(world, mob) {
        if (this.targetX < mob.x) {
            mob.x -= mob.speed
            mob.orientation = 'left'
        } else if (this.targetX > mob.x) {
            mob.x += mob.speed
            mob.orientation = 'right'
        }

        if (this.targetY < mob.y) {
            mob.y -= mob.speed
            mob.orientation = 'up'
        } else if (this.targetY > mob.y) {
            mob.y += mob.speed
            mob.orientation = 'down'
        }
    }
}