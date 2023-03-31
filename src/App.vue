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
      topThreeCards: ['Defuse', 'Defuse', 'Defuse'],
    };
  },
  mounted() {
    this.allCards = allCardsJson;
  },
};
</script>
