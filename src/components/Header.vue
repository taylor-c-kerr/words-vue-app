<template>
  <!-- <div> -->
    <img src="../../public/happy-moose.png" @click="goHome"/>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'Header',
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
  img {
    width: 33%;
    height: 33%;
  }
</style>