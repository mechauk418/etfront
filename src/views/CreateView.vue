<template>
  <div>
    <h1 style="margin-top: 50px; margin-bottom: 50px;"> 자유게시판 </h1>
    <div class="articlebox">
      <div class="articletitle">
        <div style="width:200px;">
          <label for="subject">말머리 </label>
          <select v-model="selected2">
            <option v-for="item in selectList" :key="item.value" :value="item.value"> {{ item.name }}</option>
          </select>
        </div>
        <div style="width:600px; text-align: left;">
          <label for="title">제목 </label>
          <input type="text" id="title" v-model="title" class="input-text" style="width:70%;">
        </div>
      </div>
      <div class="articlecontent">
        <textarea></textarea>
      </div>
      <div style="display: flex; margin-left:25px; margin-top:20px;">
        <input multiple @change="OnArticleImage()" ref="ArticleImage" type="file" style="margin-right: auto;" />
      </div>
      <div style="display: flex; margin-right:20px; margin-top:20px;">
        <button @click="create" style="margin-left: auto;"> 글 쓰기 </button>
      </div>
    </div>
  </div>
</template>
    
<script>
import testaxios from '../../src/axios'
import loginStore from '../store/index'

export default {
  data () {
    return {
      title: '',
      content: '',
      islogin:'',
      images:'',
      images2:'',
      selected2: "0",
      selectList: [
        { name: "일반", value: "0" },
        { name: "정보", value: "1" },
        { name: "사진", value: "2" },
        { name: "공략", value: "3" },
        { name: "자랑", value: "4" },
      ],
    }
  },
  mounted() {
    // this.islogin = loginStore.state.loginStore.isLogin
    // if (this.islogin) {

    // } else {
    //   alert('로그인해주세요')
    //   this.$router.go(-1)
    // }
  },
  methods:{
    create () {
      const createdata = new FormData()
      // createdata.title = this.title
      // createdata.content = this.content
      // createdata.images = this.images
      createdata.append('title',this.title)
      createdata.append('content',this.content)
      createdata.append('subject',this.selected2)
      for (const i of this.images) {
        createdata.append('image',i)
        console.log(i)
      }
      console.log(createdata)
      testaxios({
        method: 'POST',
        url: 'http://localhost:8000/article/', 
        data: createdata,
        withCredentials : true,
        headers:{
          'Content-Type': 'multipart/form-data'
        }
        
      })
      .then(response => {
        const article_pk = response.data.pk
        window.location.href="http://localhost:8080/article/" + article_pk +'/'
      })
      .catch(error =>{
        console.log(error)
      })
    },
    OnArticleImage() {
      this.images = this.$refs.ArticleImage.files
    },
  }
}
</script>
    
<style>
  .articlebox {
    width : 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid black;
  }
  .articletitle {
    display: flex;
    margin-bottom: 20px;

  }
  .articlecontent{
    width:750px;
    margin: 0px auto;
  }
  textarea {
    width:750px;
    height: 600px;
    resize: none;
    margin-bottom: 20px;
    font-size: medium;
    font-family: 'Courier New', Courier, monospace;
  }
</style>