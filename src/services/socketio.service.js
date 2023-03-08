import { io } from 'socket.io-client';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');
    this.socket.on('start game', (body) => {
      console.log(`>>>>> ${body.name}, ${body.gameId}`);
      
    });
    this.socket.on('chat', (body) => {
      console.log(`From chat >>>>> ${body.name}, ${body.gameId}`);
    });
  }

  subscribeToMessages(name, roomID, cb) {
    if (!this.socket) return(true);

    this.socket.on('message', msg => {
      console.log('Room event received!');
      // return cb(null, msg);
      cb(null, msg);
    });

  }

  joinRoom(name, roomID, cb){
    var message = `${name} has joined the channel`
    this.socket.emit('message', { name, message, roomID }, cb);
  }

  sendMessage({name, message, roomID}, cb) {
    if (this.socket) this.socket.emit('message', { name, message, roomID }, cb);
  }

  startGame(body) {
    this.socket.emit('start game', body);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}


export default new SocketioService();
