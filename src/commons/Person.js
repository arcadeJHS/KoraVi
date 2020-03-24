const status = {
  HEALTHY: 'HEALTHY',
  SICK: 'SICK',
  RECOVERED: 'RECOVERED',
  DEAD: 'DEAD'
};

export default class Person {
  constructor({ x, y, you, isSick, isolated, sketch }) {
    this.x = x;
    this.y = y;
    this.r = you ? 8 : 5; // radius
    this.speedX = 1;
    this.speedY = 2;
    this.alive = true;
    this.sickFrom = isSick ? new Date() : null;
    this.status = isSick ? status.SICK : status.HEALTHY;
    this.isolated = !!isolated;
    this.you = !!you;
    this.sketch = sketch;
    this.colors = {
      HEALTHY: sketch.color(19, 165, 55),
      SICK: sketch.color(255, 0, 0),
      RECOVERED: sketch.color(0, 0, 255)
    };
  }

  update() {
    if (this.alive) {
      this.display();
      this.move();
      this.bounce();
      if (this.status == status.SICK) {
        const now = new Date();
        const diff = (now.getTime() - this.sickFrom.getTime()) / 1000;
        if (diff >= 5) {
          this.recoverOrDie();
        }
      }
    }
  }

  display() {
    // stroke(255);
    if (this.you) {
      this.sketch.stroke(this.colors[this.status]);
      this.sketch.fill(this.sketch.color(255, 156, 42), 100);
    }
    else {
      this.sketch.noStroke();
      this.sketch.fill(this.colors[this.status], 100);
    }
    this.sketch.ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  move() {
    if (this.isolated) return;
    this.x += this.speedX;
    this.y += this.speedY;
  }

  bounce() {
    // hits left or right: reverse direction
    if (this.x+this.r > this.sketch.width || this.x-this.r < 0) { this.speedX *= -1; }
    // hits top or bottom: reverse direction
    if (this.y+this.r > this.sketch.height || this.y-this.r < 0) { this.speedY *= -1; }
  }

  collide(other) {
    if (this.isolated) return;

    var d = this.sketch.dist(this.x, this.y, other.x, other.y);
    if (d <= this.r + other.r) {
      this.speedX *= -1;
      this.speedY *= -1;

      this.changeStatus(other);
    }
  }

  changeStatus(other) {
    if (other.status == status.SICK && this.status == status.HEALTHY) {
      this.status = status.SICK;
      this.sickFrom = new Date();
    }
    if (this.status == status.SICK && other.status == status.HEALTHY) {
      other.status = status.SICK;
      other.sickFrom = new Date();
    }
  }

  recoverOrDie() {
    var min = Math.ceil(0);
    var max = Math.floor(100);
    var probability = Math.floor(Math.random() * (max - min + 1)) + min;

    // simulate a mortality ~6%
    if (probability < 6) {
      this.alive = false;
      this.status = status.DEAD;
    }
    else { this.status = status.RECOVERED; }
  }
}
