<template>
  <div id="FoyerBookmark">
    <div class="columns">
      <div class="column" v-for="(items, name) in config" :key="name">
        <h1 class="shadow myBox">{{name}}</h1>
        <div class="shadow myBox" v-for="(link, title) in items" :key="title">
          <a :href="link">{{title}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoyerBookmark',
  data: () => {
    return {
      name: 'FoyerBookmark',
      config: {
        "Twitch": {
          "Following": "https://twitch.tv/following"
        },
        "Youtube": {
          "subscriptions": "https://www.youtube.com/feed/subscriptions",
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~sass/global.scss";
  .column {
    text-align: center;
  }
  .shadow {
    box-shadow: 10px 10px 2px darken($dark, 2);
  }
  a {
    display: inline-block;
    height: 100%;
    width: 100%;
  }
  .myBox {
    padding: 1em;
    margin-top: 1em;
    border: solid #5B6DCD 1px;
  }
</style>
