<template>
  <div class="home">
    <img src="../assets/logo.jpg" style="height: 300px;">
    <div class="searchbar_div">
      <input type="text" v-model="search_key" @keyup.enter="searchbtn" class="searchbar" placeholder="닉네임을 입력해주세요" >
      <button @click="searchbtn" style="border: 0; background-color: white;"> 검색 </button>
    </div>
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
      isLoading:false
    }
  },
  methods:{
    async searchbtn() {
      this.isLoading = true
      // 20 test
      await axios.get("https://port-0-eranca-gg-jvpb2alnb33u83.sel5.cloudtype.app/gamerecord/getsearch/" + this.search_key + '/20') 
      .then(res => {
        console.log(res)
        this.isLoading = false
        this.$router.push({name:'SearchresultView', params:{nickname:this.search_key}})
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