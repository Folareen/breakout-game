alert("Game guide: \n For Laptop: Move game-pad with right and left key \n For Mobile Phone: Move game-pad by dragging")
if(window.innerWidth < 630){
    alert("Pls rotate your screen")
}

const PLAY_PAUSE_BTN = document.querySelector('.play-pause');
const STOP_BTN = document.querySelector('.stop');
const LEVEL = document.querySelector('select');
const SCORE = document.querySelector('.score');
const GAME_STATUS = document.querySelector('.game-status');
const GAME_SCORE = document.querySelector('.score');
const GAME_CONTAINER = document.querySelector('.game');
const GAME_BALL = document.querySelector('.game__ball');
const GAME_PAD = document.querySelector('.game__pad');
const GAME_BRICKS = document.querySelector('.game__bricks')

let ballXPosition = 0;
let ballYPosition = 0;
let playgameInterval;
let direction = "up-right";
let padPosition = 250;
let score = 0;
let lastRowBricksPositions = [70, 170, 270, 370, 470];
let secondRowBricksPositions = [70, 170, 270, 370, 470];
let firstRowBricksPositions = [770, 170, 270, 370, 470];
let backgroundMusic = new Audio('background.mp3');


PLAY_PAUSE_BTN.addEventListener('click', ()=>{
    if (PLAY_PAUSE_BTN.innerText == "Play"){
        play();
    }else if(PLAY_PAUSE_BTN.innerText == "Pause") {
        pause();
    }
} );
STOP_BTN.addEventListener('click', endGame);


function play(){
    PLAY_PAUSE_BTN.innerText = "Pause";

    getSpeed();

    playgameInterval = setInterval(() =>{
        playGame();
    }, getSpeed());
    
}
function pause(){
    PLAY_PAUSE_BTN.innerText = "Play";
    clearInterval(playgameInterval);
    document.removeEventListener('keydown', movePad);
    GAME_PAD.removeEventListener('touchmove', dragPad);
    backgroundMusic.pause();
}

function playGame(){
    GAME_STATUS.innerText = "";
    GAME_SCORE.innerText = score;
    moveBall(direction);

    document.addEventListener('keydown', movePad);

    GAME_PAD.addEventListener('touchmove', dragPad);

    backgroundMusic.play();
    backgroundMusic.playbackRate = (10 / getSpeed()) * 0.5;

    checkForBrickCollision();

    if(ballYPosition >= 100){

        if(lastRowBricksPositions.includes(ballXPosition + 250) && ballYPosition <= 129){
            switch (ballXPosition + 250){
                case 70:
                    checkPosition(lastRowBricksPositions, 70);  
                    removeBrick('.brick13');
                    break;
                case 170:
                    checkPosition(lastRowBricksPositions, 170);  
                    removeBrick('.brick14');
                    break;
                case 270:
                    checkPosition(lastRowBricksPositions, 270);  
                    removeBrick('.brick15');
                    break;
                case 370:
                    checkPosition(lastRowBricksPositions, 370);  
                    removeBrick('.brick16');
                    break;
                case 470:
                    checkPosition(lastRowBricksPositions, 470);  
                    removeBrick('.brick17');
                    break;     
            }

            changeBallDirection();
        }
        else if(secondRowBricksPositions.includes(ballXPosition + 250) && ballYPosition > 129 && ballYPosition <= 159){

            switch (ballXPosition + 250){
                case 70:
                    checkPosition(lastRowBricksPositions, 70);  
                    removeBrick('.brick7');
                    break;
                case 170:
                    checkPosition(lastRowBricksPositions, 170);  
                    removeBrick('.brick8');
                    break;
                case 270:
                    checkPosition(lastRowBricksPositions, 270);  
                    removeBrick('.brick9');
                    break;
                case 370:
                    checkPosition(lastRowBricksPositions, 370);  
                    removeBrick('.brick10');
                    break;
                case 470:
                    checkPosition(lastRowBricksPositions, 470);  
                    removeBrick('.brick11');
                    break;     
            }
            changeBallDirection();
        }
        else if(firstRowBricksPositions.includes(ballXPosition + 250) && ballYPosition > 159 && ballYPosition <= 189 ){

            switch (ballXPosition + 250){
                case 70:
                    checkPosition(lastRowBricksPositions, 70);  
                    removeBrick('.brick1');
                    break;
                case 170:
                    checkPosition(lastRowBricksPositions, 170);  
                    removeBrick('.brick2');
                    break;
                case 270:
                    checkPosition(lastRowBricksPositions, 270);  
                    removeBrick('.brick3');
                    break;
                case 370:
                    checkPosition(lastRowBricksPositions, 370);  
                    removeBrick('.brick4');
                    break;
                case 470:
                    checkPosition(lastRowBricksPositions, 470);  
                    removeBrick('.brick5');
                    break;     
            }

            changeBallDirection();
        }
    }

    checkForVerticalCollisions()

    checkForHorizontalCollisions()
}

function getSpeed(){
    switch (LEVEL.value){
        case "easy":
            return 20;
            break;
        case "normal":
            return 10;
            break;
        case "hard":
            return 1;
            break;
    }
}
function transform(x, y){
    GAME_BALL.style.bottom = `${30 + y}px`;
    GAME_BALL.style.left = `${290 + x}px`;
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
            if(padPosition < 510){
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
function dragPad(e){
    let gamePadOffsetX =  (e.changedTouches[0].clientX) -(GAME_CONTAINER.getBoundingClientRect().left);

    if (gamePadOffsetX > 0 && gamePadOffsetX < 510){
        padPosition = gamePadOffsetX;
        GAME_PAD.style.left = `${padPosition}px`;
    }
}
function endGame(){
    clearInterval(playgameInterval);
    GAME_STATUS.innerText = "Game Over!";
    GAME_STATUS.style.color = "darkred"
    PLAY_PAUSE_BTN.innerText = "Play";
    ballYPosition = 0;
    ballXPosition = 0;
    direction = "up-right";
    GAME_PAD.style.left = "250px";
    GAME_BRICKS.innerHTML = `
    <div class="brick1"></div>
    <div class="brick2"></div>
    <div class="brick3"></div>
    <div class="brick4"></div>
    <div class="brick5"></div>
    <div class="brick6"></div>
    <div class="brick7"></div>
    <div class="brick8"></div>
    <div class="brick9"></div>
    <div class="brick10"></div>
    <div class="brick11"></div>
    <div class="brick12"></div>
    <div class="brick13"></div>
    <div class="brick14"></div>
    <div class="brick15"></div>
    <div class="brick16"></div>
    <div class="brick17"></div>
    <div class="brick18"></div>`;
    lastRowBricksPositions = [70, 170, 270, 370, 470];
    secondRowBricksPositions = [70, 170, 270, 370, 470];
    firstRowBricksPositions = [70, 170, 270, 370, 470];
    score = 0;

    transform(0, 0);
    document.removeEventListener('keydown', movePad)
    GAME_PAD.removeEventListener('touchmove', dragPad);
    backgroundMusic.pause();
}
function checkForVerticalCollisions(){
    if (ballYPosition == 190){
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
    if (ballXPosition + 290 == 0 ){
        if(direction == "down-left"){
            direction = "down-right";
            moveBall(direction)
        }else if(direction == "up-left"){
            direction = "up-right";
            moveBall(direction)
        }
    }
    else if (ballXPosition - 290 == 0 ){
        if(direction == "down-right"){
            direction = "down-left";
            moveBall(direction)
        }else if(direction == "up-right"){
            direction = "up-left";
            moveBall(direction)
        }
    }
}


function checkForBrickCollision(){
    // last row
    if((ballXPosition + 290) <= 100 && ballYPosition == 100){
        checkPosition(lastRowBricksPositions, 70);
        removeBrick('.brick13');
    }
    else if(ballXPosition + 290 > 100 && ballXPosition + 290 <= 200 &&  ballYPosition == 100){
        checkPosition(lastRowBricksPositions, 170);
        removeBrick('.brick14');
    }
    else if(ballXPosition + 290 > 200 && ballXPosition + 290 <= 300 &&  ballYPosition == 100){
        checkPosition(lastRowBricksPositions, 270);
        removeBrick('.brick15');
    }
    else if(ballXPosition + 290 > 300 && ballXPosition + 290 <= 400 &&  ballYPosition == 100){
        checkPosition(lastRowBricksPositions, 370);
        removeBrick('.brick16');
    }
    else if(ballXPosition + 290 > 400 && ballXPosition + 290 <= 500 &&  ballYPosition == 100){
        checkPosition(lastRowBricksPositions, 470);
        removeBrick('.brick17');
    }
    else if(ballXPosition + 290 > 500 && ballXPosition + 290 <= 600 &&  ballYPosition == 100){
        removeBrick('.brick18')
    }
    // 2nd row
    else if(ballXPosition + 290 <= 100 && ballYPosition == 129){
        checkPosition(secondRowBricksPositions, 70);
        removeBrick('.brick7');
    }
    else if(ballXPosition + 290 > 100 && ballXPosition + 290 <= 200 &&  ballYPosition == 129){
        checkPosition(secondRowBricksPositions, 170);
        removeBrick('.brick8')
    }
    else if(ballXPosition + 290 > 200 && ballXPosition + 290 <= 300 &&  ballYPosition == 129){
        checkPosition(secondRowBricksPositions, 270);
        removeBrick('.brick9')
    }
    else if(ballXPosition + 290 > 300 && ballXPosition + 290 <= 400 &&  ballYPosition == 129){
        checkPosition(secondRowBricksPositions, 370);
        removeBrick('.brick10')
    }
    else if(ballXPosition + 290 > 400 && ballXPosition + 290 <= 500 &&  ballYPosition == 129){
        checkPosition(secondRowBricksPositions, 470);
        removeBrick('.brick11')
    }
    else if(ballXPosition + 290 > 500 && ballXPosition + 290 <= 600 &&  ballYPosition == 129){
        removeBrick('.brick12')
    }
    // 1st row
    else if(ballXPosition + 290 <= 100 && ballYPosition == 159){
        checkPosition(firstRowBricksPositions, 70);
        removeBrick('.brick1');
    }
    else if(ballXPosition + 290 > 100 && ballXPosition + 290 <= 200 &&  ballYPosition == 159){
        checkPosition(firstRowBricksPositions, 170);
        removeBrick('.brick2')
    }
    else if(ballXPosition + 290 > 200 && ballXPosition + 290 <= 300 &&  ballYPosition == 159){
        checkPosition(firstRowBricksPositions, 270);
        removeBrick('.brick3');
    }
    else if(ballXPosition + 290 > 300 && ballXPosition + 290 <= 400 &&  ballYPosition == 159){
        checkPosition(firstRowBricksPositions, 370);
        removeBrick('.brick4')
    }
    else if(ballXPosition + 290 > 400 && ballXPosition + 290 <= 500 &&  ballYPosition == 159){
        checkPosition(firstRowBricksPositions, 470);
        removeBrick('.brick5')
    }
    else if(ballXPosition + 290 > 500 && ballXPosition + 290 <= 600 &&  ballYPosition == 159){
        removeBrick('.brick6')
    }
}

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

        document.querySelector(brick).remove();
        score += 1;
        GAME_SCORE.innerText = score;
        changeDirection();

        if(score == 18){
            endGame();
            GAME_STATUS.innerText = "You won!";
            GAME_STATUS.style.color = "green";
        }
    }
}

function changeBallDirection(){
    switch (direction){
        case "up-right":
            direction = "up-left";
            moveBall(direction)
            break;
        case "up-left":
            direction = "up-right";
            moveBall(direction)
            break;
        case "down-right":
            direction = "down-left";
            moveBall(direction)
            break;
        case "down-left":
            direction = "down-right";
            moveBall(direction)
            break;
    }
}

function checkPosition(arr, position){
    if(arr.indexOf(position) > 0){
        arr.splice(
            arr.indexOf(position) , 1
        )
    }
}