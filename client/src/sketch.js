const { getMouseInput } = require('./input');
const { drawWorms, getWormPosition } = require('./worm');
const { drawFood } = require('./food');
const { startGame, sendInput } = require('./server');
const { getCurrentPlayerPosition } = require('shared');

draw = p => () => {
  p.clear();
  p.background(0); // black
  p.stroke(255);  // white
  p.noFill();

  p.push();
  const center = getCurrentPlayerPosition();
  p.translate(p.windowWidth/2 - center.x, p.windowHeight/2 - center.y);
  drawWorms(p);
  drawFood(p);
  p.pop();

  const input = getMouseInput(p);
  sendInput(input);
};

setup = p => () => {
  p.frameRate(60);
  p.createCanvas(p.windowWidth, p.windowHeight);

  startGame();
};

windowResized = p => () => {
  p.resizeCanvas(p.windowWidth, p.windowHeight);
};

module.exports = (p) => {
  p.draw = draw(p);
  p.setup = setup(p);
  p.windowResized = windowResized(p);
};
