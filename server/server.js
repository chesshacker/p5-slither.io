const WebSocket = require('faye-websocket');
const http = require('http');
const { getFood, eatFood } = require('./food');

var server = http.createServer();
const clients = [];

server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);

    ws.on('open', function(event) {
      console.log('open connection');
      clients.push(ws);
      ws.send(JSON.stringify({
        messageType: 'startGame',
        payload: getFood()
      }));
    });

    ws.on('message', function(event) {
      const { messageType, payload } = JSON.parse(event.data);
      switch (messageType) {
        case 'eatFood':
          console.log('eatFood');
          clients.forEach(client => {
            client.send(JSON.stringify({ messageType: 'removeFood', payload }));
          });
          eatFood(payload);
          break;
        default:
          console.error(`unknown message - ${messageType}`);
      }
    });

    ws.on('close', function(event) {
      console.log('close connection', event.code, event.reason);
      clients.splice(clients.indexOf(ws), 1);
      ws = null;
    });
  }
});

server.listen(3000);
