<template>
  <div class="words-container">
      <Tile
        v-for="word in words"
        v-bind:key="word.id"
        v-bind:initialWord="word"
      />
  </div>
</template>

<script>
import Tile from './Tile'
import axios from 'axios'

const getWords = async () => {
    const words = await axios.get('http://localhost:3000/words')
    return words.data;
}

export default {
  name: 'Home',
  props: {},
  components: {
      Tile
  },
  data() {
    return {
      words: []
    }
  },
  async mounted() {
      this.words = await getWords();
  }
}
</script>

<style lang="scss">
  .cell {
    color: red;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 50px;
}

  .words-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }
</style>
