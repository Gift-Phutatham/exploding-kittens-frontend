<template>
  <v-app>
    <v-main>
      <CreateRoom></CreateRoom>
      <!-- <Demo></Demo> -->
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import Home from './views/HomeView.vue';
import CreateRoom from './views/CreateRoomView.vue';

export default defineComponent({
  name: 'App',

  components: {
    // Home,
    CreateRoom,
  },

  data() {
    return {
      //
    };
  },
});
</script>
