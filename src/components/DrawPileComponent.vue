<template>
  <v-card class="mx-auto" max-width="150" height="234" variant="outlined">
    <v-container>
      <v-card height="200" variant="outlined" color="#841618">
        <v-card-item
          class="d-flex align-center justify-center h-100 text-center text-grey-darken-3"
        >
          <v-img class="mb-1" width="75" src="./src/components/icons/ExplodingKittens.png"></v-img>
          Exploding
          <br />
          Kittens
        </v-card-item>
      </v-card>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DrawPileComponent',
});
</script>
