const { updateGameState } = require('shared');

var ws;
var isReady = false;

const sendInput = (input) => {
  if (isReady) {
    ws.send(JSON.stringify(input));
  }
};

const onopen = (event) => {
  isReady = true;
};

const onmessage = (event) => {
  const updates = JSON.parse(event.data);
  updates.forEach((update) => {
    updateGameState(update);
  });
};

const onclose = (event) => {
  ws = null;
};

const startGame = () => {
  // TODO: proxy websocket in dev
  // const wsUrl = `ws://${window.location.host}/ws`;
  const wsUrl = `ws://${window.location.hostname}:3000/ws`;
  ws = new WebSocket(wsUrl);
  Object.assign(ws, { onopen, onmessage, onclose });
};

module.exports = {
  startGame,
  sendInput
};
