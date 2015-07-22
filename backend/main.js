let connect = require('connect');
let faker = require('faker');
let path = require('path');
let serveStatic = require('serve-static');
let uuid = require('node-uuid');
let WebSocketServer = require('ws').Server;

connect().use(serveStatic(path.join(__dirname, '../'))).listen(8080);

let wss = new WebSocketServer({port: 6639});
wss.broadcast = (nick, message) => {
  let payload = JSON.stringify({
    id: uuid.v4(),
    nick: nick,
    message: message
  });
  wss.clients.forEach(client => client.send(payload));
};

wss.on('connection', ws => {
  let nick = faker.internet.userName();
  wss.broadcast(nick, 'joined!');
  ws.on('message', message => wss.broadcast(nick, message));
  ws.on('close', message => wss.broadcast(nick, ' left'));
});

process.on('SIGINT', () => {
  wss.broadcast('Server going down NOW!');
  setTimeout(process.exit, 100);
});
