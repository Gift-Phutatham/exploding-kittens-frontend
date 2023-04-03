<template>
  <div>
    <h1>Create Room</h1>
    <label for="name">Name:</label>
    <input type="text" id="name" v-model="name" required />
    <label for="roomId">Room ID:</label>
    <input type="text" id="roomId" v-model="roomId" required />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      roomId: '',
    };
  },
  watch: {
    name(newName) {
      this.$emit('create-room', { name: newName, roomId: this.roomId });
    },
    roomId(newRoomId) {
      this.$emit('create-room', { name: this.name, roomId: newRoomId });
    },
  },
};
</script>
