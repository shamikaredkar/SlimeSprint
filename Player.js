export default class Player {
    constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.scaleRatio = scaleRatio;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;

        // Position the player
        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;

        // Load the idle image
        this.idle = new Image();
        this.idle.src = "images/idle.png";
        this.idle.onload = () => {
            this.image = this.idle;
            this.draw(); // Ensure the image is drawn once it is loaded
        };
        this.idle.onerror = () => {
            console.error("Failed to load image: images/idle.png");
        };

        this.image = this.idle; // Set the initial image
    }

    draw() {
        if (this.image.complete) {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}
