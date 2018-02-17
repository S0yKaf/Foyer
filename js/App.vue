<template>
  <div id="app">
      <h1 class="is-size-1" id="welcome">{{this.$config.welcome}}</h1>
      <FoyerBookmark/>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'app',
  data: () => {
    return {
      welcome: ""
    }
  },
  components: {
  },
  methods: {
    getConfig: () => {
    }
  },
  beforeMount () {
  }
}
</script>

<style lang="scss">
  @import "~sass/global.scss";
  #app {
    text-align: center;
    padding-top: 20%;
    padding-left: 20%;
    padding-right: 20%;
  }
</style>
