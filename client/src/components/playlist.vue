<template>
  <div class="title">
    <div class="padding">
      Playlists
    </div>
    <div class="scroll">
      <div class="column">
        <div v-for="(song, index) in playlist" :key="song._id" class="music-card">
          <div class="row">
            <img :src=song.albumArt alt="">
            <div class="card-half">
              <p>Track: {{song.trackName}}</p>
              <p>Artist: {{song.artistName}}</p>
              <p>Album: {{song.collectionName}}</p>
            </div>
            <div class="card-half">
              <audio controls :src=song.previewUrl type="audio/mpeg" @play.capture="pauseAll" />
              <button class="button" @click="deleteFromPlaylist(song._id)">
                Remove from playlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'playlist',
    mounted() {
      this.$store.dispatch('getPlaylist');
    },
    computed: {
      playlist() {
        return this.$store.state.playlist;
      }
    },
    methods: {
      deleteFromPlaylist(id) {
        this.$store.dispatch('deleteFromPlaylist', id)
      },
      pauseAll() {
        var play = document.getElementsByTagName('audio');
        for (var i = 0, len = play.length; i < len; i++) {
          if (play[i] != event.target) {
            play[i].pause();
          }
        }
      }
    }
  }

</script>