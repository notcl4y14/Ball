let RectShape = class {

	// =================================================

	constructor (x, y, width, height) {
		// this.pos = pos;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	// =================================================

	collides (shape) {
		// https://love2d.org/wiki/BoundingBox.lua
		return this.x < shape.x + shape.width &&
			shape.x < this.x + this.width &&
			this.y < shape.y + shape.height &&
			shape.y < this.y + this.height;
	}

	getSide (side) {
		if (side == "left") return this.x;
		else if (side == "right") return this.x + this.width;
		else if (side == "top") return this.y;
		else if (side == "bottom") return this.y + this.height;
	}

	sideCollides(side, shape, cut = true) {
		cut = cut == true ? 1 : 0;

		if (side == "left") {
			return this.x < shape.x + shape.width &&
				shape.x < this.x &&
				this.y + cut < shape.y + shape.height &&
				shape.y < this.y + this.height - cut;
		} else if (side == "right") {
			return this.x + this.width < shape.x + shape.width &&
				shape.x < this.x + this.width &&
				this.y < shape.y + shape.height &&
				shape.y < this.y + this.height;
		} else if (side == "top") {
			return this.x < shape.x + shape.width &&
				shape.x < this.x + this.width &&
				this.y < shape.y + shape.height &&
				shape.y < this.y;
		} else if (side == "bottom") {
			return this.x < shape.x + shape.width &&
				shape.x < this.x + this.width &&
				this.y + this.height < shape.y + shape.height &&
				shape.y < this.y + this.height;
		}
	}

	// =================================================

	render (game) {
		game.context.strokeStyle = "#ffffff";
		game.context.strokeRect(this.x, this.y, this.width, this.height);

		utils_fillBGText(game.context, this.x + "; " + this.y, this.x, this.y - 8, "rgba(0,0,0,0.75)");
	}

	// =================================================

}

let Entity = class {

	// =================================================

	constructor (x, y, width, height) {
		this.shape = new RectShape(x, y, width, height);
	}

	// =================================================

	// get pos () {
	// 	return this.shape.pos;
	// }

	get x () {
		return this.shape.x;
	}

	get y () {
		return this.shape.y;
	}

	set x (val) {
		this.shape.x = val;
	}

	set y (val) {
		this.shape.y = val;
	}

	get width () {
		return this.shape.x;
	}

	get height () {
		return this.shape.height;
	}

	set width (val) {
		this.shape.width = val;
	}

	set height (val) {
		this.shape.height = val;
	}

	// =================================================
	
	onCollide (game, obj) {}

	// =================================================

	update (game) {}
	render (game) {
		this.shape.render(game);
	}
	
	// =================================================

}