<template>
  <div class="bg-image">
    <button class="button">Create/Join</button>
  </div>
</template>

<script lang="ts">
// import { router } from '../main'

export default {
  name: 'HomePage',
  data() {
    return {};
  },
  methods: {
    // gotopage() {
    //   router.push('/about')
    // }
  },
};
</script>

<style scoped>
/*
  body {
    /* background-color: red;
    background: url('@/assets/background/homepage.png'); 
    background-repeat: no-repeat;
    padding: 0px;
    margin: 0px;
    background-size: cover;
    background-position: center;
    flex: auto;

    background-image: url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg');
    width: 100%;
    height: 100px;

  }
  */

.bg-image {
  background-image: url('@/assets/background/homepage.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  padding: 0px 2.8px;
  margin: 0px 32px;
  height: 100vh;
  width: 1200px;
}

.button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-25%, 360%);
  padding: 12px 24px;
  background-color: blueviolet;
  color: #fff;
  font-size: 1.2rem;
  border: black;
  border-radius: 4px;
}
</style>
