import Vue from 'vue';
import axios from 'axios';

import App from './App.vue';

// modules
import FoyerBookmark from 'modules/FoyerBookmark/FoyerBookmark.vue'

// global config
axios.get('/static/config.json')
  .then(res => {
    Vue.prototype.$config = res.data;
  })
  .then(() => {
    Vue.component('FoyerBookmark', FoyerBookmark);

    const app = new Vue({
      render: h => h(App)
    }).$mount('#app');
  });
