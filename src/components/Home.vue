<template>
  <div>
    <div v-for="word in words" v-bind:key="word.id">
        <Tile
            v-bind:name="word.name"
            v-bind:definition="word.definition"
            v-bind:id="word.id"
            v-bind:category="word.category"
        />
        
    </div>
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

<style>
</style>
