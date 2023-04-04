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
          <v-row class="d-flex justify-center align-end mb-4">
            <v-col cols="1" v-for="(card, index) in cardsInHand" :key="index">
              <CardComponent
                :disabled="hasDied"
                :name="card"
                :description="allCards[card].description"
                :color="allCards[card].color"
                @click="selectCard(index)"
                :class="index === selectedIndex ? 'selected-card' : ''"
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
    <v-bottom-navigation grow>
      <EndTurnButton :disabled="hasDied"></EndTurnButton>
      <PlayButton :disabled="hasDied" @click="playCard"></PlayButton>
      <ReturnToHomePageButton></ReturnToHomePageButton>
    </v-bottom-navigation>
  </div>
  <AttackDialog v-if="showAttackDialog" :card="attackCard" @attack="getAttackValue"></AttackDialog>
  <FavorDialog
    v-if="showFavorDialog"
    :card="favorCard"
    :players="players"
    @favor="getFavorValue"
  ></FavorDialog>
  <SeeTheFutureDialog
    v-if="showSeeTheFutureDialog"
    :topThreeCards="topThreeCards"
  ></SeeTheFutureDialog>
</template>

<script lang="ts">
import allCardsJson from '@/components/allCards.json';
import LogComponent from '@/components/LogComponent.vue';
import ChatComponent from '@/components/ChatComponent.vue';
import CardComponent from '@/components/CardComponent.vue';
import PlayButton from '@/components/buttons/PlayButton.vue';
import FavorDialog from '@/components/dialogs/FavorDialog.vue';
import AttackDialog from '@/components/dialogs/AttackDialog.vue';
import EndTurnButton from '@/components/buttons/EndTurnButton.vue';
import DrawPileComponent from '@/components/DrawPileComponent.vue';
import SeeTheFutureDialog from '@/components/dialogs/SeeTheFutureDialog.vue';
import ReturnToHomePageButton from '@/components/buttons/ReturnToHomePageButton.vue';

export default {
  name: 'GameRoom',

  components: {
    PlayButton,
    FavorDialog,
    AttackDialog,
    LogComponent,
    EndTurnButton,
    ChatComponent,
    CardComponent,
    DrawPileComponent,
    SeeTheFutureDialog,
    ReturnToHomePageButton,
  },

  data() {
    return {
      hasDied: false,
      allCards: {},
      countDown: 30,
      selectedIndex: -1,
      latestCard: 'Defuse',
      cardsInHand: [
        'Defuse',
        'Attack',
        'Skip',
        'Nope',
        'See the Future',
        'Defuse',
        'Attack',
        'Skip',
        'Defuse',
        'Favor',
      ],

      showAttackDialog: false,
      attackCard: {
        Attack: allCardsJson['Attack'],
      },
      attackValue: '',

      showFavorDialog: false,
      favorCard: {
        Favor: allCardsJson['Favor'],
      },
      players: ['Player 1', 'Player 2', 'Player 3', 'Player 4'], // TOFIX
      favorValue: '',

      showSeeTheFutureDialog: false,
      topThreeCards: ['Exploding Kitten', 'Defuse', 'Attack'].reduce(
        (accumulator, value) => ({ ...accumulator, [value]: allCardsJson[value] }),
        {},
      ),
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
    selectCard(index: number) {
      this.selectedIndex = index;
    },
    act(card: string) {
      if (card === 'Favor') {
        this.showFavorDialog = true;
      } else if (card === 'See the Future') {
        this.showSeeTheFutureDialog = true;
      }
    },
    playCard() {
      if (this.selectedIndex !== -1) {
        this.act(this.cardsInHand[this.selectedIndex]);
        this.cardsInHand.splice(this.selectedIndex, 1);
        this.selectedIndex = -1;
      }
    },

    getAttackValue(value: string) {
      alert(value);
      if (value === 'stack') {
        const attackFirstIndex = this.cardsInHand.indexOf('Attack');
        this.cardsInHand.splice(attackFirstIndex, 1);
      }
      this.showAttackDialog = false;
    },
    getFavorValue(value: string) {
      alert(value);
      this.showFavorDialog = false;
    },
  },

  created() {
    this.allCards = allCardsJson;
    this.countDownTimer();

    if (this.latestCard === 'Attack' && this.cardsInHand.includes('Attack')) {
      this.showAttackDialog = true;
    }
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url('@/assets/background/gameroom.jpg');
}

.selected-card {
  z-index: 1;
  border: medium solid #841618;
}
</style>
