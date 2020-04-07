<template>
  <div class="words-container">
      <LoadingIcon v-if="isLoading" />
      <Tile
        v-for="word in words"
        v-bind:key="word.id"
        v-bind:initialWord="word"
      />
  </div>
</template>

<script>
import Tile from './Tile'
import api from '../services/api'
import LoadingIcon from "./LoadingIcon";

export default {
  name: 'Home',
  props: {},
  components: {
      Tile,
      LoadingIcon
  },
  data() {
    return {
      words: [],
      isLoading: true,
      isError: false
    }
  },
  async mounted() {
    try {
      const words = await api.getWords();
      this.words = words.data
      this.isLoading = false;
    }
    catch (error) {
      console.error(error);
      this.isError = true;
    }
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
