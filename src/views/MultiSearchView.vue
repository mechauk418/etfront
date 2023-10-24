<template>
  <div class="home">
    <img src="../assets/logo.jpg" style="height: 300px;">
    <div style="border:1px solid black; width: 1200px; margin:0 auto" v-if="!testtrue">
      <div style="display: flex; background-color: black; color: white; align-items: center; justify-content: start;">
        <p style="width: 10%;"></p>
        <p style="width: 10%;">닉네임</p>
        <p style="width: 10%;">티어</p>
        <p style="width: 10%;">RP</p>
        <p style="width: 10%;">승률</p>
        <p style="width: 10%;">게임 수</p>
        <p style="width: 10%;">평킬</p>
        <p style="width: 30%;">모스트</p>
      </div>

      <div v-for="(user,index) in search_data" :key="index" style="display: flex; align-items: center; border: 1px solid black; width: 1200px;">
        <div style="width: 10%;">
          <div style="overflow: hidden; width: 120px; height: 50px; border-radius: 80%; margin: 0 auto; ">
            <img :src="require(`../assets/character/${user.most1}.png`)" style="object-fit: cover; width: 60%; height: 100%;">
          </div>
        </div>

        <div style="width: 10%;">
          <p>{{ user.nickname }}</p>
        </div>

        <div style="width: 10%;">
          <p>{{ user.tier }} {{ user.grade }}</p>
        </div>

        <div style="width: 10%;">
          <p>{{ user.rp }} RP</p>
        </div>

        <div style="width: 10%;">
          <p>{{ user.winrate }}%</p>
        </div>

        <div style="width: 10%;">
          <p>{{ user.totalGames }}</p>
        </div>

        <div style="width: 10%;">
          <p>{{ user.averageKills }}</p>
        </div>

        <div style="width: 30%; display: flex;">
          <div style="width: 20%; height: 50px;">
            <div style="overflow: hidden; width: 72px; height: 50px; border-radius: 80%; margin: 0 auto; ">
              <img :src="require(`../assets/character/${user.most1}.png`)" style="object-fit: cover; width: 60%; height: 100%;">
            </div>
          </div>

          <div style="width: 13%;">
            <p>{{ user.most1_play }}%</p>
          </div>

          <div style="width: 20%; height: 50px;">
            <div style="overflow: hidden; width: 72px; height: 50px; border-radius: 80%; margin: 0 auto; ">
              <img :src="require(`../assets/character/${user.most2}.png`)" style="object-fit: cover; width: 60%; height: 100%;">
            </div>
          </div>

          <div style="width: 13%;">
            <p>{{ user.most2_play }}%</p>
          </div>

          <div style="width: 20%; height: 50px;">
            <div style="overflow: hidden; width: 72px; height: 50px; border-radius: 80%; margin: 0 auto; ">
              <img :src="require(`../assets/character/${user.most3}.png`)" style="object-fit: cover; width: 60%; height: 100%;">
            </div>
          </div>

          <div style="width: 13%;">
            <p>{{ user.most3_play }}%</p>
          </div>

        </div>


      </div>

    </div>
    

    <p style="margin-top: 50px;" v-if="testtrue">Paste your image here…</p>
    <img style="width:1280px; height: 720px; margin-top: 50px;" id="container">

  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'

// @ is an alias to /src
export default {
  data () {
    return {
      search_key:null,
      image:null,
      search_data:[],
      testtrue:true,
    }
  },
  methods:{
  },
  mounted(){
    document.onpaste = (pasteEvent) => {
    var item = pasteEvent.clipboardData.items[0];
    if (item.type.indexOf("image") === 0)
    {
      var blob = item.getAsFile();
      var reader = new FileReader();
      reader.onload = (event) => {
        this.image = event.target.result;
        document.getElementById("container").src = event.target.result;
        axios({
          method:'POST',
          url:'https://port-0-eranca-gg-jvpb2alnb33u83.sel5.cloudtype.app/gamerecord/crop/',
          withCredentials:true,
          data:{
            imgurl:this.image
          },
        })
        .then(res=>{
          if (res.data == 'error'){
            alert('올바른 사이즈의 이미지를 입력해주세요. (16:9) ')
            location.href = location.href;
          }
          this.search_data = res.data
          this.testtrue=false
          
          }
          // userList 배열의 각 요소별 루프 처리
        )
      };
      reader.readAsDataURL(blob);
    }
    }

  },
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


</style>