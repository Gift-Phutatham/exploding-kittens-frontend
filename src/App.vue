<template>
  <v-app>
    <v-main>
      <HomeComponent />
      <!-- TODO: Pass socket to components(?) -->
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeComponent from './components/HomeComponent.vue';
import SocketioService from './services/socketio.service.js';

export default defineComponent({
  name: 'App',
  components: {
    HomeComponent,
  },
  created() {
    SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
});
</script>
