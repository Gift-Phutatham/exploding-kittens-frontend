<template>
  <v-card width="175" height="250">
    <v-container>
      <v-card height="216" variant="outlined" color="#841618">
        <v-card-item
          class="d-flex align-center justify-center h-100 text-center text-grey-darken-3"
        >
          <v-img class="mb-1" width="75" :src="explodingKittens"></v-img>
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
import ExplodingKittens from '@/assets/images/ExplodingKittens.png';

export default defineComponent({
  name: 'DrawPileComponent',
  data() {
    return {
      explodingKittens: ExplodingKittens,
    };
  },
});
</script>
