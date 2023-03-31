<template>
  <SeeTheFutureDialog :topThreeCards="topThreeCards"></SeeTheFutureDialog>
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
      topThreeCards: ['Exploding Kitten', 'Defuse', 'Attack'].reduce(
        (accumulator, value) => ({ ...accumulator, [value]: allCardsJson[value] }),
        {},
      ),
    };
  },
};
</script>
