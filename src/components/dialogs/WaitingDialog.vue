<script setup lang="ts">
defineProps<{
  disableStart: boolean;
}>();
</script>

<template>
  <v-dialog v-model="openDialog" persistent width="auto">
    <v-card>
      <v-card-text class="text-center mx-3"> Waiting ... </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="disableStart" @click="start"> Start </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WaitingDialog',
  data() {
    return {
      openDialog: true,
    };
  },
  methods: {
    start() {
      this.$emit('start');
      this.openDialog = false;
    },
  },
});
</script>
