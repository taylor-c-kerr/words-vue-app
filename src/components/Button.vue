<template>
  <div class="button">
    <div @click="$emit('clicked')" class="material-icons icon">{{value}}</div>
    <div v-if="text !== ''" class="text">{{text}}</div>
  </div>

</template>

<script>
export default {
  props: {
    type: {
      required: true,
      type: String
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    value: function() {
      switch(this.type) {
        case 'delete':
          return 'delete_forever';
        case 'add':
          return 'add_box';
        case 'clear':
          return 'clear';
        case 'edit':
          return 'edit';
        case 'undo':
          return 'undo';
        default:
          return '';
      }
    }
  }
}
</script>

<style lang="scss">
  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .icon {
    max-width: 24px;
    cursor: pointer;
  }
  .text{
    padding-left: 10px;
  }
</style>
