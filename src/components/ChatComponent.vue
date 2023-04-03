<template>
  <v-card class="mx-auto" max-width="250">
    <v-banner class="text-center text-subtitle-1 py-2"> Chat Box </v-banner>
    <v-card class="d-flex flex-column-reverse overflow-y-auto" height="300" variant="flat">
      <v-card-item class="text-justify text-caption">
        <div v-for="(chat, index) in chats" :key="index">
          <span class="font-weight-bold">{{ chat.name }}</span> :
          <div>{{ chat.message }}</div>
          <v-divider class="my-1" v-if="index != chats.length - 1"></v-divider>
        </div>
      </v-card-item>
    </v-card>
    <v-divider></v-divider>
    <v-form class="d-flex" @submit.prevent>
      <v-text-field
        v-model="message"
        label="Message"
        variant="solo"
        single-line
        hide-details
        density="compact"
        append-inner-icon="mdi-send"
        @click:append-inner="sendMessage"
      ></v-text-field>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatComponent',
  data: () => ({
    message: '',
    chats: [],
  }),
  methods: {
    sendMessage() {
      if (this.message) {
        console.log(this.message);
        this.message = '';
      }
    },
  },
});
</script>
