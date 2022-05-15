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
let direction;


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


// console.log(ballXPosition)
function game(){
    let ballOffsetTop = Math.floor(GAME_BALL.getBoundingClientRect().top  - GAME_CONTAINER.getBoundingClientRect().top);
    let ballOffsetBottom = Math.floor(GAME_BALL.getBoundingClientRect().bottom  - GAME_CONTAINER.getBoundingClientRect().bottom);
    let ballOffsetRight = Math.floor(GAME_BALL.getBoundingClientRect().right  - GAME_CONTAINER.getBoundingClientRect().right);
    let ballOffsetLeft = Math.floor(GAME_BALL.getBoundingClientRect().left - GAME_CONTAINER.getBoundingClientRect().left);

    console.log(
        [
            ballOffsetTop,
            ballOffsetBottom,
            ballOffsetRight,
            ballOffsetLeft
        ]
    );

    // [ 218, -32, -285, 285 ]

    if(ballOffsetTop > 2 && ballOffsetLeft > 0 ){
        moveBall("up-right");
    }
    // else if(ballOffsetTop == 0 || ballOffsetBottom < 0){
    //     moveBall("down-left");
    //     // console.log("down left")
    // }


    // moveBall(direction)
    // if(GAME_BALL.getBoundingClientRect().top - 30 == 280)
    // if(ballOffsetY > 0 ){
    //     direction = "up-right"
    //     moveBall(direction);
    //     // console.log([GAME_BALL.getBoundingClientRect().top  - GAME_CONTAINER.getBoundingClientRect().top])
    //     // console.log(GAME_BALL.style)
    //     // console.log(
    //     //     Math.floor(GAME_BALL.getBoundingClientRect().top  - GAME_CONTAINER.getBoundingClientRect().top)
    //     // )
    //     console.log([ballXPosition, ballYPosition])
    // }else if(Math.floor(GAME_BALL.getBoundingClientRect().top  - GAME_CONTAINER.getBoundingClientRect().top) == 0 || direction == "down-left"){
    //     direction = "down-left";
    //     console.log("change")
    //     moveBall(direction);
    //     // console.log([ballXPosition, ballYPosition])
    // } 

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

function moveBall(direction){
    switch (direction){
        case "up-right":
            ballXPosition += 1;
            ballYPosition -= 1;
            GAME_BALL.style.transform = `translate(${ballXPosition}px, ${ballYPosition}px)`;
            break;
        case "up-left":
            ballXPosition -= 1;
            ballYPosition -= 1;
            GAME_BALL.style.transform = `translate(${ballXPosition}px, ${ballYPosition}px)`;
            break;
        case "down-left":
            ballXPosition -= 1;
            ballYPosition += 1;
            GAME_BALL.style.transform = `translate(${ballXPosition}px, ${ballYPosition}px)`;
            break;
        case "down-right":
            ballXPosition += 1;
            ballYPosition += 1;
            GAME_BALL.style.transform = `translate(${ballXPosition}px, ${ballYPosition}px)`;
            break;
    }

}


