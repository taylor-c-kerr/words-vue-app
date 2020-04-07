<template>
  <div id="app">
    <Header/>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/word">Add Word</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  components: {
    Header,
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0px 30px 30px;
  display: flex;
  flex-direction: column;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
