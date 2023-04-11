<template>
  <v-card width="350" class="chat-box">
    <v-banner class="text-center text-h5"> Chat Box </v-banner>
    <v-card class="d-flex flex-column-reverse overflow-y-auto" height="300" variant="outlined">
      <v-card-item class="text-justify text-subtitle-1">
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
        label="Type your message here"
        variant="outlined"
        single-line
        hide-details
        dense
        append-inner-icon="mdi-send"
        class="chat-box-text-field"
        @click:append-inner="sendMessage"
      ></v-text-field>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatComponent',
  props: {
    submitMessageCallback: {
      type: Function,
      required: true,
    },
    chats: {
      type: Array<any>,
      required: true,
    },
  },
  data: () => ({
    message: '',
  }),
  methods: {
    sendMessage() {
      if (this.message) {
        this.submitMessageCallback(this.message);
        this.message = '';
      }
    },
  },
});
</script>

<style scoped>
.chat-box {
  background-color: #943131;
  color: #fff;
  border: 6px solid #943131;
  font-family: 'Roboto', sans-serif;
}

.chat-box-text-field {
  background-color: #ffffff;
  color: #000000;
}

.v-card-item {
  padding: 0 15px 10px;
}

.v-banner {
  background-color: #981515;
  color: white;
  border: 6px solid #ffffff;
}
</style>
