<template>
  <div id="app">
      <h1 class="is-size-1" id="welcome">{{config.welcome}}</h1>
      <FoyerBookmark/>
      <dnd-grid-container
      :gridSize="100"
      :margin="100"
      :bubbleUp="false">
        <dnd-grid-box>
          <FoyerBookmark/>
        </dnd-grid-box>
      </dnd-grid-container>

  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => {
    return {
      name: 'app',
      config: {
        welcome: "Welcome to your Foyer."
      }
    }
  },
  components: {
  },
  methods: {
    getConfig: () => {
    }
  },
  beforeMount () {
    var self = this;
    this.$config.register(this.name, this.config)
      .then(res => {
        if (res === self.config) {
          return self.$config.saveConfig();
        }
        self.config = res;
      })
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
