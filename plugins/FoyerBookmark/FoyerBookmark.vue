<template>
  <div id="FoyerBookmark">
    <table class="table is-bordered">
      <thead>
        <tr>
          <th><a href="https://twitch.tv/">Twitch</a></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="https://twitch.tv/following">Following</a></td>
        </tr>
      </tbody>
    </table>
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
          "subscriptions": "https://www.youtube.com/feed/subscriptions"
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~sass/global.scss";

</style>
