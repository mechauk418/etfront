<template>
  <div>
    <input type="text" v-model="search_key">
    <button @click="searchbtn"> 검색 </button>
    <div v-if="isLoading" class="loading" > <p> 로딩중입니다. </p> </div>
    <!-- <div v-for="(game,index) in gamedetail" :key="index" style="border: 1px solid black;">
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
    </div> -->
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
      isLoading:false
    }

  },
  mounted () {
    // axios.get("http://127.0.0.1:8000/gamerecord/getsearch/" + this.$route.params.nickname + '/')
    //   .then(res => {
    //       this.gamedetail = res.data.results
    //       this.show = Array(this.gamedetail.length).fill(false)
    //       console.log(this.show)
    //       console.log(res.data.results)
    //     }
    //   )
  },
  methods:{
    async searchbtn() {
      this.isLoading = true
      await axios.get("http://127.0.0.1:8000/gamerecord/getsearch/" + this.search_key + '/')
      .then(res => {
        console.log(res)
        this.isLoading = false
        this.$router.push('search/'+this.search_key)
      }
      )
    },
    toggle(index) {
      this.show.splice(index,1,!this.show[index])
    },
  }

}
</script>

<style>

.loading {
  height: 100vh;
  width:100%;
  background-color: rgb(108, 106, 106);
  opacity: 0.5;
}

</style>