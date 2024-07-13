import Player from "./Player.js";
import Ground from "./Ground.js";

// GAME SETTINGS
const canvas = document.getElementById('game');
// Like a paint brush to draw to the canvas
const ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
let scaleRatio = null;
let previousTime = null;
const GAME_SPEED_START = .75; //eventually amke it 1.0
const GAME_SPEED_INCREMENT = 0.00001;

// PLAYER SETTINGS - in context of game settings
const PLAYER_WIDTH = 104 / 1.5; // 58
const PLAYER_HEIGHT = 48 / 1.5; // 62

// JUMP SETTINGS
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;

//GROUND SETTINGS
const GROUND_WIDTH = 576 ;
const GROUND_HEIGHT = 324;
const GROUND_AND_ROCK_SPEED = 0.5;

// GAME OBJECTS
let player = null;
let ground = null;
let gameSpeed =  GAME_SPEED_START;

function createSprites() {
        // Gives the height and width dependent on the size of the browser
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;
    const groundWidthInGame = GROUND_WIDTH * scaleRatio;
    const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

    if (!player) {
        player = new Player(ctx, playerWidthInGame, playerHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);
    } else {
        player.width = playerWidthInGame;
        player.height = playerHeightInGame;
        player.minJumpHeight = minJumpHeightInGame;
        player.maxJumpHeight = maxJumpHeightInGame;
        player.scaleRatio = scaleRatio;
        player.x = 10 * scaleRatio;
        player.y = canvas.height - player.height - 1.5 * scaleRatio;
    }

    if (!ground) {
        ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, GROUND_AND_ROCK_SPEED, scaleRatio);
    } else {
        ground.width = groundWidthInGame;
        ground.height = groundHeightInGame;
        ground.scaleRatio = scaleRatio;
    }
}

// WINDOW SETTINGS
function setScreen() {
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();
}

setScreen();

// Use setTimeout on Safari mobile rotation otherwise works fine on desktop
// Canvas size changes as the window changes
window.addEventListener('resize', () => setTimeout(setScreen, 100));
if (screen.orientation) {
    screen.orientation.addEventListener('change', setScreen);
}

// Result of the function - a number that will be used to multiply any of our widths and heights to fit on our screen
function getScaleRatio() {
    const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
    const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

    // Window is wider than the game width
    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
        return screenWidth / GAME_WIDTH;
    } else {
        return screenHeight / GAME_HEIGHT;
    }
}

// Remove old drawing
function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// GAME LOOP
function gameLoop(currentTime) {
    // Can be played on any frame rate
    if (previousTime == null) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    clearScreen();

    // Update game objects
    ground.update(gameSpeed, frameTimeDelta);
    // Draw game objects
    player.draw();
    ground.draw();

    // Calls a method when it's ready to repaint the screen
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


