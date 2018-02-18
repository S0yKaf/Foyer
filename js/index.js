import Vue from 'vue';

import FoyerConfig from './FoyerConfig';
Vue.use(FoyerConfig);

import {Container, Box} from '@dattn/dnd-grid';
Vue.component('DndGridContainer', Container);
Vue.component('DndGridBox', Box);

// Load all modules inside plugins/ as global components
import plugins from '../plugins/**/*.vue';
plugins.map(plugin => {
  Vue.component(plugin.default.name, plugin.default);
});

import App from './App.vue';

const app = new Vue({
  render: h => h(App)
});
// load config and start app
app.$config.initConfig()
  .then(res => {
    app.$mount('#app');
  });
