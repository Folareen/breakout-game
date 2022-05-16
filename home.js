const PLAY_PAUSE_BTN = document.querySelector('.play-pause');
const STOP_BTN = document.querySelector('.stop');
const LEVEL = document.querySelector('select');
const SCORE = document.querySelector('.score');
const GAME_STATUS = document.querySelector('.game-status');
const GAME_CONTAINER = document.querySelector('.game');
const GAME_BALL = document.querySelector('.game__ball');

let ballXPosition = 0;
let ballYPosition = 0;
let playgameInterval;
let speed;
let direction = "up-right";


PLAY_PAUSE_BTN.addEventListener('click', ()=>{
    if (PLAY_PAUSE_BTN.innerText == "Play"){
        play();
    }else if(PLAY_PAUSE_BTN.innerText == "Pause") {
        pause();
    }
} );


// play will setTimeout
// pause will cleartimeout
// stop will clearTimeout and display game over

function play(){
    // console.log(LEVEL.value)
    PLAY_PAUSE_BTN.innerText = "Pause";

    getSpeed();
    GAME_BALL.style.transition = `all ${speed / 1000}s linear`;

    playgame = setInterval(() =>{
        game();
        // console.log(ballXPosition)
    }, speed);
    
}

function pause(){
    PLAY_PAUSE_BTN.innerText = "Play";
    clearInterval(playgame);

}

function game(){
    moveBall(direction);

    if (ballYPosition == 220){
        if(direction == "up-right" ){
            direction = "down-right";
            moveBall(direction)
        }else if(direction == "up-left"){
            direction = "down-left";
            moveBall(direction)
        }
    } 
    else if(ballYPosition == 0){
        if(direction == "down-right" ){
            direction = "up-right";
            moveBall(direction)
        }else if(direction == "down-left"){
            direction = "up-left";
            moveBall(direction)
        }
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