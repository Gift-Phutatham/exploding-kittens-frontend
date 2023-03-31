<template>
  <SeeTheFutureDialog :allCards="allCards" :topThreeCards="topThreeCards"></SeeTheFutureDialog>
</template>

<script>
import allCardsJson from './components/allCards.json';
import SeeTheFutureDialog from './components/dialogs/SeeTheFutureDialog.vue';

export default {
  name: 'App',
  components: {
    SeeTheFutureDialog,
  },
  data() {
    return {
      allCards: {},
      // topThreeCards: {
      //   'Exploding Kitten': {
      //     description: 'Show this card immediately',
      //     color: '#312F27',
      //   },
      //   'Defuse': {
      //     description: 'Put your last drawn card back into the deck',
      //     color: '#98C243',
      //   },
      //   'Attack': {
      //     description:
      //       'End your turn without drawing a card. Force the next player to take two turns.',
      //     color: '#D48336',
      //   },
      // },
      topThreeCards: ['Exploding Kitten', 'Defuse', 'Attack'],
    };
  },
  mounted() {
    this.allCards = allCardsJson;
  },
};
</script>
