<template>
  <nav>
    <div style="flex:1">

    </div>
    <div style="flex:1">
      <router-link :to="{name:'home'}" class="routerfont">전적검색</router-link> |
      <router-link :to="{name:'articles'}" class="routerfont">문의</router-link> |
      <router-link :to="{name:'RPView'}" class="routerfont">RP 통계</router-link> |
      <router-link :to="{name:'MultiSearchView'}" class="routerfont">멀티서치</router-link>
    </div>
    <div style="flex:1">
      <div class="searchbar_div2">
        <input type="text" v-model="search_key" @keyup.enter="searchbtn" class="searchbar2" placeholder="닉네임을 입력해주세요" >
        <button @click="searchbtn" style="border: 0; background-color: white; cursor: pointer;"> 검색 </button>
      </div>
    </div>
    
  </nav>
  <router-view/>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
export default {
  data () {
    return {
      search_key:null,
      isLoading:false
    }
  },
  methods:{
    async searchbtn() {
      this.isLoading = true
      await axios.get("https://port-0-eranca-gg-jvpb2alnb33u83.sel5.cloudtype.app/gamerecord/getsearch/" + this.search_key + '/')
      .then(res => {
        console.log(res)
        this.isLoading = false
        window.location.href = 'https://www.rollthun.site/search/' + this.search_key + '/'
      }
      )
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  /* background-color: #2c3e50;
  background-image: url(https://daily.hankooki.com/news/photo/202107/20210730_1_bodyimg_729040.jpg);
  background-size: cover; */
}

/* nav::before{
  content: "";
  opacity: 0.5;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 90%;
  background-color: #000;
} */

nav a {
  
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.routerfont {
  font-size:20px;
}

.searchbar_div2{
  border: 1px solid black;
  border-radius: 10px;
  width:50%;
  height: 30px;
  margin:0 auto;
  display: flex;
  justify-content: center;
}

.searchbar2{
  border:0;
  width:60%;
  text-align: center;
}


</style>
