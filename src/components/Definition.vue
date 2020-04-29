<template>
  <div class="definition">
  <div v-for="(def, index) in definition" :key="def + '-' + index">
    <div class="partOfSpeech">{{def.partOfSpeech}}</div>
    <div
      v-for="(entry, eIndex) in def.entries"
      :key="def + '-' + index + '-' + entry + '-' + eIndex"
      class="entry"
    >
      {{eIndex + 1}}. {{entry}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Definition',
  props: ['definition'],
}
</script>

<style lang="scss">
  .definition {
    overflow: scroll;
    margin: 5px 0;

    .partOfSpeech {
      font-style: italic;
      padding-top: 10px;

      &:first-of-type {
        padding-top: 0px;
      }
    }

    .entry {
      color: #4e4e4e;
    }
  }

</style>