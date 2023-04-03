<template>
  <v-card class="mx-auto overflow-y-auto" height="400" max-width="250">
    <v-banner class="text-center text-subtitle-1 py-2 banner" sticky> Game Log </v-banner>
    <v-card-item class="text-justify text-caption">
      <div class="my-1" v-for="(message, index) in messages" :key="index">
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

<style scoped>
.banner {
  z-index: 1;
}
</style>
