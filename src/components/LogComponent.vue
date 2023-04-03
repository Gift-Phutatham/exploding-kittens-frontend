<template>
  <v-card class="mx-auto" max-width="250">
    <v-banner class="text-center text-subtitle-1 py-2"> Game Log </v-banner>
    <v-card class="d-flex flex-column-reverse overflow-y-auto" height="300">
      <v-card-item class="text-justify text-caption">
        <div v-for="(log, index) in logs" :key="index">
          {{ log }}
          <v-divider class="my-1" v-if="index != logs.length - 1"></v-divider>
        </div>
      </v-card-item>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LogComponent',
  data: () => ({
    logs: [],
  }),
});
</script>
