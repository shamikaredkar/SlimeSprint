export default class Player {
    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    JUMP_SPEED = 0.6;
    GRAVITY = 0.4;

    // Explosion properties
    explosionInProgress = false;
    explosionAnimationTimer = 100; // Adjust as needed
    explosionImages = [];
    currentExplosionImageIndex = 0;

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
        this.x = 50 * scaleRatio;
        this.y = this.canvas.height - this.height - (60 * scaleRatio);
        this.yStandingPosition = this.y;

        // Load the idle image
        this.loadImages();

        // Event Listeners for Keyboard
        this.addEventListeners();
    }

    loadImages() {
        this.idle = new Image();
        this.idle.src = "images/idle.png";
        this.idle.onload = () => {
            this.image = this.idle;
            this.draw(); // Ensure the image is drawn once it is loaded
        };
        this.idle.onerror = () => {
            console.error("Failed to load image: images/idle.png");
        };

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

        this.explosionImages = [];
        const explosionImage1 = new Image();
        explosionImage1.src = "images/explosion1.png";
        explosionImage1.onload = () => {
            this.explosionImages[0] = explosionImage1;
        };

        const explosionImage2 = new Image();
        explosionImage2.src = "images/explosion2.png";
        explosionImage2.onload = () => {
            this.explosionImages[1] = explosionImage2;
        };
        
        const explosionImage3 = new Image();
        explosionImage3.src = "images/explosion3.png";
        explosionImage3.onload = () => {
            this.explosionImages[2] = explosionImage3;
        };
        
        // Add more explosion images as needed
    }

    addEventListeners() {
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
        window.addEventListener("touchstart", this.touchstart);
        window.addEventListener("touchend", this.touchend);
    }

    removeEventListeners() {
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keyup", this.keyup);
        window.removeEventListener("touchstart", this.touchstart);
        window.removeEventListener("touchend", this.touchend);
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

    triggerExplosion() {
        this.explosionInProgress = true;
        this.currentExplosionImageIndex = 0;
        this.explosionAnimationTimer = 100;
    }

    handleExplosion(frameTimeDelta) {
        if (this.explosionInProgress) {
            this.explosionAnimationTimer -= frameTimeDelta;
            if (this.explosionAnimationTimer <= 0) {
                this.currentExplosionImageIndex++;
                if (this.currentExplosionImageIndex >= this.explosionImages.length) {
                    this.currentExplosionImageIndex = this.explosionImages.length - 1; // Stay on last explosion image
                    this.explosionInProgress = false;
                } else {
                    this.explosionAnimationTimer = 100;
                }
            }
        }
    }

    update(gameSpeed, frameTimeDelta) {
        if (this.explosionInProgress) {
            this.handleExplosion(frameTimeDelta);
        } else {
            this.run(gameSpeed, frameTimeDelta);
            this.jump(frameTimeDelta);
        }
    }

    jump(frameTimeDelta) {
        if (this.jumpPressed) {
            this.jumpInProgress = true;
        }
        if (this.jumpInProgress && !this.falling) {
            if (this.y > this.canvas.height - this.minJumpHeight || (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)) {
                this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
                this.image = this.idle; // Switch to idle image during jump
            } else {
                this.falling = true;
            }
        } else {
            if (this.y < this.yStandingPosition) {
                this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
                if (this.y >= this.yStandingPosition) {
                    this.y = this.yStandingPosition;
                    this.falling = false;
                    this.jumpInProgress = false;
                }
            } else {
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }

    run(gameSpeed, frameTimeDelta) {
        if (!this.jumpInProgress) { // Only animate running when not jumping
            if (this.walkAnimationTimer <= 0) {
                this.image = this.image === this.slimeRunImages[0] ? this.slimeRunImages[1] : this.slimeRunImages[0];
                this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
            }
            this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
        }
    }

    draw() {
        if (this.explosionInProgress || this.currentExplosionImageIndex === this.explosionImages.length - 1) {
            if (this.explosionImages[this.currentExplosionImageIndex] && this.explosionImages[this.currentExplosionImageIndex].complete) {
                this.ctx.drawImage(this.explosionImages[this.currentExplosionImageIndex], this.x, this.y, this.width, this.height);
            }
        } else {
            if (this.image && this.image.complete) {
                this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
        }
    }

    reset() {
        this.image = this.idle;
        this.currentExplosionImageIndex = 0;
        this.explosionInProgress = false;
    }
}
