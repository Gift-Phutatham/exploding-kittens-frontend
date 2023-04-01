<template>
  <AttackDialog :card="card"></AttackDialog>
</template>

<script>
import allCardsJson from './components/allCards.json';
import AttackDialog from './components/dialogs/AttackDialog.vue';

export default {
  name: 'App',
  components: {
    AttackDialog,
  },
  data() {
    return {
      card: {
        Attack: allCardsJson['Attack'],
      },
    };
  },
};
</script>
