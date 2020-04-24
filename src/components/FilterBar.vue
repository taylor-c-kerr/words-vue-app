<template>
  <div class="filter-bar">
    <div class="filter-by">Filter by:</div>
    <div
    v-for="(option, index) in options"
    :key="'option-' + index"
    class="filters"
    >
      <label>{{option}}</label>
      <input
        :placeholder="[[option]]"
        :name="[[option]]"
        @input="handleChange($event)"
      />
    </div>
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
  .filter-bar {
    padding: 12px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .filter-by {
      align-self: flex-end;
      padding-right: 10px
    }
    .filters {
      display: flex;
      flex-direction: column;
      padding-right: 5px;

       &:last-of-type {
         padding-right: 0px
       }
    }
  }
</style>