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

  sendMessage = (nick, event, data) => {
    const payload = JSON.stringify({
      id: uuid.v4(),
      nick,
      event,
      message: data
    });
    this.wss.clients.forEach(client => client.send(payload));
  };

  handleConnection = (ws) => {
    const nick = faker.internet.userName();
    this.sendMessage(nick, 'join');
    ws.on('message', message => this.sendMessage(nick, 'message', message));
    ws.on('close', message => this.sendMessage(nick, 'leave'));
  }
}

let server = new ChatServer(6639);

process.on('SIGINT', () => {
  setTimeout(process.exit, 100);
});
