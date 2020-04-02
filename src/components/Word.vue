<template>
    <div>
      <div>{{word.name}}</div>
      <div v-for="(def, i) in word.definition" v-bind:key="'definition' + i">
        {{def.partOfSpeech}}
        <div v-for="(entry, eI) in def.entries" v-bind:key="'definition' + i + 'entry' + eI">
          <input v-model.lazy="editedWord.definition[i].entries[eI]" v-on:change="checkIfEdited"/>
        </div>
      </div>
    <button v-if="isWordEdited" v-on:click="handleSubmit">UPDATE</button>
    <div v-if="!word.name">ADDING WORD</div>
    </div>
</template>

<script>
import api from '../services/api'
import _ from 'lodash'
import validate from '../services/validate'

const cloneInitialWord = (word) => {
      const clonedWord = {
        name: word.name,
        id: word.id,
        category: [],
        definition: [],
      }
      const clonedCat = [];
      const clonedDef = [];
      word.category.map(cat => {
        clonedCat.push(cat);
      })
      word.definition.map(def => {
        const newDef = {partOfSpeech: def.partOfSpeech, entries: []};
        def.entries.map(entry => {
          newDef.entries.push(entry);
        })
        clonedDef.push(newDef);
      })

      clonedWord.category = clonedCat;
      clonedWord.definition = clonedDef;
      return clonedWord;
    }

export default {
  name: 'Word',
  props: {},
  data() {
    return {
      word: {},
      isWordEdited: false,
      editedWord: {}
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    console.log(this.$route.params)
    const word = await api.getWord(id);
    this.word = word.data;
    this.editedWord = cloneInitialWord(word.data);
  },
  methods: {
    checkIfEdited() {
      this.isWordEdited = !_.isEqual(this.word, this.editedWord);
    },
    async handleSubmit() {
      let validatedWord = validate.word(this.editedWord);
      await api.updateWord(validatedWord);
    },
  }
    
}
</script>

<style lang="scss">

</style>
