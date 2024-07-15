export default class Score {
    score = 0;
    // Will store the highscore to local storage
    HIGH_SCORE_KEY = "highscore";

    constructor(ctx, scaleRatio) {
        this.scaleRatio = scaleRatio;
        this.ctx = ctx;
        this.canvas = this.ctx.canvas;
    }

    update(frameTimeDelta) {
        this.score += frameTimeDelta * 0.01;
    }

    reset() {
        this.score = 0;
    }

    setHighScore() {
        const highscore = Number(localStorage.getItem(this.HIGH_SCORE_KEY)) || 0;
        if (this.score >= highscore) {
            localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
        }
    }
draw() {
    const highscore = Number(localStorage.getItem(this.HIGH_SCORE_KEY)) || 0;
    const y = 20 * this.scaleRatio;
    const fontSize = 15 * this.scaleRatio;
    this.ctx.font = `${fontSize}px PixelFont`; // Use the pixel font
    this.ctx.fillStyle = "black";

    const padding = 10 * this.scaleRatio;
    const scoreText = `Score: ${Math.floor(this.score).toString().padStart(6, '0')}`;
    const highscoreText = `High Score: ${highscore.toString().padStart(6, '0')}`;

    const scoreTextWidth = this.ctx.measureText(scoreText).width;
    const highscoreTextWidth = this.ctx.measureText(highscoreText).width;

    // Ensure both texts are displayed within the canvas
    const maxWidth = Math.max(scoreTextWidth, highscoreTextWidth);
    const x = this.canvas.width - maxWidth - padding;

    this.ctx.fillText(scoreText, x, y);
    this.ctx.fillText(highscoreText, x, y + 30 * this.scaleRatio);
}



}
