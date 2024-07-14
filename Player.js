export default class Player {
    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    JUMP_SPEED = 0.6;
    GRAVITY = 0.4;

    constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.scaleRatio = scaleRatio;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;

        this.WALK_ANIMATION_TIMER = 200;
        this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        this.slimeRunImages = [];

        // Position the player 65 pixels above the bottom of the canvas
        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - (65 * scaleRatio);
        this.yStandingPosition = this.y;

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

        const slimeRunImage1 = new Image();
        slimeRunImage1.src = "images/run1.png";
        slimeRunImage1.onload = () => {
            this.slimeRunImages[0] = slimeRunImage1;
        };

        const slimeRunImage2 = new Image();
        slimeRunImage2.src = "images/run2.png";
        slimeRunImage2.onload = () => {
            this.slimeRunImages[1] = slimeRunImage2;
        };

        // Event Listeners for Keyboard
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);

        // Touch
        window.addEventListener("touchstart", this.touchstart);
        window.addEventListener("touchend", this.touchend);
    }

    touchstart = () => {
        this.jumpInProgress = true;
    }

    touchend = () => {
        this.jumpInProgress = false;
    }

    keydown = (event) => {
        if (event.code === "Space") {
            this.jumpPressed = true;
        }
    };

    keyup = (event) => {
        if (event.code === "Space") {
            this.jumpPressed = false;
        }
    };

    update(gameSpeed, frameTimeDelta) {
        this.run(gameSpeed, frameTimeDelta);
        this.jump(frameTimeDelta);
    }

    jump(frameTimeDelta) {
        if (this.jumpPressed) {
            this.jumpInProgress = true;
        }
        if (this.jumpInProgress && !this.falling) {
            if (this.y > this.canvas.height - this.minJumpHeight || (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)) {
                this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
            } else {
                this.falling = true;
            }
        } else {
            if (this.y < this.yStandingPosition) {
                this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
                if (this.y + this.height > this.canvas.height) {
                    this.y = this.yStandingPosition;
                }
            } else {
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }

    run(gameSpeed, frameTimeDelta) {
        // If it is <= 0 that means we'll be switching between images
        if (this.walkAnimationTimer <= 0) {
            if (this.image === this.slimeRunImages[0]) {
                this.image = this.slimeRunImages[1];
            } else {
                this.image = this.slimeRunImages[0];
            }
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        }
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    draw() {
        if (this.image.complete) {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}







