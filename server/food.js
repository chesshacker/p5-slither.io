var food = [];

for (var x=0; x < 500; x++) {
  food.push({
    x: Math.floor(Math.random() * 1000 - 500),
    y: Math.floor(Math.random() * 1000 - 500)
  });
}

function getFood() {
  return food;
}

function eatFood(dot) {
  food.forEach((dot, i) => {
    if (dot.x !== dot.x || dot.y !== dot.y) {
      food.splice(i, 1);
    }
  });
}

module.exports = {
  getFood,
  eatFood
};
