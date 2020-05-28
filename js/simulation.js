let canvas = document.getElementsByTagName('canvas')[0];
let context = canvas.getContext('2d');

canvas.height = 500; // in pixels
canvas.width = window.innerWidth;

let radius = 10; // in pixels
let noBubbles = 70; // number of bubbles
let noStatic = 40; // number of static bubbles
let sickRatio = 0.2; // ratio of starting sick bubbles. 0 = 0%, 1 = 100%
let speed = 1; // speed constant (unitless)
let form = document.getElementById('form');

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
    if(!form.checkValidity())
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
    return parseInt(txt) <= 1 && parseInt(txt) >= 0;
}

form.addEventListener('submit', function(e) {
    if (!ratioCheck());     
    else
    {
        let canvasSize = document.getElementById('canvasSize').innerHTML;
        canvas.width = canvasSize == "Small" ? 300 : canvasSize == "Medium" ? 500 : 700;
        canvas.height = canvasSize == "Small" ? 500 : canvasSize == "Medium" ? window.innerWidth : window.innerWidth + 200;
        radius = parseInt(document.getElementById('bubbleSize').innerHTML);
        noBubbles = parseInt(document.getElementById('numBubbles').innerHTML);
        noStatic = parseInt(document.getElementById('staticBubbles').innerHTML);
        sickRatio = parseFloat(document.getElementById('ratio').innerHTML);
        speed = parseInt(document.getElementById('speed').innerHTML);
    }
    e.preventDefault();
}, false);

animate();
