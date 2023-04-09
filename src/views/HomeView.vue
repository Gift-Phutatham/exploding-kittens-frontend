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

<style>
.bg-image {
  background-image: url('@/assets/background/homepage.png');
}

.button {
  margin-bottom: 110px;
}
</style>
