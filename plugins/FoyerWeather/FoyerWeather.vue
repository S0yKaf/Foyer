<template>
  <div id="FoyerWeather">
    <div class="weatherData" v-show="!edit">
      <div>
        <span class="is-size-1 is-primary">{{currentTemp}}{{metric}}</span>
        <span class="is-size-1 has-text-grey"> {{weatherCondtion}}</span>
        <span class="is-size-5 has-text-grey-dark">{{seconds}}</span>
      </div>
      <div class="has-text-grey-light">
        {{tempMin}} {{metric}} | {{tempMax}} {{metric}} | <i class="fas fa-tint"></i> {{relHumidity}}
      </div>
    </div>
    <div v-show="edit">
      <div class="control">
        <label class="checkbox">
          <input v-model="config.location">
          location
        </label>
        <br />
        <label class="checkbox">
          <input v-model="config.unit">
          unit
        </label>
        <br />
        <label class="checkbox">
          <input v-model="config.apiKey">
          apiKey
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FoyerWeather',
  props: ['editing'],
  data: () => {
    return {
      name: 'FoyerWeather',
      edit: false,
      now: new Date,
      weatherData: {},
      api: "https://api.openweathermap.org/data/2.5/weather?q=",
      config: {
        apiKey: "620c5fb98f9b1c00494ccb716052f476",
        location: "Montreal,ca",
        unit: "celcius",
      }
    }
  },
  methods: {
    setConfig () {
      this.$config.setConfig(this.name, this.config);
    },
    getWeatherData () {
      const self = this;
      return axios.get(`${self.api}${self.config.location}&appid=${self.config.apiKey}`)
      .then(res => {
        console.log(res.data);
        return res.data;
      });
    },
    convertUnit (kelvinTemp) {
      const unit = this.config.unit;
      console.log(unit);
      const temp = unit === "celcius" ? kelvinTemp - 273.15 :
                   (kelvinTemp * 9/5) - 459.67;
      return `${temp}`.split('.')[0];
    }
  },
  watch: {
    editing: function (val) {
      this.edit = val;
    },
    config: function () {
      console.log(this.weatherData);
      if (!this.weatherData.main)
        this.getWeatherData()
          .then((res) => {
            this.weatherData = res;
          })
    },
    'config.location': function () {
      this.setConfig();
    },
    'config.unit': function () {
      this.setConfig();
    },
    'config.apiKey': function () {
      this.setConfig();
    }
  },
  computed: {
    currentTemp: function () {
      if (this.weatherData.main)
        return this.convertUnit(this.weatherData.main.temp);
    },
    tempMax: function () {
      if (this.weatherData.main)
        return this.convertUnit(this.weatherData.main.temp_max);
    },
    tempMin: function () {
      if (this.weatherData.main)
        return this.convertUnit(this.weatherData.main.temp_min);
    },
    weatherCondtion: function () {
      if (this.weatherData.weather)
        return this.weatherData.weather[0].description
    },
    relHumidity: function () {
      if (this.weatherData.main)
        return `${this.weatherData.main.humidity}%`;
    },
    metric: function () {
      return this.config.unit === 'celcius' ? '°C' : '°F'
    }
  }
}
</script>

<style lang="scss">
  @import "~sass/global.scss";
  #FoyerWeather {
    padding: 1em;
  }
  .column {
    text-align: center;
  }
  .title {
    color: $purple
  }
  .weatherData {
    line-height: 2em;
  }
  .edit a {
    margin: 0.2em;
    overflow: hidden;
  }
</style>
