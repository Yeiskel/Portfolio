 export default class Paddle {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.width = 150;
        this.height = 30;

        this.maxSpeed = 7;
        this.speed = 0;

        this.position = {
            x: gameWidth / 2 - this.width/2,
            y: gameHeight - this.height -10,
        }
    }

    moveLeft(){
        this.speed = -this.maxSpeed;

    }
    moveRight(){
        this.speed = this.maxSpeed;

    }

    stop(){
        this.speed = 0;
    }

    draw(context) {
        context.fillStyle = "cyan";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime){
        if (!deltaTime) return;
        this.position.x += this.speed;

        if (this.position.x <0) {
            this.position.x = 0
        } else if (this.position.x >this.gameWidth -this.width){
            this.position.x = this.gameWidth - this.width
        }
        
    }
}