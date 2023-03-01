<template>
  <v-container>
    <v-col class="text-center">
      <v-text-field label="Name *" v-model="name"></v-text-field>
      <v-text-field label="Game ID *" v-model="gameId"></v-text-field>
      <v-btn @click="startGame"> Start the Game </v-btn>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SocketioService from '../services/socketio.service.js';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      name: '',
      gameId: '',
    };
  },
  methods: {
    startGame() {
      const body = {
        name: this.name,
        gameId: this.gameId,
      };
      SocketioService.startGame(body);
    },
  },
});
</script>
