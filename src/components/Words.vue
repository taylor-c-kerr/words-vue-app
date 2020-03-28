<template>
  <div> {{data}} </div>
</template>

<script>
/* import axios from 'axios'

const getWords = async () => {
    return await axios.get('localhost:3000/words')
} */

export default {
  name: 'Words',
  components: {
    // HelloWorld
  },
  data() {
    return {
      data: [
        'this', 'is', 'some', 'test', 'data'
      ]
    }
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
