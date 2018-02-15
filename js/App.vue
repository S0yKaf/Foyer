<template>
  <div id="app">
      <h1 class="is-size-1" id="welcome">{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to your foyer!'
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
  @import "~sass/global.scss";
  #welcome {
    text-align: center;
    padding-top: 20%;
  }
</style>
