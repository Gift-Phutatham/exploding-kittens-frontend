import { io } from 'socket.io-client';

class SocketioService {
  socket: any;
  constructor() {}

  setupSocketConnection(token: any) {
    this.socket = io('http://localhost:3000', {
      // TODO: Fix this hardcade port address
      auth: {
        token,
      },
    });
    console.log(`Connecting socket...`);
  }

  subscribeToMessages(roomID: string) {
    if (!this.socket) return true;
    this.socket.on('message', (msg: any) => {
      console.log('Room event received!');
    });
  }

  subscribeToRoom(roomID: string, callback: any) {
    if (!this.socket) return true;
    this.socket.emit('join room', roomID); // join the specific room
    this.socket.on('join room', (msg: any) => {
      console.log('Room event received!');
      return callback(msg);
    });
  }

  subscribeToGameState(callback: any) {
    if (!this.socket) return true;
    this.socket.on('game state', (msg: any) => {
      return callback(msg);
    });
  }

  sendMessage(message: any) {
    if (this.socket) this.socket.emit('message', message);
  }

  startGame() {
    if (this.socket) this.socket.emit('game loop');
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
