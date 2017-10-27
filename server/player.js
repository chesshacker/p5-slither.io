const _ = require('lodash');
const { forEachWorm, wormsUpdate, getWorms } = require('shared');
const { newWorm, updateWorm } = require('./worm');

var players = [];
var playersById = {};

const randomString = () => Math.random().toString(36).substring(7);

const newPlayer = () => ({
  id: randomString()
});

const addPlayer = (aPlayer) => {
  players.push(aPlayer);
  playersById[aPlayer.id] = aPlayer;
  const worm = newWorm(aPlayer.id);
  getWorms().push(worm);
};

const removePlayer = (aPlayer) => {
  _.remove(getWorms(), (worm) => worm.id === aPlayer.id);
  _.remove(players, (p) => (p.id !== aPlayer.id));
  delete playersById[aPlayer.id];
};

const updatePlayerInput = (player, input) => {
  playersById[player.id].input = input;
};

const generatePlayerUpdates = () => {
  forEachWorm((worm) => {
    const player = playersById[worm.id];
    if (!player) {
      console.log('null player ???')
    }
    updateWorm(worm, player.input);
  });
  return [wormsUpdate()];
};

module.exports = {
  newPlayer,
  addPlayer,
  removePlayer,
  updatePlayerInput,
  generatePlayerUpdates
}
