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
            let result = '';
            switch(this.type) {
                case 'delete':
                    result = 'delete_forever';
                    break;
                case 'add':
                    result = 'add_box_outline';
                    break;
                default:
                    result = ''
            }
            return result
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
    width: 24px;
    cursor: pointer;
  }
  .text{
    padding-left: 10px;
  }
</style>