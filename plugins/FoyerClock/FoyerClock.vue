<template>
  <div id="FoyerClock">
    <div class="dateContainer" v-show="!edit">
      <div>
        <span class="is-size-1 is-primary">{{hours}}</span>
        <span class="is-size-1 has-text-grey">{{minutes}}</span>
        <span class="is-size-5 has-text-grey-dark" v-show="config.seconds">{{seconds}}</span>
      </div>
      <div class="has-text-grey-light">
        {{day}}, {{month}} {{date}}
        <span v-show="config.year">, {{year}}</span>
      </div>
    </div>
    <div v-show="edit">
      <div class="control">
        <label class="checkbox">
          <input v-model="config.seconds" type="checkbox">
          Show seconds
        </label>
        <label class="checkbox">
          <input v-model="config.year" type="checkbox">
          Show Year
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoyerClock',
  props: ['editing'],
  data: () => {
    return {
      name: 'FoyerClock',
      firstLoad: true,
      edit: false,
      now: new Date,
      config: {
        seconds: false,
        year: true
      }
    }
  },
  methods: {
    setConfig () {
      this.$config.setConfig(this.name, this.config);
    }
  },
  watch: {
    "config.seconds": function (val) {
      this.setConfig();
    },
    "config.year": function (val) {
      this.setConfig();
    },
    editing: function (val) {
      this.edit = val;
    }
  },
  computed: {
    year: function () {
      return this.now.getFullYear();
    },
    month: function () {
      return this.now.toLocaleString('en-us', {  month: 'long' });
    },
    date: function () {
      return this.now.getDate();
    },
    day: function () {
      return this.now.toLocaleString('en-us', {  weekday: 'long' });
    },
    hours: function () {
      return `${this.now.getHours()}`.padStart(2, "0");
    },
    minutes: function () {
      return `${this.now.getMinutes()}`.padStart(2, "0");;
    },
    seconds: function () {
      return `${this.now.getSeconds()}`.padStart(2, "0");;
    }
  },
  created () {
    setInterval(() => this.now = new Date, 1000 * 1)
  }
}
</script>

<style lang="scss">
  @import "~sass/global.scss";
  #FoyerClock {
    padding: 1em;
  }
  .column {
    text-align: center;
  }
  .dateContainer {
    line-height: 100%
  }
  .title {
    color: $purple
  }
  .edit a {
    margin: 0.2em;
    overflow: hidden;
  }
</style>
