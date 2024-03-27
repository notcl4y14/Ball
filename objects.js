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
	}

	// =================================================

	// static sprite = new Image();
	static sprite = utils_loadImage("assets/ball.png");

	// =================================================
	
	onCollide (game, obj) {
		if (obj instanceof Block) {
			if (this.shape.sideCollides("bottom", obj)) {
				this.y = obj.y - this.height;
				this.velY = 0;
			}
			console.log(this.shape.sideCollides("left", obj));
			if (this.shape.sideCollides("left", obj)) {
				this.x = obj.x + this.width;
				this.velX = 0;
			}
		}
	}

	// =================================================

	update (game) {
		let left = game.input.isKeyDown(game.controls.left);
		let right = game.input.isKeyDown(game.controls.right);

		let dirX = (right - left);

		this.velX += game.gravity.x;
		this.velY += game.gravity.y;

		this.velX += dirX * this.accel;
		this.velX = utils_clamp(this.velX, this.maxSpeed * -1, this.maxSpeed);

		if (dirX == 0) {
			this.velX -= this.friction  * utils_dot(this.velX);
		}

		this.x += this.velX;
		this.y += this.velY;
	}
	
	render (game) {
		game.context.fillStyle = "#ffffff";
		game.context.drawImage(Ball.sprite, this.x, this.y);

		if (game.debug.showHitboxes) this.shape.render(game);
	}
}