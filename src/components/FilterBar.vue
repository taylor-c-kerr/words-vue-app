<template>
  <div class="filter-bar">
    <div class="filter-by">Filter by:</div>
    <div
    v-for="(value, key, index) in filters"
    :key="'value-' + index"
    class="filters"
    >
      <label>{{key}}</label>
      <input
        :placeholder="[[key]]"
        :name="[[key]]"
        @input="handleChange($event)"
        v-model="filters[key]"
      />
    </div>
    <Button v-if="filters !== {}" type="clear" class="clear-button" @clicked="clearFilters()"/>
  </div>
</template>

<script>
import { pickBy } from 'lodash';
import Button from './Button';

export default {
  name: 'FilterBar',
  components: {
    Button,
  },
  data() {
    return {
      filters: {}
    }
  },
  mounted() {
    this.filters = {
      name: '',
      category: '',
    };
  },
  methods: {
    handleChange(event) {
      const {name, value} = event.target;
      this.filters[name] = value;
      this.emitEvent();
    },
    clearFilters() {
      this.filters = {name: '', category: ''};
      this.emitEvent();
    },
    emitEvent() {
      this.$emit('filter', pickBy(this.filters));
    },
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
    .clear-button {
      align-self: flex-end;
      padding-left: 10px
    }
  }
</style>