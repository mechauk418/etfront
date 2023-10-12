<template>
  <div class="container">
    <div style="display: flex;">
      <p style="flex:1; font-size: x-large;"> 캐릭터 </p>
      <p style="flex:1;font-size: x-large;"> 플레이 횟수 </p>
      <p style="flex:1;font-size: x-large;"> 총 RP 획득량 </p>
      <p style="flex:1;font-size: x-large;"> 판당 MMR 효율</p>
    </div>
    <div v-for="ch in rptable" :key="ch" style="border: 1px solid black; height: 40px;">
      <div style="display: flex; align-items: center; justify-content: center;">
        <div style="flex:1; display: flex; align-items: center;">
          <img :src="require(`../assets/character/${ch.name}.png`)" style="height: 40px; width: 40px; object-fit: cover; margin-left:20px;">
          <span style="margin:0; margin-left:20px;"> {{ ch.name }}</span>
        </div>
        <p style="flex:1; margin:0;"> {{ ch.trygame7days }}판</p>
        <p style="flex:1; margin:0;"> {{ ch.rpfor7days }}점</p>
        <p style="flex:1; margin:0;"> {{ ch.rpeff}}점</p>
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
    axios.get("https://port-0-eranca-gg-jvpb2alnb33u83.sel5.cloudtype.app/character/rpview")
      .then(res => {
          this.rptable = res.data
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