<template>
  <v-card class="mx-auto" max-width="250">
    <v-banner class="text-center text-subtitle-1 py-2"> Chat Box </v-banner>
    <v-card class="overflow-y-auto" height="300">
      <v-card-item class="text-justify text-caption">
        <div v-for="(chat, index) in chats" :key="index">
          <span class="font-weight-bold">{{ chat.name }}</span> :
          <div>{{ chat.message }}</div>
          <v-divider class="my-1" v-if="index != chats.length - 1"></v-divider>
        </div>
      </v-card-item>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatComponent',
  data: () => ({
    chats: [
      {
        name: 'Player 1 Player 1 Player 1 Player 1 Player 1 Player 1 Player 1',
        message: 'hello world hello world hello world hello world hello world hello world',
      },
      {
        name: 'Player 1',
        message: 'hello world',
      },
      {
        name: 'Player 1',
        message: 'hello world',
      },
      {
        name: 'Player 1',
        message: 'hello world',
      },
      {
        name: 'Player 1',
        message: 'hello world',
      },
      {
        name: 'Player 1',
        message: 'hello world',
      },
      {
        name: 'Player 1',
        message: 'hello world',
      },
      {
        name: 'Player 1',
        message: 'hello world',
      },
    ],
  }),
});
</script>
