var connect = require('connect');
var serveStatic = require('serve-static');
var WebSocketServer = require('ws').Server;

connect().use(serveStatic(__dirname)).listen(8080);

var wss = new WebSocketServer({port: 6639});
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    wss.broadcast(message);
  });
});
