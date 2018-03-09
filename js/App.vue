<template>
  <div id="app">
    <div class="hoverzone" @mouseover="hovering = true" :class="{'no-select': hovering || editing}"></div>
    <div class="exitzone" @mouseleave="toggleHovering()" :class="{'no-select': !hovering || editing}"> </div>
    <nav class="navbar" role="navigation" aria-label="main navigation" @mouseover="hovering = true" v-show="hovering">
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
          <span v-on:click="editItem(item)" class="icon has-text-right">
            <i class="fas fa-edit"></i>
          </span>
          <span class="no-select">{{item.type}}</span>
        </div>
        <component :editing="item.editing" v-bind:is="item.type"/>
      </dnd-grid-box>
    </dnd-grid-container>
  </div>
</template>

<script>
import uuid from 'uuid/v1';
import { EventBus } from 'EventBus';
export default {
  name: 'app',
  data: () => {
    return {
      name: 'app',
      selected: "",
      editing: false,
      hovering: false,
      componentList: {},
      config: {
        welcome: "Welcome to your Foyer.",
        gridSize: {
          w: 1,
          h: 1
        },
        bubbleUp: false,
        margin: 10,
        layout: [
          {
            id: 'box1',
            type: 'FoyerBookmark',
            editing: false,
            hidden: false,
            pinned: true,
            position: {
              x: 2, y: 2, w: 40, h: 20
            }
          }
        ]
      }
    }
  },
  methods: {
    toggleHovering () {
      if (this.editing) return;
      this.hovering = !this.hovering;
    },
    saveLayout () {
      this.$config.setConfig(this.name, this.config)
        .then(res => {
          this.$config.saveConfig();
        })
      this.toggleEdit();
      this.toggleHovering();
    },
    editItem(item) {
      item.editing = !item.editing;
      EventBus.$emit(`edit-${item.type}`);
    },
    toggleEdit() {
      this.editing = !this.editing;
      this.config.layout.map(item => {
        item.pinned = !this.editing;
        if (!this.editing) {
          item.editing = false;
        }
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
          editing: false,
          pinned: false,
          position: {
            x: 0, y: 0, w: 20, h: 10
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
  .hoverzone {
    position: fixed;
    height: 3%;
    width: 100%;
    z-index: 101;
  }
  .exitzone {
    position: fixed;
    height: 20%;
    width: 100%;
    z-index: 20;
  }
  .navbar {
    z-index: 50;
  }
  .component-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .card-header {
    background-color: $nav-hover;
    padding: 1px;
    margin-bottom: 5px;
  }
  .no-select {
    pointer-events: none;
  }
</style>
