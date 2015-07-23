import connect from 'connect';
import faker from 'faker';
import path from 'path';
import serveStatic from 'serve-static';
import uuid from 'node-uuid';
import {Server as WebSocketServer} from 'ws';

connect().use(serveStatic(path.join(__dirname, '../'))).listen(8080);

class ChatServer {
  constructor(port) {
    this.wss = new WebSocketServer({port: port});
    this.wss.on('connection', this.handleConnection);
  }

  broadcast = (nick, message) => {
    const payload = JSON.stringify({
      id: uuid.v4(),
      nick: nick,
      message: message
    });
    this.wss.clients.forEach(client => client.send(payload));
  };

  handleConnection = (ws) => {
    const nick = faker.internet.userName();
    this.broadcast(nick, 'joined!');
    ws.on('message', message => this.broadcast(nick, message));
    ws.on('close', message => this.broadcast(nick, ' left'));
  }

  close() {
    this.wss.broadcast('Server going down NOW!');
  }
}

let server = new ChatServer(6639);

process.on('SIGINT', () => {
  server.close();
  setTimeout(process.exit, 100);
});
