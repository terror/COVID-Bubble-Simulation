const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');
const canvasSize = document.getElementById('canvasSize');
const timer = document.getElementById('time');

let radius = 10; // in pixels
let noBubbles = 70; // number of bubbles
let noStatic = 40; // number of static bubbles
let sickRatio = 0.2; // ratio of starting sick bubbles. 0 = 0%, 1 = 100%
let speed = 1; // speed constant (unitless)
let sickCounter = 0;
let bubbles = [];

canvas.height = 500; // in pixels
canvas.width = window.innerWidth;
timer.innerHTML = 0;
let interval = setInterval(myTimer, 1000 / speed);

animate = () => {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (let bubble of bubbles) {
		// To update itself, a bubble needs to know the state of all bubbles
		bubble.update(bubbles);
		document.getElementById('number').innerHTML = sickCounter;
	}
};

loadBubbles = (bubbles) => {
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
};

ratioCheck = () => {
	const txt = document.getElementById('ratio');
	return parseInt(txt.value) <= 1 && parseInt(txt.value) >= 0;
};

function myTimer() {
	if (sickCounter == noBubbles) {
		timer.parentElement.style.display = 'none';
		document.getElementById('result').innerHTML = timer.innerHTML + ' seconds';
		clearInterval(interval);
	} else {
		timer.innerHTML++;
	}
}

loadBubbles(bubbles);

document.getElementById('submit').addEventListener(
	'click',
	(e) => {
		if (!ratioCheck());
		else if (canvasSize.value == '');
		else {
			if (canvasSize.value == 'small') {
				canvas.width = 500;
				canvas.height = 300;
			} else if (canvasSize.value == 'medium') {
				canvas.width = 700;
				canvas.height = 500;
			} else {
				canvas.width = 900;
				canvas.height = 700;
			}
			bubbles = [];
			sickCounter = 0;
			radius = parseInt(document.getElementById('bubbleSize').value);
			noBubbles = parseInt(document.getElementById('numBubbles').value);
			noStatic = parseInt(document.getElementById('staticBubbles').value);
			sickRatio = parseFloat(document.getElementById('ratio').value);
			speed = parseInt(document.getElementById('speed').value);

			timer.innerHTML = 0;
			let interval = setInterval(myTimer, 1000 / speed);
			loadBubbles(bubbles);
			document.getElementById('number').innerHTML = sickCounter;
			animate();
		}
		e.preventDefault();
	},
	false
);

animate();
