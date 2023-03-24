<template>
  <v-app>
    <v-main>
      <Home></Home>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from './views/HomeView.vue';

export default defineComponent({
  name: 'App',

  components: {
    Home,
  },

  data() {
    return {
      //
    };
  },
});
</script>
