const WebSocket = require('faye-websocket');
const http = require('http');
const _ = require('lodash');
const { newGameUpdate, addFoodUpdate, updateGameState } = require('shared');
const { newPlayer, addPlayer, removePlayer, updatePlayerInput, generatePlayerUpdates } = require('./player');
const { generateFoodUpdates } = require('./food');

var server = http.createServer();
const clients = [];

server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    var player;

    ws.on('open', function(event) {
      console.log('open connection');
      clients.push(ws);
      player = newPlayer();
      addPlayer(player);
      const updates = [newGameUpdate(player)];
      ws.send(JSON.stringify(updates));
    });

    ws.on('message', function(event) {
      const input = JSON.parse(event.data);
      updatePlayerInput(player, input);
    });

    ws.on('close', function(event) {
      console.log('close connection', event.code, event.reason);
      removePlayer(player);
      _.pull(clients, ws);
      ws = null;
    });
  }
});

const broadcast = (updates) => {
  clients.forEach((client) => {
    client.send(JSON.stringify(updates));
  });
}

const UPDATE_INTERVAL = 50; // in milliseconds

setInterval(() => {
  const updates = [];
  updates.push.apply(updates, generateFoodUpdates());
  updates.push.apply(updates, generatePlayerUpdates());
  updates.forEach((update) => {
    updateGameState(update);
  });
  broadcast(updates);
}, UPDATE_INTERVAL);

server.listen(3000);
