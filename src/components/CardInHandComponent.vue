<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <v-card width="150" height="200" :text="name"></v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardInHandComponent',
});
</script>
