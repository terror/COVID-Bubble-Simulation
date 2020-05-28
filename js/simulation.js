let canvas = document.getElementsByTagName('canvas')[0];
let context = canvas.getContext('2d');

canvas.height = 500; // in pixels
canvas.width = window.innerWidth;

let radius = 10; // in pixels
let noBubbles = 70; // number of bubbles
let noStatic = 40; // number of static bubbles
let sickRatio = 0.2; // ratio of starting sick bubbles. 0 = 0%, 1 = 100%
let speed = 1; // speed constant (unitless)
let canvasSize = document.getElementById('canvasSize');

let sickCounter = 0;
let bubbles = [];

for (let i = 0; i < noBubbles; i++) {
	let isSick = false;

	if (i < noBubbles * sickRatio) {
		// the first X bubbles will be sick
		isSick = true;
		sickCounter++;
	}

	if (i > noBubbles - noStatic) {
		// the last Y bubbles will be static
		speed = 0;
	}

	let newBubble = new Bubble(radius, speed, isSick);

	// Ensures that no bubbles spawn on top of each other initially.
	for (let bubble of bubbles) {
		while (newBubble.isColliding(bubble)) {
			newBubble.positionRandomly();
		}
	}
	bubbles.push(newBubble); // add newBubble to the bubbles array
}

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (let bubble of bubbles) {
		// To update itself, a bubble needs to know the state of all bubbles
		bubble.update(bubbles);
	}
}

function ratioCheck() {
	let txt = document.getElementById('ratio');
	return parseInt(txt.value) <= 1 && parseInt(txt.value) >= 0;
}

document.getElementById('submit').addEventListener(
	'click',
	function(e) {
		if (!ratioCheck());
		else {
			if (canvasSize.value == 'small') {
				canvas.width = 300;
				canvas.height = 500;
			} else if (canvasSize.value == 'medium') {
				canvas.width = 500;
				canvas.height = window.innerWidth;
			} else {
				canvas.width = 700;
				canvas.height = window.innerWidth + 200;
			}
			bubbles = [];
			radius = parseInt(document.getElementById('bubbleSize').value);
			noBubbles = parseInt(document.getElementById('numBubbles').value);
			noStatic = parseInt(document.getElementById('staticBubbles').value);
			sickRatio = parseFloat(document.getElementById('ratio').value);
			speed = parseInt(document.getElementById('speed').value);

			for (let i = 0; i < noBubbles; i++) {
				let isSick = false;

				if (i < noBubbles * sickRatio) {
					// the first X bubbles will be sick
					isSick = true;
					sickCounter++;
				}

				if (i > noBubbles - noStatic) {
					// the last Y bubbles will be static
					speed = 0;
				}

				let newBubble = new Bubble(radius, speed, isSick);

				// Ensures that no bubbles spawn on top of each other initially.
				for (let bubble of bubbles) {
					while (newBubble.isColliding(bubble)) {
						newBubble.positionRandomly();
					}
				}
				bubbles.push(newBubble); // add newBubble to the bubbles array
			}
			animate();
		}
		e.preventDefault();
	},
	false
);

animate();
