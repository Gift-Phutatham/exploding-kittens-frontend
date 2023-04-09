<template>
  <div class="bg-image d-flex align-end justify-center">
    <div class="create-room-wrapper">
      <CreateRoomBox @create-room="onCreateRoom" :disable-create-button="!isCreateButtonEnabled" />
      <WaitingDialog
        v-if="showWaitingDialog"
        :disableStart="users.length != 4"
        @start="startGame"
      ></WaitingDialog>
    </div>
  </div>
</template>

<script>
import CreateRoomBox from '@/components/CreateRoomBox.vue';
import WaitingDialog from '@/components/dialogs/WaitingDialog.vue';
import SocketioService from '@/services/socketio.service.ts';

export default {
  components: {
    CreateRoomBox,
    WaitingDialog,
  },
  data() {
    return {
      name: '',
      roomId: '',
      showWaitingDialog: false,
      selectedCharacterSrc: null,
      isCreateButtonEnabled: false,
      users: [],
    };
  },
  methods: {
    onCreateRoom(roomData) {
      // Update the name and roomId data
      this.name = roomData.name;
      this.roomId = roomData.roomId;
      this.selectedCharacterSrc = roomData.selectedCharacterSrc;
      this.checkCreateButtonState();
      this.showWaitingDialog = true;

      // connecting to socket server
      SocketioService.setupSocketConnection({
        name: this.name,
        roomID: this.roomId,
      });
      SocketioService.subscribeToRoom(this.roomId, (data) => {
        this.users = data;
        console.log(this.users);
      });
    },
    startGame() {
      this.showWaitingDialog = false;
      SocketioService.startGame();
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
.create-room-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
