<template>
  <img class="loading" src="../../public/happy-moose.png" />
</template>

<script>
export default {
  name: 'LoadingIcon'
}
</script>

<style lang="scss">
  img.loading {
    width: 15%;
    height: 15%;
    animation: spin 2s linear infinite;
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
</style>