<script setup lang="ts">
defineProps<{
  topThreeCards: Object;
}>();
</script>

<template>
  <v-dialog v-model="openDialog" persistent scrollable width="750">
    <v-card>
      <v-toolbar height="80" :color="themeColor">
        <v-col class="d-flex justify-space-around">
          <v-icon icon="mdi-eye" size="55" color="white"></v-icon>
        </v-col>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              v-for="(card, key, index) in topThreeCards"
              :key="key"
              cols="12"
              xs="12"
              sm="12"
              md="4"
              lg="4"
            >
              <CardComponent :name="key" :description="card.description" :color="card.color">
              </CardComponent>
              <div class="d-none d-md-flex d-lg-flex d-xl-flex justify-center mt-3">
                <p v-if="index == 0">Top</p>
                <p v-if="index == Object.keys(topThreeCards).length - 1">Bottom</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="themeColor" @click="openDialog = false">Done</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardComponent from '../CardComponent.vue';

export default defineComponent({
  name: 'SeeTheFutureDialog',
  components: {
    CardComponent,
  },
  data() {
    return {
      openDialog: true,
      themeColor: '#EB217D',
    };
  },
});
</script>
