<template>
  <v-container class="">
    <CreateRoom />
    <CharacterSelector />
  </v-container>
</template>

<script>
import CreateRoom from '@/components/CreateRoomBox.vue';
import CharacterSelector from '@/components/CharacterSelector.vue';

export default {
  components: {
    CreateRoom,
    CharacterSelector,
  },
};
</script>
