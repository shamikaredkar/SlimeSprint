import Player from "./Player.js";
import Ground from "./Ground.js";
import RockController from "./RockController.js";

// GAME SETTINGS
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
let scaleRatio = null;
let previousTime = null;
const GAME_SPEED_START = 0.75;
const GAME_SPEED_INCREMENT = 0.00001;

// ROCK SETTINGS
const ROCK_CONFIG = [
    { width: 20, height: 20, image: 'images/rock1.png' },
    { width: 32, height: 32, image: 'images/rock2.png' },
    { width: 64 / 1.25, height: 64 / 1.25, image: 'images/rock3.png' }
];

// PLAYER SETTINGS
const PLAYER_WIDTH = 104 / 1.5; // 58
const PLAYER_HEIGHT = 48 / 1.5; // 62

// JUMP SETTINGS
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;

// GROUND SETTINGS
const GROUND_WIDTH = 576;
const GROUND_HEIGHT = 64;
const GROUND_AND_ROCK_SPEED = 0.5;

// GAME OBJECTS
let player = null;
let ground = null;
let gameSpeed = GAME_SPEED_START;
let rockController = null;
let gameOver = false;
let pixelFontLoaded = false;

function createSprites() {
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;
    const groundWidthInGame = GROUND_WIDTH * scaleRatio;
    const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

    if (!player) {
        player = new Player(ctx, playerWidthInGame, playerHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);
        console.log('Player instance created');
    } else {
        player.width = playerWidthInGame;
        player.height = playerHeightInGame;
        player.minJumpHeight = minJumpHeightInGame;
        player.maxJumpHeight = maxJumpHeightInGame;
        player.scaleRatio = scaleRatio;
        player.x = 10 * scaleRatio;
        player.y = canvas.height - player.height - (65 * scaleRatio);
        console.log('Player instance updated:', player);
    }

    if (!ground) {
        ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, GROUND_AND_ROCK_SPEED, scaleRatio);
        console.log('Ground instance created');
    } else {
        ground.width = groundWidthInGame;
        ground.height = groundHeightInGame;
        ground.scaleRatio = scaleRatio;
        console.log('Ground instance updated:', ground);
    }

    const rockImages = ROCK_CONFIG.map(rock => {
        const image = new Image();
        image.src = rock.image;
        return {
            image: image,
            width: rock.width * scaleRatio,
            height: rock.height * scaleRatio
        };
    });

    rockController = new RockController(ctx, rockImages, scaleRatio, GROUND_AND_ROCK_SPEED, ground.y);
}

function setScreen() {
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();
    console.log('Screen set with scale ratio:', scaleRatio);
}

function getScaleRatio() {
    const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
    const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
        return screenWidth / GAME_WIDTH;
    } else {
        return screenHeight / GAME_HEIGHT;
    }
}

function loadFont(name, url) {
    const font = new FontFace(name, `url(${url})`);
    return font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        return loadedFont;
    });
}

function showGameOver() {
    const fontSize = 70 * scaleRatio;
    ctx.font = `${fontSize}px PixelFont`; // Use the pixel font
    ctx.fillStyle = 'black';
    const x = canvas.width / 4.5;
    const y = canvas.height / 2;
    ctx.fillText("GAME OVER", x, y);
}

function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log('Screen cleared');
}

function gameLoop(currentTime) {
    if (previousTime == null) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    clearScreen();

    if (!gameOver) {
        ground.update(gameSpeed, frameTimeDelta);
        player.update(gameSpeed, frameTimeDelta);
        rockController.update(gameSpeed, frameTimeDelta);
    }

    if (!gameOver && rockController.collideWith(player)) {
        gameOver = true;
    }
    player.draw();
    ground.draw();
    rockController.draw();

    if (gameOver) {
        showGameOver();
    }

    requestAnimationFrame(gameLoop);
}

function initializeGame() {
    setScreen();

    window.addEventListener('resize', () => setTimeout(setScreen, 100));
    if (screen.orientation) {
        screen.orientation.addEventListener('change', setScreen);
    }

    loadFont('PixelFont', 'fonts/pixel-font.ttf').then(() => {
        pixelFontLoaded = true;
        console.log('PixelFont loaded');
    }).catch(error => {
        console.error('Failed to load PixelFont:', error);
    });

    requestAnimationFrame(gameLoop);
}

initializeGame();









