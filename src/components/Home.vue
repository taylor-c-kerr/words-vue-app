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
      originalWords: [],
      isLoading: true,
      isError: false,
      filterData: {},
      filteredWords: []
    }
  },
  computed: {
    words: function() {
      const hasFilterData = Object.keys(this.filterData).length > 0;
      return hasFilterData ? this.filteredWords : this.originalWords;
    },
  },
  async mounted() {
    try {
      const words = await api.getWords();
      this.originalWords = words.data
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
      this.filterData = event;
      const filters = Object.keys(this.filterData);
      this.filteredWords = this.originalWords.filter(word => {
        return filters.every(filter => {
          const inputValue = event[filter];   // this is what you are typing in the box
          const wordValue = word[filter];     // value of the filter key that is provided.  ie "FOX" if filter is "name" {name : "FOX"}
          const isArray= Array.isArray(wordValue);
          if (isArray) {
            return wordValue.some(element => element.includes(inputValue));
          } else if (typeof wordValue === 'string') {
            return wordValue.includes(inputValue);
          }
        })
      })
    },
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
