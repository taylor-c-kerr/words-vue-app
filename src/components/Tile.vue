<template>
    <div class="tile" :class="{deleted: isDeleted}">
      <div class="name">{{word.name}}</div>
      <Definition :definition="word.definition" />
      <div class="buttons">
        <Button class="tile-button" @clicked="goToPage" type="edit"></Button>
        <Button v-if="!isDeleted" class="tile-button" @clicked="onDelete" type="delete"></Button>
        <Button v-if="isDeleted" class="tile-button" @clicked="addBack" type="undo"></Button>
      </div>
    </div>
</template>

<script>
import api from '../services/api'
import Button from './Button'
import Definition from './Definition'

export default {
  name: 'Tile',
    components: {
      Button,
      Definition
    },
  props: {
      initialWord: {
          type: Object,
      },
  },
  data() {
    return {
      word: {},
      isDeleted: false,
    }
  },
  methods: {
    goToPage() {
      const {id} = this.word;
      this.$router.push({ name: 'Word', params: { id: id } })
    },
    async onDelete() {
      const { name,id } = this.word;
      const confirm = window.confirm(`are you sure you want to delete ${name}?`);
      if (confirm) {
        await api.deleteWord(id);
        this.isDeleted = true;
      }
    },
    async addBack() {
      try {
        await api.addWord(this.word);
        this.isDeleted = false;
      }
      catch(error) {
        console.error('there was an error adding a word back')
      }
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
    border-color: #4e4e4e;
    border-radius: 30px;
    padding: 10px;
    margin: 10px;
    background: #f0f1f2;
    max-width: 30%;
    min-width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 144px;
    min-height: 144px;

    &:hover {
      background: #a9bacb
    }
    
    .name {
      font-size: 30px;
      background: lightgrey;
      border-radius: 15px;
    }

    &.deleted {
      background: #f78383;

      &:hover {
        background: #fb4343;
      }
    }

    .buttons {
      display: flex;
      flex-direction: row;
      align-self: flex-end;

      .tile-button{
        margin-right: 5px;
        &:hover {
          background: #f0f1f2;
          border-radius: 5px;
        }
        &:last-of-type {
          margin-right: 10px;
        }
      }
    }
  }

</style>
