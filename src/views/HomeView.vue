<template>
  <div class="bg-image d-flex align-end justify-center">
    <v-btn class="button" href="/CreateRoom">Create / Join Room</v-btn>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.bg-image {
  background-image: url('@/assets/background/homepage.png');
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 90%;
}

.button {
  margin-bottom: 110px;
}
</style>
