<template>
  <div>
    <header class="header">
      <div>
        Music is fun
      </div>
      <form @submit.prevent="getQuery($event)">
        <input type="text" name="name" autocomplete="off" placeholder="Search"><br>
        <button class="new-game-button" type="submit">Submit</button>
      </form>
    </header>

    <div>
      <div class="main-page">
        <div class="title">
          <div class="padding">
            Playlists
          </div>
          <div class="row">
            <div v-for="(song, index) in playlist" :key="index" class="music-card">
              <div class="card-half">
                <p>Track: {{song.trackName}}</p>
                <p>Artist: {{song.artistName}}</p>
                <p>Album: {{song.collectionName}}</p>
              </div>
              <div class="card-half">
                <img :src=song.artworkUrl100 alt="">
                <audio controls>
                  <source :src=song.previewUrl type="audio/mpeg"> Your browser does not support the audio element.
                </audio>
                <button class="button">
                  Add to playlist
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="title">
          <div class="padding">
            Search Results
          </div>
          <div class="row">
            <div v-for="(song, index) in searchResults" :key="index" class="music-card">
              <div class="card-half">
                <p>Track: {{song.trackName}}</p>
                <p>Artist: {{song.artistName}}</p>
                <p>Album: {{song.collectionName}}</p>
              </div>
              <div class="card-half">
                <img :src=song.artworkUrl100 alt="">
                <audio controls>
                  <source :src=song.previewUrl type="audio/mpeg"> Your browser does not support the audio element.
                </audio>
                <button class="button">
                  Add to playlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    },
    mounted() {
      this.$store.dispatch(getPlaylist)
    },
    computed: {
      searchResults() {
        return this.$store.state.results;
      },
      playlist() {
        return this.$store.state.playlist;
      }
    },
    methods: {
      getQuery(event) {
        let search = "search?term=" + event.target.name.value
        this.$store.dispatch("getQuery", search)
      },
      addToPlaylist(song) {
        this.$store.dispatch("addToPlaylist", song)
      }
    }
  }

</script>

<style>
  html {
    background-color: #363434;
  }

  .header {
    display: flex;
    background-color: #62929a;
    justify-content: space-between;
    align-content: center;
    height: 5%;
    color: #efecec;
  }

  .main-page {
    display: flex;
    background-color: #5c5757;
  }

  .title {
    display: flex;
    justify-content: flex-start;
    width: 50vw;
    color: #efecec;
    flex-direction: column;
  }

  .padding {
    padding: 2% 0 2% 0;
  }

  .row {
    display: flex;
    flex-direction: column;
  }

  .music-card {
    display: flex;
    background-color: #62929a;
    color: #363434;
    margin: 1% 1% 1% 1%;
    flex-direction: column;
    outline: #363434 solid 1px
  }

  .card-half {
    display: flex;
    padding-right: 2%;
    margin: 1% 1% 1% 1%;
    flex-direction: column;
    justify-content: left;
  }

  img {
    max-height: 100px;
    max-width: 100px;
  }

  .button {
    background-color: #62929a;
    border-radius: 12px;
    border: 2px solid #363434;
    color: #363434;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition: background-color 300ms linear, color 300ms linear, border 300ms linear, ;
    cursor: pointer;
  }

  .button:hover {
    background-color: #363636;
    color: #efecec;
    border: 2px solid #efecec;
  }
</style>