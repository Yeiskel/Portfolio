import { detectCollision } from "./collisionDetection.js";

export default class Ball {
	constructor(game) {
		this.image = document.getElementById("img_ball");
		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.boop_sound = document.getElementById("boop_sound");
		this.dying_sound = document.getElementById("dying_sound");
		this.size = 40;
		this.game = game;
		this.reset();
	}

	reset() {
		this.position = { x: 10, y: 400 };
		this.speed = { x: 5, y: -2 };
		if (this.game.currentLevel === 1) this.speed = { x: 8, y: -3 };
		if (this.game.currentLevel === 2) this.speed = { x: 8.5, y: -4 };
	}
	draw(context) {
		context.drawImage(this.image, this.position.x, this.position.y);
	}

	update(deltaTime) {
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;
		//Checks the borders
		if (
			this.position.x + this.size > this.gameWidth ||
			this.position.x < 0
		) {
			this.boop_sound.play();

			this.speed.x = -this.speed.x;
		}
		if (this.position.y < 0) {
			this.boop_sound.play();
			this.speed.y = -this.speed.y;
		}
		if (this.position.y + this.size > this.gameHeight) {
			this.game.lives--;
			this.dying_sound.play();
			this.reset();
		}
		if (detectCollision(this, this.game.paddle)) {
			this.boop_sound.play();
			this.speed.y = -this.speed.y;
			this.position.y = this.game.paddle.position.y - this.size;
		}
	}
}
