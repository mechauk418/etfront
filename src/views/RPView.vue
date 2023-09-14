<template>
  <div>
    <div style="display: flex;">
      <p style="flex:1;"> 캐릭터 이름 </p>
      <p style="flex:1;"> 플레이 횟수 </p>
      <p style="flex:1;"> 총 RP 획득량 </p>
      <p style="flex:1;"> 판당 MMR 효율</p>
    </div>
    <div v-for="ch in rptable" :key="ch" style="border: 1px solid black;">
      <div style="display: flex;">
        <p style="flex:1;"> {{ ch.chname }} </p>
        <p style="flex:1;"> {{ ch.trygame }}판</p>
        <p style="flex:1;"> {{ ch.mmrGain }}점</p>
        <p style="flex:1;"> {{ (ch.mmrGain/ch.trygame).toFixed(2)}}점</p>
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
    axios.get("http://127.0.0.1:8000/gamerecord/gainrp/")
      .then(res => {
          this.rptable = res.data.result
          console.log(res)
        }
      )
  },
  methods:{
  }

}
</script>

<style>

</style>