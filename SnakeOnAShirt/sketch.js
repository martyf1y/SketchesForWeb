// Original script by Marty, June 2015
// Updated script 11.10.2020

let LEDArray = [
  24,
  25,
  26,
  27,
  38,
  40,
  40,
  40,
  40,
  37,
  36,
  35,
  35,
  34,
  34,
  34,
  34,
  34,
  35,
  35,
  36,
  37,
  40,
  40,
  40,
  40,
  38,
  27,
  26,
  25,
  24,
];
let tCols = LEDArray.length;
let tRows = Math.max(...LEDArray);
let ledBright = [];
let ledSize = window.innerHeight/tRows*0.5;
let ledSlot = ledSize * 2;
let center = ledSlot * 0.5;
let tLEDWidth = tCols * ledSlot;
let tLEDHeight = tRows * ledSlot;

let snake;

function setup() {
  // frameRate(5);
  //createCanvas(window.innerWidth/2, window.innerHeight/2);
  createCanvas(window.innerWidth/2, window.innerHeight/2);
  background(0);
  snake = new Snake(ledSlot);
  reset();
}

function update() {
  snake.update();
}

function draw() {
  snake.showApple();
  snake.show();
}

function checkOnShirt(pos) {
  let c = floor(map(pos.x, 0, tLEDWidth, 0, tCols));
  let r = floor(map(pos.y, 0, tLEDHeight, 0, tRows));
  if (pos.x >= 0 && pos.y >= 0 && r < LEDArray[c]) return { col: c, row: r };
  else console.log("UNDEFINED");
  return undefined;
}

function resetPos() {
  let p = createVector(
    floor(random(tCols)) * ledSlot,
    floor(random(tRows)) * ledSlot
  );
  if (checkOnShirt(p) === undefined) p = resetPos();
  return p;
}

function adjustLED(pos, rgba) {
  let LED = checkOnShirt(pos);
  if (LED === undefined) return;

  let ID = getID(LED.col, LED.row);
  ledBright[ID] = alpha(rgba);

  let x = LED.col * ledSlot + center;
  let y = tLEDHeight - center - LED.row * ledSlot;
  fill(rgba); // Replace this with NEOPIXEL function using ID in arduino
  stroke(rgba);
  strokeWeight(1);
  ellipse(x, y, ledSize);
}

function getID(c, r) {
  let ID = 0;
  for (let n = 0; n < c; n++) ID += LEDArray[n];
  return ID + r;
}

function sinecolor(percent) {
  let slime =
    Math.sin(
      ((((Date.now() + 255 * percent) % 255) / 255) * 360 * Math.PI) / 180
    ) * 255;
  return slime;
}

function keyPressed() {
  let b1 = snake.body[0];
  let b2 = snake.body[1];
  let v = snake.speed;

  if (keyCode == DOWN_ARROW && b1.y - v != b2.y) snake.dir.set(0, -v);
  else if (keyCode == UP_ARROW && b1.y + v != b2.y) snake.dir.set(0, v);
  else if (keyCode == LEFT_ARROW && b1.x - v != b2.x) snake.dir.set(-v, 0);
  else if (keyCode == RIGHT_ARROW && b1.x + v != b2.x) snake.dir.set(v, 0);

  if (keyCode == SHIFT) reset();
}

function reset() {
  for (let x = center; x < tLEDWidth; x += ledSlot) {
    for (let y = center; y < tLEDHeight; y += ledSlot) {
      adjustLED(createVector(x, y), color(125)); // Turn all LEDS off
    }
  }
  for (b of ledBright) b = 0;

  snake.reset();
}
