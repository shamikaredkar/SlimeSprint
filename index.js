//WINDOW SETTINGS
const canvas = document.getElementById('game');
// Like a paint brush to draw to the canvas
const ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;

let scaleRatio = null;

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


//GAME LOOP

