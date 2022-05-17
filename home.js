const PLAY_PAUSE_BTN = document.querySelector('.play-pause');
const STOP_BTN = document.querySelector('.stop');
const LEVEL = document.querySelector('select');
const SCORE = document.querySelector('.score');
const GAME_STATUS = document.querySelector('.game-status');
const GAME_CONTAINER = document.querySelector('.game');
const GAME_BALL = document.querySelector('.game__ball');
const GAME_PAD = document.querySelector('.game__pad');
const GAME_BRICKS = document.querySelector('.game__bricks')

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
STOP_BTN.addEventListener('click', endGame)


function play(){
    PLAY_PAUSE_BTN.innerText = "Pause";

    getSpeed();
    GAME_BALL.style.transition = `all ${speed / 1000}s linear`;

    playgameInterval = setInterval(() =>{
        playGame();
    }, speed);
    
}
function pause(){
    PLAY_PAUSE_BTN.innerText = "Play";
    clearInterval(playgameInterval);
    document.removeEventListener('keydown', movePad)
}

function playGame(){
    GAME_STATUS.innerText = "";
    moveBall(direction);

    document.addEventListener('keydown', movePad);

    // if(ballYPosition < 110 ){
    //     checkForBrickCollision();
    // }
    checkForBrickCollision();

    if(ballYPosition >= 130){
        switch (ballXPosition + 285) {
            case 70:
                clearInterval(playgameInterval)
                break;
            case 200:
                clearInterval(playgameInterval)
                
                break;
            case 300:
                clearInterval(playgameInterval)
                
                break;
            case 400:
                clearInterval(playgameInterval)
                
                break;
            case 570:
                clearInterval(playgameInterval)
                break;
            // case 530:
            //     clearInterval(playgameInterval)
            //     break;
        }
    }
    // checkForBrickCollision()

    checkForVerticalCollisions()

    checkForHorizontalCollisions()
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

function checkForVerticalCollisions(){
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
}

function checkForHorizontalCollisions(){
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

let bricksObjArr = [];
let brickOffsetX = 0;
let brickOffsetY = 0;
let brickNum = 0;

class Brick{
    constructor(brick, brickWidth, brickHeight){
        this.brick = brick;
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
    }
}

function checkForBrickCollision(){

    (Array.from(GAME_BRICKS.children)).forEach(
        (brick) =>{
            brickNum += 1;

            if (brickNum <= 6){
                brickOffsetX += 99;
                brickOffsetY = 30;
            }
            else if (brickNum > 6  && brickNum <= 12) {
                brickOffsetX = (brickNum * 99) - 594
                brickOffsetY = 60;
            }
            else if (brickNum > 12  && brickNum <= 18) {
                brickOffsetX = (brickNum - 12) * 99;
                brickOffsetY = 90;
            }

            bricksObjArr.push(new Brick(brick.className, brickOffsetX, brickOffsetY))
        }
    );

    // last row
    if(ballXPosition + 285 <= 99 && ballYPosition == 130){
        removeBrick('.brick13');
    }
    else if(ballXPosition + 285 > 99 && ballXPosition + 285 <= 198 &&  ballYPosition == 130){
        removeBrick('.brick14')
    }
    else if(ballXPosition + 285 > 198 && ballXPosition + 285 <= 297 &&  ballYPosition == 130){
        removeBrick('.brick15')
    }
    else if(ballXPosition + 285 > 297 && ballXPosition + 285 <= 396 &&  ballYPosition == 130){
        removeBrick('.brick16')
    }
    else if(ballXPosition + 285 > 396 && ballXPosition + 285 <= 495 &&  ballYPosition == 130){
        removeBrick('.brick17')
    }
    else if(ballXPosition + 285 > 495 && ballXPosition + 285 <= 594 &&  ballYPosition == 130){
        removeBrick('.brick18')
    }

    else if(ballXPosition + 285 <= 99 && ballYPosition == 160){
        removeBrick('.brick7');
    }
    else if(ballXPosition + 285 > 99 && ballXPosition + 285 <= 198 &&  ballYPosition == 160){
        removeBrick('.brick8')
    }
    else if(ballXPosition + 285 > 198 && ballXPosition + 285 <= 297 &&  ballYPosition == 160){
        removeBrick('.brick9')
    }
    else if(ballXPosition + 285 > 297 && ballXPosition + 285 <= 396 &&  ballYPosition == 160){
        removeBrick('.brick10')
    }
    else if(ballXPosition + 285 > 396 && ballXPosition + 285 <= 495 &&  ballYPosition == 160){
        removeBrick('.brick11')
    }
    else if(ballXPosition + 285 > 495 && ballXPosition + 285 <= 594 &&  ballYPosition == 160){
        removeBrick('.brick12')
    }

    else if(ballXPosition + 285 <= 99 && ballYPosition == 190){
        removeBrick('.brick1');
    }
    else if(ballXPosition + 285 > 99 && ballXPosition + 285 <= 198 &&  ballYPosition == 190){
        removeBrick('.brick2')
    }
    else if(ballXPosition + 285 > 198 && ballXPosition + 285 <= 297 &&  ballYPosition == 190){
        removeBrick('.brick3')
    }
    else if(ballXPosition + 285 > 297 && ballXPosition + 285 <= 396 &&  ballYPosition == 190){
        removeBrick('.brick4')
    }
    else if(ballXPosition + 285 > 396 && ballXPosition + 285 <= 495 &&  ballYPosition == 190){
        removeBrick('.brick5')
    }
    else if(ballXPosition + 285 > 495 && ballXPosition + 285 <= 594 &&  ballYPosition == 190){
        removeBrick('.brick6')
    }






    
    // console.log(currBrick)
    console.log(ballXPosition + 285);
    console.log(ballYPosition)

}

// console.log(ballXPosition + 285)
function changeDirection(){
    if(direction == "up-right"){
        direction = "down-right";
        moveBall(direction)
    }
    else if(direction == "up-left"){
        direction = "down-left";
        moveBall(direction)
    } 
}

function removeBrick(brick){
    if(document.querySelector(brick) != undefined){
        document.querySelector(brick).remove()
        changeDirection();
    }
}