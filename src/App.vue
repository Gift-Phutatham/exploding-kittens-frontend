<template>
  <RandomCardDialog></RandomCardDialog>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import RandomCardDialog from '@/components/dialogs/RandomCardDialog.vue';

export default {
  name: 'App',
  components: {
    RandomCardDialog,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.bg-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 90%;
}
</style>

<!-- <template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style>
.bg-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 90%;
}
</style> -->
