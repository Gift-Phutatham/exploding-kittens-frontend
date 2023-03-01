<script lang="ts">
import socketioService from './services/socketio.service.js';

export default {
  name: 'App',
  created() {
    socketioService.setupSocketConnection();
  },
};
</script>

<template>
  <main>
    <p>Hello World</p>
  </main>
</template>

<style></style>
