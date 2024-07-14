export default class Rock {
    constructor(ctx, x, y, width, height, image) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    update(speed, gameSpeed, frameTimeDelta, scaleRatio) {
        this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

collideWith(sprite) {
    const adjustBy = 1.5;
    const adjustedWidth = this.width / adjustBy;
    const adjustedHeight = this.height / adjustBy;
    const spriteAdjustedWidth = sprite.width / adjustBy;
    const spriteAdjustedHeight = sprite.height / adjustBy;

    if (
        sprite.x < this.x + adjustedWidth &&
        sprite.x + spriteAdjustedWidth > this.x &&
        sprite.y < this.y + adjustedHeight &&
        sprite.y + spriteAdjustedHeight > this.y
    ) {
        return true;
    } else {
        return false;
    }
}

}
