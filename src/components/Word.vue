<template>
    <div>
      <div>{{word.name}}</div>
      <div v-for="(def, i) in word.definition" v-bind:key="def-i">
        {{def.partOfSpeech}}
        <div v-for="(entry, eI) in def.entries" :key="def-i-entry-eI">
          <input v-model.lazy="editedWord.definition[i].entries[eI]" v-on:input="checkIfEdited"/>
        </div>
      </div>
      isWordEdited: {{isWordEdited}}
    </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
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
    const word = await axios.get(`http://localhost:3000/words/${id}`);
    this.word = word.data;
    this.editedWord = cloneInitialWord(word.data);
    // console.log(cloneInitialWord)
    // console.log(_.isEqual(this.word, this.editedWord))
  },
  methods: {
    checkIfEdited() {
      console.log('checking');
      this.isWordEdited = _.isEqual(this.word, this.editedWord);
    }
  }
    
}
</script>

<style lang="scss">

</style>