<template>
  <v-container>
    <v-col class="text-center">
      <v-form @submit.prevent="startGame">
        <v-text-field label="Name *" v-model="name"></v-text-field>
        <v-text-field label="Game ID *" v-model="gameId"></v-text-field>
        <v-btn type="submit"> Start the Game </v-btn>
      </v-form>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SocketioService from '../services/socketio.service.js';

export default defineComponent({
  name: 'HomeComponent',
  data() {
    return {
      name: '',
      gameId: '',
    };
  },
  methods: {
    startGame() {
      SocketioService.startGame({
        name: this.name,
        gameId: this.gameId,
      });
      this.name = '';
      this.gameId = '';
    },
  },
});
</script>
