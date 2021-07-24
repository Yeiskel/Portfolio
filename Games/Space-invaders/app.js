document.addEventListener("DOMContentLoaded", () => {
	const player = document.querySelector(".player");
	const gameDisplay = document.querySelector(".game-container");
	const space = document.querySelector(".space");

	let playerLeft = 46;
	let projectileSpeed = 5;
	let isShooting = false;
	let sideSpeed = 2;
	let verticalSpeed = 90;
	let invaderSpeed = 0.5;
	let invaderCounter = 0;
	let reachedLeftSide = false;
	let isGameOver = false;

	function moveLeft() {
		playerLeft -= sideSpeed;
		player.style.left = playerLeft + "%";
	}
	function moveRight() {
		playerLeft += sideSpeed;
		player.style.left = playerLeft + "%";
	}

	function shootProjectile() {
		isShooting = true;
		let projectilePosition = 395;
		const projectile = document.createElement("div");
		projectile.classList.add("projectile");
		gameDisplay.appendChild(projectile);
		//Center of the player
		projectile.style.left = playerLeft + 2.3 + "%";

		function moveProjectile() {
			projectilePosition -= projectileSpeed;
			projectile.style.top = projectilePosition + "px";
		}
		setInterval(() => {
			if (projectilePosition > 0) moveProjectile();
		}, 10);
	}

	function inputHandler(event) {
		// console.log(event);
		switch (event.code) {
			case "ArrowLeft":
				if (playerLeft > 0) moveLeft();
				break;
			case "ArrowRight":
				if (playerLeft <= 92) moveRight();
				console.log(playerLeft);
				break;
			case "Space":
				shootProjectile();
				break;
		}
	}

	function generateInvader(projectilePosition) {
		let randomPositionX = Math.floor(Math.random() * (88 - 0 + 1) + 0);
		// let randomPositionX = 88;
		let randomPositionY = Math.floor(Math.random() * (100 - 0 + 1) + 0);
		invaderCounter++;
		const invader = document.createElement("div");
		invader.classList.add("invaders");
		space.appendChild(invader);

		invader.style.left = randomPositionX + "%";
		invader.style.top = randomPositionY + "px";

		// if (invaderCounter < 5) setTimeout(generateInvader, 4000);

		function moveInvaderLeft() {
			if (randomPositionX >= 0) {
				randomPositionX -= invaderSpeed;
				invader.style.left = randomPositionX + "%";
			} else {
				reachedLeftSide = true;
				randomPositionY += verticalSpeed;
				invader.style.top = randomPositionY + "px";
			}
		}
		function moveInvaderRight() {
			if (randomPositionX <= 88) {
				randomPositionX += invaderSpeed;
				invader.style.left = randomPositionX + "%";
			} else {
				reachedLeftSide = false;
				randomPositionY += verticalSpeed;
				invader.style.top = randomPositionY + "px";
			}
		}

		//Crear 2 funciones de movimiento y correrlas dependiendo de si toco un borde u otro
		let invaderId = setInterval(() => {
			if (reachedLeftSide == true) {
				if (randomPositionY > 310) {
					clearInterval(invaderId);
					gameOver();
				} else {
					moveInvaderRight();
				}
			} else if (reachedLeftSide == false) {
				if (randomPositionY > 310) {
					clearInterval(invaderId);
					gameOver();
				} else {
					moveInvaderLeft();
				}
			}
		}, 20);
	}

	function gameOver() {
		isGameOver = true;
		document.removeEventListener("keydown", inputHandler);
	}
	document.addEventListener("keydown", inputHandler);
	generateInvader();
});
