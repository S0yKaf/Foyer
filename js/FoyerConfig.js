import axios from 'axios';

class FoyerConfig {
  constructor() {
    this.config = {};
  }

  register(name, defaults) {
    if (!this.config[name]) {
      this.config[name] = defaults || {};
    }
    return Promise.resolve(this.config[name]);
  }

  getConfig(name) {
    if (!this.config[name]) {
      return Promise.reject();
    }
    return Promise.resolve(this.config[name]);
  }

  setConfig(name, value) {
    if (!this.config[name]) {
      return Promise.reject();
    }
    this.config[name] = value;
    return Promise.resolve(this.config[name]);
  }

  initConfig() {
    var self = this;
    return new Promise((resolve, reject) => {
      self.config = axios.get('static/config.json')
      .then(res => {
        self.config = res.data;
        return resolve(res.data);
      })
      .catch(err => {
        return resolve();
      })
    });
  }

  saveConfig() {
    return new Promise((resolve, reject) => {
      axios.post('save', this.config)
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$config = new FoyerConfig();

    Vue.mixin({
      beforeMount: function () {
        var self = this;
        this.$config.register(this.name, this.config)
          .then(res => {
            if (res === self.config) {
              return self.$config.saveConfig();
            }
            self.config = res;
          });
      }
    });
  },
}
