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
import axios from 'axios';
export default {
  name: 'FoyerBookmark',
  data: () => {
    return {
      bookmarks: {}
    }
  },
  mounted: () => {}
}
</script>

<style lang="scss">
  @import "~sass/global.scss";

</style>
