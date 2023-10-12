<template>
  <div class="container">
    <div style="display: flex;">
      <div style="flex:1;">
        <p style="font-size: larger;"> 캐릭터 </p>
      </div>
      <div style="flex:1; display: flex; cursor: pointer; align-items: center; justify-content: center;" @click="sort_col2">
        <p style="font-size: larger;"> 플레이 횟수 </p> 
        <p v-show="col2=='Down'" style="margin:0;"> ▼ </p>
        <p v-show="col2=='Up'" style="margin:0;"> ▲ </p>
        <svg v-show="col2==false" style="margin:0;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg> 
      </div>
      <div style="flex:1; display: flex; cursor: pointer; align-items: center; justify-content: center;" @click="sort_col3">
        <p style="font-size: larger;"> 총 RP 획득량 </p> 
        <p v-show="col3=='Down'" style="margin:0;"> ▼ </p>
        <p v-show="col3=='Up'" style="margin:0;"> ▲ </p>
        <svg v-show="col3==false" style="margin:0;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg> 
      </div>
      <div style="flex:1; display: flex; cursor: pointer; align-items: center; justify-content: center;" @click="sort_col4">
        <p style="font-size: larger;"> RP효율 </p> 
        <p v-show="col4=='Down'" style="margin:0;"> ▼ </p>
        <p v-show="col4=='Up'" style="margin:0;"> ▲ </p>
        <svg v-show="col4==false" style="margin:0;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg> 
      </div>
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
      col2:'Down',
      col3:false,
      col4:false
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
    sort_col2() {
      if (this.col2==false) {
        this.col2 = 'Down'
        this.col3 = false
        this.col4 = false
        this.rptable.sort((a, b) => {
          if (a.trygame7days < b.trygame7days) return 1;
          if (a.trygame7days > b.trygame7days) return -1;

          return 0;
        });
        
      } else if (this.col2 == 'Down') {
        this.col2 = 'Up'
        this.rptable.sort((a, b) => {
          if (a.trygame7days < b.trygame7days) return -1;
          if (a.trygame7days > b.trygame7days) return 1;

          return 0;
        });
      } else {
        this.col2 = 'Down'
        this.rptable.sort((a, b) => {
          if (a.trygame7days < b.trygame7days) return 1;
          if (a.trygame7days > b.trygame7days) return -1;

          return 0;
        });
      }
    },

    sort_col3() {
      if (this.col3==false) {
        this.col3 = 'Down'
        this.col2 = false
        this.col4 = false
        this.rptable.sort((a, b) => {
          if (a.rpfor7days < b.rpfor7days) return 1;
          if (a.rpfor7days > b.rpfor7days) return -1;

          return 0;
        });
      } else if (this.col3 == 'Down') {
        this.col3 = 'Up'
        this.rptable.sort((a, b) => {
          if (a.rpfor7days < b.rpfor7days) return -1;
          if (a.rpfor7days > b.rpfor7days) return 1;

          return 0;
        });
      } else {
        this.col3 = 'Down'
        this.rptable.sort((a, b) => {
          if (a.rpfor7days < b.rpfor7days) return 1;
          if (a.rpfor7days > b.rpfor7days) return -1;

          return 0;
        });
      }
    },

    sort_col4() {
      if (this.col4==false) {
        this.col4 = 'Down'
        this.col3 = false
        this.col2 = false
        this.rptable.sort((a, b) => {
          if (a.rpeff < b.rpeff) return 1;
          if (a.rpeff > b.rpeff) return -1;

          return 0;
        });
      } else if (this.col4 == 'Down') {
        this.col4 = 'Up'
        this.rptable.sort((a, b) => {
          if (a.rpeff < b.rpeff) return -1;
          if (a.rpeff > b.rpeff) return 1;

          return 0;
        });
      } else {
        this.col4 = 'Down'
        this.rptable.sort((a, b) => {
          if (a.rpeff < b.rpeff) return 1;
          if (a.rpeff > b.rpeff) return -1;

          return 0;
        });
      }
    },


    }
  }

</script>

<style>

.container {
  margin:0 auto;
  width:60%;
}

</style>