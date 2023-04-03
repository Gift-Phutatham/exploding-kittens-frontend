<template>
  <v-card class="card-style character-selector">
    <v-card-title class="card-title-style">Select Character</v-card-title>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="6" sm="3">
          <v-card class="character-card" @click="selectCharacter(1)">
            <v-img :src="blackCatPlayer"></v-img>
          </v-card>
        </v-col>
        <v-col cols="6" sm="3">
          <v-card class="character-card" @click="selectCharacter(2)">
            <v-img :src="grayCatPlayer"></v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="6" sm="3">
          <v-card class="character-card" @click="selectCharacter(3)">
            <v-img :src="obCatPlayer"></v-img>
          </v-card>
        </v-col>
        <v-col cols="6" sm="3">
          <v-card class="character-card" @click="selectCharacter(4)">
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
    };
  },
  methods: {
    selectCharacter(character) {
      // Implement character selection logic here
    },
  },
};
</script>

<style scoped>
.card-style {
  padding: 0.5rem;
}

.card-title-style {
  text-align: center;
  margin-bottom: 1.5rem;
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
  border-radius: 5px;
}

.character-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.v-image__image {
  object-fit: contain;
}

@media (max-width: 768px) {
  .character-card {
    height: 80px;
  }
}
</style>
