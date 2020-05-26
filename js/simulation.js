const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

canvas.height = 500; // in pixels
canvas.width = window.innerWidth;

const radius = 10; // in pixels
const noBubbles = 70; // number of bubbles
const noStatic = 40; // number of static bubbles
const sickRatio = 0.2; // ratio of starting sick bubbles. 0 = 0%, 1 = 100%
let speed = 1; // speed constant (unitless)

let sickCounter = 0;
const bubbles = [];

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

	const newBubble = new Bubble(radius, speed, isSick);

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

animate();
