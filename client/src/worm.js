const {
  differenceBetweenAngles,
  limitRange
} = require('./util');

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

function drawWorm(p) {
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

const MAX_HEADING_CHANGE_FACTOR = 0.5;

const DRAW_SEGMENT_RATE = 7;
var lastDrawn = DRAW_SEGMENT_RATE;

const DROP_RATE = 4;
var lastDrop = DROP_RATE;

const REGULAR_SPEED = 1.0;
const FAST_SPEED = 2.0;

function updateWorm({ desiredHeading, goFast }) {
  // from check input
  const delta = differenceBetweenAngles(worm.heading, desiredHeading);
  const maxHeadingChange = MAX_HEADING_CHANGE_FACTOR / worm.size;
  const limitedDelta = limitRange(delta, maxHeadingChange);
  worm.heading += limitedDelta;

  const isFast = goFast && worm.length > 10;
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
  worm.size = sizeFromLength(worm.length);
  return worm;
}

function growWorm(foodEaten) {
  worm.length += foodEaten;
}

function getWormPosition() {
  return { x: worm.x, y: worm.y };
}

module.exports = {
  drawWorm,
  updateWorm,
  growWorm,
  getWormPosition
}
