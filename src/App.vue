<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  max-width: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}
</style>
