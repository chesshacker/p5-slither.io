module.exports = (p) => {

  function sizeFromLength(length) {
    return 1.5 * Math.pow(length, 0.6);
  }

  const INITIAL_WORM_LENGTH = 20;
  const INITIAL_WORM_SIZE = sizeFromLength(INITIAL_WORM_LENGTH);

  const worm = {
    x: 0.0,
    y: 0.0,
    heading: 0.0,
    length: INITIAL_WORM_LENGTH,
    size: INITIAL_WORM_SIZE,
    parts: []
  }

  const food = [];

  function drawWorm() {
    p.push();
    p.translate(worm.x, worm.y);
    p.rotate(worm.heading);
    p.ellipse(0, 0, worm.size);
    p.pop();

    worm.parts.forEach((part) => {
      p.push();
      p.translate(part.x, part.y);
      p.ellipse(0, 0, worm.size);
      p.pop();
    });
  }

  const FOOD_SIZE = 5.0;

  function drawFood() {
    food.forEach((dot) => {
      p.push();
      p.translate(dot.x, dot.y);
      p.ellipse(0, 0, FOOD_SIZE);
      p.pop();
    });
  }

  const MAX_HEADING_CHANGE_FACTOR = 0.5;

  function differenceBetweenAngles(firstAngle, secondAngle) {
    var difference = secondAngle - firstAngle;
    while (difference < -Math.PI) difference += 2 * Math.PI;
    while (difference > Math.PI) difference -= 2 * Math.PI;
    return difference;
  }

  function limitRange(number, limit) {
    if (number > limit) {
      return limit;
    } else if (number < -limit) {
      return -limit;
    }
    return number;
  }

  function checkInput() {
    const dx = p.mouseX - p.windowWidth/2;
    const dy = p.mouseY - p.windowHeight/2;
    const desired = Math.atan2(dy, dx);
    const delta = differenceBetweenAngles(worm.heading, desired);
    const maxHeadingChange = MAX_HEADING_CHANGE_FACTOR / worm.size;
    const limitedDelta = limitRange(delta, maxHeadingChange);
    worm.heading += limitedDelta;
  }

  const DRAW_SEGMENT_RATE = 7;
  var lastDrawn = DRAW_SEGMENT_RATE;

  const DROP_RATE = 4;
  var lastDrop = DROP_RATE;

  const REGULAR_SPEED = 1.0;
  const FAST_SPEED = 2.0;

  const MIN_EATING_DISTANCE = 100;

  function updateWorm() {
    const isFast = p.mouseIsPressed && worm.length > 10;
    const speed = isFast ? FAST_SPEED : REGULAR_SPEED;
    worm.x += Math.cos(worm.heading) * speed;
    worm.y += Math.sin(worm.heading) * speed;
    if (lastDrawn <= 0) {
      worm.parts.push({x: worm.x, y: worm.y});
      lastDrawn = DRAW_SEGMENT_RATE;
    } else {
      lastDrawn -= speed + 0;
    }
    if (worm.parts.length > worm.length) {
      const last = worm.parts.shift();
      if (isFast) {
        if (lastDrop <= 0) {
          food.push(last);
          worm.length -= 2.0;
          lastDrop = DROP_RATE;
        } else {
          lastDrop--;
        }
      }
    }
    food.forEach((dot, i) => {
      const collisionDistance = p.sq(worm.size/2) + p.sq(FOOD_SIZE);
      const dx = dot.x - worm.x;
      const dy = dot.y - worm.y;
      if (dx*dx + dy*dy < 4 * collisionDistance) {
        worm.length += 1.0;
        food.splice(i,1);
      }
    });
    worm.size = sizeFromLength(worm.length)
  }

  p.draw = () => {
    p.clear();
    p.background(0); // black
    p.stroke(255);  // white
    p.noFill();

    checkInput();
    updateWorm();
    p.push();
    p.translate(p.windowWidth/2 - worm.x, p.windowHeight/2 - worm.y);
    drawWorm();
    drawFood();
    p.pop();
  }

  function initializeFood() {
    for (var x=0; x < 500; x++) {
      food.push({x: Math.random() * 1000 - 500, y: Math.random() * 1000 - 500});
    }
  }

  p.setup = () => {
    p.frameRate(60);
    p.createCanvas(p.windowWidth, p.windowHeight);
    initializeFood();
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

}
