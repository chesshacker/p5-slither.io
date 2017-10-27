const { forEachFood } = require('shared');

const FOOD_SIZE = 5.0;

const drawFood = (p) => {
  forEachFood((dot) => {
    p.push();
    p.translate(dot.x, dot.y);
    p.ellipse(0, 0, FOOD_SIZE);
    p.pop();
  });
}

module.exports = {
  drawFood
}
