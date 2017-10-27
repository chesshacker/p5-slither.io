const _ = require('lodash'); // TODO: should probably install lodash as a dependency of shared

var currentPlayer;
var gameState = {
  food: [],
  worms: []
};

const updateGameState = (update) => {
  const {updateType, payload} = update;
  switch (updateType) {
    case 'newGame':
      gameState = payload.gameState;
      currentPlayer = payload.currentPlayer;
      break;
    case 'addFood':
      gameState.food.push(payload);
      break;
    case 'removeFood':
      _.remove(gameState.food, (dot) => (dot.x !== payload.x || dot.y !== payload.y));
      break;
    case 'updateWorms': // TODO: get more granular
      gameState.worms = payload;
      break;
    default:
      console.error(`unknown update - ${updateType}`);
  }
};

const newGameUpdate = (currentPlayer) => {
  const payload = {
    gameState,
    currentPlayer
  };
  return {updateType: 'newGame', payload};
};

const addFoodUpdate = (aFood) => {
  return {updateType: 'addFood', payload: aFood};
};

const removeFoodUpdate = (aFood) => {
  return {updateType: 'removeFood', payload: aFood};
};

const getCurrentPlayerPosition = () => {
  const worm = _.find(gameState.worms, (worm) => worm.id === currentPlayer.id);
  if (worm) {
    return {
      x: worm.x,
      y: worm.y
    };
  }
  return { x: 0, y: 0 };
};

const forEachFood = (callback) => {
  gameState.food.forEach((food) => {
    callback(food)
  });
};

const forEachWorm = (callback) => {
  gameState.worms.forEach((food) => {
    callback(food)
  });
};

const getWorms = () => gameState.worms;
const wormsUpdate = () => ({
  updateType: 'updateWorms',
  payload: gameState.worms
});

module.exports = {
  updateGameState,
  newGameUpdate,
  addFoodUpdate,
  removeFoodUpdate,
  getCurrentPlayerPosition,
  forEachFood,
  forEachWorm,
  getWorms,
  wormsUpdate
};
