<template>
  <div id="FoyerSearch">
    <div class="searchContainer" v-show="!edit">
      <div class="field has-addons has-addons-right">
        <p class="control is-expanded">
          <input class="input" type="text"
                 placeholder="Search..." v-model="query"
                 @keyup.enter="search()">
        </p>
        <p class="control">
          <a class="button is-primary" @click="search()">
            <i class="fas fa-search"></i>
          </a>
        </p>
      </div>
    </div>
    <div v-show="edit">
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoyerSearch',
  props: ['editing'],
  data: () => {
    return {
      name: 'FoyerSearch',
      edit: false,
      query: "",
      engines: {
        "google": "https://www.google.com/search?q=",
        "duckduckgo": "https://duckduckgo.com/?q="
      },
      config: {
        engine: "google"
      }
    }
  },
  methods: {
    setConfig () {
      this.$config.setConfig(this.name, this.config);
    },
    search () {
      let formattedQuery = this.query.replace(" ", "+");
      window.location.href = `${this.engines[this.config.engine]}${formattedQuery}`;
    }
  },
  watch: {
    editing: function (val) {
      this.edit = val;
    }
  },
  computed: {}
}
</script>

<style lang="scss">
  @import "~sass/global.scss";
  #FoyerSearch {
    padding: 1em;
  }
  .column {
    text-align: center;
  }
  .title {
    color: $purple
  }
  .edit a {
    margin: 0.2em;
    overflow: hidden;
  }
</style>
