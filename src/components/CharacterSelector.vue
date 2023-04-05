<template>
  <v-card class="card-style character-selector">
    <v-card-title class="card-title-style">Select Character</v-card-title>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="6" sm="3">
          <v-card
            :class="{ 'character-card': true, selected: selectedCharacter === 1 }"
            @click="selectCharacter(1)"
          >
            <v-img :src="blackCatPlayer"></v-img>
          </v-card>
        </v-col>
        <v-col cols="6" sm="3">
          <v-card
            :class="{ 'character-card': true, selected: selectedCharacter === 2 }"
            @click="selectCharacter(2)"
          >
            <v-img :src="grayCatPlayer"></v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="6" sm="3">
          <v-card
            :class="{ 'character-card': true, selected: selectedCharacter === 3 }"
            @click="selectCharacter(3)"
          >
            <v-img :src="obCatPlayer"></v-img>
          </v-card>
        </v-col>
        <v-col cols="6" sm="3">
          <v-card
            :class="{ 'character-card': true, selected: selectedCharacter === 4 }"
            @click="selectCharacter(4)"
          >
            <v-img :src="orangeCatPlayer"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import BlackCatPlayer from '@/assets/images/players/BlackCatPlayer.jpeg';
import GrayCatPlayer from '@/assets/images/players/GrayCatPlayer.jpeg';
import OBCatPlayer from '@/assets/images/players/OBCatPlayer.jpeg';
import OrangeCatPlayer from '@/assets/images/players/OrangeCatPlayer.jpeg';

export default {
  data() {
    return {
      blackCatPlayer: BlackCatPlayer,
      grayCatPlayer: GrayCatPlayer,
      obCatPlayer: OBCatPlayer,
      orangeCatPlayer: OrangeCatPlayer,
      selectedCharacter: null,
    };
  },
  methods: {
    selectCharacter(character) {
      this.selectedCharacter = character;
      this.$emit('select-character', this.getSelectedCharacterSrc());
    },
    getSelectedCharacterSrc() {
      switch (this.selectedCharacter) {
        case 1:
          return this.blackCatPlayer;
        case 2:
          return this.grayCatPlayer;
        case 3:
          return this.obCatPlayer;
        case 4:
          return this.orangeCatPlayer;
        default:
          return null;
      }
    },
  },
};
</script>

<style scoped>
.card-style {
  padding: 0.1rem;
  background-color: #981515;
}

.card-title-style {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.character-selector {
  max-width: 400px;
}

.character-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
  cursor: pointer;
  border-radius: 60px;
  height: 80px;
  width: 80px;
  margin-right: 100px;
  margin-bottom: 10px;
  transition: border-color 0.2s ease-in-out;
}

.character-card.selected {
  border: 5px solid rgb(255, 0, 0);
}

.character-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.v-image__image {
  object-fit: contain;
}
</style>
