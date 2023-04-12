<template>
  <v-card class="outer-card" width="225">
    <v-banner class="chat-banner text-center text-subtitle-1 py-2"> Chat Box </v-banner>
    <v-card class="d-flex flex-column-reverse overflow-y-auto" height="300" variant="flat">
      <v-card-item class="text-justify text-caption">
        <div v-for="(chat, index) in chats" :key="index">
          <span class="chat-name font-weight-bold">{{ chat.name }}</span> :
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
.outer-card {
  border: 6px solid #981515;
}

.chat-banner {
  background-color: #981515;
  color: #ffffff;
}

.chat-name {
  background-color: #981515;
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
