<template>
  <v-card class="mx-auto overflow-y-auto" max-height="400" max-width="250">
    <v-banner class="text-center text-subtitle-1 py-2" sticky> Game Log </v-banner>
    <v-divider></v-divider>
    <v-card-item>
      <div class="text-justify text-caption my-1" v-for="(message, index) in messages" :key="index">
        {{ message }}
        <v-divider v-if="index != messages.length - 1"></v-divider>
      </div>
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LogComponent',
  data: () => ({
    messages: ['Exploding Kittens has started'],
  }),
});
</script>
