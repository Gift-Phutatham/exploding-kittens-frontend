<template>
  <!-- <HomeComponent /> -->
  <HomePageComponent />
  <!-- TODO: Pass socket to components(?) -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import HomeComponent from './components/HomeComponent.vue';
import HomePageComponent from './components/HomePageComponent.vue';
// import SocketioService from './services/socketio.service.js';
export default defineComponent({
  name: 'App',
  components: {
    HomePageComponent,
  },
  // created() {
  //   SocketioService.setupSocketConnection();
  // },
  // beforeUnmount() {
  //   SocketioService.disconnect();
  // },
});
</script>
