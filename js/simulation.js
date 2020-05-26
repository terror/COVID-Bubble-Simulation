const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

canvas.height = 500; // in pixels
canvas.width = window.innerWidth;

let radius = 10; // in pixels
let noBubbles = 70; // number of bubbles
let noStatic = 40; // number of static bubbles
let sickRatio = 0.2; // ratio of starting sick bubbles. 0 = 0%, 1 = 100%
let speed = 1; // speed constant (unitless)
let paused = true;
let btn = document.getElementById('submit');

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
    if(paused)
        return;
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (let bubble of bubbles) {
		// To update itself, a bubble needs to know the state of all bubbles
		bubble.update(bubbles);
	}
}

function ratioCheck()
{
    let txt = document.getElementById('ratio').innerHTML
    if (parseInt(txt) <= 1 && parseInt(txt) >= 0 && /^\d+\.\d{0,2}$/.test(txt))
        return true;
    return true;
}

btn.addEventListener('submit', function(e) {
    if (!ratioCheck())
        return false;
    let canvasSize = document.getElementById('canvasSize').innerHTML;
    paused = false;
    if (canvasSize == "small")
    {
        height = 250;
        width = 500;
    }
    else if (canvasSize == "large")
    {
        height = 750;
        width = window.innerWidth;
    }
    radius = parseInt(document.getElementById('bubbleSize').innerHTML);
    noBubbles = parseInt(document.getElementById('numBubbles').innerHTML);
    noStatic = parseInt(document.getElementById('staticBubbles').innerHTML);
    sickRatio = parseFloat(document.getElementById('ratio').innerHTML);
    speed = parseInt(document.getElementById('speed').innerHTML);
    e.preventDefault();
}, false);

animate();
