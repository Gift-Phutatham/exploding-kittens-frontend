<script setup lang="ts">
defineProps<{
  name: string;
  description: string;
  color: string;
}>();
</script>

<template>
  <v-card class="mx-auto" max-width="200" height="297" variant="outlined">
    <v-container>
      <v-card height="256" variant="outlined" :color="color">
        <v-card-item>
          <div class="text-center text-grey-darken-3 my-10">
            <div class="text-h6">
              {{ name }}
            </div>
            <v-divider class="border-opacity-100 my-5" :color="color"></v-divider>
            <div class="text-caption">
              {{ description }}
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardComponent',
});
</script>
