let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0, 20); // Fade effect for trailing particles

  // Emit new particles from the mouse position
  particles.push(new Particle(mouseX, mouseY));

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].isOffScreen()) {
      particles.splice(i, 1); // Remove particles that go off screen
    }
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255;
    this.color = color(random(255), random(255), random(255));
    this.size = random(5, 10);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2;
  }

  display() {
    fill(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.lifespan
    );
    ellipse(this.position.x, this.position.y, this.size);
  }

  isOffScreen() {
    return (
      this.position.x > width ||
      this.position.x < 0 ||
      this.position.y > height ||
      this.position.y < 0
    );
  }
}
