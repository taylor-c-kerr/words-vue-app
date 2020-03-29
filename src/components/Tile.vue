<template>
    <div class="tile" v-on:click="goToPage">
        <div class="name">{{word.name}}</div>
        <div v-for="(def, index) in word.definition" v-bind:key="word.def-index">
          <div class="partOfSpeech">{{def.partOfSpeech}}</div>
          <div
            v-for="(entry, eIndex) in def.entries"
            v-bind:key="def-index-entry-eIndex"
            class="entry"
          >
            {{eIndex + 1}}. {{entry}}
          </div>
        </div>
        <button>Delete</button>
    </div>
</template>

<script>

export default {
  name: 'Tile',
  props: {
      initialWord: {
          type: Object,
      },
  },
  methods: {
    goToPage() {
      const {id} = this.word;
      this.$router.push({ name: 'Word', params: { id: id } })
    }
  },
  data() {
    return {
      word: {}
    }
  },
  mounted() {
    this.word = this.initialWord;
  }
}
</script>

<style lang="scss">
  .tile {
    border: solid;
    border-color: black;
    border-radius: 30px;
    padding: 10px;
    margin: 10px;
    background: #f0f1f2;
    max-width: 30%;
    min-width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .definition {
      max-height: 144px;
      min-height: 144px;
      overflow: scroll;
    }

    &:hover {
      background: #a9bacb
    }

    .name {
      font-size: 30px;
      background: lightgrey;
      border-radius: 15px;
    }
  }

  .deletedTile {
    border: solid;
    border-color: red;
    border-radius: 30px;
    padding: 10px;
    margin: 10px;
    background: red;
  }
</style>
