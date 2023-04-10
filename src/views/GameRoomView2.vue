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
                :diedPlayer="diedPlayer"
              ></PlayerDisplay>
            </v-col>
          </v-row>
          <div class="d-flex justify-space-between align-center center">
            <PlayerDisplay
              :name="playerName2"
              :selectedCharacterSrc="selectedCharacter2"
              :diedPlayer="diedPlayer"
            ></PlayerDisplay>
            <v-row class="d-flex justify-center align-end">
              <DrawPileComponent></DrawPileComponent>
              <CardComponent
                v-if="latestCard"
                class="ml-3"
                :name="latestCard"
                :description="allCards[latestCard].description"
                :color="allCards[latestCard].color"
              ></CardComponent>
            </v-row>
            <PlayerDisplay
              :name="playerName3"
              :selectedCharacterSrc="selectedCharacter3"
              :diedPlayer="diedPlayer"
            ></PlayerDisplay>
          </div>
          <div class="d-flex justify-center align-end">
            <v-col cols="1" v-for="(card, index) in cardsInHand" :key="index">
              <CardComponent
                :disabled="hasDied || wrongTurn || waitingForNope"
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
          <ChatComponent :submitMessageCallback="submitMessage" :chats="chats"></ChatComponent>
          <LogComponent class="mt-6" :logs="gameLogs"></LogComponent>
        </v-col>
      </v-row>
      <v-bottom-navigation grow>
        <EndTurnButton
          :disabled="hasDied || wrongTurn || waitingForNope"
          @click="endTurn"
        ></EndTurnButton>
        <PlayTwoOfAKindButton
          :disabled="hasDied || !hasTwoOfAKind || wrongTurn || waitingForNope"
          @click="playTwoOfAKind"
        ></PlayTwoOfAKindButton>
        <PlayButton
          :disabled="
            hasDied ||
            selectedIndex == -1 ||
            catCards.includes(cardsInHand[selectedIndex]) ||
            wrongTurn ||
            waitingForNope
          "
          @click="playCard"
        ></PlayButton>
        <PlayNopeButton :disabled="hasDied || cannotPlayNope" @click="playNope"></PlayNopeButton>
        <ReturnToHomePageButton></ReturnToHomePageButton>
      </v-bottom-navigation>
    </div>
  </div>
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
import DefuseDialog from '@/components/dialogs/DefuseDialog.vue';
import EndTurnButton from '@/components/buttons/EndTurnButton.vue';
import DrawPileComponent from '@/components/DrawPileComponent.vue';
import PlayerDisplay from '@/components/PlayerDisplayComponent.vue';
import PlayNopeButton from '@/components/buttons/PlayNopeButton.vue';
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
    DefuseDialog,
    ChatComponent,
    CardComponent,
    EndTurnButton,
    PlayerDisplay,
    TimerComponent,
    PlayNopeButton,
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
      wrongTurn: true,
      cannotPlayNope: true,
      waitingForNope: false,
      allCards: {},
      countDown: 30,
      nopeTimeout: 5000,
      selectedIndex: -1,
      latestCard: '',
      toDrawCard: '',
      cardsInHand: [],
      diedPlayer: [],

      gameLogs: [],
      chats: [],

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
        'Hairy Potato Cat',
        'Tacocat',
        'Rainbow-Ralphing Cat',
        'Zombie Cat',
      ],
      showRandomCardDialog: false,
      firstTwoOfAKind: '',

      showSeeTheFutureDialog: false,
      topThreeCards: {},

      playerName1: '',
      selectedCharacter1: 'src/assets/images/players/BlackCatPlayer.jpeg',
      playerName2: '',
      selectedCharacter2: 'src/assets/images/players/GrayCatPlayer.jpeg',
      playerName3: '',
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
      });

      SocketioService.subscribeToMessages((msg: any) => {
        this.chats.push(msg);
      });

      SocketioService.subscribeToGameLog((msg: any) => {
        this.gameLogs.push(msg);
      });

      SocketioService.subscribeToGameState((state: any) => {
        console.log(state);

        const players = state.allPlayers
          .map((player: any) => player.name)
          .filter((player: any) => player !== this.name);
        this.playerName1 = players[0];
        this.playerName2 = players[1];
        this.playerName3 = players[2];
        this.diedPlayer = state.diedPlayer.map((players: any) => players.name);

        for (let i = 0; i < state.allPlayers.length; i++) {
          if (state.allPlayers[i].name === this.name) {
            this.cardsInHand = state.allPlayers[i].hand.map((card: any) => card.name);
            break;
          }
        }
        if (state.discardPile.length > 0) {
          this.latestCard = state.discardPile[state.discardPile.length - 1].name;
        }
        this.toDrawCard = state.deck.cards[0].name;
        this.topThreeCards = state.deck.cards
          .slice(0, 3)
          .map((card: any) => card.name)
          .reduce(
            (accumulator: any, value: any) => ({ ...accumulator, [value]: allCardsJson[value] }),
            {},
          );

        if (this.toDrawCard === 'Exploded Kitten') {
          if (this.cardsInHand.includes('Defuse')) {
            this.showDefuseDialog = true;
          } else {
            this.showExplodedDialog = true;
            this.hasDied = true;
          }
        }

        const catCardsCounts = this.catCards.reduce(
          (a, catCard) => ({
            ...a,
            [catCard]: this.cardsInHand.filter((cardInHand) => cardInHand == catCard).length,
          }),
          {},
        );
        this.firstTwoOfAKind = this.catCards.find((catCard) => catCardsCounts[catCard] > 1) || '';
        this.hasTwoOfAKind = this.firstTwoOfAKind !== '';

        if (this.name === state.currentPlayer.name) {
          this.wrongTurn = false;
          this.cannotPlayNope = true;
        } else {
          this.selectedIndex = -1;
          this.hasTwoOfAKind = false;
          this.wrongTurn = true;
        }

        this.showCreateRoom = false;
      });
    },
    startGame() {
      this.showWaitingDialog = false;
      SocketioService.startGame();
      this.showCreateRoom = false;
    },
    checkCreateButtonState() {
      this.isCreateButtonEnabled = !!this.name && !!this.roomId && !!this.selectedCharacterSrc;
    },

    selectCard(index: number) {
      this.selectedIndex = index;
    },
    checkNope() {
      if (this.cardsInHand.includes('Nope')) {
        this.cannotPlayNope = false;
        this.waitingForNope = true;
      }
    },
    playNope() {
      SocketioService.playNope();
    },
    act(card: string) {
      if (card === 'Favor') {
        this.showRandomCardDialog = true;
      } else if (card === 'See the Future') {
        this.showSeeTheFutureDialog = true;
      }
    },
    async playCard() {
      if (this.selectedIndex !== -1) {
        // this.checkNope();
        // await new Promise((resolve) => setTimeout(resolve, this.nopeTimeout));
        // this.cannotPlayNope = true;
        // this.waitingForNope = false;
        this.act(this.cardsInHand[this.selectedIndex]);
        SocketioService.playCard(this.selectedIndex);
        this.selectedIndex = -1;
      }
    },
    async playTwoOfAKind() {
      this.selectedIndex = -1;
      // this.checkNope();
      // await new Promise((resolve) => setTimeout(resolve, this.nopeTimeout));
      // this.cannotPlayNope = true;
      // this.waitingForNope = false;
      this.showRandomCardDialog = true;
      SocketioService.playCard(this.cardsInHand.indexOf(this.firstTwoOfAKind));
    },
    endTurn() {
      this.selectedIndex = -1;
      SocketioService.endTurn();
    },
    submitMessage(msg: string) {
      SocketioService.sendMessage(msg);
    },
  },

  created() {
    this.allCards = allCardsJson;
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
