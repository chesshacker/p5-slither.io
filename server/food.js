const { randomPosition } = require('./util');
const { addFoodUpdate } = require('shared');

const randomFood = () => randomPosition();

// returns amount of food eaten
const updateFood = (worm) => {
  var foodEaten = 0.0;
  food.forEach((dot, i) => {
    const collisionDistance = Math.pow(worm.size/2, 2) + Math.pow(FOOD_SIZE, 2);
    const dx = dot.x - worm.x;
    const dy = dot.y - worm.y;
    if (dx*dx + dy*dy < 4 * collisionDistance) {
      eatFood(dot);
      foodEaten += 1.0;
      food.splice(i,1);
    }
  });
  return foodEaten;
}

const generateFoodUpdates = () => {
  if (Math.random() < 0.01) {
    return [
      addFoodUpdate(randomFood())
    ];
  } else {
    return [];
  }
};

module.exports = {
  generateFoodUpdates
};
