let Block = class extends Entity {

	// =================================================

	constructor (x, y, width, height) {
		super(x, y, width, height);
	}

	// =================================================

	// static sprite = new Image();
	static sprite = utils_loadImage("assets/block.png");

	// =================================================

	// =================================================
	
	render (game) {
		// let x = this.x - 1;
		// let y = this.y - 1;
		// let width = this.width + 2;
		// let height = this.height + 2;
		// if (x < 0) { x = 0; width = this.width + 1; }
		// if (y < 0) { y = 0; height = this.height + 1; }

		// game.context.fillStyle = "#000000";
		// game.context.fillRect(x, y, width, height);
		game.context.fillStyle = "#ffffff";
		game.context.drawImage(Block.sprite, this.x, this.y);

		if (game.debug.showHitboxes) this.shape.render(game);
	}
}

// Block.sprite.src = "assets/block.png";

let Ball = class extends Entity {

	// =================================================

	constructor (x, y, width, height) {
		super(x, y, width, height);

		this.velX = 0;
		this.velY = 0;

		this.accel = 0.25;
		this.friction = 0.25;
		this.maxSpeed = 4;
		this.jumpPower = -5;
	}

	// =================================================

	// static sprite = new Image();
	static sprite = utils_loadImage("assets/ball.png");

	// =================================================

	applyGravity (game) {
		this.velX += game.gravity.x;
		this.velY += game.gravity.y;
	}

	applyVelocity () {
		this.x += this.velX;
		this.y += this.velY;
	}

	addVelocity (x, y) {
		this.velX += x;
		this.velY += y;
	}
	
	addAcceleration (accel = this.accel, x = utils_dot(this.velX), y = 0) {
		this.velX += accel * x;
		this.velY += accel * y;
	}

	addFriction (friction = this.friction, x = utils_dot(this.velX), y = 0) {
		this.velX -= friction * x;
		this.velY -= friction * y;
	}

	// =================================================
	
	onCollide (game, obj) {
		if (obj.constructor.name == "Block") {
		}
	}

	checkForHorizontalCollisions (game, obj) {

		if (this.velX > 0) {
			this.velX = 0;
		} else if (this.velX < 0) {
			this.velX = 0;
		}

	}

	checkForVerticalCollisions (game, obj) {
		
		if (this.velY > 0) {
			this.velY = 0;
		} else if (this.velY < 0) {
			this.velY = 0;
		}

	}

	// =================================================

	update (game) {
		let left = game.input.isKeyDown(game.controls.left);
		let right = game.input.isKeyDown(game.controls.right);
		let jump = game.input.isKeyDown(game.controls.jump);

		let dirX = (right - left);

		this.applyGravity(game);

		for (let obj of game.layout.getLayer("main").objects) {
			let distance = Math.sqrt( Math.pow(obj.x - this.x, 2) + Math.pow(obj.y - this.y, 2) );
			if (distance > this.width) continue;
			this.checkForHorizontalCollisions(game, obj);
		}

		for (let obj of game.layout.getLayer("main").objects) {
			let distance = Math.sqrt( Math.pow(obj.x - this.x, 2) + Math.pow(obj.y - this.y, 2) );
			if (distance > this.width) continue;
			this.checkForVerticalCollisions(game, obj);
		}

		// Acceleration
		this.addAcceleration(this.accel, dirX);
		
		// Limiting speed
		if (!game.settings.bhop || (this.collisions.includes("Block") && !jump)) {
			this.velX = utils_clamp(this.velX, this.maxSpeed * -1, this.maxSpeed);
		}

		// Friction
		if (dirX == 0 && this.collisions.includes("Block")) {
			this.addFriction();
		}

		// Jump
		if (jump && this.collisions.includes("Block")) {
			this.velY = this.jumpPower;

			if (game.settings.bhop) {
				this.velX += utils_dot(this.velX) * 0.5;
			}
		}
		
		this.applyVelocity();

		// this.x += this.velX;
		// this.y += this.velY;
	}
	
	render (game) {
		game.context.fillStyle = "#ffffff";
		game.context.drawImage(Ball.sprite, this.x, this.y);

		if (game.debug.showHitboxes) this.shape.render(game);
	}
}