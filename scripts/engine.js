// Engine.js

// This file provides the game loop functionality, draws the initial game board
// on the screen, and then calls the update and render methods on objects. This
// engine also makes the canvas context object (`ctx`) globally available.

var Engine = (function (global) {
	const doc = global.document,
		win = global.window,
		canvas = doc.createElement("canvas"),
		ctx = canvas.getContext("2d");
	let lastTime;

	canvas.height = 606;
	canvas.width = 505;
	doc.body.appendChild(canvas);

	function init() {
		reset();
		lastTime = Date.now();
		main();
	}

	function main() {
		// Time delta (`dt`) creates smooth animations by setting a consistent
		// value of time that's independent of processor speed.
		let now = Date.now(),
			dt = (now - lastTime) / 1000.0;

		update(dt);
		render();

		// Needed to calculate next `dt`
		lastTime = now;

		// Recall this function when browser is ready for next frame
		win.requestAnimationFrame(main);
	}

	// Call `update` functions on ALL game objects
	// Only updates object properties; leaves drawing to `render` method
	function update(dt) {
		allEnemies.forEach(function (enemy) {
			enemy.update(dt);
		});
		player.update();
	}

	function render() {
		// Array of image URLs representing game rows from top to bottom
		let rowImages = [
				"images/water-block.png", // Row 1: Water
				"images/stone-block.png", // Row 2: Stone
				"images/stone-block.png", // Row 3: Stone
				"images/stone-block.png", // Row 4: Stone
				"images/grass-block.png", // Row 5: Grass
				"images/grass-block.png", // Row 6: Grass
			],
			numRows = 6,
			numCols = 5,
			row,
			col;

		// Clear current canvas before drawing next one
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Assemble map as specified above
		for (row = 0; row < numRows; row++) {
			for (col = 0; col < numCols; col++) {
				// Perameters: image, starting x, and starting y
				ctx.drawImage(
					Resources.get(rowImages[row]),
					col * 101,
					row * 83
				);
			}
		}

		renderEntities();
	}

	// Call `render` functions on ALL game objects
	function renderEntities() {
		allEnemies.forEach(function (enemy) {
			enemy.render();
		});
		player.render();
	}

	// TODO: Create proper reset function
	function reset() {
		// WRITE ME PLEASE
	}

	// Load all resources into cache then callback `init` to start
	Resources.load([
		"images/stone-block.png",
		"images/water-block.png",
		"images/grass-block.png",
		"images/enemy-bug.png",
		"images/char-boy.png",
	]);
	Resources.onReady(init);

	// Assign canvas context (`ctx`) for global use.
	global.ctx = ctx;
})(this);
