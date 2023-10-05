<template>
  <nav>
    <router-link to="/" class="routerfont">전적검색</router-link> |
    <router-link to="/article" class="routerfont">문의</router-link>
    <!-- <router-link to="/search"> 전적검색 </router-link> -->
  </nav>
  <router-view/>
</template>

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

</style>
