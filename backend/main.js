import connect from 'connect';
import faker from 'faker';
import path from 'path';
import serveStatic from 'serve-static';
import uuid from 'node-uuid';
import {Server as WebSocketServer} from 'ws';

connect().use(serveStatic(path.join(__dirname, '../'))).listen(8080);

let wss = new WebSocketServer({port: 6639});
wss.broadcast = (nick, message) => {
  const payload = JSON.stringify({
    id: uuid.v4(),
    nick: nick,
    message: message
  });
  wss.clients.forEach(client => client.send(payload));
};

wss.on('connection', ws => {
  const nick = faker.internet.userName();
  wss.broadcast(nick, 'joined!');
  ws.on('message', message => wss.broadcast(nick, message));
  ws.on('close', message => wss.broadcast(nick, ' left'));
});

process.on('SIGINT', () => {
  wss.broadcast('Server going down NOW!');
  setTimeout(process.exit, 100);
});
