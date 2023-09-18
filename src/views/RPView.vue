<template>
  <div class="container">
    <div style="display: flex;">
      <p style="flex:1; font-size: x-large;"> 캐릭터 이름 </p>
      <p style="flex:1;font-size: x-large;"> 플레이 횟수 </p>
      <p style="flex:1;font-size: x-large;"> 총 RP 획득량 </p>
      <p style="flex:1;font-size: x-large;"> 판당 MMR 효율</p>
    </div>
    <div v-for="ch in rptable" :key="ch" style="border: 1px solid black;">
      <div style="display: flex; align-items: center; justify-content: center;">
        <div style="flex:1;">
          <img :src="require(`../assets/character/${ch.name}.png`)">
        </div>
        <p style="flex:1; font-size: x-large;"> {{ ch.trygame7days }}판</p>
        <p style="flex:1; font-size: x-large;"> {{ ch.RPfor7days }}점</p>
        <p style="flex:1; font-size: x-large;"> {{ ch.RPeff}}점</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      rptable: [],
      test : 123.4567
    }

  },
  mounted () {
    axios.get("http://127.0.0.1:8000/character/rpview")
      .then(res => {
          this.rptable = res.data
          console.log(res)
        }
      )
  },
  methods:{
  }

}
</script>

<style>

.container {
  margin:0 auto;
  width:60%;
}

</style>