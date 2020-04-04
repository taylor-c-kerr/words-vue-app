<template>
    <div>
      <div>
        <div v-if="!isAddingWord">{{editedWord.name}}</div>
        <div v-if="isAddingWord">Enter a new word:</div>
        <input v-if="isAddingWord" placeholder="Enter a new word..." v-model="editedWord.name" v-on:change="checkIfEdited"/>
      </div>

      <div v-for="(def, i) in editedWord.definition" v-bind:key="'definition' + i">
        <div v-if="!isAddingWord && !isNewDefinition(i)">
          {{editedWord.definition[i].partOfSpeech}}
        </div>

        <div v-if="isNewDefinition(i)">
          <div>Choose a part of Speech</div>
          <select v-on:change="handlePartOfSpeechChange($event, i)" v-model="editedWord.definition[i].partOfSpeech">
            <option value="">--</option>
            <option v-for="(pos, index) in availablePartsOfSpeech" v-bind:value="pos" v-bind:key="pos + '-' + index">
              {{ pos }}
            </option>
          </select>
        </div>
        
        <div v-for="(entry, eI) in def.entries" v-bind:key="'definition' + i + 'entry' + eI">
          <div>{{eI + 1}}. <input v-model.lazy="editedWord.definition[i].entries[eI]" v-on:change="checkIfEdited" placeholder="Enter a new entry"/></div>
        </div>

        <button @click="addEntry($event, i)">New Entry</button>
      </div>

      <div>
        <button @click="addPartOfSpeech">Add Part of Speech</button>
      </div>

      <div>
        <button v-if="isWordEdited && !isAddingWord" @click="handleSubmit">UPDATE</button>
        <button v-if="isWordEdited && isAddingWord" @click="handleSubmit">ADD</button>
      </div>
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
      editedWord: {},
      isAddingWord: false,
      availablePartsOfSpeech: ['noun', 'verb', 'adjective', 'adverb', 'preposition'],
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if (!id) {
      this.initNewWord();
    }
    else {
      const word = await api.getWord(id);
      this.word = word.data;
      this.editedWord = cloneInitialWord(word.data);
    }
  },
  watch: {
    availablePartsOfSpeech: function (oldVal, newVal) {
      console.log(oldVal, newVal)
    }
  },
  methods: {
    checkIfEdited() {
      this.isWordEdited = !_.isEqual(this.word, this.editedWord);
    },
    async handleSubmit() {
      let validatedWord = validate.word(this.editedWord);
      if (this.isAddingWord) {
        await api.addWord(validatedWord)
      }
      else {
        await api.updateWord(validatedWord);
      }
    },
    initNewWord() {
      const word = {
        id: '',
        name: '',
        definition: [{partOfSpeech: '', entries: ['']}],
        category: []
      }
      this.word = word;
      this.editedWord = cloneInitialWord(word);
      this.isAddingWord = true;
    },
    handlePartOfSpeechChange(event, index) {
      const value = event.target.value;
      this.editedWord.definition[index].partOfSpeech = value;
    },
    addEntry(event, index) {
      this.editedWord.definition[index].entries.push('')
    },
    addPartOfSpeech() {
      this.editedWord.definition.push({partOfSpeech: '', entries: ['']})
    },
    isNewDefinition(index) {
      const initialDef = this.word.definition[index]
      const editedDef = this.editedWord.definition[index]
      if (!initialDef) return true;

      const noEntries = initialDef.entries.filter(entry => entry.trim() !== '');
      if (!noEntries.length) return true;

      const editedWordNoEntries = editedDef.entries.filter(entry => entry.trim() !== '');
      if (!editedWordNoEntries.length) return true;
    }
  }
    
}
</script>

<style lang="scss">

</style>
