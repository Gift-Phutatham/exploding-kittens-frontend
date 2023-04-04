<template>
  <div class="bg-image">
    <div class="container">
      <v-row>
        <v-col cols="10">
          <div class="d-flex justify-center align-start">
            <v-sheet> start </v-sheet>
          </div>
          <div class="d-flex justify-space-between align-center center">
            <v-sheet> justify-space-between 1 </v-sheet>
            <v-row class="d-flex justify-center align-end">
              <DrawPileComponent></DrawPileComponent>
              <CardComponent
                class="ml-3"
                :name="latestCard"
                :description="allCards[latestCard].description"
                :color="allCards[latestCard].color"
              ></CardComponent>
            </v-row>
            <v-sheet> justify-space-between 3 </v-sheet>
          </div>
          <div class="d-flex justify-center align-end">
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
          </div>
        </v-col>
        <v-col class="mt-3" cols="2">
          <ChatComponent></ChatComponent>
          <LogComponent class="mt-6"></LogComponent>
        </v-col>
      </v-row>
      <v-bottom-navigation grow>
        <EndTurnButton :disabled="hasDied" @click="endTurn"></EndTurnButton>
        <PlayButton :disabled="hasDied || selectedIndex == -1" @click="playCard"></PlayButton>
        <ReturnToHomePageButton></ReturnToHomePageButton>
      </v-bottom-navigation>
    </div>
  </div>
  <AttackDialog v-if="showAttackDialog" :card="attackCard" @attack="getAttackValue"></AttackDialog>
  <DefuseDialog v-if="showDefuseDialog" :card="defuseCard"></DefuseDialog>
  <ExplodingKittenDialog
    v-if="showExplodedDialog"
    :card="explodingKittenCard"
  ></ExplodingKittenDialog>
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
import allCardsJson from '@/assets/allCards.json';
import LogComponent from '@/components/LogComponent.vue';
import ChatComponent from '@/components/ChatComponent.vue';
import CardComponent from '@/components/CardComponent.vue';
import PlayButton from '@/components/buttons/PlayButton.vue';
import FavorDialog from '@/components/dialogs/FavorDialog.vue';
import AttackDialog from '@/components/dialogs/AttackDialog.vue';
import DefuseDialog from '@/components/dialogs/DefuseDialog.vue';
import EndTurnButton from '@/components/buttons/EndTurnButton.vue';
import DrawPileComponent from '@/components/DrawPileComponent.vue';
import SeeTheFutureDialog from '@/components/dialogs/SeeTheFutureDialog.vue';
import ExplodingKittenDialog from '@/components/dialogs/ExplodingKittenDialog.vue';
import ReturnToHomePageButton from '@/components/buttons/ReturnToHomePageButton.vue';

export default {
  name: 'GameRoom',

  components: {
    PlayButton,
    FavorDialog,
    AttackDialog,
    DefuseDialog,
    LogComponent,
    EndTurnButton,
    ChatComponent,
    CardComponent,
    DrawPileComponent,
    SeeTheFutureDialog,
    ExplodingKittenDialog,
    ReturnToHomePageButton,
  },

  data() {
    return {
      hasDied: false,
      allCards: {},
      countDown: 30,
      selectedIndex: -1,
      latestCard: 'See the Future', // TOFIX
      toDrawCard: 'Exploded Kitten', // TOFIX
      cardsInHand: [
        // TOFIX
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

      showDefuseDialog: false,
      defuseCard: {
        Defuse: allCardsJson['Defuse'],
      },

      showExplodedDialog: false,
      explodingKittenCard: {
        'Exploding Kitten': allCardsJson['Exploding Kitten'],
      },

      showFavorDialog: false,
      favorCard: {
        Favor: allCardsJson['Favor'],
      },
      players: ['Player 1', 'Player 2', 'Player 3', 'Player 4'], // TOFIX
      favorValue: '',

      showSeeTheFutureDialog: false,
      topThreeCards: ['Exploding Kitten', 'Defuse', 'Attack'].reduce(
        // TOFIX
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
    endTurn() {
      this.selectedIndex = -1;
      if (this.toDrawCard === 'Exploded Kitten') {
        if (this.cardsInHand.includes('Defuse')) {
          this.showDefuseDialog = true;
          const defuseFirstIndex = this.cardsInHand.indexOf('Defuse');
          this.cardsInHand.splice(defuseFirstIndex, 1);
          this.latestCard = 'Defuse';
          this.toDrawCard = 'Attack'; // TOFIX
        } else {
          this.showExplodedDialog = true;
          this.hasDied = true;
          this.latestCard = 'Exploding Kitten';
          this.toDrawCard = 'Attack'; // TOFIX
        }
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

.container {
  margin: 8px;
}

.center {
  height: 65%;
}
</style>
