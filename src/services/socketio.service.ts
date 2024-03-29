import { io } from 'socket.io-client';

class SocketioService {
  [x: string]: any;
  socket: any;
  constructor() {}

  setupSocketConnection(token: any) {
    this.socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', {
      auth: {
        token,
      },
    });
  }

  subscribeToMessages(callback: any) {
    if (!this.socket) return true;
    this.socket.on('message', (msg: any) => {
      return callback(msg);
    });
  }

  subscribeToRoom(roomID: string, callback: any) {
    if (!this.socket) return true;
    this.socket.emit('join room', roomID); // Join the specific room
    this.socket.on('join room', (msg: any) => {
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

  subscribeToNope(callback: any) {
    if (!this.socket) return true;
    this.socket.on('after nope', (msg: any) => {
      return callback(msg);
    });
  }

  subscribeToSeeFuture(callback: any) {
    if (!this.socket) return true;
    this.socket.on('see future', (msg: any) => {
      return callback(msg);
    });
  }

  subscribeToRandomCard(callback: any) {
    if (!this.socket) return true;
    this.socket.on('random card', (msg: any) => {
      return callback(msg);
    });
  }

  subscribeToTimer(callback: any) {
    if (!this.socket) return true;
    this.socket.on('timer', (msg: any) => {
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

  playNope(name: string) {
    this.socket.emit('nope', name);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
