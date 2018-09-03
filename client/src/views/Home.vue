<template>
  <div>
    <header class="header">
      <div class="title-top">
        Music is fun
      </div>
      <form @submit.prevent="getQuery($event)" class="row">
        <input type="text" name="name" autocomplete="off" placeholder="Search"><br>
        <button class="button-submit  " type="submit">Submit</button>
      </form>
    </header>

    <div>
      <div class="main-page">
        <div class="title">
          <div class="padding">
            Playlists
          </div>
          <div class="scroll">
            <div class="column">
              <div v-for="(song, index) in playlist" :key="index" class="music-card">
                <div class="row">
                  <img :src=song.albumArt alt="">
                  <div class="card-half">
                    <p>Track: {{song.trackName}}</p>
                    <p>Artist: {{song.artistName}}</p>
                    <p>Album: {{song.collectionName}}</p>
                  </div>
                  <div class="card-half">
                    <audio controls :src=song.previewUrl type="audio/mpeg" />
                    <button class="button" @click="deleteFromPlaylist(song._id)">
                      Remove from playlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="title">
          <div class="padding">
            Search Results
          </div>
          <div class="scroll">
            <div class="column">
              <div v-for="(song, index) in searchResults" :key="index" class="music-card">
                <div class="row">
                  <img :src=song.artworkUrl100 alt="">
                  <div class="card-half">
                    <p>Track: {{song.trackName}}</p>
                    <p>Artist: {{song.artistName}}</p>
                    <p>Album: {{song.collectionName}}</p>
                  </div>
                  <div class="card-half">
                    <audio controls :src=song.previewUrl type="audio/mpeg" />
                    <button class="button" @click="addToPlaylist(song)">
                      Add to playlist
                    </button>
                  </div>
                </div>
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
      this.$store.dispatch('getPlaylist');
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
      deleteFromPlaylist(id) {
        this.$store.dispatch('deleteFromPlaylist', id)
      }
    }
  }

</script>

<style>
  html {
    background-color: #0b0b0d;
  }

  .header {
    display: flex;
    background-color: #474a56;
    justify-content: space-between;
    align-content: center;
    height: 5%;
    color: #d3d5fd;
  }

  .title-top {
    font-size: 2rem;
    padding: 1% 0% 1% 2%;
  }

  .main-page {
    display: flex;
    background-color: #929aab;
  }

  .title {
    display: flex;
    justify-content: flex-start;
    width: 50vw;
    color: #eaeaea;
    flex-direction: column;
  }

  .padding {
    padding: 2% 0 2% 0;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .music-card {
    display: flex;
    background-color: #474a56;
    color: #929aab;
    margin: 1% 1% 1% 1%;
    flex-direction: column;
    outline: #929aab solid 1px;
    justify-content: center;
    align-content: center;
  }

  .card-half {
    display: flex;
    padding-left: 2%;
    padding-right: 2%;
    margin: 1% 0% 1% 0%;
    flex-direction: column;
    justify-content: space-evenly;
  }

  img {
    max-height: 85px;
    max-width: 85px;
  }

  .button {
    background-color: #474a56;
    border-radius: 12px;
    border: 2px solid #929aab;
    color: #929aab;
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
    color: #eaeaea;
  }

  .scroll {
    overflow-y: auto;
    height: 81vh;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 20vw;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #d3d5fd;
  }

  ::-webkit-scrollbar-thumb {
    background: #474a56;
  }

  audio {
    max-width: 17vw;
  }

  input[type=text] {
    border: none;
    border-bottom: 2px solid #929aab;
    background-color: #474a56;
    color: #d3d5fd;
    transition: border-bottom 500ms ease-out;
  }

  input:focus {
    outline: none;
    border-bottom: 2px solid #d3d5fd;
  }

  .button-submit {
    background-color: #474a56;
    border-radius: 12px;
    border: 2px solid #929aab;
    color: #929aab;
    padding: 2px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition: background-color 300ms linear, color 300ms linear;
    cursor: pointer;
    margin: 0% 15% 0% 0%;
  }

  .button-submit:hover {
    background-color: #363636;
    color: #eaeaea;
  }
</style>