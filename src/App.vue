<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Home/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Words from './components/Words.vue'
// import Tile from './components/Tile.vue'
import Home from './components/Home.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    // Words,
    // Tile,
    Home
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
