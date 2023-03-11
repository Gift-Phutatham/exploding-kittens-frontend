<template>
    <div class="App">
      <form @submit.prevent="submitToken">
        <input type="text" placeholder="user" v-model="inputNameText" />
        <input type="text" placeholder="roomID" v-model="inputRoomText" />
        <button type="submit">Submit</button>
      </form>
      <div class="players">
        <div class="player">
          <h1> Player {{users.length}}/4</h1>
          <div v-for="user in users" :key="user">
            {{user}}
          </div>
        </div>
        </div>
      <div class="box">
        <div class="messages">
          <div v-for="user in messages" :key="user.name">
            {{user.name}}: {{user.message}}
          </div>
        </div>
        <div class="messages"></div>
        <form class="input-div" @submit.prevent="submitMessage">
          <input type="text" placeholder="Type in text" v-model="inputMessageText" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>

  import SocketioService from '../services/socketio.service.js';
  
  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        token: '',
        inputMessageText: '',
        inputNameText: '',
        inputRoomText: '',
        messages: [],
        users: [],
      };
    },
    methods: {
      submitToken() { 
        SocketioService.setupSocketConnection({name: this.inputNameText, roomID: this.inputRoomText});
        SocketioService.subscribeToMessages(this.inputRoomText, (err, data) => {
          console.log(data);
          this.messages.push(data);
        });
        SocketioService.subscribeToRoom(this.inputRoomText, (err, data) => {
            this.users = data;
            console.log(this.users);
        });
      },
      submitMessage() {
        console.log(this.inputRoomText);
        const CHAT_ROOM = this.inputRoomText;
        const message = this.inputMessageText;
        SocketioService.sendMessage({message, roomID: CHAT_ROOM}, cb => {

          console.log(cb);
          this.messages.push({
            message,
            name: this.inputNameText 
          });
          // clear the input after the message is sent
          this.inputMessageText = '';
        });
      }
    },
    beforeUnmount() {
      SocketioService.disconnect();
    }
  }
  </script>
  
  <style>
  .App {
    padding: 1rem;
  }
  
  .box {
    width: fit-content;
    height: 400px;
    border: solid 1px #000;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }
  
  .messages {
    flex-grow: 1;
  }
  
  .input-div {
    display: flex;
    width: 100%;
  }
  </style>
  