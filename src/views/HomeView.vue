<template>
  <div class="home">
    <img src="../assets/logo.jpg" style="height: 300px;">
    <div class="searchbar_div">
      <input type="text" v-model="search_key" @keyup.enter="searchbtn" class="searchbar" placeholder="닉네임을 입력해주세요" >
      <button @click="searchbtn" style="border: 0; background-color: white;"> 검색 </button>
    </div>
    <h1 v-if="usercheck"> {{ usercheck }}</h1>
    <div v-show="isLoading" class="loading" > 
      <img src="../assets/vic.gif" style="height: 100%;">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
export default {
  data () {
    return {
      search_key:null,
      isLoading:false,
      usercheck:null,
    }
  },
  methods:{
    async searchbtn() {
      this.isLoading = true
      // 20 test
      this.search_key = this.search_key.trim()
      await axios.get("http://127.0.0.1:8000/gamerecord/getsearch/" + this.search_key + '/20') 
      .then(res => {
        this.isLoading = false
        if ('message' in res.data) {
          this.usercheck = '플레이어를 찾을 수 없습니다.'
          this.search_key = null
        } else {
          this.$router.push({name:'SearchresultView', params:{nickname:this.search_key}})
        }
        
      }
      )
    },
  }
}
</script>
<style scoped>

.searchbar_div{
  border: 1px solid black;
  border-radius: 20px;
  width:30%;
  height: 30px;
  margin:0 auto;
  display: flex;
  justify-content: center;
}

.searchbar{
  border:0;
  width:60%;
  text-align: center;
}

.loading {
  top:0;
  left:0;
  height: 100%;
  width:100%;
  background-color: rgb(108, 106, 106);
  opacity: 0.7;
  position: absolute;
}

</style>