<template>
  <div id="FoyerBookmark">
    <div class="columns" v-show="!edit">
      <div class="column" v-for="(items, name) in config" :key="name">
        <h1 class="shadow myBox title">{{name}}</h1>
        <div class="shadow myBox" v-for="(link, title) in items" :key="title">
          <div>
            <a :href="link">{{title}}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="edit" v-show="edit">
      <a class="button is-primary" v-on:click="save()">
        <i class="fas fa-save"></i>&nbspSave
      </a>
      <codemirror v-model="stringConfig" :options="cmOptions"></codemirror>
    </div>

  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite';
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/vue/vue');
import { EventBus } from 'EventBus';

export default {
  name: 'FoyerBookmark',
  components: {
    codemirror
  },
  props: ['editing'],
  data: () => {
    return {
      name: 'FoyerBookmark',
      firstLoad: true,
      edit: false,
      stringConfig: "",
      cmOptions: {
        tabSize: 4,
        mode: 'application/json',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
      },
      config: {
        "Twitch": {
          "Following": "https://twitch.tv/following"
        },
        "Youtube": {
          "subscriptions": "https://www.youtube.com/feed/subscriptions",
        }
      }
    }
  },
  beforeUpdate () {
    // TODO REMOVE THIS HACK
    if (this.firstLoad) {
      this.stringConfig = JSON.stringify(this.config, null, 4);
      this.firstLoad = false;
    }
  },
  watch: {
    editing: function (val) {
      this.edit = val;
    }
  },
  methods: {
    save () {
      if (!JSON.parse(this.stringConfig)) {
        return;
      }
      this.edit = !this.edit;
      this.config = JSON.parse(this.stringConfig);
      this.$config.setConfig(this.name, this.config);
    }
  }
}
</script>

<style lang="scss">
  @import '~codemirror/lib/codemirror.css';
  @import '~codemirror/theme/base16-dark.css';
  @import "~sass/global.scss";
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
