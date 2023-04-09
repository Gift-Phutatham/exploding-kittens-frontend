<script setup lang="ts">
defineProps<{
  cardName: string;
  card: Object;
}>();
</script>

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
          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4" class="d-flex justify-center">
            <CardComponent
              :name="cardName"
              :description="card[cardName].description"
              :color="card[cardName].color"
            >
            </CardComponent>
          </v-col>
          <v-col
            class="d-flex align-center justify-center text-h6 font-weight-regular"
            cols="12"
            xs="12"
            sm="12"
            md="8"
            lg="8"
            xl="8"
          >
            You got "{{ cardName }}" card from another player.
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
import CardComponent from '../CardComponent.vue';

export default defineComponent({
  name: 'RandomCardDialog',
  components: {
    CardComponent,
  },
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
