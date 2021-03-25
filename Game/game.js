import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import { buildLevel, level1, level2, level3 } from "./levels.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    VICTORY: 5,
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 3;
        this.levels = [level1, level2, level3];
        this.currentLevel = 0;
        this.defeat_sound = document.getElementById("defeat_sound");
        this.victory_sound = document.getElementById("victory_sound");
        new InputHandler(this.paddle, this);
    }
    start() {
        if (
            this.gamestate !== GAMESTATE.MENU &&
            this.gamestate !== GAMESTATE.NEWLEVEL
        )
            return;
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.paddle];
        this.gamestate = GAMESTATE.RUNNING;
    }
    update(deltaTime) {
        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if (
            this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER ||
            this.gamestate === GAMESTATE.VICTORY
        )
            return;
        if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            if (this.currentLevel === this.levels.length)
                this.gamestate = GAMESTATE.VICTORY;
            this.start();
        }
        [...this.gameObjects, ...this.bricks].forEach((object) =>
            object.update(deltaTime)
        );
        this.bricks = this.bricks.filter((object) => !object.markedForDeletion);
    }
    draw(context) {
        [...this.gameObjects, ...this.bricks].forEach((object) =>
            object.draw(context)
        );
        //Pause screen
        if (this.gamestate === GAMESTATE.PAUSED) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,0.5)";
            context.fill();

            context.font = "30px Comic Sans";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }
        //Menu screen
        if (this.gamestate === GAMESTATE.MENU) {
            this.lives = 3;
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)";
            context.fill();

            context.font = "40px Brush Script MT";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText(
                "Press SPACEBAR to start",
                this.gameWidth / 2,
                this.gameHeight / 2
            );
        }
        //Game over screen
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)";
            context.fill();

            context.font = "70px Comic Sans";
            context.fillStyle = "rgba(200,50,50)";
            context.textAlign = "center";
            context.fillText(
                "YOU DIED",
                this.gameWidth / 2,
                this.gameHeight / 2
            );
            this.defeat_sound.play();
            const sleep = (milliseconds) => {
                return new Promise((resolve) =>
                    setTimeout(resolve, milliseconds)
                );
            };
            sleep(8000).then(() => {
                this.gamestate = GAMESTATE.MENU;
                this.currentLevel = 0;
                this.lives = 3;
                
            });
        }
        //Victory screen
        if (this.gamestate === GAMESTATE.VICTORY) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)";
            context.fill();

            context.font = "70px Trebuchet MS";
            context.fillStyle = "rgba(80,188,211)";
            context.textAlign = "center";
            context.fillText(
                "VICTORY!",
                this.gameWidth / 2,
                this.gameHeight / 2
            );
            this.victory_sound.play();
            const sleep = (milliseconds) => {
                return new Promise((resolve) =>
                    setTimeout(resolve, milliseconds)
                );
            };
            sleep(6000).then(() => {
                this.gamestate = GAMESTATE.MENU;
                this.currentLevel = 0;
            });
        }
    }
    togglePause() {
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}
