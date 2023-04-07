<template>
  <v-card class="create-room-box">
    <v-card-title class="title-style">Create Room</v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="name" label="Name" required color="red"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="roomId" label="Room ID" required color="red"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <character-selector @select-character="handleSelectCharacter" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="ml-auto" :disabled="!isFormValid" color="secondary" dark @click="emitCreateRoom"
        >Create</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import CharacterSelector from '@/components/CharacterSelector.vue';

export default {
  name: 'CreateRoomBox',
  components: {
    CharacterSelector,
  },
  data() {
    return {
      name: '',
      roomId: '',
      selectedCharacterSrc: null,
      isFormValid: false,
    };
  },
  methods: {
    handleSelectCharacter(selectedCharacterSrc) {
      this.selectedCharacterSrc = selectedCharacterSrc;
    },
    emitCreateRoom() {
      const roomData = {
        name: this.name,
        roomId: this.roomId,
        selectedCharacterSrc: this.selectedCharacterSrc,
      };
      this.$emit('create-room', roomData);
    },
  },
  watch: {
    name(newValue) {
      this.isFormValid = Boolean(newValue && this.roomId && this.selectedCharacterSrc);
    },
    roomId(newValue) {
      this.isFormValid = Boolean(newValue && this.name && this.selectedCharacterSrc);
    },
    selectedCharacterSrc(newValue) {
      this.isFormValid = Boolean(newValue && this.name && this.roomId);
    },
  },
};
</script>

<style scoped>
.create-room-box {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #4e1515;
  color: #ffffff;
}

.title-style {
  background-color: #981515;
  color: #ffffff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-style {
  padding: 0.1rem;
}

.character-selector {
  max-width: 400px;
}

.character-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ad0a0a;
  cursor: pointer;
  border-radius: 60px;
  height: 80px;
  width: 80px;
  margin-right: 100px;
  margin-bottom: 10px;
  transition: border-color 0.2s ease-in-out;
}

.v-image__image {
  object-fit: contain;
}
</style>
