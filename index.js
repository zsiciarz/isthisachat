let connect = require('connect');
let faker = require('faker');
let serveStatic = require('serve-static');
let WebSocketServer = require('ws').Server;

connect().use(serveStatic(__dirname)).listen(8080);

let wss = new WebSocketServer({port: 6639});
wss.broadcast = data => {
  wss.clients.forEach(client => client.send(data));
};

wss.on('connection', ws => {
  let username = faker.internet.userName();
  wss.broadcast(`${username} joined!`);
  ws.on('message', message => wss.broadcast(`${username}: ${message}`));
});

process.on('SIGINT', () => {
  wss.broadcast('Server going down NOW!');
  setTimeout(process.exit, 100);
});
