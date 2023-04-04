<template>
  <div class="bg-image d-flex justify-center">
    <v-row>
      <v-col cols="10">
        <div class="d-flex flex-column h-100">
          <v-row class="d-flex justify-center align-end">
            <DrawPileComponent></DrawPileComponent>
            <CardComponent
              class="ml-3"
              :name="latestCard"
              :description="allCards[latestCard].description"
              :color="allCards[latestCard].color"
            ></CardComponent>
          </v-row>
          <v-row class="d-flex justify-center align-end">
            <v-col cols="1" v-for="card in cards" :key="card">
              <CardComponent
                :name="card"
                :description="allCards[card].description"
                :color="allCards[card].color"
              ></CardComponent>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col class="d-flex flex-column justify-space-evenly" cols="2">
        <ChatComponent></ChatComponent>
        <LogComponent></LogComponent>
      </v-col>
    </v-row>
    <v-bottom-navigation>
      <PlayButton></PlayButton>
      <EndTurnButton></EndTurnButton>
      <ReturnToHomePageButton></ReturnToHomePageButton>
    </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
import allCardsJson from '@/components/allCards.json';
import LogComponent from '@/components/LogComponent.vue';
import ChatComponent from '@/components/ChatComponent.vue';
import CardComponent from '@/components/CardComponent.vue';
import PlayButton from '@/components/buttons/PlayButton.vue';
import EndTurnButton from '@/components/buttons/EndTurnButton.vue';
import DrawPileComponent from '@/components/DrawPileComponent.vue';
import ReturnToHomePageButton from '@/components/buttons/ReturnToHomePageButton.vue';

export default {
  name: 'GameRoom',

  components: {
    PlayButton,
    LogComponent,
    EndTurnButton,
    ChatComponent,
    CardComponent,
    DrawPileComponent,
    ReturnToHomePageButton,
  },

  data() {
    return {
      allCards: {},
      countDown: 30,
      latestCard: 'See the Future',
      cards: ['Defuse', 'Attack', 'Skip', 'Nope', 'See the Future', 'Defuse', 'Attack', 'Skip'],
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
    this.allCards = allCardsJson;
    this.countDownTimer();
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url('@/assets/background/gameroom.jpg');
}
</style>
