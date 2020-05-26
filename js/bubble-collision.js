class Bubble {
	constructor(radi, speed, isSick) {
		this.radius = radi;
		this.velocity = {
			x: (Math.random() - 0.5) * 2 * speed,
			y: (Math.random() - 0.5) * 2 * speed
		}
		this.sick = isSick;
		this.changeColour();
		this.positionRandomly();
	}

	draw() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.closePath();
		context.strokeStyle = `rgba(${this.colours[0]}, ${this.colours[1]}, ${this.colours[2]}, 0.75)`;
		context.fillStyle = `rgba(${this.colours[0]}, ${this.colours[1]}, ${this.colours[2]}, 0.25)`;
		context.lineWidth = 3;
		context.stroke();
		context.fill();
	}

	update(bubbles) {
		this.checkBounds();

		for (let bubble of bubbles) {

			if (this.isColliding(bubble) && bubble !== this) {
				this.infect(bubble);
				resolveCollision(this, bubble);
			}
		}
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.draw();
	}

	checkBounds() {
		if ((this.x + this.radius) > canvas.width || (this.x - this.radius) < 0) {
			this.velocity.x = -this.velocity.x;
		}
		if ((this.y + this.radius) > canvas.height || (this.y - this.radius) < 0) {
			this.velocity.y = -this.velocity.y;
		}
	}

	isColliding(bubble) {
		const distance = this.calculateDistance(bubble);
		return (distance <= (this.radius + bubble.radius) && distance > 0);
	}

	calculateDistance(bubble) {
		const hypot = Math.hypot(this.x - bubble.x, this.y - bubble.y);
		return hypot;
	}

	changeColour() {
		if (this.sick) this.colours = [247, 79, 79];  // sick
		else this.colours = [79, 198, 247];  // healthy
	}

	positionRandomly() {
		this.x = this.radius + (Math.random() * (canvas.width - (this.radius * 2)));
		this.y = this.radius + (Math.random() * (canvas.height - (this.radius * 2)));
	}

	infect(bubble) {
		if (!this.sick && bubble.sick) {
			this.sick = bubble.sick;
			sickCounter++;
			this.changeColour();

		} else if (this.sick && !bubble.sick) {
			bubble.sick = this.sick;
			sickCounter++;
			bubble.changeColour();
		}
	}
}
