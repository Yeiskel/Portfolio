document.addEventListener("DOMContentLoaded", () => {
	const player = document.querySelector(".player");
	const gameDisplay = document.querySelector(".game-container");
	const space = document.querySelector(".space");
	let windowWidth = gameDisplay.clientWidth;

	let playerLeft = player.offsetLeft;
	let playerWidth = 50;
	let projectileSpeed = 5;
	let projectileWidth = 15;
	let projectileHeight = 30;
	let isShooting = false;
	let sideSpeed = 10;
	let verticalSpeed = 90;
	let invaderSpeed = 3.5;
	let invaderWitdh = 90;
	let invaderCounter = 0;
	let reachedLeftSide = false;
	let isGameOver = false;

	function moveLeft() {
		playerLeft -= sideSpeed;
		player.style.left = playerLeft + "px";
	}
	function moveRight() {
		playerLeft += sideSpeed;
		player.style.left = playerLeft + "px";
	}

	function shootProjectile() {
		isShooting = true;
		let projectilePositionY = 395;
		let projectilePositionX = playerLeft + 17.5;
		const projectile = document.createElement("div");
		projectile.classList.add("projectile");
		gameDisplay.appendChild(projectile);
		//Center of the player
		projectile.style.left = projectilePositionX + "px";

		function moveProjectile() {
			projectilePositionY -= projectileSpeed;
			projectile.style.top = projectilePositionY + "px";
			//Algoritmo de colision
			if (
				projectilePositionY < randomPositionY + invaderWitdh &&
				projectilePositionY + projectileHeight > randomPositionY &&
				projectilePositionX < randomPositionX + invaderWitdh &&
				projectilePositionX + projectileWidth > randomPositionX
			) {
				gameOver();
				space.removeChild(invader);
				gameDisplay.removeChild(projectile);
			}
			if (projectilePositionY == -30) gameDisplay.removeChild(projectile);
		}
		projectileId = setInterval(() => {
			if (projectilePositionY > -30) moveProjectile();
		}, 10);
	}

	function inputHandler(event) {
		switch (event.code) {
			case "ArrowLeft":
				if (playerLeft > 10) moveLeft();
				break;
			case "ArrowRight":
				if (playerLeft < windowWidth - playerWidth - 10) moveRight();
				break;
			case "Space":
				shootProjectile();
				break;
		}
	}

	function generateInvader() {
		randomPositionX = Math.floor(
			Math.random() * (windowWidth - invaderWitdh - 0 + 1) + 0
		);
		// randomPositionX = windowWidth - invaderWitdh;
		randomPositionY = Math.floor(Math.random() * (100 - 0 + 1) + 0);
		invaderCounter++;
		invader = document.createElement("div");
		invader.classList.add("invaders");
		space.appendChild(invader);

		invader.style.left = randomPositionX + "px";
		invader.style.top = randomPositionY + "px";

		// if (invaderCounter < 5) setTimeout(generateInvader, 4000);

		function moveInvaderLeft() {
			if (randomPositionX > 0) {
				randomPositionX -= invaderSpeed;
				invader.style.left = randomPositionX + "px";
				// console.log(randomPositionX);
			} else {
				reachedLeftSide = true;
				randomPositionY += verticalSpeed;
				invader.style.top = randomPositionY + "px";
			}
		}
		function moveInvaderRight() {
			if (randomPositionX <= windowWidth - invaderWitdh) {
				randomPositionX += invaderSpeed;
				invader.style.left = randomPositionX + "px";
				// console.log(randomPositionX);
			} else {
				reachedLeftSide = false;
				randomPositionY += verticalSpeed;
				invader.style.top = randomPositionY + "px";
			}
		}

		//Crear 2 funciones de movimiento y correrlas dependiendo de si toco un borde u otro
		invaderId = setInterval(() => {
			if (reachedLeftSide == true) {
				if (randomPositionY > 310) {
					gameOver();
				} else {
					moveInvaderRight();
				}
			} else if (reachedLeftSide == false) {
				if (randomPositionY > 310) {
					gameOver();
				} else {
					moveInvaderLeft();
				}
			}
		}, 20);
	}

	function gameOver() {
		clearInterval(invaderId);
		if (isShooting == true) clearInterval(projectileId);
		isGameOver = true;
		document.removeEventListener("keydown", inputHandler);
	}
	document.addEventListener("keydown", inputHandler);

	generateInvader();
});
