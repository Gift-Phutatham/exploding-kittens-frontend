<template>
  <v-dialog v-model="openDialog" width="500">
    <v-card>
      <v-toolbar height="80" :color="themeColor">
        <v-col class="d-flex justify-space-around">
          <v-icon icon="mdi-cat" size="55" color="white"></v-icon>
        </v-col>
      </v-toolbar>
      <v-card-text class="text-center mx-3 my-8">
        Please choose <span class="font-weight-bold">any 2 matching Cat Cards</span>
        <br />
        to steal a random card from other player.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="themeColor" @click="openDialog = false"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TwoOfAKindInvalidDialog',
  data() {
    return {
      openDialog: true,
      themeColor: '#A6A6A6',
    };
  },
});
</script>
