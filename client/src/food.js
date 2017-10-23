var eatFood;

var food = [];

const FOOD_SIZE = 5.0;

const drawFood = (p) => {
  food.forEach((dot) => {
    p.push();
    p.translate(dot.x, dot.y);
    p.ellipse(0, 0, FOOD_SIZE);
    p.pop();
  });
}

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

const initializeFood = (fromServer, eatFoodCb) => {
  food = fromServer;
  eatFood = eatFoodCb;
}

const removeFood = (foodEaten) => {
  food = food.filter(dot => (dot.x !== foodEaten.x || dot.y !== foodEaten.y));
}

module.exports = {
  drawFood,
  initializeFood,
  updateFood,
  removeFood
}
