import { detectCollision } from "./collisionDetection.js";

export default class Ball {
    constructor(game){
        this.image = document.getElementById("img_ball");
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.position = {x:10, y:400};
        this.speed = {x:4, y:-2};
        this.size = 40
        this.game = game;
    }

    draw(context) {
        context.drawImage(
            this.image,
             this.position.x,
             this.position.y);
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        //Checks the borders
        if (this.position.x + this.size > this.gameWidth || this.position.x <0) {
            this.speed.x = -this.speed.x;
        }
        if (this.position.y + this.size > this.gameHeight || this.position.y <0) {
            this.speed.y = -this.speed.y;
        }
        if (detectCollision(this, this.game.paddle)){
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}