<script setup lang="ts">
defineProps<{
  card: Object;
}>();
</script>

<template>
  <v-dialog v-model="openDialog" persistent width="750">
    <v-card>
      <v-toolbar height="80" :color="card[cardName].color">
        <v-col class="d-flex justify-space-around">
          <v-icon icon="mdi-eye" size="55" color="white"></v-icon>
        </v-col>
      </v-toolbar>
      <v-card-text class="text-center mx-3">
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="5" lg="5" xl="5">
            <CardComponent
              :name="cardName"
              :description="card[cardName].description"
              :color="card[cardName].color"
            ></CardComponent>
          </v-col>
          <v-col
            class="d-flex align-center justify-center text-h6 font-weight-regular"
            cols="12"
            xs="12"
            sm="12"
            md="7"
            lg="7"
            xl="7"
          >
            <v-row class="text-justify">
              <div class="text-body-1">
                You have an Attack card! Please choose if you want to stack the card to the next
                player or draw.
              </div>
              <v-radio-group class="mt-3" v-model="value" :color="card[cardName].color">
                <v-radio label="Stack the Attack card" value="stack"></v-radio>
                <v-radio label="Draw" value="draw"></v-radio>
              </v-radio-group>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="card[cardName].color" :disabled="!value" @click="openDialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardComponent from '../CardComponent.vue';

export default defineComponent({
  name: 'AttackDialog',
  components: {
    CardComponent,
  },
  data() {
    return {
      openDialog: true,
      cardName: 'Attack',
      value: '',
    };
  },
});
</script>
