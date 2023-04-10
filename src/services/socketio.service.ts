import { io } from 'socket.io-client';

class SocketioService {
  [x: string]: any;
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

  subscribeToMessages(callback: any) {
    if (!this.socket) return true;
    this.socket.on('message', (msg: any) => {
      console.log('Room event received!');
      return callback(msg);
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

  subscribeToGameLog(callback: any) {
    if (!this.socket) return true;
    this.socket.on('game log', (msg: any) => {
      return callback(msg);
    });
  }

  sendMessage(message: any) {
    if (this.socket) this.socket.emit('message', message);
  }

  startGame() {
    if (this.socket) this.socket.emit('game loop');
  }

  playCard(cardIndex: number) {
    if (this.socket) {
      this.socket.emit('action', cardIndex);
    }
  }

  endTurn() {
    this.playCard(-1);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
