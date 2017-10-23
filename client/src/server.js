const { initializeFood, removeFood } = require('./food');

var ws;

const startGame = () => {
  ws = new WebSocket('ws://localhost:3000/ws');
  Object.assign(ws, { onopen, onmessage, onclose })
}

const eatFood = (server) => (dot) => {
  const messageType = 'eatFood';
  const payload = dot;
  server.send(JSON.stringify({ messageType, payload }));
}

const onopen = (event) => {
  console.log('ws.open');
};

const onmessage = (event) => {
  const { messageType, payload } = JSON.parse(event.data);
  switch (messageType) {
    case 'startGame':
      initializeFood(payload, eatFood(ws));
      break;
    case 'removeFood':
      console.log('remove food');
      removeFood(payload);
      break;
    default:
      console.error(`unknown message - ${messageType}`);
  }
};

const onclose = (event) => {
  console.log('ws.close', event.code, event.reason);
  ws = null;
};

module.exports = {
  startGame,
  eatFood
}
