<template>
  <div class="bg-image">
    <div v-if="showCreateRoom" class="create-room-wrapper">
      <CreateRoomBox @create-room="onCreateRoom" :disable-create-button="!isCreateButtonEnabled" />
      <WaitingDialog
        v-if="showWaitingDialog"
        :disableStart="users.length != 4"
        @start="startGame"
      ></WaitingDialog>
    </div>

    <div v-else class="container">
      <v-row>
        <v-col cols="10">
          <v-row>
            <v-col class="d-flex justify-start" cols="auto">
              <TimerComponent :initialTime="30"></TimerComponent>
            </v-col>
            <v-col class="d-flex justify-center">
              <PlayerDisplay
                :name="playerName1"
                :selectedCharacterSrc="selectedCharacter1"
              ></PlayerDisplay>
            </v-col>
          </v-row>
          <div class="d-flex justify-space-between align-center center">
            <PlayerDisplay
              :name="playerName2"
              :selectedCharacterSrc="selectedCharacter2"
            ></PlayerDisplay>
            <v-row class="d-flex justify-center align-end">
              <DrawPileComponent></DrawPileComponent>
              <CardComponent
                class="ml-3"
                :name="latestCard"
                :description="allCards[latestCard].description"
                :color="allCards[latestCard].color"
              ></CardComponent>
            </v-row>
            <PlayerDisplay
              :name="playerName3"
              :selectedCharacterSrc="selectedCharacter3"
            ></PlayerDisplay>
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
        <PlayTwoOfAKindButton
          :disabled="hasDied || !hasTwoOfAKind"
          @click="playTwoOfAKind"
        ></PlayTwoOfAKindButton>
        <PlayButton
          :disabled="
            hasDied || selectedIndex == -1 || catCards.includes(cardsInHand[selectedIndex])
          "
          @click="playCard"
        ></PlayButton>
        <ReturnToHomePageButton></ReturnToHomePageButton>
      </v-bottom-navigation>
    </div>
  </div>
  <AttackDialog v-if="showAttackDialog" :card="attackCard" @attack="getAttackValue"></AttackDialog>
  <DefuseDialog
    v-if="showDefuseDialog"
    :card="defuseCard"
    @onClose="showDefuseDialog = false"
  ></DefuseDialog>
  <ExplodingKittenDialog
    v-if="showExplodedDialog"
    :card="explodingKittenCard"
    @onClose="showExplodedDialog = false"
  ></ExplodingKittenDialog>
  <RandomCardDialog
    v-if="showRandomCardDialog"
    :cardName="randomCardName"
    :card="randomCard"
    @onClose="showRandomCardDialog = false"
  ></RandomCardDialog>
  <SeeTheFutureDialog
    v-if="showSeeTheFutureDialog"
    :topThreeCards="topThreeCards"
    @onClose="showSeeTheFutureDialog = false"
  ></SeeTheFutureDialog>
</template>

<script lang="ts">
import CreateRoomBox from '@/components/CreateRoomBox.vue';
import WaitingDialog from '@/components/dialogs/WaitingDialog.vue';
import SocketioService from '@/services/socketio.service.ts';

import allCardsJson from '@/assets/allCards.json';
import LogComponent from '@/components/LogComponent.vue';
import ChatComponent from '@/components/ChatComponent.vue';
import CardComponent from '@/components/CardComponent.vue';
import PlayButton from '@/components/buttons/PlayButton.vue';
import TimerComponent from '@/components/TimerComponent.vue';
import AttackDialog from '@/components/dialogs/AttackDialog.vue';
import DefuseDialog from '@/components/dialogs/DefuseDialog.vue';
import EndTurnButton from '@/components/buttons/EndTurnButton.vue';
import DrawPileComponent from '@/components/DrawPileComponent.vue';
import PlayerDisplay from '@/components/PlayerDisplayComponent.vue';
import RandomCardDialog from '@/components/dialogs/RandomCardDialog.vue';
import SeeTheFutureDialog from '@/components/dialogs/SeeTheFutureDialog.vue';
import PlayTwoOfAKindButton from '@/components/buttons/PlayTwoOfAKindButton.vue';
import ExplodingKittenDialog from '@/components/dialogs/ExplodingKittenDialog.vue';
import ReturnToHomePageButton from '@/components/buttons/ReturnToHomePageButton.vue';

export default {
  name: 'GameRoom',

  components: {
    CreateRoomBox,
    WaitingDialog,

    PlayButton,
    LogComponent,
    AttackDialog,
    DefuseDialog,
    ChatComponent,
    CardComponent,
    EndTurnButton,
    PlayerDisplay,
    TimerComponent,
    RandomCardDialog,
    DrawPileComponent,
    SeeTheFutureDialog,
    PlayTwoOfAKindButton,
    ExplodingKittenDialog,
    ReturnToHomePageButton,
  },

  data() {
    return {
      showCreateRoom: true,
      name: '',
      roomId: '',
      showWaitingDialog: false,
      selectedCharacterSrc: null,
      isCreateButtonEnabled: false,
      users: [],

      hasDied: false,
      allCards: {},
      countDown: 30,
      selectedIndex: -1,
      latestCard: 'See the Future', // TOFIX
      toDrawCard: 'Exploded Kitten', // TOFIX
      cardsInHand: [
        // TOFIX
        'TacocaT',
        'TacocaT',
        'Cattermelon',
        'Cattermelon',
        'Skip',
        'Nope',
        'See the Future',
        'Favor',
        'Attack',
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

      hasTwoOfAKind: false,
      catCards: [
        'Cattermelon',
        'Beard Cat',
        'Hairly Potato Cat',
        'TacocaT',
        'Rainbow-Ral Phing Cat',
      ],
      showRandomCardDialog: false,
      randomCardName: '',
      randomCard: {},
      firstTwoOfAKind: '',

      showSeeTheFutureDialog: false,
      topThreeCards: ['Exploding Kitten', 'Defuse', 'Attack'].reduce(
        // TOFIX
        (accumulator, value) => ({ ...accumulator, [value]: allCardsJson[value] }),
        {},
      ),

      // TOFIX
      playerName1: 'hello 1',
      selectedCharacter1: 'src/assets/images/players/BlackCatPlayer.jpeg',
      playerName2: 'hello 2',
      selectedCharacter2: 'src/assets/images/players/GrayCatPlayer.jpeg',
      playerName3: 'hello 3',
      selectedCharacter3: 'src/assets/images/players/OBCatPlayer.jpeg',
    };
  },

  methods: {
    onCreateRoom(roomData: any) {
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
      SocketioService.subscribeToRoom(this.roomId, (data: any) => {
        this.users = data;
        console.log(this.users);
      });
    },
    startGame() {
      this.showWaitingDialog = false;
      SocketioService.startGame();
      this.showCreateRoom = false;
    },
    createRoom() {
      // Create the room logic here
    },
    checkCreateButtonState() {
      this.isCreateButtonEnabled = !!this.name && !!this.roomId && !!this.selectedCharacterSrc;
    },

    selectCard(index: number) {
      this.selectedIndex = index;
    },
    checkAttack() {
      if (this.latestCard === 'Attack' && this.cardsInHand.includes('Attack')) {
        this.showAttackDialog = true;
      }
    },
    checkTwoOfAKind() {
      const catCardsCounts = this.catCards.reduce(
        (a, catCard) => ({
          ...a,
          [catCard]: this.cardsInHand.filter((cardInHand) => cardInHand == catCard).length,
        }),
        {},
      );
      this.firstTwoOfAKind = this.catCards.find((catCard) => catCardsCounts[catCard] > 1) || '';
      this.hasTwoOfAKind = this.firstTwoOfAKind !== '';
    },
    act(card: string) {
      if (card === 'Favor') {
        this.randomCardName = 'Favor'; // TOFIX
        this.randomCard = {
          Favor: allCardsJson['Favor'], // TOFIX
        };
        this.showRandomCardDialog = true;
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
    playTwoOfAKind() {
      this.selectedIndex = -1;
      this.randomCardName = 'Defuse'; // TOFIX
      this.randomCard = {
        Defuse: allCardsJson['Defuse'], // TOFIX
      };
      this.showRandomCardDialog = true;
      for (let i = 0; i < 2; i++) {
        const catIndex = this.cardsInHand.indexOf(this.firstTwoOfAKind);
        this.cardsInHand.splice(catIndex, 1);
      }
      this.checkTwoOfAKind();
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
      if (value === 'stack') {
        const attackFirstIndex = this.cardsInHand.indexOf('Attack');
        this.cardsInHand.splice(attackFirstIndex, 1);
      }
      this.showAttackDialog = false;
    },
  },

  created() {
    this.allCards = allCardsJson;
    this.checkAttack();
    this.checkTwoOfAKind();
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
  height: 52.5%;
}
</style>
