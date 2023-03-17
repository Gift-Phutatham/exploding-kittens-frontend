<template>
  <p>hi</p>
</template>

<style></style>

<script lang="ts">
import SocketioService from './services/socketio.service.js';

export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {},
  created() {
    SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
};
</script>
