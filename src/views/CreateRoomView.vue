<template>
  <div class="bg-image d-flex align-end justify-center">
    <div class="create-room-wrapper">
      <CreateRoomBox @create-room="onCreateRoom" :disable-create-button="!isCreateButtonEnabled" />
    </div>
  </div>
</template>

<script>
import CreateRoomBox from '@/components/CreateRoomBox.vue';

export default {
  components: {
    CreateRoomBox,
  },
  data() {
    return {
      name: '',
      roomId: '',
      selectedCharacterSrc: null,
      isCreateButtonEnabled: false,
    };
  },
  methods: {
    onCreateRoom(roomData) {
      // Update the name and roomId data
      this.name = roomData.name;
      this.roomId = roomData.roomId;
      this.checkCreateButtonState();
    },
    createRoom() {
      // Create the room logic here
    },
    checkCreateButtonState() {
      this.isCreateButtonEnabled = !!this.name && !!this.roomId && !!this.selectedCharacterSrc;
    },
  },
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

.create-room-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
>
