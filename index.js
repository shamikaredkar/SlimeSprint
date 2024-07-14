import Player from "./Player.js";
import Ground from "./Ground.js";

// GAME SETTINGS
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
let scaleRatio = null;
let previousTime = null;
const GAME_SPEED_START = 0.75;
const GAME_SPEED_INCREMENT = 0.00001;

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

function createSprites() {
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;
    const groundWidthInGame = GROUND_WIDTH * scaleRatio;
    const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

    if (!player) {
        player = new Player(ctx, playerWidthInGame, playerHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio, groundHeightInGame);
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
}

function setScreen() {
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();
    console.log('Screen set with scale ratio:', scaleRatio);
}

setScreen();

window.addEventListener('resize', () => setTimeout(setScreen, 100));
if (screen.orientation) {
    screen.orientation.addEventListener('change', setScreen);
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

    ground.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);
    player.draw();
    ground.draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);





