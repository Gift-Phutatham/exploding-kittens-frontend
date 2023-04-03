<template>
  <div>
    <p>Name: {{ name }}</p>
    <p>Room ID: {{ roomId }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    roomId: String,
  },
};
</script>
