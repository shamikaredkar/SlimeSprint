//VARIABLES
const canvas = document.getElementById('game');
// Like a paint brush to draw to the canvas
const ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
let scaleRatio = null;
let previousTime = null;




//WINDOW SETTINGS
function setScreen(){
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
}

setScreen();

//User setTimeout on Safari mobile rotation otherwise works fine on desktop
//Canvas size changes as the window changes
window.addEventListener('resize', () => setTimeout(setScreen, 500)); 
if(screen.orientation){
    screen.orientation.addEventListener('change', setScreen);
} 

// Result of the function - a number that will be used to multiply any of our widths and heights to fit on our screen
function getScaleRatio(){
    const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
    const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

    // Window is wider than the game width
    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT){
        return screenWidth / GAME_WIDTH;
    } else {
        return screenHeight / GAME_HEIGHT;
    }
}


//remove old drawing
function clearScreen(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

//GAME LOOP
function gameLoop(currentTime){
    //Can be played on any frame rate
    if (previousTime == null){
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    clearScreen();

}


//Calls a method when it's ready to repaint the screen
requestAnimationFrame(gameLoop);

