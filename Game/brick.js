import { detectCollision } from "./collisionDetection.js";

export default class Brick {
    constructor(game, position) {
        this.image = document.getElementById("img_brick");
        this.position = position;
        this.width = 80;
        this.height = 50;
        this.game = game;
        this.markedForDeletion = false
        this.brick_break = document.getElementById("brick_sound");
    }
    update(){
        if (detectCollision(this.game.ball, this)) {
            this.brick_break.play();
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
        }

    }
    draw(context) {
        context.drawImage(
            this.image,
             this.position.x,
             this.position.y,
             this.width,
             this.height
             );
    }
}