export default class RockController {
    //Amount of time between which the rocks will spawn
    ROCK_INTERVAL_MIN = 500;
    ROCK_INTERVAL_MAX = 2000;

    nextRockInterval = null;
    rocks =[];

    constructor(ctx, rockImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
        this.speed = speed;
        this.rockImages = rockImages;
        this.setNextRockTime();
    }

    setNextRockTime() {
        const num = this.getRandomNumber(this.ROCK_INTERVAL_MIN, this.ROCK_INTERVAL_MAX);
        this.nextRockInterval = num;
    }
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    createRock(){
        const index = this.getRandomNumber(0, this.rockImages.length - 1);
        const rockImage = this.rockImages[index];

        //Draw rocks off screen
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - rockImage.height;
        const rock = new Rock(this.ctx, x, y, rockImage.width, rockImage.height, rockImage.image);
    }

    update(gameSpeed, frameTimeDelta){
        if(this.nextRockInterval <= 0){
            //Create Rock at random interval
            this.setNextRockTime();

            //Create Cactus images
        }
        this.nextRockInterval -= frameTimeDelta;
    }
    draw(){}
}