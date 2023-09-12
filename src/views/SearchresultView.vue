<template>
  <div class="container">
    <!-- <input type="text" v-model="search_key">
    <button @click="searchbtn"> 검색 </button> -->
    <div class="banner">
      <p style="margin: 2rem; color: white; font-weight: bold; font-size:50px"> {{ userstats.nickname }} </p>
      <button @click="refreshbtn" style="margin-right: 40px;">  전적갱신 </button>
    </div>
    <div style="display: flex;">
      <div style="width:30%; margin: 1rem;">
        <div class="userstatdiv">
          <div style="width:33%; display:flex; align-items: center; justify-content: center;">
            <img class="tierimg" src="../assets/tier/1.png" v-show="userstats.mmr<1000">
            <img class="tierimg" src="../assets/tier/2.png" v-show="1000<=userstats.mmr && userstats.mmr<2000">
            <img class="tierimg" src="../assets/tier/3.png" v-show="2000<=userstats.mmr && userstats.mmr<3000">
            <img class="tierimg" src="../assets/tier/4.png" v-show="3000<=userstats.mmr && userstats.mmr<4000">
            <img class="tierimg" src="../assets/tier/5.png" v-show="4000<=userstats.mmr && userstats.mmr<5000">
            <img class="tierimg" src="../assets/tier/6.png" v-show="5000<=userstats.mmr && userstats.mmr<6000 ">
            <img class="tierimg" src="../assets/tier/66.png" v-show="6000<=userstats.mmr && userstats.rank > 700">
            <img class="tierimg" src="../assets/tier/7.png" v-show="200<userstats.rank && userstats.rank<=700">
            <img class="tierimg" src="../assets/tier/8.png" v-show="userstats.rank<=200">
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
          <div style="margin-top: 2rem; margin-bottom: 2rem; background-color: rgb(92, 89, 89); color: white; font-size: 20px; padding-top: 0.5rem; padding-bottom: 0.5rem;">
            <p> 2주간 RP 획득 내역 </p>
          </div>
          <div v-for="ch in recentch" :key="ch" style="border: 1px solid black;">
            <div style="display: flex;">
              <p style="flex:1;"> {{ ch.chname }} </p>
              <p style="flex:1;"> {{ ch.trygame }}판</p>
              <p style="flex:1;"> {{ ch.mmrGain }}점</p>
            </div>
          </div>
        </div>
      </div>
      <div style="width:70%; margin:1rem;" class="전적">
        <div style="display: flex; background-color: black; color: white;">
          <p style="width:10%">등수</p>
          <p style="width:18%">캐릭터</p>
          <p style="width:18%">KDA</p>
          <p style="width:18%">딜량</p>
          <p style="width:9%">사전큐</p>
          <p style="width:9%">와드</p>
        </div>
        <div v-for="(game,index) in gamedetail" :key="index" style="border: 1px solid black;">
          <div style="display: flex;">
            <div style="width:30%">
              <p>{{ game.playcharacter }}</p>
            </div>
            <div style="width:30%">
              <p>{{ game.playerkill}} / {{game.playerAss}} / {{game.mosterkill }}</p>
            </div>
            <div style="width:10%">
              <p>딜량 {{ game.damageToPlayer  }}</p>
            </div>
            <div style="width:10%">
              <p> {{ game.mmrGain  }}</p>
            </div>
            <div style="width:10%">
              <p> {{ game.useWard }} {{game.premaid  }}</p>
            </div>
            <button @click="toggle(index)" style="width:5%; margin-left: auto;"> ▼ </button>
          </div>
          <div v-show="show[index]">
            <div style="display: flex; background-color: black; color: white;">
              <p style="width:10%">등수</p>
              <p style="width:18%">캐릭터</p>
              <p style="width:27%">닉네임</p>
              <p style="width:18%">KDA</p>
              <p style="width:18%">딜량</p>
              <p style="width:9%">사전큐</p>
              <p style="width:9%">와드</p>
            </div>
            <div v-for="ttas in (game.gamedetail.length/3)" :key="ttas" style="border:1px solid whitesmoke" :class="game.gamerank==ttas ? 'userteam' : 'nonuserteam' ">
              <div style="display: flex;">
                <p style="align-self: center; width:10%">{{ ttas }}</p>
                <div style="width:90%">
                  <div v-for="gs in game.gamedetail" :key="gs" style="display: flex;">
                    <p v-if="gs.gamerank == ttas" style="width:20%">{{gs.playcharacter}}</p>
                    <p v-if="gs.gamerank == ttas" style="width:30%">{{gs.usernickname}}</p>
                    <p v-if="gs.gamerank == ttas" style="width:20%">{{gs.playerkill}}/{{ gs.playerAss }}/{{ gs.mosterkill }}</p>
                    <p v-if="gs.gamerank == ttas" style="width:20%">{{gs.damageToPlayer}}</p>
                    <p v-show="gs.gamerank == ttas && (gs.premaid==2 || gs.premaid==3) " style="width:10%">사전큐</p>
                    <p v-show="gs.gamerank == ttas && gs.premaid==1 " style="width:10%"></p>
                    <p v-if="gs.gamerank == ttas" style="width:10%">{{gs.useWard}}</p>
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
  display: flex;
  height: 200px;
  align-items: center;
  /* background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZsZDS5WwrVlOqteGwBcz-5zacmsHgsGCmfA&usqp=CAU); */
  justify-content: start;
  margin:1rem;
  background-size: cover;
  background-image: linear-gradient(
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
      ), url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZsZDS5WwrVlOqteGwBcz-5zacmsHgsGCmfA&usqp=CAU);
}


.userteam {
  background-color: beige;
}

.winrate_progress {
  appearance: none;
  width: 60%;
  height: 6px;
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
  margin-left: 400px;
  margin-right: 400px;
}

.tierimg {
  display: block;
  width: 100%;
  height: auto;
}

</style>