<template>
  <div>
    <CreateRoomBox @create-room="onCreateRoom" />
    <DisplayCharacter :name="name" :roomId="roomId" />
  </div>
</template>

<script>
import DisplayCharacter from '@/components/DisplayCharacter.vue';
import CreateRoomBox from '@/components/CreateRoomBox.vue';

export default {
  components: {
    DisplayCharacter,
    CreateRoomBox,
  },
  data() {
    return {
      name: '',
      roomId: '',
    };
  },
  methods: {
    onCreateRoom(roomData) {
      // Update the name and roomId data
      this.name = roomData.name;
      this.roomId = roomData.roomId;
    },
  },
};
</script>
