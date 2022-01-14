<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">时尚购物街</div></nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import {getHomeMultidata} from 'network/home'

export default {
  name:'Home',
  components: {
    NavBar
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created(){
    //  1.请求页面多个数据
    getHomeMultidata().then(res =>{
      // console.log('res==>',res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      // console.log(this.banners);
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>