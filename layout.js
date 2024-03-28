let Layout = class {

	// =================================================
	
	constructor (layers = []) {
		this.layers = layers;
	}

	// =================================================

	clear () {
		this.layers = [];
	}

	load (func) {
		this.clear();
		func (this);
		// console.log(this.layers);
	}

	// =================================================
	
	addLayer (index, name) {
		if (this.layers[index]) {
			return null;
		}
		
		this.layers[index] = new Layer(name);
		return this.layers[index];
	}

	removeLayer (name) {
		let index = this.getLayerIndex(name);

		if (!index) {
			return false;
		}

		this.layers.splice(index, 1);
	}

	getLayer (name) {
		for (let index = 0; index < this.layers.length; index++) {
			let layer = this.layers[index];
			
			if (layer.name == name) {
				return layer;
			}

		}

		return null;
	}

	getLayerIndex (name) {
		for (let index = 0; index < this.layers.length; index++) {
			let layer = this.layers[index];
			
			if (layer.name == name) {
				return index;
			}

		}

		return null;
	}

	// =================================================

	update (game) {
		this.layers.forEach ((layer) => layer.update(game));
	}

	render (game) {
		this.layers.forEach ((layer) => layer.render(game));
	}

	// =================================================
	
}

let Layer = class {

	// =================================================

	constructor (name, updateOnScreen = true) {
		this.name = name;
		this.objects = [];
		this.updateOnScreen = updateOnScreen;
	}
	
	// =================================================

	add (obj) {
		this.objects.push(obj);
	}

	remove (obj) {
		this.objects.splice( this.objects.indexOf(obj), 1 );
	}

	// =================================================

	update (game) {
		// this.objects.forEach ((obj) => obj.update(game));

		for (let obj of this.objects) {
			let isOnScreen = (
				obj.shape.x >= 0 &&
				obj.shape.x <= game.canvas.width &&
				obj.shape.y >= 0 &&
				obj.shape.y <= game.canvas.height
			);

			if (!isOnScreen) {
				continue;
			}

			obj.collisions = [];

			for (let obj2 of this.objects) {
				let distance = Math.sqrt( Math.pow(obj2.x - obj.x, 2) + Math.pow(obj2.y - obj.y, 2) );

				if (distance > obj.width) continue;

				if (obj.shape.collides(obj2.shape, false)) {
					obj.collisions.push(obj2.constructor.name);
					obj.onCollide(game, obj2);
				}
			}
			
			obj.update(game);
		}
	}

	render (game) {
		// this.objects.forEach ((obj) => obj.render(game));

		for (let obj of this.objects) {
			let isOnScreen = (
				obj.shape.x >= 0 &&
				obj.shape.x <= game.canvas.width &&
				obj.shape.y >= 0 &&
				obj.shape.y <= game.canvas.height
			);

			if (!isOnScreen) {
				continue;
			}
			
			obj.render(game);
		}
	}

	// =================================================

}