import { io } from 'socket.io-client';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection(token) {
    this.socket = io('http://localhost:3000', {
      // TODO: Fix this hardcade port address
      auth: {
        token,
      },
    });
    console.log(`Connecting socket...`);

    this.socket.on('my broadcast', (data) => {
      console.log(data);
    });
  }

  subscribeToMessages(roomID, cb) {
    if (!this.socket) return true;
    this.socket.on('message', (msg) => {
      console.log('Room event received!');
      return cb(null, msg);
    });
  }

  subscribeToRoom(roomID, cb) {
    if (!this.socket) return true;
    this.socket.emit('join room', roomID); // join the specific room
    this.socket.on('join room', (msg) => {
      console.log('Room event received!');
      return cb(null, msg);
    });
  }

  subscribeToGameLog() {
    if (!this.socket) return true;
    this.socket.on('game log', (msg) => {
      console.log(msg);
      // return cb(null, msg);
    });
  }

  sendMessage({ message, roomID }, cb) {
    if (this.socket) this.socket.emit('message', { message, roomID }, cb);
  }

  startGame() {
    if (this.socket) this.socket.emit('game loop');
  }

  action() {
    if (this.socket) {
      console.log('send action');
      this.socket.emit('action', Number(0));
    }
  }

  steal() {
    if (this.socket) {
      console.log('send steal');
      this.socket.emit('request', Number(0));
    }
  }

  endturn() {
    if (this.socket) {
      console.log('end turn');
      this.socket.emit('action', Number(-1));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
