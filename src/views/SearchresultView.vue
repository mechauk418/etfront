<template>
  <div class="container">
    <!-- <input type="text" v-model="search_key">
    <button @click="searchbtn"> 검색 </button> -->
    <div class="banner">
      <p> 배너 </p>
    </div>
    <div style="display: flex;">
      <div style="width:30%">
        <div class="userstatdiv">
          <p> {{ userstats.mmr }} </p>
          <p> {{ userstats.nickname }} </p>
          <p> {{ userstats.rank }} </p>
        </div>
        <div>
          <div v-for="ch in recentch" :key="ch" style="border: 1px solid black;">
            {{ch}}
          </div>
        </div>
      </div>
      <div style="width:70%" class="전적">
        <div v-for="(game,index) in gamedetail" :key="index" style="border: 1px solid black;">
          <p>{{ game.id }}</p>
          <p>{{ game.playcharacter }}</p>
          <p>{{ game.playerkill}} / {{game.playerAss}} / {{game.mosterkill }}</p>
          <p>{{ game.mmrGain }}</p>
          <button @click="toggle(index)"> ▼ </button>
          <div v-show="show[index]">
            <div v-for="ttas in (game.gamedetail.length/3)" :key="ttas">
              <p>{{ ttas }}</p>
              <div v-for="gs in game.gamedetail" :key="gs">
                <p v-if="gs.gamerank == ttas">{{gs.usernickname}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nextbtn">
        <button @click="nextbtn"> ▼ </button>
      </div>
      <div class="전적갱신">
        <button @click="refreshbtn"> ▼ </button>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      search_key:null,
      gamedetail: [],
      show : [],
      userstats:[],
      pages:2,
      recentch: [],
    }

  },
  mounted () {
    this.searchData()
    this.detailData()
    axios.get("http://127.0.0.1:8000/gamerecord/recentgainrp/" + this.$route.params.nickname + '/')
    .then(res => {
      this.recentch = res.data
      console.log(this.recentch)
    }
    )
  },
  methods:{
    searchbtn() {
      this.$router.push(this.search_key)
      axios.get("http://127.0.0.1:8000/gamerecord/getsearch/" + this.search_key + '/')
      .then(res => {
          this.gamedetail = res.data.results
          this.show = Array(this.gamedetail.length).fill(false)
        }
      )
    },
    nextbtn() {
      axios.get("http://127.0.0.1:8000/gamerecord/getsearch/" + `${this.$route.params.nickname}/`+'?page='+this.pages)
      .then(res => {
          this.gamedetail = res.data.results
          this.show = Array(this.gamedetail.length).fill(false)
          console.log(this.show)
          console.log(res.data.results)
          this.pages+=1
        }
      )
      .catch(res => {
        console.log(res)
      })
    },
    toggle(index) {
      this.show.splice(index,1,!this.show[index])
    },
    refreshbtn() {
      axios.get("http://127.0.0.1:8000/gamerecord/getusernum/" + `${this.$route.params.nickname}`)
    },
    async searchData() {
      const sdData = await axios.get("http://127.0.0.1:8000/gamerecord/getsearch/" + this.$route.params.nickname + '/')
      this.gamedetail = sdData.data.results
      this.show = Array(this.gamedetail.length).fill(false)
      console.log(sdData.data.results)
    },
    async detailData() {
      const dData = await axios.get("http://127.0.0.1:8000/gamerecord/getdetail/" + this.$route.params.nickname + '/')
      this.userstats = dData.data
    }
  }

}
</script>

<style>

.maindiv {
  display: flex;
}

.userstatdiv {
  border: 1px solid black;
}

.banner {
  border: 1px solid black;
}

</style>