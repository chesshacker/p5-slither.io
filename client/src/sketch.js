const { getMouseInput } = require('./input');
const { drawWorm, updateWorm, growWorm, getWormPosition } = require('./worm');
const { drawFood, updateFood, initializeFood } = require('./food');

draw = p => () => {
  p.clear();
  p.background(0); // black
  p.stroke(255);  // white
  p.noFill();

  p.push();
  const center = getWormPosition();
  p.translate(p.windowWidth/2 - center.x, p.windowHeight/2 - center.y);
  drawWorm(p);
  drawFood(p);
  p.pop();

  const input = getMouseInput(p);
  const worm = updateWorm(input);
  const foodEaten = updateFood(worm);
  growWorm(foodEaten);
}

setup = p => () => {
  p.frameRate(60);
  p.createCanvas(p.windowWidth, p.windowHeight);
  initializeFood();
}

windowResized = p => () => {
  p.resizeCanvas(p.windowWidth, p.windowHeight);
}

module.exports = (p) => {
  p.draw = draw(p);
  p.setup = setup(p);
  p.windowResized = windowResized(p);
}
