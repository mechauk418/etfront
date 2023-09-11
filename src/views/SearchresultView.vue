<template>
  <div class="container">
    <!-- <input type="text" v-model="search_key">
    <button @click="searchbtn"> 검색 </button> -->
    <div class="banner" style="display: flex; height: 200px; align-items: center; background-image: url(https://i.ytimg.com/vi/N5dS5UP9OOs/maxresdefault.jpg); justify-content: start; margin:1rem">
      <p style="margin: 2rem; color: white; font-weight: bold; font-size:50px"> {{ userstats.nickname }} </p>
      <button @click="refreshbtn" style="margin-right: 40px;">  전적갱신 </button>
    </div>
    <div style="display: flex;">
      <div style="width:30%; margin: 1rem;">
        <div class="userstatdiv">
          <div style="width:33%; display:flex; align-items: center; justify-content: center;">
            <p> 티어 이미지</p>
          </div>
          <div style="width:33%; display:flex; align-items: center; justify-content: center; flex-direction: column;">
            <p style="font-size:x-large; margin:0.5rem;"> {{ userstats.mmr }} RP </p>
            <p style="margin:0;"> {{ userstats.rank }}위</p>
          </div>
          <div style="width:33%; display:flex; align-items: center; justify-content: center; flex-direction: column;">

            <p style="margin:1px;"> 총 게임 수</p>
            <progress value=100 min="0" max="100" class="winrate_progress"></progress>
            <p style="margin:1px;">{{ userstats.totalGames }} </p>

            <p style="margin:1px;"> 승률 </p>
            <progress :value='userstats.winrate' min="0" max="100" class="winrate_progress"></progress>
            <p style="margin:1px;">{{ userstats.winrate }}% </p>

            <p style="margin:1px;"> 평킬</p>
            <progress value=100 min="0" max="100" class="winrate_progress"></progress>
            <p style="margin:1px;">{{ userstats.averageKills }} </p>
          </div>
        </div>
        <div>
          <div v-for="ch in recentch" :key="ch" style="border: 1px solid black;">
            <div style="display: flex; justify-content: space-around; ">
              <p> {{ ch.chname }} </p>
              <p> {{ ch.trygame }}판</p>
              <p> {{ ch.mmrGain }}점</p>
            </div>
          </div>
        </div>
      </div>
      <div style="width:70%; margin:1rem;" class="전적">
        <div v-for="(game,index) in gamedetail" :key="index" style="border: 1px solid black;">
          <div style="display: flex;">
            <div style="width:30%">
              <p>{{ game.playcharacter }}</p>
            </div>
            <div style="width:30%">
              <p>{{ game.playerkill}} / {{game.playerAss}} / {{game.mosterkill }}</p>
            </div>
            <div style="width:30%">
              <p>{{ game.mmrGain }}</p>
            </div>
            <button @click="toggle(index)"> ▼ </button>
          </div>
          <div v-show="show[index]">
            <div v-for="ttas in (game.gamedetail.length/3)" :key="ttas" style="border:1px solid whitesmoke" :class="game.gamerank==ttas ? 'userteam' : 'nonuserteam' ">
              <div style="display: flex;">
                <p style="align-self: center; width:10%">{{ ttas }}</p>
                <div style="width:70%">
                  <div v-for="gs in game.gamedetail" :key="gs" style="display: flex;">
                    <p v-if="gs.gamerank == ttas" style="width:20%">{{gs.playcharacter}}</p>
                    <p v-if="gs.gamerank == ttas" style="width:30%">{{gs.usernickname}}</p>
                    <p v-if="gs.gamerank == ttas" style="width:30%">{{gs.playerkill}}/{{ gs.playerAss }}/{{ gs.mosterkill }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nextbtn" style="margin:1rem">
          <button v-if="this.pages>1" @click="prevbtn"> 이전 페이지 </button> &nbsp;
          <button @click="nextbtn"> 다음 페이지 </button>
        </div>
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
      pages:1,
      recentch: [],
      searchuserrank :[],
    }

  },
  mounted () {
    this.searchData()
    this.detailData()
    axios.get("http://127.0.0.1:8000/gamerecord/recentgainrp/" + this.$route.params.nickname + '/')
    .then(res => {
      this.recentch = res.data.result
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
      this.pages+=1
      axios.get("http://127.0.0.1:8000/gamerecord/getsearch/" + `${this.$route.params.nickname}/`+'?page='+this.pages)
      .then(res => {
          this.gamedetail = res.data.results
          this.show = Array(this.gamedetail.length).fill(false)
          console.log(this.show)
          console.log(res.data.results)
        }
      )
      .catch(res => {
        console.log(res)
      })
    },
    prevbtn() {
      this.pages-=1
      axios.get("http://127.0.0.1:8000/gamerecord/getsearch/" + `${this.$route.params.nickname}/`+'?page='+this.pages)
      .then(res => {
          this.gamedetail = res.data.results
          this.show = Array(this.gamedetail.length).fill(false)
          console.log(this.show)
          console.log(res.data.results)
        }
      )
      .catch(res => {
        console.log(res)
      })
    },
    toggle(index) {
      this.show.splice(index,1,!this.show[index])
    },
    async refreshbtn() {
      await axios.get("http://127.0.0.1:8000/gamerecord/testrp/" + `${this.$route.params.nickname}`)
      .then(res=>{
        console.log(res)
        this.$router.go()
      }
      )
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
  display: flex;
}

.banner {
  border: 1px solid black;
}

.userteam {
  background-color: beige;
}

.winrate_progress {
  appearance: none;
  width: 100px;
  height: 7px;
}

.winrate_progress::-webkit-progress-bar {
  background:#f0f0f0;
  border-radius:3px;
  box-shadow: inset 3px 3px 10px #ccc;
}

.winrate_progress::-webkit-progress-value {
  border-radius:3px;
  background: black;
}

.container {
  margin: 0 auto;
  margin: 100px;
}

</style>