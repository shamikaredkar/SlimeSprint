export default class RockController {
    //Amount of time between which the rocks will spawn
    constructor(ctx, rockImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
        this.speed = speed;
        this.rockImages = rockImages;
    }
    update(gameSpeed, frameTimeDelta){

    }
    draw(){}
}