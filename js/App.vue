<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-item">
        <a class="navbar-item button is-primary" v-show="!editing" v-on:click="toggleEdit()">
          <i class="fas fa-edit"></i>&nbspEdit
        </a>
        <a class="navbar-item button is-primary" v-show="editing" v-on:click="saveLayout()">
          <i class="fas fa-save"></i>&nbspSave
        </a>
        <div class="navbar-item field" v-show="editing">
          <div class="control is-expanded">
            <div class="select is-fullwidth">
              <select v-model="selected">
                <option v-for="plugin in componentList" :key="plugin">{{plugin}}</option>
              </select>
            </div>
          </div>
          <div class="control">
            <button class="button is-primary" v-show="editing" v-on:click="addComponent(selected)">
              add
            </button>
          </div>
        </div>
      </div>
    </nav>
    <dnd-grid-container
    :layout.sync="config.layout"
    :gridSize="config.gridSize"
    :margin="config.margin"
    :bubbleUp="config.bubbleUp">
      <dnd-grid-box v-for="item in config.layout" :boxId="item.id"
       dragSelector="div.card-header"
       :key="item.id" :class="{'editing': editing}">
        <div class="card-header" v-show="editing">
          <span v-on:click="removeComponent(item)" class="icon has-text-danger has-text-right">
            <i class="fas fa-trash"></i>
          </span>
          <span>{{item.type}}</span>
        </div>
        <component v-bind:is="item.type"/>
      </dnd-grid-box>
    </dnd-grid-container>
  </div>
</template>

<script>
import uuid from 'uuid/v1';
export default {
  name: 'app',
  data: () => {
    return {
      name: 'app',
      selected: "",
      editing: false,
      componentList: {},
      config: {
        welcome: "Welcome to your Foyer.",
        gridSize: {
          w: 100,
          h: 100
        },
        bubbleUp: false,
        margin: 10,
        layout: [
          {
            id: 'box1',
            type: 'FoyerBookmark',
            hidden: false,
            pinned: true,
            position: {
              x: 2, y: 2, w: 2, h: 2
            }
          }
        ]
      }
    }
  },
  components: {
  },
  methods: {
    saveLayout () {
      this.$config.setConfig(this.name, this.config)
        .then(res => {
          this.$config.saveConfig();
        })
      this.toggleEdit();
    },
    toggleEdit() {
      this.editing = !this.editing;
      this.config.layout.map(item => {
        item.pinned = !this.editing;
      })
    },
    addComponent (type) {
      if (!type) {
        return;
      }
      this.config.layout.push({
          id: uuid(),
          type: type,
          hidden: false,
          pinned: false,
          position: {
            x: 0, y: 0, w: 2, h: 1
          }
        });
    },
    removeComponent (item) {
      let index = this.config.layout.indexOf(item);
      if (index === -1) {
        return;
      }
      this.config.layout.splice(index, 1);
    }
  },
  created () {
    this.componentList = this.$availablePlugins;
  }
}
</script>

<style lang="scss">
  @import "~sass/global.scss";
  #app {
    padding: 1em;
  }
  .component-container {
    height: 100%;
    width: 100%;
  }
  .card-header {
    background-color: $nav-hover;
    padding: 1px;
    margin-bottom: 5px;
  }
</style>
