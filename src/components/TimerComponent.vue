<template>
  <div>
    <div class="display-1 text-center">{{ timeLeft }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TimerComponent',
  props: {
    initialTime: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      timeLeft: this.initialTime,
    };
  },
  mounted() {
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }, 1000);
  },
});
</script>
