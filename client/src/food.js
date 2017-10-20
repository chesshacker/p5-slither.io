const food = [];

const FOOD_SIZE = 5.0;

function drawFood(p) {
  food.forEach((dot) => {
    p.push();
    p.translate(dot.x, dot.y);
    p.ellipse(0, 0, FOOD_SIZE);
    p.pop();
  });
}

function initializeFood() {
  for (var x=0; x < 500; x++) {
    food.push({x: Math.random() * 1000 - 500, y: Math.random() * 1000 - 500});
  }
}

// returns amount of food eaten
function updateFood(worm) {
  var foodEaten = 0.0;
  food.forEach((dot, i) => {
    const collisionDistance = Math.pow(worm.size/2, 2) + Math.pow(FOOD_SIZE, 2);
    const dx = dot.x - worm.x;
    const dy = dot.y - worm.y;
    if (dx*dx + dy*dy < 4 * collisionDistance) {
      foodEaten += 1.0;
      food.splice(i,1);
    }
  });
  return foodEaten;
}

module.exports = {
  drawFood,
  initializeFood,
  updateFood
}
