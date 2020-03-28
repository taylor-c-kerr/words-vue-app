<template>
    <div class="tile">
        <div class="name">{{name}}</div>
        <div v-for="(def, index) in definition" v-bind:key="def-index">
          <div>{{def.partOfSpeech}}</div>
          <div
            v-for="(entry, eIndex) in def.entries"
            v-bind:key="def-index-entry-eIndex"
            class="entry"
          >
            {{entry}}
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Tile',
  props: {
      name: {
          type: String,
          default: ''
      },
      definition: {
          type: Array,
        //   default: []
      },
      id: {
          type: String,
          default: ''
      },
      category: {
          type: Array,
        //   default: []
      }
  },
  components: {
  },
  data() {}
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
