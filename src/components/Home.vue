<template>
  <div>
      <LoadingIcon v-if="isLoading" />
      <Button type="add" text="Add New Word" @clicked="goToAddWord"/>
      <FilterBar @filter="handleFilter($event)"/>
      <div class="words-container">
        <Tile
          v-for="word in words"
          v-bind:key="word.id"
          v-bind:initialWord="word"
        />
      </div>
  </div>
</template>

<script>
import Tile from './Tile'
import api from '../services/api'
import LoadingIcon from './LoadingIcon';
import Button from './Button';
import FilterBar from './FilterBar';

export default {
  name: 'Home',
  props: {},
  components: {
      Tile,
      LoadingIcon,
      Button,
      FilterBar,
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
  },
  methods: {
    goToAddWord() {
      this.$router.push('/word');
    },
    handleFilter(event) {
      console.log(event);
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
