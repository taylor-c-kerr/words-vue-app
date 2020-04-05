<template>
    <i 
        class="material-icons button delete"
        @click="$emit('clicked')"
    >
        {{value}}
    </i>
</template>

<script>
export default {
    props: {
        type: {
            required: true,
            type: String
        }
    },
    computed: {
        value: function() {
            let result = '';
            switch(this.type) {
                case 'delete':
                    result = 'delete_forever';
                    break;
                default:
                    result = ''
            }
            return result
        }
    }
}
</script>

<style>
  .button {
    cursor: pointer;
    padding-top: 10px;
    width: 24px;
    margin: auto;
  }
</style>