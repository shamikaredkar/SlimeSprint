export default class Ground {
    constructor(ctx, width, height, speed, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.x1 = 0;
        this.x2 = this.width;
        this.y = this.canvas.height - this.height; // This should automatically handle the new ground height

        // Loading the ground image
        this.groundImage = new Image();
        this.groundImage.src = "images/ground.png";
    }

    update(gameSpeed, frameTimeDelta) {
        const movement = this.speed * gameSpeed * frameTimeDelta * this.scaleRatio;
        this.x1 -= movement;
        this.x2 -= movement;

        // Reset position when images move out of view
        if (this.x1 <= -this.width) {
            this.x1 += this.width * 2;
        }
        if (this.x2 <= -this.width) {
            this.x2 += this.width * 2;
        }
    }

    draw() {
        // Draw the ground image multiple times to cover the canvas width
        for (let x = this.x1; x < this.canvas.width; x += this.width) {
            this.ctx.drawImage(this.groundImage, x, this.y, this.width, this.height);
        }
        for (let x = this.x2; x < this.canvas.width; x += this.width) {
            this.ctx.drawImage(this.groundImage, x, this.y, this.width, this.height);
        }
    }

    reset() {
        this.x1 = 0;
        this.x2 = this.width; // Reset to the width of the ground
    }

    
    
}































