export default class Ball {
    constructor(game){
        this.image = document.getElementById("img_ball");
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.position = {x:10, y:10};
        this.speed = {x:3, y:2};
        //this.size = aqui iria el tamaño de la imagen
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
        if (this.position.x + 30 > this.gameWidth || this.position.x <0) {
            this.speed.x = -this.speed.x;
        } else if (this.position.y + 30 > this.gameHeight || this.position.y <0) {
            this.speed.y = -this.speed.y;
        }
    }
}