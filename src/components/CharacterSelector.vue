<template>
  <v-card class="card-style character-selector">
    <v-card-title class="card-title-style">Select Character</v-card-title>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="6" sm="3">
          <v-card class="character-card" @click="selectCharacter(1)">
            <v-card-text class="character-text">1</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" sm="3">
          <v-card class="character-card" @click="selectCharacter(2)">
            <v-card-text class="character-text">2</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="6" sm="3">
          <v-card class="character-card" @click="selectCharacter(3)">
            <v-card-text class="character-text">3</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" sm="3">
          <v-card class="character-card" @click="selectCharacter(4)">
            <v-card-text class="character-text">4</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
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
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
  cursor: pointer;
}

.character-text {
  font-size: 24px;
  font-weight: bold;
}
</style>
