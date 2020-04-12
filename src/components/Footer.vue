<template>
  <footer>© {{currentYear}} Thoughtful Moose</footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear: function() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
  footer {
    padding-top: 50px;
  }
</style>