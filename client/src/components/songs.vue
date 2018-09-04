<template>
  <div class="title">
    <div class="padding">
      Search Results
    </div>
    <div class="scroll">
      <div class="column">
        <div v-for="song in searchResults" :key="song.trackId" class="music-card">
          <div class="row">
            <img :src=song.artworkUrl100 alt="">
            <div class="card-half">
              <p>Track: {{song.trackName}}</p>
              <p>Artist: {{song.artistName}}</p>
              <p>Album: {{song.collectionName}}</p>
            </div>
            <div class="card-half">
              <audio controls :src=song.previewUrl type="audio/mpeg" @play.capture="pauseAll" />
              <button class="button" @click="addToPlaylist(song)">
                Add to playlist
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
    name: 'songs',
    computed: {
      searchResults() {
        return this.$store.state.results;
      }
    },
    methods: {
      addToPlaylist(data) {
        let song = {
          "trackName": data.trackName,
          "artistName": data.artistName,
          "collectionName": data.collectionName,
          "previewUrl": data.previewUrl,
          "albumArt": data.artworkUrl100,
          "trackId": data.trackId
        }
        this.$store.dispatch("addToPlaylist", song)
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