const PLAY_PAUSE_BTN = document.querySelector('.play-pause');
const STOP_BTN = document.querySelector('.stop');
const LEVEL = document.querySelector('select');
const SCORE = document.querySelector('.score');
const GAME_STATUS = document.querySelector('.game-status');
const GAME_CONTAINER = document.querySelector('.game');
const GAME_BALL = document.querySelector('.game__ball');
const GAME_PAD = document.querySelector('.game__pad');

let ballXPosition = 0;
let ballYPosition = 0;
let playgameInterval;
let speed;
let direction = "up-right";
let padPosition = 250;

PLAY_PAUSE_BTN.addEventListener('click', ()=>{
    if (PLAY_PAUSE_BTN.innerText == "Play"){
        play();
    }else if(PLAY_PAUSE_BTN.innerText == "Pause") {
        pause();
    }
} );

document.addEventListener('keydown', movePad)


function play(){
    // console.log(LEVEL.value)
    PLAY_PAUSE_BTN.innerText = "Pause";

    getSpeed();
    GAME_BALL.style.transition = `all ${speed / 1000}s linear`;

    playgameInterval = setInterval(() =>{
        playGame();
        // console.log(ballXPosition)
    }, speed);
    
}
function pause(){
    PLAY_PAUSE_BTN.innerText = "Play";
    clearInterval(playgameInterval);

}

function playGame(){
    GAME_STATUS.innerText = "";

    moveBall(direction);
    // console.log(padPosition);
    // console.log((window.getComputedStyle(GAME_PAD).left.substring(0, 3)))

    // ((ballXPosition + 315 ) - (padPosition + 100) <= 100)
    // && ((ballXPosition + 315 ) - (padPosition + 100) <= 70)
    //

    if (ballYPosition == 220){
        if(direction == "up-right" ){
            direction = "down-right";
            moveBall(direction)
        }else if(direction == "up-left"){
            direction = "down-left";
            moveBall(direction)
        }
    } 
    else if(ballYPosition == 0 && ((padPosition + 100) - (ballXPosition + 315 ) >= -5) && ((padPosition + 100) - (ballXPosition + 315 ) <= 85)){
        if(direction == "down-right" ){
            direction = "up-right";
            moveBall(direction)
        }else if(direction == "down-left"){
            direction = "up-left";
            moveBall(direction)
        }
    }
    else if(ballYPosition == -30){
        endGame();
    }

    if (ballXPosition + 285 == 0 ){
        if(direction == "down-left"){
            direction = "down-right";
            moveBall(direction)
        }else if(direction == "up-left"){
            direction = "up-right";
            moveBall(direction)

        }
    }
    else if (ballXPosition - 285 == 0 ){
        if(direction == "down-right"){
            direction = "down-left";
            moveBall(direction)
        }else if(direction == "up-right"){
            direction = "up-left";
            moveBall(direction)

        }
    }
}

function getSpeed(){
    switch (LEVEL.value){
        case "easy":
            speed = 60;
            break;
        case "normal":
            speed = 30;
            break;
        case "hard":
            speed = 10;
            break;
    }
}
function transform(x, y){
    GAME_BALL.style.bottom = `${30 + y}px`;
    GAME_BALL.style.left = `${285 + x}px`;
}
function moveBall(direction){
    switch (direction){
        case "up-right":
            ballXPosition += 1;
            ballYPosition += 1;
            transform(ballXPosition, ballYPosition);
            break;
        case "up-left":
            ballXPosition -= 1;
            ballYPosition += 1;
            transform(ballXPosition, ballYPosition);
            break;
        case "down-left":
            ballXPosition -= 1;
            ballYPosition -= 1;
            transform(ballXPosition, ballYPosition);
            break;
        case "down-right":
            ballXPosition += 1;
            ballYPosition -= 1;
            transform(ballXPosition, ballYPosition);
            break;
    }
}

function movePad(e){
    // console.log(
    //     [
    //         (ballXPosition + 315 ),
    //         (padPosition + 100)
    //     ]
    // )
    // ((ballXPosition + 315 ) - (padPosition + 100) <= 35)
    // console.log( ((padPosition + 100) - (ballXPosition + 315 )) )
    // console.log("mo")
    switch (e.key){
        case 'ArrowRight':
            if(padPosition < 500){
                padPosition += 10;
                GAME_PAD.style.left = `${padPosition}px`;
            }
            break;
        case 'ArrowLeft':
            if(padPosition > 0){
                padPosition -= 10;
                GAME_PAD.style.left = `${padPosition}px`;
            }
            break;       
    }
}
function endGame(){
    clearInterval(playgameInterval);
    GAME_STATUS.innerText = "Game Over!";
    PLAY_PAUSE_BTN.innerText = "Play";
    ballYPosition = 0;
    ballXPosition = 0;
    direction = "up-right";
    GAME_PAD.style.left = "250px";
}