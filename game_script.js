import Paddle from './paddle.js';

let canvas = document.getElementById("gameScreen");
let context = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;



let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);

paddle.draw(context);

function game_loop(timestamp) {

    let deltaTime = timestamp -lastTime;
    lastTime = timestamp;

    context.clearRect(0,0,800,600);
    paddle.update(deltaTime);
    paddle.draw(context);

    requestAnimationFrame(game_loop);
}

game_loop();