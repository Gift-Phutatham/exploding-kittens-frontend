<template>
  <v-card width="225">
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
    //     chats: [{
    //     name: "123213",
    //     message: "55513",
    // },{
    //     name: "123123",
    //     message: "sass",
    // },{
    //     name: "123123",
    //     message: "123312",
    // },{
    //     name: "123231",
    //     message: "123312",
    // },],
  }),
  methods: {
    sendMessage() {
      if (this.message) {
        console.log(this.message);
        this.submitMessageCallback(this.message);
        this.message = '';
      }
    },
  },
});
</script>
