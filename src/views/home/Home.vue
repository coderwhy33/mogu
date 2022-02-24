<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">时尚购物街</div></nav-bar>
    <tab-control 
        :titles="['流行', '新款', '精选']" 
        @tabClick='tabClick'
        ref="tabControl1"
        class="titleControl"
        v-show="isTabFixed"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control 
        :titles="['流行', '新款', '精选']" 
        @tabClick='tabClick'
        ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
  
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"
// import BackTop from "components/content/backtop/BackTop"

import {
  getHomeMultidata,
  getHomeGoods
  } from "network/home"
import { debounce } from "common/utils"
import { backTopMixin } from 'common/mixin'

export default {
  name:'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins:[backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods:{
        'pop':{ page:0,list:[] },
        'new':{ page:0,list:[] },
        'sell':{ page:0,list:[] }
      },
      currentType: 'pop',
      tabOffsetTop:0,
      isTabFixed:false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  
  created(){
    //  1.请求页面多个数据
    this.getHomeMultidata()
    // 2.请求的商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  mounted() {
    //1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      // console.log(index);
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      // console.log(position);
      this.listenShowBackTop(position)
      // 2.决定tabControl是否吸顶即:(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 1月21注释
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      //获取tabControl的offsetTop
      //所有组件都有一个属性$el:用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res =>{
        // console.log('res==>',res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(this.banners);
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=1
        this.$refs.scroll.finishPullUp()
      })
    },

  }

}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  /* 效果不太好 */
  /* .tab-control {
    position: sticky;
    top: 44px;
    background-color: #fff;
  } */

  .content {
    /* height: calc(100% - 93px); */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .titleControl {
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
 </style>