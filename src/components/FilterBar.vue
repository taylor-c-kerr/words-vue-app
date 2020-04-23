<template>
  <div>
    Filter By:
    <input
      v-for="(option, index) in options"
      :key="'option-' + index"
      :placeholder="[[option]]"
      :name="[[option]]"
      @input="handleChange($event)"
    />
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  data() {
    return {
      options: [],
      data: {}
    }
  },
  mounted() {
    this.options = ['name', 'category'];
    console.log(this.options)
  },
  methods: {
    handleChange(event) {
      const {name, value} = event.target;
      this.data[name] = value;
      this.$emit('filter', this.data)
    }
  }
}
</script>

<style lang="scss">

</style>