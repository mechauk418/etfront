<template>
  <div class="container">
    <!-- <input type="text" v-model="search_key">
    <button @click="searchbtn"> 검색 </button> -->
    <div class="banner">
      <p style="margin: 2rem; color: white; font-weight: bold; font-size:50px"> {{ userstats.nickname }} </p>
      <button @click="refreshbtn" style="margin-right: 40px;">  전적갱신 </button>
    </div>
    <div class="maindiv">
      <div class="maindiv1">
        <div class="userstatdiv">
          <div style="width:33%; display:flex; align-items: center; justify-content: center;">
            <img class="tierimg" src="../assets/tier/1.png" v-if="userstats.mmr<1000">
            <img class="tierimg" src="../assets/tier/2.png" v-if="1000<=userstats.mmr && userstats.mmr<2000">
            <img class="tierimg" src="../assets/tier/3.png" v-if="2000<=userstats.mmr && userstats.mmr<3000">
            <img class="tierimg" src="../assets/tier/4.png" v-if="3000<=userstats.mmr && userstats.mmr<4000">
            <img class="tierimg" src="../assets/tier/5.png" v-if="4000<=userstats.mmr && userstats.mmr<5000">
            <img class="tierimg" src="../assets/tier/6.png" v-if="5000<=userstats.mmr && userstats.mmr<6000 ">
            <img class="tierimg" src="../assets/tier/66.png" v-if="6000<=userstats.mmr && userstats.rank > 700">
            <img class="tierimg" src="../assets/tier/7.png" v-if="200<userstats.rank && userstats.rank<=700">
            <img class="tierimg" src="../assets/tier/8.png" v-if="userstats.rank<=200">
          </div>
          <div style="width:33%; display:flex; align-items: center; justify-content: center; flex-direction: column;">
            <p style="font-size:30px; margin:0.5rem;"> {{ userstats.mmr }} RP </p>
            <p style="margin:0;"> {{ userstats.rank }}위</p>
          </div>
          <div style="width:33%; display:flex; align-items: center; justify-content: center; flex-direction: column;">

            <p style="margin:2px;"> 총 게임 수</p>
            <progress value=100 min="0" max="100" class="winrate_progress" style="margin:2px;"></progress>
            <p style="margin:2px;">{{ userstats.totalGames }} </p>

            <p style="margin:2px;"> 승률 </p>
            <progress :value='userstats.winrate' min="0" max="100" class="winrate_progress"></progress>
            <p style="margin:2px;">{{ userstats.winrate }}% </p>

            <p style="margin:2px;"> 평킬</p>
            <progress value=100 min="0" max="100" class="winrate_progress"></progress>
            <p style="margin:2px;">{{ userstats.averageKills }} </p>

            <p style="margin:2px;"> 평딜</p>
            <progress value=100 min="0" max="100" class="winrate_progress"></progress>
            <p style="margin:2px;">{{ userstats.averageDamage }} </p>
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
      <div class="전적">
        <div style="display: flex; background-color: black; color: white; align-items: center; justify-content: center;">
          <p style="width:10%">등수</p>
          <p style="width:15%">캐릭터</p>
          <p style="width:20%">KDA</p>
          <p style="width:20%">딜량</p>
          <p style="width:10%">RP획득량</p>
          <p style="width:5%">와드</p>
          <p style="width:10%">사전큐</p>
          <div class="chtoggle" style="width:10%;">
            <select v-model="selected" @change="setSelect($event)">
              <option v-for="ch in userchlist" :key="ch.chnumber" :value="ch.chnumber">{{ch.chname}}</option>
            </select>
          </div>
        </div>
        <div v-for="(game,index) in gamedetail" :key="index" style="border: 1px solid black;">
          <div style="display: flex;">
            <div style="width:10%; display: flex; align-items: center; justify-content: center;">
              <p>{{ game.gamerank }}</p>
            </div>
            <div style="width:15%; display: flex; align-items: center; justify-content: center;">
              <div class="ch_icon_div">
                <img class="ch_icon" :src="require(`../assets/character/${game.playcharacter}.png`)">
                <!-- <p>{{ game.playcharacter }}</p> -->
              </div>
            </div>
            <div style="width:20%; display: flex; align-items: center; justify-content: center;">
              <p>{{ game.playerkill}} / {{game.playerAss}} / {{game.mosterkill }}</p>
            </div>
            <div style="width:20%; display: flex; align-items: center; justify-content: center;">
              <p> {{ game.damageToPlayer  }}</p>
            </div>
            <div style="width:10%; display: flex; align-items: center; justify-content: center; flex-direction: column;">
              <p style="margin-top:0px; margin-bottom: 0px;">{{ game.aftermmr }} </p>
              <p style="margin-top:0px; margin-bottom: 0px; color: red;" v-if="game.mmrGain>0">+{{ game.mmrGain}}</p>
              <p style="margin-top:0px; margin-bottom: 0px; color: blue;" v-if="game.mmrGain<0">-{{ -game.mmrGain  }}</p>
            </div>
            <div style="width:5%; display: flex; align-items: center; justify-content: center;">
              <p> {{ game.useWard }}</p>
            </div>
            <div style="width:10%; display: flex; align-items: center; justify-content: center;">
              <p v-if="game.premaid>1">사전큐</p>
              <p v-if="game.premaid==1"></p>
            </div>
            <button @click="toggle(index)" style="width:5%; margin-left: auto;"> ▼ </button>
          </div>
          <div v-show="show[index]">
            <div style="display: flex; background-color: black; color: white;">
              <p style="flex:1; align-self: center;">등수</p>
              <div style="display:flex; flex:9 0 auto">
                <p style="flex:2">캐릭터</p>
                <p style="flex:2">닉네임</p>
                <p style="flex:2">KDA</p>
                <p style="flex:2">딜량</p>
                <p style="flex:1">사전큐</p>
                <p style="flex:1">와드</p>
              </div>
            </div>

            <div v-for="ttas in (game.gamedetail.length/3)" :key="ttas" style="border:1px solid whitesmoke" :class="game.gamerank==ttas ? 'userteam' : 'nonuserteam' ">
              <div style="display: flex;">
                <p style="align-self: center; flex: 1;">{{ ttas }}</p>
                <div style="flex:9 0 auto">
                  <div v-for="gs in game.gamedetail" :key="gs" style="display: flex;">
                    <!-- <img v-if="gs.gamerank == ttas" style="flex:2" :src="require(`../assets/character/${gs.playcharacter}.png`)"> -->
                    <p v-if="gs.gamerank == ttas" style="flex:2;">{{gs.playcharacter}}</p>
                    <p v-if="gs.gamerank == ttas" style="flex:2">{{gs.usernickname}}</p>
                    <p v-if="gs.gamerank == ttas" style="flex:2">{{gs.playerkill}}/{{ gs.playerAss }}/{{ gs.mosterkill }}</p>
                    <p v-if="gs.gamerank == ttas" style="flex:2">{{gs.damageToPlayer}}</p>
                    <p v-show="gs.gamerank == ttas && (gs.premaid==2 || gs.premaid==3) " style="flex:1">사전큐</p>
                    <p v-show="gs.gamerank == ttas && gs.premaid==1 " style="flex:1"></p>
                    <p v-if="gs.gamerank == ttas" style="flex:1">{{gs.useWard}}</p>
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
        <!-- <div class="chtoggle">
          <select v-model="selected" @change="setSelect($event)">
            <option v-for="ch in userchlist" :key="ch.chnumber" :value="ch.chnumber">{{ch.chname}}</option>
          </select>
        </div> -->
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
      userchlist:[],
      selected:null
    }

  },
  mounted () {
    this.searchData()
    this.detailData()
    this.useChData()
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
    },
    async detailData() {
      const dData = await axios.get("http://127.0.0.1:8000/gamerecord/getdetail/" + this.$route.params.nickname + '/')
      this.userstats = dData.data
    },
    async useChData() {
      const dData = await axios.get("http://127.0.0.1:8000/gamerecord/userch/" + this.$route.params.nickname + '/')
      this.userchlist = dData.data.usech
      console.log(this.userchlist)
      this.userchlist.push({chname: '전체', chnumber: 0})
      console.log(this.userchlist)
    },
    async setSelect(event) {
      if (this.selected) {
        const sdData = await axios.get("http://127.0.0.1:8000/gamerecord/getsearch/" + this.$route.params.nickname + '/?character='+ this.selected)
        this.gamedetail = sdData.data.results
        this.show = Array(this.gamedetail.length).fill(false)
      }
      else {
        const sdData = await axios.get("http://127.0.0.1:8000/gamerecord/getsearch/" + this.$route.params.nickname)
        this.gamedetail = sdData.data.results
        this.show = Array(this.gamedetail.length).fill(false)
      }
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
  padding-top: 5px;
  padding-bottom: 5px;
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

@media (max-width: 1600px) {
  .container {
    margin: 0 auto;
    margin-left: 40px;
    margin-right: 40px;
  }
}

.tierimg {
  display: block;
  width: 100%;
  height: auto;
}

.maindiv {
  display: flex;
}

@media (max-width: 1600px) {
  .maindiv {
    display: block;
  }
}

.maindiv1 {
  width:30%;
  margin: 1rem;
}

@media (max-width: 1600px) {
  .maindiv1 {
    width:100%;
    margin: 1rem;
  }
}

.전적 {
  width:70%;
  margin: 1rem;
}

@media (max-width: 1600px) {
  .전적 {
    width:100%;
    margin: 1rem;
  }
}

.ch_icon_div {
  width: 80%;
  height: 80%;
  border-radius: 70%;
  overflow: hidden;
}

.ch_icon {
  width:80%;
  object-fit: cover;
}

</style>