<template>
  <div class="bg-image d-flex align-end justify-center">
    <v-btn class="back-button" href="/">
      <v-icon start icon="mdi-arrow-left"></v-icon>
      Back
    </v-btn>

    <v-container class="button-container">
      <v-col>
        <v-btn class="play-button" style="width: 120px"> Play Card </v-btn>
      </v-col>

      <v-col>
        <v-btn class="draw-button" style="width: 120px"> Draw Card </v-btn>
      </v-col>
    </v-container>

    <div class="timer text-h3 font-weight-black">
      {{ countDown }}
    </div>

    <v-container class="cards">
      <v-row>
        <v-col cols="3">
          <v-card width="150" height="200" text="Deck"></v-card>
        </v-col>

        <v-col>
          <v-card width="150" height="200" text="Discard pile"></v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="hand">
      <v-row>
        <v-col v-for="card in cards" :key="card.id" cols="1">
          <v-card width="150" height="200">
            <v-card-title>{{ card.title }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'GameRoom',

  data() {
    return {
      countDown: 30,
      cards: [
        { id: 1, title: 'Defuse' },
        { id: 2, title: 'Attack' },
        { id: 3, title: 'Skip' },
        { id: 4, title: 'Nope' },
      ],
    };
  },

  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.countDown = 30;
      }
    },
  },
  created() {
    this.countDownTimer();
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url('@/assets/background/gameroom.jpg');
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 100%;
}

.back-button {
  margin-right: 92%;
  margin-bottom: 44.5%;
  position: absolute;
}

.button-container {
  margin-bottom: 1%;
  margin-left: 10%;
  position: absolute;
}

.timer {
  margin-bottom: 44%;
  margin-left: 94%;
  position: absolute;
}

.cards {
  margin-bottom: 18%;
  margin-left: 47%;
  position: absolute;
}

.hand {
  margin-bottom: 0.1%;
  margin-left: 40%;
  position: absolute;
}
</style>
