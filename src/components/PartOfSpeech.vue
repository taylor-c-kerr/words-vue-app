<template>
  <div class="definition-pos">
    <div>Choose a part of Speech</div>
    <select v-on:change="$emit('updated', {value, index})" v-model="value">
      <option value="">--</option>
      <option v-for="(pos, index) in available" v-bind:value="pos" v-bind:key="'pos-' + index">
      {{ pos }}
      </option>
    </select>
  </div>
</template>

<script>
import _ from 'lodash'
const PARTS_OF_SPEECH =  ['noun', 'verb', 'adjective', 'adverb', 'preposition'];

export default {
  name: 'PartOfSpeech',
  props: {
    used: {
      required: true,
      type: Array
    },
    index: {
      required: true,
      type: Number
    },

  },
  data() {
    return {
      availablePartsOfSpeech: [],
      value: ''
    }
  },
  computed: {
    available: function() {
      const result = _.difference(PARTS_OF_SPEECH, this.used);
      if (this.value) {
        result.push(this.value);
      }
      return result;
    }
  }
}
</script>