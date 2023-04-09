<script setup lang="ts">
defineProps<{
  name: string;
  description: string;
  color: string;
}>();
</script>

<template>
  <v-card width="175" height="250">
    <v-container>
      <v-card height="216" variant="outlined" :color="color">
        <v-card-item>
          <div class="text-center text-grey-darken-3 my-3">
            <div class="text-subtitle-1">
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
