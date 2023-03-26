<template>
  <v-container class="center-content">
    <v-card class="card-style">
      <v-card-title class="card-title-style">Create Room</v-card-title>
      <v-form v-model="valid">
        <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
        <v-text-field v-model="roomId" :rules="roomIdRules" label="Room ID" required></v-text-field>
      </v-form>
      <v-card-actions class="center-content">
        <v-btn :disabled="!valid" color="primary">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 50 || 'Name must be less than 50 characters',
      ],
      roomId: '',
      roomIdRules: [
        (v) => !!v || 'Room ID is required',
        (v) => /^\w+$/.test(v) || 'Room ID can only contain letters, numbers, and underscores',
      ],
      valid: false,
    };
  },
};
</script>

<style scoped>
.center-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-style {
  padding: 2rem;
}

.card-title-style {
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
