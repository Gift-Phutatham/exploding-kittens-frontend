<template>
  <v-dialog v-model="openDialog" persistent width="750">
    <v-card>
      <v-toolbar height="80" :color="themeColor">
        <v-col class="d-flex justify-space-around">
          <v-icon icon="mdi-heart" size="55" color="white"></v-icon>
        </v-col>
      </v-toolbar>
      <v-card-text class="text-center mx-3">
        <v-row>
          <v-col class="d-flex align-center justify-center text-h6 font-weight-regular">
            You got a card from another player.
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="themeColor" @click="onClose"> Done </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RandomCardDialog',
  data() {
    return {
      openDialog: true,
      themeColor: '#232321',
    };
  },
  methods: {
    onClose() {
      this.$emit('onClose');
      this.openDialog = false;
    },
  },
});
</script>
