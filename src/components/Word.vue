<template>
    <div>
      <div class="word-name">
        <div v-if="!isAddingWord">{{editedWord.name}}</div>
        <div v-if="isAddingWord">Enter a new word:</div>
        <input v-if="isAddingWord" placeholder="Enter a new word..." v-model="editedWord.name" @input="onWordUpdate"/>
      </div>

      <div v-for="(def, i) in editedWord.definition" v-bind:key="'definition' + i" class="word-definition">
        <div v-if="!isAddingWord && !isNewDefinition(i)">
          {{editedWord.definition[i].partOfSpeech}}
        </div>
        <div v-if="isNewDefinition(i)">

          <PartOfSpeech
            v-bind:index="i"
            v-bind:used="usedPartsOfSpeech"
            @updated="handlePartOfSpeechChange($event)"
            />
            
        </div>
        
        <div v-for="(entry, eI) in def.entries" v-bind:key="'definition' + i + 'entry' + eI" class="definition-entries">
          <div class="entry">
            {{eI + 1}}. <input v-model="editedWord.definition[i].entries[eI]" @input="onWordUpdate" placeholder="Enter a new entry"/>
          </div>
        </div>

        <Button type="add" class="button-add-entry" text="New Entry" @clicked="addEntry($event, i)"></Button>
      </div>

        <Button type="add" v-if="canAddPos" text="Part of Speech" @clicked="addPartOfSpeech"></Button>

      <div>
        <button class="button-update" v-if="isWordEdited && !isAddingWord" @click="handleSubmit">UPDATE</button>
        <button class="button-add" v-if="isWordEdited && isAddingWord" @click="handleSubmit">ADD</button>
      </div>

    </div>
</template>

<script>
import api from '../services/api'
import _ from 'lodash'
import validate from '../services/validate'
import PartOfSpeech from './PartOfSpeech'
import Button from './Button'

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
  components: {
    PartOfSpeech,
    Button
  },
  props: {},
  data() {
    return {
      isLoading: true,
      isError: false,
      word: {},
      isWordEdited: false,
      editedWord: {},
      isAddingWord: false,
    }
  },
  computed: {
    usedPartsOfSpeech: function() {
      if (!this.editedWord) {
        return
      }
      return this.editedWord.definition.map(def => def.partOfSpeech).filter(def => def !== '')
    },
    availablePartsOfSpeech: function() {
      const partsOfSpeech = ['noun', 'verb', 'adjective', 'adverb', 'preposition'];
      return _.difference(partsOfSpeech, this.usedPartsOfSpeech);
    },
    canAddPos: function() {
      return this.availablePartsOfSpeech.length && this.editedWord.definition.length !== 5;
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
    this.isLoading = false;
  },
  methods: {
    onWordUpdate() {
      this.isWordEdited = !_.isEqual(this.word, this.editedWord);
    },
    async handleSubmit() {
      try {
        let validatedWord = validate.word(this.editedWord);
        if (this.isAddingWord) {
          await api.addWord(validatedWord)
        }
        else {
          await api.updateWord(validatedWord);
        }
        this.$router.push('/')
      }
      catch (error) {
        console.error(error)
        alert('There was an error submitting.  Please make sure all fields are filled.')
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
    handlePartOfSpeechChange(event) {
      const {value, index} = event;
      this.editedWord.definition[index].partOfSpeech = value;
    },
    addEntry(event, index) {
      this.editedWord.definition[index].entries.push('')
    },
    addPartOfSpeech() {
      this.editedWord.definition.push({partOfSpeech: '', entries: ['']});
    },
    isNewDefinition(index) {
      const initialDef = this.word.definition[index]
      const editedDef = this.editedWord.definition[index]
      if (!initialDef) {
        return true
      }

      const noEntries = initialDef.entries.filter(entry => entry.trim() !== '');
      if (!noEntries.length) {
        return true
      }

      const editedWordNoEntries = editedDef.entries.filter(entry => entry.trim() !== '');
      if (!editedWordNoEntries.length) {
        editedDef.partOfSpeech = ''
        return true
      }
    },
  }
    
}
</script>

<style lang="scss">

</style>
