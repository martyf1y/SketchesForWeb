class Snake {
  constructor(slot) {
    this.size = 5;
    this.dir;
    this.speed = slot;
    this.body = [];
    this.apple;
    this.stopGame;
    this.intervalUpdate;
  }

  reset() {
    this.body.length = this.size;
    for (let i = 0; i < this.size; i++) this.body[i] = createVector(0, 0);
    this.apple = resetPos();
    this.dir = createVector(this.speed, 0);
    this.stopgame = false;
    if (this.intervalUpdate != undefined) clearInterval(this.intervalUpdate);
    this.intervalUpdate = setInterval(update, 100);
  }

  update() {
    this.move();
    this.checkApple();
    this.checkDead();
  }

  move() {
    for (let i = this.body.length - 1; i > 0; i--) {
      let front = this.body[i - 1];
      if (!this.body[i].equals(front)) this.body[i].set(front); // shift all coord back one
    }

    let head = this.body[0];
    head.add(this.dir);
    while (checkOnShirt(head) === undefined) {
      head.add(this.dir);
      if (head.x >= tLEDWidth) head.x = 0;
      else if (head.x < 0) head.x = tLEDWidth - this.speed;
      if (head.y >= tLEDHeight) head.y = 0;
      else if (head.y < 0) head.y = tLEDHeight - this.speed;
    }
  }

  show() {
    adjustLED(this.body[0], color(0, 255, 0)); // head of the snake
    adjustLED(this.body[this.body.length - 1], color(125)); // tail of the snake
  }

  showApple() {
    adjustLED(this.apple, color(255, 0, 0));
  }

  checkApple() {
    if (this.body[0].equals(this.apple)) {
      let n = this.body[this.body.length - 1];
      this.body.push(createVector(n.x, n.y));
      let onSnake = true;
      while (onSnake == true) {
        this.apple = resetPos();
        onSnake = false;
        for (b of this.body)
          if (b.equals(this.apple)) {
            onSnake = true;
          } // check not on snake
      }
    }
  }

  checkDead() {
    for (let p of this.body)
      if (p != this.body[0] && this.body[0].equals(p))
        clearInterval(this.intervalUpdate);
  }
}
