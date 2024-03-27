let Input = function () {
	
	// =================================================
	
		this.keys = [];
	
	// =================================================

	this.isKeyDown = function (key) {
		return this.keys[key] == true;
	}

	this.isKeyUp = function (key) {
		return this.keys[key] == false;
	}
	
	// =================================================

	window.onkeydown = (e) => this.keys[e.code] = true;
	window.onkeyup = (e) => this.keys[e.code] = false;
}

let Game = function () {
	
	// =================================================

		this.canvas = document.getElementById("canvas");
		this.context = canvas.getContext("2d");
		this.running = false;
		this.ticks = 0;

		this.debug = {
			showHitboxes: false
		};

		this.input = new Input();
		this.controls = {
			left: "ArrowLeft",
			right: "ArrowRight"
		};

		// this.layout = new Layout([new Layer("main")]);

		// this.layout.getLayer("main").add( new Entity(20, 20, 50, 50) );

		this.layout = new Layout();
		this.layout.load(Maps["Map"]);

		this.gravity = {
			x: 0,
			y: 0.25
		};

	// =================================================

	this.start = function () {
		this.running = true;
		window.requestAnimationFrame(
			() => this.loop.call(this)
		);
	};
	
	this.stop = function () {
		this.running = false;
	}

	// =================================================

	this.resizeCanvas = function (width, height) {
		this.canvas.width = width;
		this.canvas.height = height;
	}

	// =================================================

	this.loop = function () {
		this.update(this);
		this.render(this);

		window.requestAnimationFrame(
			() => this.loop.call(this)
		);
	}

	// =================================================

	this.update = function (game) {
		this.ticks++;
		this.layout.update(game);
	}

	this.render = function (game) {
		this.clearScreen ("cornflowerblue");
		this.layout.render(game);
		this.renderTicks ();
	}

	// =================================================

	this.clearScreen = function (color) {
		this.context.fillStyle = color;
		this.context.fillRect (0, 0, this.canvas.width, this.canvas.height);
	}

	this.renderTicks = function () {
		utils_fillBGText(this.context, "Ticks: " + this.ticks, 0, 0, "rgba(0,0,0,0.75)");
	}
}

window.onresize = function () {
	game.resizeCanvas (window.innerWidth, window.innerHeight);
}

window.onload = function () {
	game = new Game();
	
	game.resizeCanvas (window.innerWidth, window.innerHeight);
	game.start();

	init();
	load();
}

let game;

let init = function () {}
let load = function () {}