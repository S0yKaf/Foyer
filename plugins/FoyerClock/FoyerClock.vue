<template>
  <div id="FoyerClock">
    <div class="dateContainer">
      <div>
        <span class="is-size-1 is-primary">{{hours}}</span>
        <span class="is-size-1 has-text-grey">{{minutes}}</span>
        <span class="is-size-5 has-text-grey-dark">{{seconds}}</span>
      </div>
      <div class="has-text-grey-light">
        {{day}}, {{month}} {{date}}, {{year}}
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
      stringConfig: "",
      cmOptions: {
        tabSize: 4,
        mode: 'application/json',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
      },
      config: {}
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
      return this.now.getHours();
    },
    minutes: function () {
      return this.now.getMinutes();
    },
    seconds: function () {
      return this.now.getSeconds();
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
