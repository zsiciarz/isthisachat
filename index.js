var connect = require('connect');
var faker = require('faker');
var serveStatic = require('serve-static');
var WebSocketServer = require('ws').Server;

connect().use(serveStatic(__dirname)).listen(8080);

var wss = new WebSocketServer({port: 6639});
wss.broadcast = function (data) {
  wss.clients.forEach(function (client) {
    client.send(data);
  });
};

wss.on('connection', function (ws) {
  var username = faker.internet.userName();
  wss.broadcast(username + ' joined!');
  ws.on('message', function (message) {
    wss.broadcast(username + ': ' + message);
  });
});

process.on('SIGINT', function() {
  wss.broadcast('Server going down NOW!');
  setTimeout(function () {
    process.exit();
  }, 100);
});
