import Vue from 'vue';
import axios from 'axios';
import { Container, Box } from '@dattn/dnd-grid'

import App from './App.vue';

// plugins
import plugins from '../plugins/**/*.vue';

// global config
axios.get('/static/config.json')
  .then(res => {
    Vue.prototype.$config = res.data;
  })
  .then(() => {
    // register all plugins
    plugins.map(plugin => {
      Vue.component(plugin.default.name, plugin.default);
    });
    const app = new Vue({
      render: h => h(App)
    }).$mount('#app');
  });
