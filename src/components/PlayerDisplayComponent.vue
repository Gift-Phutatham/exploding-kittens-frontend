<script setup lang="ts">
defineProps<{
  name: string;
  selectedCharacterSrc: string;
  diedPlayer: Array<string>;
}>();
</script>

<template>
  <v-card class="player-card" :disabled="diedPlayer.includes(name)">
    <v-avatar size="60">
      <v-img :src="selectedCharacterSrc"></v-img>
    </v-avatar>
    <span class="player-name">{{ name }}</span>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PlayerDisplayComponent',
});
</script>

<style scoped>
.player-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  width: 150px;
  border-width: 6px;
  border-color: #981515;
  border-radius: 20px;
}

.player-name {
  font-weight: bold;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #981515;
  padding: 3px 6px;
  border-radius: 9px;
  color: #ffffff;
}
</style>
